import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get('clerkUserId');
    const category = searchParams.get('category');

    if (!clerkUserId || !category) {
      return NextResponse.json({ 
        error: 'Missing clerkUserId or category parameter' 
      }, { status: 400 });
    }

    await dbConnect();

    // Check all registrations for this user
    const allRegistrations = await CategoryRegistration.find({
      clerkUserId
    }).select('category paymentStatus registeredAt');

    // Check specific category
    const specificRegistration = await CategoryRegistration.findOne({
      clerkUserId,
      category,
      paymentStatus: 'success'
    });

    return NextResponse.json({
      success: true,
      clerkUserId,
      category,
      allRegistrations: allRegistrations.map(reg => ({
        category: reg.category,
        paymentStatus: reg.paymentStatus,
        registeredAt: reg.registeredAt
      })),
      specificRegistration: specificRegistration ? {
        category: specificRegistration.category,
        paymentStatus: specificRegistration.paymentStatus,
        registeredAt: specificRegistration.registeredAt
      } : null,
      message: specificRegistration ? 'Found successful registration' : 'No successful registration found'
    });

  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
