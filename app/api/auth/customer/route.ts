import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Table from '@/models/Table';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { tableName, loginCode } = await request.json();

    if (!tableName || !loginCode) {
      return Response.json(
        { error: 'Table name and login code are required' },
        { status: 400 }
      );
    }

    const table = await Table.findOne({
      tableName,
      loginCode,
      approved: true,
      active: true,
    });

    if (!table) {
      return Response.json(
        { error: 'Invalid table name or login code' },
        { status: 401 }
      );
    }

    return Response.json({
      message: 'Login successful!',
      customerName: table.customerName,
      tableName: table.tableName,
    });
  } catch (error) {
    console.error('Customer login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
