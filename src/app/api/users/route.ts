import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/dbConnect';
import User from '@/lib/mongodb/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Simple validation
    if (!body.fingerprint_id || !body.full_name) {
      return NextResponse.json({ error: 'Missing fingerprint_id or full_name' }, { status: 400 });
    }

    const user = await User.create({
      full_name: body.full_name,
      whatsapp: body.whatsapp || '',
      level_establishment: body.level_establishment || '',
      fingerprint_id: body.fingerprint_id,
      plan_type: body.plan_type || 'hourly',
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Fingerprint ID already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ created_at: -1 });
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
