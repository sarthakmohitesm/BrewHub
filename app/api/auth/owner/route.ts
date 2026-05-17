import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'brewhub-secret';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const ownerEmail = process.env.OWNER_EMAIL || 'owner@brewhub.com';
    const ownerPassword = process.env.OWNER_PASSWORD || 'brewhub2024';

    if (email !== ownerEmail || password !== ownerPassword) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ role: 'owner', email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return Response.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Owner login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
