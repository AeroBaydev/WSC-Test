import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
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

    // 4. Normalize keys → lowercase + replace spaces with underscores
    const normalizedPayload = {};
    for (const [key, value] of Object.entries(payload)) {
      normalizedPayload[key.toLowerCase().replace(/\s+/g, '_')] = value;
    }

    console.log('Normalized payload:', normalizedPayload);

    // 5. Extract required fields
    const email = normalizedPayload.email;
    const clerkUserId = normalizedPayload.clerkuserid;
    const category = normalizedPayload.category;

    // Payment fields (safe defaults if missing)
    const paymentStatus = normalizedPayload.payment_status || 'pending';
    const paymentAmount = normalizedPayload.payment_amount || '0';
    const transactionId =
      normalizedPayload.transaction_id || `webhook_${Date.now()}`;

    console.log('Extracted data:', {
      email,
      clerkUserId,
      category,
      paymentStatus,
      paymentAmount,
      transactionId,
    });

    if (!email || !clerkUserId || !category) {
      console.error('Missing required fields:', { email, clerkUserId, category });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 6. Connect to MongoDB
    await dbConnect();

    // 7. Check if user is already registered in this category
    const existingRegistration = await CategoryRegistration.findOne({
      clerkUserId,
      category,
    });

    if (existingRegistration) {
      console.log('User already registered in category:', category);

      if (
        existingRegistration.paymentStatus === 'success' ||
        existingRegistration.paymentStatus === 'completed'
      ) {
        return NextResponse.json({
          success: false,
          message: 'Already successfully registered in this category',
          category,
          paymentStatus: existingRegistration.paymentStatus,
        });
      }

      // Update payment status if it changed
      if (existingRegistration.paymentStatus !== paymentStatus) {
        existingRegistration.paymentStatus = paymentStatus;
        existingRegistration.paymentAmount = paymentAmount;
        existingRegistration.transactionId = transactionId;
        await existingRegistration.save();
        console.log(
          'Updated payment status for existing category:',
          category,
          'to',
          paymentStatus
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Payment status updated for existing registration',
        category,
        paymentStatus,
        registrationId: existingRegistration._id,
      });
    }

    // 8. Create new category registration
    const newRegistration = await CategoryRegistration.create({
      clerkUserId,
      email,
      category,
      paymentStatus,
      paymentAmount,
      transactionId,
      zohoFormData: normalizedPayload, // Store normalized form data
    });

    console.log('Successfully registered user:', {
      clerkUserId,
      category,
      paymentStatus,
      registrationId: newRegistration._id,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully registered in category',
      category,
      paymentStatus,
      registrationId: newRegistration._id,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
