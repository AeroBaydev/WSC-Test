import { NextResponse } from 'next/server';
import { getBasePriceInPaise } from '@/lib/pricing.js';
import { validateAndPriceWithCoupon } from '@/lib/coupon.js';

export const runtime = 'nodejs';
export const preferredRegion = ['bom1'];

// This endpoint is the Redirect URL target from Zoho Form.
// Expecting query params: clerkUserId, category, email, coupon (optional)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId');
    const category = searchParams.get('category');
    const email = searchParams.get('email');
    const coupon = searchParams.get('coupon') || '';

    if (!clerkUserId || !category || !email) {
      return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
    }

    // No DB writes here. Only generate a payment link and redirect.

    let basePricePaise;
    try {
      basePricePaise = getBasePriceInPaise(category);
    } catch (e) {
      return NextResponse.json({
        error: 'Unknown category',
        category,
        hint: 'Map your Zoho category to one of the configured keys (e.g., CAT_01..CAT_14) or update lib/pricing.js to include your label.',
      }, { status: 400 });
    }
    const { finalPricePaise, applied } = await validateAndPriceWithCoupon({
      category,
      basePricePaise,
      couponCode: coupon,
    });

    // Always create a fresh payment link to avoid stale references

    // Do not write any registration records here; webhook will persist only on success

    // Create Razorpay Payment Link via REST API
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    // Force correct baseUrl regardless of environment variable
    const baseUrl = 'https://api.razorpay.com/v1';

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay credentials not configured' }, { status: 500 });
    }

    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    
    // Debug: Log the constructed URL
    console.log('Constructed Razorpay URL:', `${baseUrl}/payment_links`);

    // Build success URL with context so UI page can confirm and show success
    const successUrl = `https://worldskillchallenge.com/registration-success?clerkUserId=${encodeURIComponent(clerkUserId)}&category=${encodeURIComponent(category)}`;

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
      callback_url: successUrl,
      callback_method: 'get',
    };

    // Construct the full URL
    const paymentUrl = `${baseUrl}/payment_links`;
    console.log('Making request to:', paymentUrl);
    
    const resp = await fetch(paymentUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // With Vercel Pro, allow more time to handle upstream latency
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Razorpay payment link error:', errText);
      return NextResponse.json({ error: 'Failed to create payment link' }, { status: 502 });
    }

    const data = await resp.json();
    // Redirect to Razorpay short_url (auto-lands in UPI flow on device)
    return NextResponse.redirect(data.short_url);
  } catch (err) {
    console.error('zoho-redirect error:', err);
    
    // Handle specific error types
    if (err.name === 'AbortError') {
      return NextResponse.json({ 
        error: 'Payment service timeout - please try again',
        hint: 'This may be due to Vercel free tier limitations'
      }, { status: 504 });
    }
    
    if (err.message.includes('fetch')) {
      return NextResponse.json({ 
        error: 'Network error connecting to payment service',
        hint: 'Please check your internet connection and try again'
      }, { status: 502 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err.message 
    }, { status: 500 });
  }
}


