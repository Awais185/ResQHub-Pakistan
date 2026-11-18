import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serialize } from '@/lib/utils';

export async function GET() {
  const s = await getSession();
  if (!s || s.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const [users, alerts, reports, verifiedReports, orgs, commitments, recentReports] = await Promise.all([
    prisma.user.count(), prisma.alert.count(), prisma.communityReport.count(),
    prisma.communityReport.count({ where: { status: 'VERIFIED' } }), prisma.organization.count(),
    prisma.aidCommitment.count(),
    prisma.communityReport.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  ]);
  return NextResponse.json(serialize({ users, alerts, reports, verifiedReports, orgs, commitments, recentReports }));
}
