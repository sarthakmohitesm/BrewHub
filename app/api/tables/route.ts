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

/** DELETE — Owner removes a customer from a table, freeing it */
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { tableId } = await request.json();

    if (!tableId) {
      return Response.json({ error: 'Table ID is required' }, { status: 400 });
    }

    const table = await Table.findById(tableId);
    if (!table) {
      return Response.json({ error: 'Table not found' }, { status: 404 });
    }

    // Deactivate the table
    table.active = false;
    table.approved = false;
    await table.save();

    // Also deactivate the corresponding session (same customer + table combo)
    const Session = (await import('@/models/Session')).default;
    await Session.updateMany(
      { customerName: table.customerName, tableName: table.tableName, active: true },
      { active: false }
    );

    return Response.json({ message: 'Customer removed, table is now free' });
  } catch (error) {
    console.error('Remove table error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
