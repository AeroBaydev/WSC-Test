import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

function authorized(request) {
  const auth = request.headers.get('authorization') || '';
  const expected = `Bearer ${process.env.ADMIN_SEED_SECRET || ''}`;
  return Boolean(process.env.ADMIN_SEED_SECRET) && auth === expected;
}

export async function POST(request) {
  try {
    if (!authorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payment_link_id } = await request.json();
    if (!payment_link_id) {
      return NextResponse.json({ error: 'payment_link_id is required' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const baseUrl = process.env.RAZORPAY_BASE_URL || 'https://api.razorpay.com/v1';
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay credentials not configured' }, { status: 500 });
    }

    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const resp = await fetch(`${baseUrl}/payment_links/${payment_link_id}`, {
      method: 'GET',
      headers: { Authorization: authHeader },
    });
    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: 'Failed to fetch payment link', details: text }, { status: 502 });
    }
    const pl = await resp.json();

    await dbConnect();
    const reg = await CategoryRegistration.findOne({ paymentLinkId: payment_link_id });
    if (!reg) {
      return NextResponse.json({ ok: true, note: 'No registration found for this payment_link_id', payment_link: pl });
    }

    // Mark success if paid
    if (pl.status === 'paid') {
      reg.paymentStatus = 'success';
      reg.transactionId = pl.id; // keep link id; payment id may also be present in notifications
      await reg.save();
      return NextResponse.json({ ok: true, updated: true, status: reg.paymentStatus });
    }

    return NextResponse.json({ ok: true, updated: false, payment_link_status: pl.status });
  } catch (err) {
    console.error('reconcile-payment error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


