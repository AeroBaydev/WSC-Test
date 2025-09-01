import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

export async function POST(request) {
  try {
    // 1. Verify Zoho signature
    const signature = request.headers.get('x-zoho-signature');
    const body = await request.text();
    
    if (!signature || !process.env.ZOHO_WEBHOOK_SECRET) {
      console.error('Missing signature or webhook secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.ZOHO_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid signature');
      console.error('Expected:', expectedSignature);
      console.error('Received:', signature);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Parse JSON payload
    const payload = JSON.parse(body);
    console.log('Zoho webhook payload:', payload);

    // 3. Extract required fields from Zoho's field structure
    // Map your Zoho form fields to the data you need
    const email = payload.Field_6 || payload.Field_16; // Email field
    const clerkUserId = payload.Field_5 || payload.Field_7 || payload.Field_8; // Clerk User ID (hidden field)
    const category = payload.Field_5 || payload.Field_7 || payload.Field_8; // Category (hidden field)
    const paymentStatus = payload.Field_10; // Payment status
    const paymentAmount = payload.Field_9; // Payment amount
    const transactionId = payload.Field_12; // Transaction ID
    
    console.log('Extracted data:', {
      email,
      clerkUserId,
      category,
      paymentStatus,
      paymentAmount,
      transactionId
    });
    
    if (!email || !clerkUserId || !category || !paymentStatus) {
      console.error('Missing required fields:', { email, clerkUserId, category, paymentStatus });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 4. Connect to MongoDB
    await dbConnect();

    // 5. Check if user is already registered in this category
    const existingRegistration = await CategoryRegistration.findOne({
      clerkUserId: clerkUserId,
      category: category
    });

    if (existingRegistration) {
      console.log('User already registered in category:', category);
      // Update payment status if it changed
      if (existingRegistration.paymentStatus !== paymentStatus) {
        existingRegistration.paymentStatus = paymentStatus;
        existingRegistration.paymentAmount = paymentAmount;
        existingRegistration.transactionId = transactionId;
        await existingRegistration.save();
        console.log('Updated payment status for existing category:', category);
      }
      return NextResponse.json({ 
        success: false, 
        message: 'Already registered in this category',
        category: category,
        paymentStatus: paymentStatus
      });
    }

    // 6. Create new category registration
    const newRegistration = await CategoryRegistration.create({
      clerkUserId,
      email,
      category,
      paymentStatus,
      paymentAmount,
      transactionId,
      zohoFormData: payload // Store all form data for reference
    });

    console.log('Successfully registered user in category:', {
      clerkUserId,
      category,
      paymentStatus,
      registrationId: newRegistration._id
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully registered in category',
      category: category,
      paymentStatus: paymentStatus,
      registrationId: newRegistration._id
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
