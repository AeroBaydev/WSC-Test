import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect.js';
import CategoryRegistration from '@/lib/categoryRegistrationModel.js';

// This endpoint cleans up old pending/failed registrations
// Call this periodically to keep the database clean
export async function POST(request) {
  try {
    const { adminSecret } = await request.json();

    // Simple admin check
    if (adminSecret !== process.env.ADMIN_SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Delete registrations older than 7 days with pending/failed status
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await CategoryRegistration.deleteMany({
      paymentStatus: { $in: ['pending', 'failed'] },
      createdAt: { $lt: sevenDaysAgo }
    });

    console.log(`Cleaned up ${result.deletedCount} old pending/failed registrations`);

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${result.deletedCount} old registrations`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
