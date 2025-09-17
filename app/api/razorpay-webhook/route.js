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
      // Check if user is already registered in this category (prevent duplicates)
      const existingSuccessRegistration = await CategoryRegistration.findOne({
        clerkUserId,
        category,
        paymentStatus: 'success'
      });

      if (existingSuccessRegistration) {
        console.log('User already registered in this category:', { clerkUserId, category });
        return NextResponse.json({ ok: true, message: 'Already registered' });
      }

      // Check if there's a pending registration from Zoho webhook
      const pendingRegistration = await CategoryRegistration.findOne({
        clerkUserId,
        category,
        paymentStatus: 'pending'
      });

      if (pendingRegistration) {
        // Update pending registration to success
        console.log('Updating pending registration to success:', pendingRegistration._id);
        pendingRegistration.paymentStatus = 'success';
        pendingRegistration.paymentOrderId = paymentId;
        pendingRegistration.paymentLinkId = paymentLinkId;
        pendingRegistration.paymentAmount = notes.paymentAmount || undefined;
        await pendingRegistration.save();
        
        console.log('Pending registration updated to success:', pendingRegistration._id);
        return NextResponse.json({ ok: true, message: 'Pending registration updated to success' });
      }

      // Create new registration only for successful payments (fallback)
      const registration = await CategoryRegistration.create({
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

      console.log('Registration created successfully:', registration._id);
    } else if (isFailureEvent) {
      // For failed payments, mark pending registrations as failed
      const pendingRegistration = await CategoryRegistration.findOne({
        clerkUserId,
        category,
        paymentStatus: 'pending'
      });

      if (pendingRegistration) {
        pendingRegistration.paymentStatus = 'failed';
        await pendingRegistration.save();
        console.log('Pending registration marked as failed:', pendingRegistration._id);
      } else {
        console.log('Payment failed, no pending registration found:', { clerkUserId, category, event });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('razorpay-webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


