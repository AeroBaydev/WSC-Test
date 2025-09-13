import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId');
    const category = searchParams.get('category');
    const email = searchParams.get('email');
    const coupon = searchParams.get('coupon') || '';

    // Step 1: Check required parameters
    if (!clerkUserId || !category || !email) {
      return NextResponse.json({ 
        error: 'Missing required params',
        received: { clerkUserId, category, email }
      }, { status: 400 });
    }

    // Step 2: Check environment variables
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? '✅ Set' : '❌ Missing',
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? '✅ Set' : '❌ Missing',
      RAZORPAY_BASE_URL: process.env.RAZORPAY_BASE_URL || 'Using default',
    };

    // Step 3: Check if critical variables are missing
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ 
        error: 'Razorpay credentials not configured',
        environmentCheck: envCheck
      }, { status: 500 });
    }

    // Step 4: Test MongoDB connection
    try {
      const dbConnect = (await import('@/lib/dbConnect.js')).default;
      await dbConnect();
    } catch (dbError) {
      return NextResponse.json({ 
        error: 'Database connection failed',
        dbError: dbError.message,
        environmentCheck: envCheck
      }, { status: 500 });
    }

    // Step 5: Test pricing
    try {
      const { getBasePriceInPaise } = await import('@/lib/pricing.js');
      const basePricePaise = getBasePriceInPaise(category);
    } catch (pricingError) {
      return NextResponse.json({ 
        error: 'Pricing error',
        pricingError: pricingError.message,
        category,
        environmentCheck: envCheck
      }, { status: 500 });
    }

    // Step 6: Test coupon validation
    try {
      const { validateAndPriceWithCoupon } = await import('@/lib/coupon.js');
      const { getBasePriceInPaise } = await import('@/lib/pricing.js');
      const basePricePaise = getBasePriceInPaise(category);
      const { finalPricePaise } = await validateAndPriceWithCoupon({
        category,
        basePricePaise,
        couponCode: coupon,
      });
    } catch (couponError) {
      return NextResponse.json({ 
        error: 'Coupon validation failed',
        couponError: couponError.message,
        environmentCheck: envCheck
      }, { status: 500 });
    }

    // If we get here, everything is working
    return NextResponse.json({
      success: true,
      message: 'All checks passed - ready for Razorpay integration',
      data: { clerkUserId, category, email, coupon },
      environmentCheck: envCheck
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Unexpected error',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
