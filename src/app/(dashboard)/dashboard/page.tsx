'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

type Alert = { id: string; title: string; description: string; severity: string; locality: string; source: string };
type Marker = { id: string; lat: number; lng: number; title: string; severity: string };

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/alerts').then(r => r.json()),
      fetch('/api/map').then(r => r.json())
    ]).then(([a, m]) => { setAlerts(a.alerts || []); setMarkers(m.markers || []); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell title="Citizen Dashboard" subtitle="DEMO DATA — Lahore District pilot">
      <div className="space-y-6">
        {alerts[0] && (
          <div className="card border-l-4 border-red-500 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0"><AlertTriangle size={20} /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-navy">{alerts[0].title}</h3>
                <span className="badge bg-red-100 text-red-700">{alerts[0].severity}</span>
              </div>
              <p className="text-sm text-muted mt-1">{alerts[0].description}</p>
              <p className="text-xs text-muted mt-1">Source: {alerts[0].source}</p>
            </div>
            <Link href="/alerts" className="btn-danger text-sm shrink-0">View Details</Link>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active Alerts" value={String(alerts.length)} icon="alert" color="#DC2626" />
          <StatCard label="Affected People" value="24K+" icon="users" color="#1769AA" />
          <StatCard label="Relief Delivered" value="850+" icon="package" color="#15966B" />
          <StatCard label="Volunteers" value="150+" icon="heart" color="#8B5CF6" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-navy">Affected Areas</h3>
              <Link href="/map" className="text-xs text-primary font-semibold hover:underline">View Full Map →</Link>
            </div>
            <div className="h-72">{loading ? <div className="h-full bg-slate-100 rounded-xl animate-pulse" /> : <MapView markers={markers} />}</div>
            <div className="flex items-center gap-4 mt-4 text-xs text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High Risk</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Medium Risk</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low Risk</span>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-display font-bold text-navy mb-4">Emergency Alerts</h3>
            <div className="space-y-3">
              {alerts.slice(0, 3).map(a => (
                <div key={a.id} className="p-3 rounded-xl bg-bg border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className={'badge ' + (a.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>{a.severity}</span>
                    <span className="text-xs text-muted">{a.locality}</span>
                  </div>
                  <div className="text-sm font-semibold text-navy">{a.title}</div>
                  <div className="text-xs text-muted mt-1 line-clamp-2">{a.description}</div>
                </div>
              ))}
              {alerts.length === 0 && !loading && <p className="text-sm text-muted">No active alerts.</p>}
            </div>
            <Link href="/alerts" className="mt-4 w-full text-sm font-semibold text-primary hover:underline inline-flex items-center justify-center gap-1">View All Alerts <ArrowRight size={14} /></Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
