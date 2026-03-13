import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';
import { syncRegistrationToZohoSheet } from '@/lib/zohoSheetSync.js';

export const runtime = 'nodejs';
export const preferredRegion = ['bom1'];

// Razorpay sends events to this webhook. Configure the secret in dashboard.
export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify signature
    const expected = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expected !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);

    await dbConnect();

    const event = payload.event;
    const paymentLinkEntity = payload.payload?.payment_link?.entity;
    const paymentEntity = payload.payload?.payment?.entity;

    // For payment_link.paid: notes are on payment_link entity (we put them there when creating the link)
    // For payment.captured: notes may be on payment entity
    const notes = paymentLinkEntity?.notes || paymentEntity?.notes || {};
    const paymentId = paymentEntity?.id;
    const paymentLinkId = paymentLinkEntity?.id || paymentEntity?.payment_link_id;

    const isSuccessEvent = (event === 'payment.captured' || event === 'payment_link.paid');
    const isFailureEvent = (event === 'payment.failed' || event === 'payment_link.cancelled');

    const clerkUserId = notes.clerkUserId;
    const category = notes.category;

    if (!clerkUserId || !category) {
      // Fallback: find by paymentLinkId and update (notes missing e.g. from payment entity)
      if (paymentLinkId) {
        const reg = await CategoryRegistration.findOne({ paymentLinkId });
        if (reg) {
          reg.paymentStatus = isSuccessEvent ? 'success' : (isFailureEvent ? 'failed' : reg.paymentStatus);
          reg.transactionId = paymentId || reg.transactionId;
          reg.paymentOrderId = paymentId || reg.paymentOrderId;
          await reg.save();
          if (isSuccessEvent && !reg.zohoSheetSyncedAt) {
            try {
              const syncRes = await syncRegistrationToZohoSheet(reg);
              if (syncRes?.ok) {
                reg.zohoSheetSyncedAt = new Date();
                await reg.save();
              }
            } catch (_) {}
          }
          return NextResponse.json({ ok: true });
        }
      }
      return NextResponse.json({ ok: true });
    }

    // Only persist data for successful payments
    if (isSuccessEvent) {
      // Prefer resolving by paymentLinkId (most reliable)
      let registration = null;
      if (paymentLinkId) {
        registration = await CategoryRegistration.findOne({ paymentLinkId });
      }

      // Fall back to clerkUserId + category from notes
      if (!registration && clerkUserId && category) {
        registration = await CategoryRegistration.findOne({ clerkUserId, category });
      }

      // Final fallback: latest initiated/pending record for this user
      if (!registration && clerkUserId) {
        registration = await CategoryRegistration.findOne({
          clerkUserId,
          paymentStatus: { $in: ['pending', 'initiated'] },
        }).sort({ createdAt: -1 });
      }

      if (!registration) {
        // Create a new record on success if none exists
        registration = await CategoryRegistration.create({
          clerkUserId: clerkUserId || 'unknown',
          category: category || 'unknown',
          email: notes.email || 'unknown@example.com',
          paymentStatus: 'success',
          paymentOrderId: paymentId,
          paymentLinkId: paymentLinkId,
          paymentAmount: notes.paymentAmount || undefined,
          zohoFormData: notes.zohoFormData ? JSON.parse(notes.zohoFormData) : {},
          registeredAt: new Date(),
        });
      } else {
        registration.paymentStatus = 'success';
        registration.paymentOrderId = paymentId || registration.paymentOrderId;
        registration.paymentLinkId = paymentLinkId || registration.paymentLinkId;
        // Store definitive payment identifiers on success
        registration.transactionId = paymentId || registration.transactionId;
        if (notes?.paymentAmount && !registration.paymentAmount) {
          registration.paymentAmount = String(notes.paymentAmount);
        }
        registration.registeredAt = registration.registeredAt || new Date();
        await registration.save();
      }

      // Sync to Zoho Sheet once (best effort)
      try {
        if (!registration.zohoSheetSyncedAt) {
          const syncRes = await syncRegistrationToZohoSheet(registration);
          if (syncRes?.ok) {
            registration.zohoSheetSyncedAt = new Date();
            registration.zohoSheetLastError = undefined;
            await registration.save();
          } else if (syncRes?.skipped) {
            // do not mark error if integration not configured
          } else {
            registration.zohoSheetLastError = String(syncRes?.error || 'Zoho sheet sync failed');
            await registration.save();
          }
        }
      } catch (e) {
        try {
          registration.zohoSheetLastError = String(e?.message || e);
          await registration.save();
        } catch (_) {
          // ignore
        }
      }
    } else if (isFailureEvent && paymentLinkId) {
      // Optional: mark existing initiated/pending record as failed; do NOT create new
      const reg = await CategoryRegistration.findOne({ paymentLinkId });
      if (reg) {
        reg.paymentStatus = 'failed';
        reg.paymentOrderId = paymentId || reg.paymentOrderId;
        await reg.save();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('razorpay-webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


