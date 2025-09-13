import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

export async function POST(request) {
  try {
    // 1. Get the webhook secret from header
    const webhookSecret = request.headers.get('x-zoho-webhook-secret');
    const body = await request.text();

    console.log('Webhook headers:', Object.fromEntries(request.headers.entries()));
    console.log('Webhook raw body:', body);

    // 2. Check if webhook secret matches
    if (!webhookSecret || !process.env.ZOHO_WEBHOOK_SECRET) {
      console.error('Missing webhook secret header or environment variable');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (webhookSecret !== process.env.ZOHO_WEBHOOK_SECRET) {
      console.error('Webhook secret mismatch');
      return NextResponse.json({ error: 'Invalid webhook secret' }, { status: 401 });
    }

    // 3. Parse JSON payload
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    console.log('Parsed payload:', payload);

    // 4. Extract Zoho fields directly (do NOT treat any Zoho field as payment fields)
    const email = payload.Field_6;
    const clerkUserId = payload.Field_7;
    const category = payload.Field_8;
    const couponFromForm = payload.Field_9; // typically coupon code in our form
    const ageGroupOrOther = payload.Field_10; // do NOT map to payment status
    const transactionId = payload.transaction_id || `webhook_${Date.now()}`;

    console.log('Extracted data:', {
      email,
      clerkUserId,
      category,
      couponFromForm,
      ageGroupOrOther,
      transactionId,
    });

    if (!email || !clerkUserId || !category) {
      console.error('Missing required fields:', { email, clerkUserId, category });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 5. Connect to MongoDB
    await dbConnect();

    // 6. Check if user is already registered in this category
    const existingRegistration = await CategoryRegistration.findOne({
      clerkUserId,
      category,
    });

    if (existingRegistration) {
      console.log('Zoho webhook: existing registration found, updating metadata only');
      // Update email or metadata only; never touch paymentStatus/paymentAmount here
      existingRegistration.email = email || existingRegistration.email;
      existingRegistration.zohoFormData = payload;
      // Optionally store coupon seen in Zoho
      if (couponFromForm) {
        existingRegistration.zohoFormData = {
          ...(existingRegistration.zohoFormData || {}),
          coupon: couponFromForm,
        };
      }
      await existingRegistration.save();
      return NextResponse.json({
        success: true,
        message: 'Registration metadata synced from Zoho',
        category,
        paymentStatus: existingRegistration.paymentStatus,
        registrationId: existingRegistration._id,
      });
    }

    // 7. Create new category registration (metadata only). Payment handled via Razorpay webhook.
    const newRegistration = await CategoryRegistration.create({
      clerkUserId,
      email,
      category,
      paymentStatus: 'pending',
      transactionId,
      zohoFormData: payload, // Store raw Zoho data
    });

    console.log('Successfully registered user:', {
      clerkUserId,
      category,
      paymentStatus: newRegistration.paymentStatus,
      registrationId: newRegistration._id,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully registered in category',
      category,
      paymentStatus: newRegistration.paymentStatus,
      registrationId: newRegistration._id,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
