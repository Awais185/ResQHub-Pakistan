import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serialize } from '@/lib/utils';

export async function GET() {
  const orgs = await prisma.organization.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json({ orgs: serialize(orgs) });
}
