import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect.js';
import User from '@/lib/userModel.js';

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
    const email = payload.Field_6 || payload.Field_16; // Email field
    const paymentStatus = payload.Field_10; // Payment status
    const paymentAmount = payload.Field_9; // Payment amount
    const transactionId = payload.Field_12; // Transaction ID
    
    // Extract category from one of the single line fields (you'll need to map this)
    // Field_5, Field_7, or Field_8 might contain category info
    const category = payload.Field_5 || payload.Field_7 || payload.Field_8;
    
    // Extract user info
    const firstName = payload.Field_1;
    const lastName = payload.Field_3;
    
    console.log('Extracted data:', {
      email,
      paymentStatus,
      paymentAmount,
      transactionId,
      category,
      firstName,
      lastName
    });
    
    if (!email || !paymentStatus) {
      console.error('Missing required fields:', { email, paymentStatus });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 4. Connect to MongoDB
    await dbConnect();

    // 5. Find user by email (since we don't have clerkUserId from Zoho)
    const user = await User.findOne({ 
      $or: [
        { email: email },
        { 'primaryEmail': email }
      ]
    });
    
    if (!user) {
      console.error('User not found for email:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Found user:', { userId: user.userId, email: user.email });

    // If category is provided, check if user is already registered
    if (category) {
      const existingCategory = user.categories.find(
        (cat) => cat.category === category
      );

      if (existingCategory) {
        console.log('User already registered in category:', category);
        // Update payment status if it changed
        if (existingCategory.paymentStatus !== paymentStatus) {
          existingCategory.paymentStatus = paymentStatus;
          await user.save();
          console.log('Updated payment status for existing category:', category);
        }
        return NextResponse.json({ 
          success: false, 
          message: 'Already registered in this category',
          category: category,
          paymentStatus: paymentStatus
        });
      }

      // Add new category registration
      const newCategory = {
        category,
        paymentStatus: paymentStatus || 'pending',
        registeredAt: new Date(),
        transactionId: transactionId,
        paymentAmount: paymentAmount
      };
      
      user.categories.push(newCategory);
      await user.save();

      console.log('Successfully registered user in category:', {
        userId: user.userId,
        category,
        paymentStatus: paymentStatus
      });
    }

    // 6. Log the successful webhook processing
    console.log('Webhook processed successfully for user:', {
      userId: user.userId,
      email: email,
      paymentStatus: paymentStatus,
      transactionId: transactionId
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      user: {
        userId: user.userId,
        email: email
      },
      payment: {
        status: paymentStatus,
        amount: paymentAmount,
        transactionId: transactionId
      }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
