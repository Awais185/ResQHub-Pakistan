import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serialize } from '@/lib/utils';

export async function GET() {
  const commitments = await prisma.aidCommitment.findMany({ orderBy: { committedAt: 'desc' } });
  return NextResponse.json({ commitments: serialize(commitments) });
}

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const commitment = await prisma.aidCommitment.create({ data: { ...body, userId: s.userId } });
  return NextResponse.json({ commitment: serialize(commitment) });
}
