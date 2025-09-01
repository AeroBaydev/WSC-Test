import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

export async function POST(request) {
  try {
    // 1. Get the webhook secret from header (Zoho sends this)
    const webhookSecret = request.headers.get('x-zoho-webhook-secret');
    const body = await request.text();
    
    console.log('Webhook headers:', Object.fromEntries(request.headers.entries()));
    console.log('Webhook body:', body);
    
    // 2. Check if webhook secret matches (simple validation)
    if (!webhookSecret || !process.env.ZOHO_WEBHOOK_SECRET) {
      console.error('Missing webhook secret header or environment variable');
      console.error('Header received:', webhookSecret);
      console.error('Environment variable:', process.env.ZOHO_WEBHOOK_SECRET);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (webhookSecret !== process.env.ZOHO_WEBHOOK_SECRET) {
      console.error('Webhook secret mismatch');
      console.error('Expected:', process.env.ZOHO_WEBHOOK_SECRET);
      console.error('Received:', webhookSecret);
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
    
    console.log('Zoho webhook payload:', payload);

    // 4. Extract required fields from Zoho's field structure
    // Based on your Zoho form field aliases: email, clerkUserId, category
    const email = payload.email || payload.Email; // Email field
    const clerkUserId = payload.clerkUserId || payload.clerkUserld; // Clerk User ID (note: you had a typo in Zoho)
    const category = payload.category || payload.Category; // Category field
    
    // For payment fields - these are CRITICAL for determining successful registration
    const paymentStatus = payload.paymentStatus || payload.PaymentStatus || payload.payment_status || 'pending';
    const paymentAmount = payload.paymentAmount || payload.PaymentAmount || payload.payment_amount || '0';
    const transactionId = payload.transactionId || payload.TransactionID || payload.transaction_id || `webhook_${Date.now()}`;
    
    console.log('Extracted data:', {
      email,
      clerkUserId,
      category,
      paymentStatus,
      paymentAmount,
      transactionId
    });
    
    if (!email || !clerkUserId || !category) {
      console.error('Missing required fields:', { email, clerkUserId, category });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 5. Connect to MongoDB
    await dbConnect();

    // 6. Check if user is already registered in this category
    const existingRegistration = await CategoryRegistration.findOne({
      clerkUserId: clerkUserId,
      category: category
    });

    if (existingRegistration) {
      console.log('User already registered in category:', category);
      
      // Only allow re-registration if payment failed previously
      if (existingRegistration.paymentStatus === 'success' || existingRegistration.paymentStatus === 'completed') {
        console.log('User already successfully registered and paid - cannot re-register');
        return NextResponse.json({ 
          success: false, 
          message: 'Already successfully registered in this category',
          category: category,
          paymentStatus: existingRegistration.paymentStatus
        });
      }
      
      // Update payment status if it changed (e.g., from pending to success)
      if (existingRegistration.paymentStatus !== paymentStatus) {
        existingRegistration.paymentStatus = paymentStatus;
        existingRegistration.paymentAmount = paymentAmount;
        existingRegistration.transactionId = transactionId;
        await existingRegistration.save();
        console.log('Updated payment status for existing category:', category, 'from', existingRegistration.paymentStatus, 'to', paymentStatus);
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Payment status updated for existing registration',
        category: category,
        paymentStatus: paymentStatus,
        registrationId: existingRegistration._id
      });
    }

    // 7. Create new category registration
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
