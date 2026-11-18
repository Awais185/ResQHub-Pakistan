import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const alerts = await prisma.alert.findMany({ where: { status: 'ACTIVE' } });
  const localities = await prisma.locality.findMany();
  const localityMap: Record<string, { lat: number | null; lng: number | null }> = {};
  for (const l of localities) localityMap[l.name] = { lat: l.lat, lng: l.lng };
  const markers = alerts.map(a => {
    const loc = localityMap[a.locality];
    return { id: a.id, lat: loc?.lat ?? 31.5204, lng: loc?.lng ?? 74.3587, title: a.title, severity: a.severity, affected: a.locality };
  });
  return NextResponse.json({ markers });
}
