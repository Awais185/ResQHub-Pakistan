import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const report = await prisma.communityReport.update({ where: { id: params.id }, data: { ...body, verifiedBy: body.status === 'VERIFIED' ? s.name : undefined } });
  return NextResponse.json({ report });
}
