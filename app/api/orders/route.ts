import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { tableName, customerName, items, totalPrice } = await request.json();

    if (!tableName || !customerName || !items?.length) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const order = await Order.create({
      tableName,
      customerName,
      items,
      totalPrice,
    });

    return Response.json(
      { message: 'Order placed successfully!', order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = request.nextUrl;
    const tableName = searchParams.get('tableName');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (tableName) query.tableName = tableName;
    if (status) query.status = status;

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return Response.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const { orderId, status } = await request.json();

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    return Response.json({ message: 'Order updated!', order });
  } catch (error) {
    console.error('Update order error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
