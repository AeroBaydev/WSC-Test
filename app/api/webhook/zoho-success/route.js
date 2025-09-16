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
      // Only attach Zoho metadata for paid registrations
      if (existingRegistration.paymentStatus === 'success') {
        console.log('Zoho webhook: paid registration found, updating metadata only');
        existingRegistration.email = email || existingRegistration.email;
        existingRegistration.zohoFormData = payload;
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
      // If not paid yet, do nothing to avoid storing unpaid records
      return NextResponse.json({
        success: true,
        message: 'Ignored Zoho data for unpaid registration',
        category,
        paymentStatus: existingRegistration.paymentStatus,
        registrationId: existingRegistration._id,
      });
    }

    // Do not create any DB entry from Zoho webhook to avoid unpaid/pending records
    return NextResponse.json({
      success: true,
      message: 'Ignored Zoho data; no paid registration found',
      category,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}