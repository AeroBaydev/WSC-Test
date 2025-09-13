import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? '✅ Set' : '❌ Missing',
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? '✅ Set' : '❌ Missing',
      RAZORPAY_BASE_URL: process.env.RAZORPAY_BASE_URL || 'Using default',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing',
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? '✅ Set' : '❌ Missing',
      ZOHO_WEBHOOK_SECRET: process.env.ZOHO_WEBHOOK_SECRET ? '✅ Set' : '❌ Missing',
    };

    return NextResponse.json({
      message: 'Environment Variables Check',
      environment: process.env.NODE_ENV,
      variables: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
