import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const reports = await prisma.communityReport.findMany({ where: { status: 'VERIFIED' } });
  const needsMap: Record<string, number> = {};
  const prioritiesMap: Record<string, number> = {};
  for (const r of reports) {
    prioritiesMap[r.locality] = (prioritiesMap[r.locality] || 0) + 1;
    const cats = (r.needs || '').split(',').map(s => s.trim()).filter(Boolean);
    for (const c of cats) needsMap[c] = (needsMap[c] || 0) + 1;
  }
  const needs = Object.entries(needsMap).map(([category, count]) => ({ category, count }));
  const priorities = Object.entries(prioritiesMap).map(([locality, count]) => ({ locality, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  return NextResponse.json({ needs, priorities });
}
