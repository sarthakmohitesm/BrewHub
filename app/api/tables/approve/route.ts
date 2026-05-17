import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Table from '@/models/Table';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { tableId, loginCode, action } = await request.json();

    const table = await Table.findById(tableId);
    if (!table) {
      return Response.json({ error: 'Table not found' }, { status: 404 });
    }

    if (action === 'approve') {
      table.loginCode = loginCode || Math.random().toString(36).substring(2, 8).toUpperCase();
      table.approved = true;
      await table.save();
      return Response.json({
        message: 'Table approved!',
        loginCode: table.loginCode,
        table,
      });
    } else if (action === 'reject') {
      table.active = false;
      table.approved = false;
      await table.save();
      return Response.json({ message: 'Table request rejected', table });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Approve table error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
