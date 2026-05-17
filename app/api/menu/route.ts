import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const items = await MenuItem.find(query).sort({ popular: -1, title: 1 });
    return Response.json({ items });
  } catch (error) {
    console.error('Get menu error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (Array.isArray(body)) {
      const items = await MenuItem.insertMany(body);
      return Response.json({ message: 'Menu items added!', items }, { status: 201 });
    }

    const item = await MenuItem.create(body);
    return Response.json({ message: 'Menu item added!', item }, { status: 201 });
  } catch (error) {
    console.error('Create menu error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
