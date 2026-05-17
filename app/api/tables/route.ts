import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Table from '@/models/Table';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { customerName, tableName } = await request.json();

    if (!customerName || !tableName) {
      return Response.json(
        { error: 'Customer name and table name are required' },
        { status: 400 }
      );
    }

    const existingTable = await Table.findOne({ tableName, active: true });
    if (existingTable) {
      return Response.json(
        { error: 'This table is already registered' },
        { status: 400 }
      );
    }

    const table = await Table.create({ customerName, tableName });

    return Response.json(
      { message: 'Table registration request sent!', table },
      { status: 201 }
    );
  } catch (error) {
    console.error('Table registration error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const tables = await Table.find().sort({ createdAt: -1 });
    return Response.json({ tables });
  } catch (error) {
    console.error('Get tables error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
