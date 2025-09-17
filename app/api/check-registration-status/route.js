import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

export async function GET(request) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Connect to MongoDB
    await dbConnect();

    if (category) {
      // Check specific category
      const registration = await CategoryRegistration.findOne({
        clerkUserId: userId,
        category: category,
        paymentStatus: 'success'
      });

      return NextResponse.json({
        success: true,
        isRegistered: !!registration,
        category: category,
        registration: registration ? {
          id: registration._id,
          category: registration.category,
          paymentStatus: registration.paymentStatus,
          registeredAt: registration.registeredAt
        } : null
      });
    } else {
      // Get all successful registrations
      const registrations = await CategoryRegistration.find({
        clerkUserId: userId,
        paymentStatus: 'success'
      }).select('category paymentStatus registeredAt');

      return NextResponse.json({
        success: true,
        registrations: registrations.map(reg => ({
          id: reg._id,
          category: reg.category,
          paymentStatus: reg.paymentStatus,
          registeredAt: reg.registeredAt
        }))
      });
    }

  } catch (error) {
    console.error('Check registration status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
