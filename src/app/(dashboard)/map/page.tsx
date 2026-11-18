'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import DashboardShell from '@/components/DashboardShell';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

type Marker = { id: string; lat: number; lng: number; title: string; severity: string };

export default function MapPage() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [filter, setFilter] = useState('All');
  useEffect(() => { fetch('/api/map').then(r => r.json()).then(d => setMarkers(d.markers || [])); }, []);

  const filtered = filter === 'All' ? markers : markers.filter(m => m.severity === filter.toUpperCase());

  return (
    <DashboardShell title="Disaster Map" subtitle="DEMO DATA — Lahore District pilot">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'High', 'Medium', 'Low'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={'px-4 py-1.5 rounded-full text-sm font-semibold transition ' + (filter === f ? 'bg-primary text-white' : 'bg-white text-ink border border-slate-200 hover:border-primary')}>{f}</button>
          ))}
        </div>
        <div className="card p-2 overflow-hidden">
          <div className="h-[600px] rounded-xl overflow-hidden">
            {filtered.length > 0 ? <MapView markers={filtered} /> : <div className="h-full bg-slate-100 rounded-xl animate-pulse" />}
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted flex-wrap">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> High Risk</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium Risk</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Low Risk</span>
          <span className="ml-auto text-xs">DEMO DATA</span>
        </div>
      </div>
    </DashboardShell>
  );
}
