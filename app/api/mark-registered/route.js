import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect.js';
import User from '@/lib/userModel.js';

export async function POST(request) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { clerkUserId, category } = await request.json();

    // Verify the user is requesting for themselves
    if (clerkUserId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    // Connect to MongoDB
    await dbConnect();

    // Find user
    const user = await User.findOne({ userId: clerkUserId });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user is already registered in this category with successful payment
    const existingCategory = user.categories.find(
      (cat) => cat.category === category && cat.paymentStatus === 'success'
    );

    if (existingCategory) {
      return NextResponse.json({ 
        success: false, 
        message: 'Already registered in this category' 
      });
    }

    // This API should only be called after successful payment
    // Add category to user's categories with success status
    user.categories.push({
      category,
      paymentStatus: 'success',
      registeredAt: new Date()
    });

    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully registered in category' 
    });

  } catch (error) {
    console.error('Mark registered error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to MongoDB
    await dbConnect();

    // Find user and return their categories
    const user = await User.findOne({ userId });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      categories: user.categories || [] 
    });

  } catch (error) {
    console.error('Get user categories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
