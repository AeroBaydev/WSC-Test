import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

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
    const entity = payload.payload?.payment?.entity || payload.payload?.payment_link?.entity;

    // Extract traced fields
    let paymentStatus = 'pending';
    let paymentId = entity?.id;
    let paymentLinkId = payload.payload?.payment_link?.entity?.id || entity?.payment_link_id;
    let notes = entity?.notes || {};

    const isSuccessEvent = (event === 'payment.captured' || event === 'payment_link.paid');
    const isFailureEvent = (event === 'payment.failed' || event === 'payment_link.cancelled');

    const clerkUserId = notes.clerkUserId;
    const category = notes.category;

    if (!clerkUserId || !category) {
      // Try fallback using payment_link id lookup
      if (paymentLinkId) {
        const reg = await CategoryRegistration.findOne({ paymentLinkId });
        if (reg) {
          reg.paymentStatus = paymentStatus;
          reg.transactionId = paymentId || reg.transactionId;
          await reg.save();
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
        registration.registeredAt = registration.registeredAt || new Date();
        await registration.save();
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


