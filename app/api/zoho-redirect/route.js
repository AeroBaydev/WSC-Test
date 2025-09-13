import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';
import { getBasePriceInPaise } from '@/lib/pricing.js';
import { validateAndPriceWithCoupon } from '@/lib/coupon.js';

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

    await dbConnect();

    // Fast path: if already paid for this category, short-circuit
    const existingPaid = await CategoryRegistration.findOne({
      clerkUserId,
      category,
      paymentStatus: { $in: ['success', 'completed', 'paid'] },
    });
    if (existingPaid) {
      // Redirect to an "already registered" page
      const alreadyUrl = process.env.ALREADY_REGISTERED_URL || 'https://worldskillchallenge.com/registration-success?status=already';
      return NextResponse.redirect(alreadyUrl);
    }

    // Create or reuse a pending registration
    let registration = await CategoryRegistration.findOne({ clerkUserId, category });
    
    // If there's an old pending registration that's not actually paid, clean it up
    if (registration && registration.paymentStatus === 'pending' && !registration.paymentLinkId) {
      await CategoryRegistration.deleteOne({ _id: registration._id });
      registration = null;
    }

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

    // If a pending payment link exists and amount matches, reuse it
    if (
      registration &&
      registration.paymentStatus !== 'success' &&
      registration.paymentLinkId &&
      registration.paymentAmount &&
      Number(registration.paymentAmount) === finalPricePaise
    ) {
      const url = registration.transactionId; // we will store short_url in transactionId for convenience
      if (url) {
        return NextResponse.redirect(url);
      }
    }

    // Create/update registration document to pending
    if (!registration) {
      registration = await CategoryRegistration.create({
        clerkUserId,
        email,
        category,
        paymentStatus: 'pending',
        paymentAmount: String(finalPricePaise),
        zohoFormData: { coupon },
      });
    } else {
      registration.email = email;
      registration.paymentStatus = 'pending';
      registration.paymentAmount = String(finalPricePaise);
      registration.zohoFormData = { ...(registration.zohoFormData || {}), coupon };
      await registration.save();
    }

    // Create Razorpay Payment Link via REST API
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const baseUrl = (process.env.RAZORPAY_BASE_URL || 'https://api.razorpay.com/v1').replace(/\/payment_links$/, '');

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay credentials not configured' }, { status: 500 });
    }

    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    // Build success URL with context so UI page can confirm and show success
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

    const resp = await fetch(`${baseUrl}/payment_links`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // Add timeout for Vercel free tier
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Razorpay payment link error:', errText);
      return NextResponse.json({ error: 'Failed to create payment link' }, { status: 502 });
    }

    const data = await resp.json();
    // Store identifiers
    registration.paymentLinkId = data.id; // e.g., plink_...
    registration.transactionId = data.short_url; // store short_url for redirect convenience
    await registration.save();

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


