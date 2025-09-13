import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

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

    if (event === 'payment.captured' || event === 'payment_link.paid') {
      paymentStatus = 'success';
    } else if (event === 'payment.failed' || event === 'payment_link.cancelled') {
      paymentStatus = 'failed';
    }

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

    const registration = await CategoryRegistration.findOne({ clerkUserId, category });
    if (!registration) {
      return NextResponse.json({ ok: true });
    }

    registration.paymentStatus = paymentStatus;
    registration.paymentOrderId = paymentId || registration.paymentOrderId;
    registration.paymentLinkId = paymentLinkId || registration.paymentLinkId;
    await registration.save();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('razorpay-webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


