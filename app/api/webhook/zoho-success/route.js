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

    // 4. Extract Zoho fields directly
    const email = payload.Field_6;
    const clerkUserId = payload.Field_7;
    const category = payload.Field_8;
    const couponFromForm = payload.Field_9;
    const ageGroupOrOther = payload.Field_10;
    const transactionId = payload.transaction_id || `webhook_${Date.now()}`;

    console.log('Zoho webhook received:', {
      email,
      clerkUserId,
      category,
      couponFromForm,
      ageGroupOrOther,
      transactionId,
    });

    if (!email || !clerkUserId || !category) {
      console.error('Missing required fields:', { email, clerkUserId, category });
      return NextResponse.json({ 
        status: 'error',
        error: 'Missing required fields',
        received: { email, clerkUserId, category }
      }, { status: 400 });
    }

    // 5. Connect to MongoDB
    await dbConnect();

    // 6. Check if user has a successful payment for this category
    console.log('Searching for existing registration:', { clerkUserId, category });
    
    const existingRegistration = await CategoryRegistration.findOne({
      clerkUserId,
      category,
      paymentStatus: 'success'
    });

    console.log('Found existing registration:', existingRegistration ? 'YES' : 'NO');

    if (existingRegistration) {
      // Update Zoho metadata for successful registrations only
      console.log('Zoho webhook: updating metadata for successful registration');
      existingRegistration.email = email || existingRegistration.email;
      existingRegistration.zohoFormData = payload;
      if (couponFromForm) {
        existingRegistration.zohoFormData = {
          ...(existingRegistration.zohoFormData || {}),
          coupon: couponFromForm,
        };
      }
      await existingRegistration.save();
      
      console.log('Successfully updated registration metadata');
      return NextResponse.json({
        status: 'success',
        message: 'Registration metadata synced from Zoho',
        category,
        paymentStatus: existingRegistration.paymentStatus,
        registrationId: existingRegistration._id,
      }, { status: 200 });
    }

    // If no successful payment found, don't store anything
    console.log('Zoho webhook: no successful payment found, ignoring data');
    // Return 200 OK for Zoho webhook (Zoho expects 200 status for successful webhook processing)
    return NextResponse.json({
      status: 'success',
      message: 'Webhook processed successfully - no payment found',
      category,
    }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}