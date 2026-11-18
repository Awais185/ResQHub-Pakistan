import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serialize } from '@/lib/utils';

export async function GET() {
  const alerts = await prisma.alert.findMany({ where: { status: 'ACTIVE' }, orderBy: { publishedAt: 'desc' } });
  return NextResponse.json({ alerts: serialize(alerts) });
}

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const alert = await prisma.alert.create({ data: { ...body, createdBy: s.userId } });
  return NextResponse.json({ alert: serialize(alert) });
}
