import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const data: Record<string, unknown> = { status: body.status };
  if (body.status === 'DISPATCHED') data.dispatchedAt = new Date();
  if (body.status === 'DELIVERED') data.deliveredAt = new Date();
  const commitment = await prisma.aidCommitment.update({ where: { id: params.id }, data });
  return NextResponse.json({ commitment });
}
