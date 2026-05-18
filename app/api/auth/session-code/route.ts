import { NextRequest } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Session from '@/models/Session';

const SECRET = process.env.SESSION_CODE_SECRET || 'brewhub-karjat-2024';
const CODE_DURATION_MS = 60_000; // 1 minute

function generateCode(): { code: string; expiresAt: number } {
  const now = Date.now();
  const window = Math.floor(now / CODE_DURATION_MS);
  const hash = crypto.createHmac('sha256', SECRET).update(String(window)).digest('hex');
  const num = parseInt(hash.substring(0, 8), 16) % 1000000;
  const code = String(num).padStart(6, '0');
  const expiresAt = (window + 1) * CODE_DURATION_MS;
  return { code, expiresAt };
}

function isValidCode(inputCode: string): boolean {
  const now = Date.now();
  const currentWindow = Math.floor(now / CODE_DURATION_MS);
  for (const w of [currentWindow, currentWindow - 1]) {
    const hash = crypto.createHmac('sha256', SECRET).update(String(w)).digest('hex');
    const num = parseInt(hash.substring(0, 8), 16) % 1000000;
    if (String(num).padStart(6, '0') === inputCode) return true;
  }
  return false;
}

/** GET — Owner fetches the current code + active sessions */
export async function GET() {
  const { code, expiresAt } = generateCode();
  const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

  try {
    await connectDB();
    // Sessions from the last 12 hours
    const cutoff = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const sessions = await Session.find({ active: true, loggedInAt: { $gte: cutoff } })
      .sort({ loggedInAt: -1 })
      .lean();
    return Response.json({ code, expiresAt, remainingSeconds: remaining, sessions });
  } catch {
    return Response.json({ code, expiresAt, remainingSeconds: remaining, sessions: [] });
  }
}

/** POST — Customer validates a code and creates a session */
export async function POST(request: NextRequest) {
  try {
    const { code, customerName, tableName } = await request.json();
    if (!code || !customerName) {
      return Response.json({ error: 'Code and customer name are required' }, { status: 400 });
    }
    if (!isValidCode(code)) {
      return Response.json({ error: 'Invalid or expired code. Ask the café for the current code.' }, { status: 401 });
    }

    await connectDB();
    await Session.create({
      customerName,
      tableName: tableName || 'Walk-in',
      loginCode: code,
      loggedInAt: new Date(),
      active: true,
    });

    return Response.json({ message: 'Login successful!', customerName, tableName: tableName || 'Walk-in' });
  } catch (error) {
    console.error('Session code validation error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/** DELETE — Owner removes a session */
export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    await connectDB();
    await Session.findByIdAndUpdate(sessionId, { active: false });
    return Response.json({ message: 'Session removed' });
  } catch {
    return Response.json({ error: 'Failed to remove session' }, { status: 500 });
  }
}
