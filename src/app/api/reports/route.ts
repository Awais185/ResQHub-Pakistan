import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serialize } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const mine = url.searchParams.get('mine') === '1';
  const status = url.searchParams.get('status');
  const where: Record<string, unknown> = {};
  if (mine) where.userId = s.userId;
  if (status) where.status = status;
  else if (s.role !== 'ADMIN') where.status = 'VERIFIED';
  const reports = await prisma.communityReport.findMany({ where, orderBy: { createdAt: 'desc' }, take: 100 });
  return NextResponse.json({ reports: serialize(reports) });
}

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const report = await prisma.communityReport.create({ data: { ...body, userId: s.userId, source: s.role === 'VOLUNTEER' ? 'VOLUNTEER' : 'CITIZEN' } });
  return NextResponse.json({ report: serialize(report) });
}
