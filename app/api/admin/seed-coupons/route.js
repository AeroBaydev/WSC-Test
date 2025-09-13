import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect.js';
import Coupon from '@/lib/couponModel.js';

function isAuthorized(request) {
  const auth = request.headers.get('authorization') || '';
  const expected = `Bearer ${process.env.ADMIN_SEED_SECRET || ''}`;
  return Boolean(process.env.ADMIN_SEED_SECRET) && auth === expected;
}

export async function POST(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // If body provided, upsert from JSON; else seed defaults
    let payload = null;
    try {
      payload = await request.json();
    } catch (_) {}

    const coupons = Array.isArray(payload) ? payload : (payload?.coupons || null);

    const now = new Date();
    const oneYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const defaults = [
      { code: 'SAVE5', discountType: 'percent', amount: 5, active: true, expiresAt: oneYear },
      { code: 'FLAT100', discountType: 'flat', amount: 100, active: true, expiresAt: oneYear },
      { code: 'WELCOME50', discountType: 'flat', amount: 50, active: true, expiresAt: oneYear },
      { code: 'SAVE20', discountType: 'percent', amount: 20, active: true, expiresAt: oneYear, allowedCategories: [] },
    ];

    const list = coupons || defaults;
    const results = [];
    for (const c of list) {
      if (!c.code || !c.discountType || typeof c.amount !== 'number') continue;
      const doc = {
        code: String(c.code).trim().toUpperCase(),
        discountType: c.discountType,
        amount: c.amount,
        active: c.active !== false,
        expiresAt: c.expiresAt ? new Date(c.expiresAt) : undefined,
        maxRedemptions: c.maxRedemptions,
        allowedCategories: Array.isArray(c.allowedCategories) ? c.allowedCategories : undefined,
      };
      const res = await Coupon.findOneAndUpdate(
        { code: doc.code },
        { $set: doc },
        { upsert: true, new: true }
      );
      results.push({ code: res.code, discountType: res.discountType, amount: res.amount });
    }

    return NextResponse.json({ ok: true, upserted: results.length, coupons: results });
  } catch (err) {
    console.error('seed-coupons error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const list = await Coupon.find().select('code discountType amount active expiresAt allowedCategories redeemedCount maxRedemptions createdAt updatedAt').sort({ code: 1 });
    return NextResponse.json({ ok: true, coupons: list });
  } catch (err) {
    console.error('list-coupons error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


