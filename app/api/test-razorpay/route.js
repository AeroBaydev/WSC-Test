import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId');
    const category = searchParams.get('category');
    const email = searchParams.get('email');
    const coupon = searchParams.get('coupon') || '';

    // Get pricing
    const { getBasePriceInPaise } = await import('@/lib/pricing.js');
    const { validateAndPriceWithCoupon } = await import('@/lib/coupon.js');
    
    const basePricePaise = getBasePriceInPaise(category);
    const { finalPricePaise } = await validateAndPriceWithCoupon({
      category,
      basePricePaise,
      couponCode: coupon,
    });

    // Razorpay credentials
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const baseUrl = process.env.RAZORPAY_BASE_URL || 'https://api.razorpay.com/v1';

    // Build success URL
    const successBase = process.env.RAZORPAY_SUCCESS_REDIRECT_URL || `https://worldskillchallenge.com/registration-success`;
    const successUrl = new URL(successBase);
    successUrl.searchParams.set('clerkUserId', clerkUserId);
    successUrl.searchParams.set('category', category);

    const payload = {
      amount: finalPricePaise,
      currency: 'INR',
      accept_partial: false,
      description: `Registration for ${category}`,
      customer: {
        name: email,
        email,
      },
      notify: { sms: false, email: true },
      reminder_enable: true,
      notes: {
        clerkUserId,
        category,
        email,
        coupon,
        app: 'wsc',
      },
      callback_url: successUrl.toString(),
      callback_method: 'get',
    };

    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    // Test Razorpay API call
    const resp = await fetch(`${baseUrl}/payment_links`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await resp.text();
    
    return NextResponse.json({
      success: resp.ok,
      status: resp.status,
      statusText: resp.statusText,
      response: responseText,
      requestPayload: payload,
      authHeader: authHeader.substring(0, 20) + '...', // Hide full auth header
      keyId: keyId ? keyId.substring(0, 10) + '...' : 'Missing',
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Razorpay API test failed',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
