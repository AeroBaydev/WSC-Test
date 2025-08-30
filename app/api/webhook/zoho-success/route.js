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
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Parse JSON payload
    const payload = JSON.parse(body);
    console.log('Zoho webhook payload:', payload);

    // 3. Extract required fields
    const { clerkUserId, email, category, Payment_Status } = payload.data || {};
    
    if (!clerkUserId || !email || !category) {
      console.error('Missing required fields:', { clerkUserId, email, category });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 4. Connect to MongoDB
    await dbConnect();

    // 5. Find user and update categories
    const user = await User.findOne({ userId: clerkUserId });
    
    if (!user) {
      console.error('User not found:', clerkUserId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user is already registered in this category
    const existingCategory = user.categories.find(
      (cat) => cat.category === category
    );

    if (existingCategory) {
      console.log('User already registered in category:', category);
      return NextResponse.json({ 
        success: false, 
        message: 'Already registered in this category' 
      });
    }

    // Add new category registration
    user.categories.push({
      category,
      paymentStatus: Payment_Status || 'pending',
      registeredAt: new Date()
    });

    await user.save();

    console.log('Successfully registered user in category:', {
      userId: clerkUserId,
      category,
      paymentStatus: Payment_Status
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
