'use client';
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type Alert = { id: string; title: string; description: string; severity: string; locality: string; source: string; disasterType: string; publishedAt: string; status: string };

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => { fetch('/api/alerts').then(r => r.json()).then(d => setAlerts(d.alerts || [])); }, []);

  return (
    <DashboardShell title="Emergency Alerts" subtitle="DEMO DATA — Lahore District">
      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4 min-w-0">
                <div className={'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ' + (a.severity === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600')}><Bell size={20} /></div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-navy">{a.title}</h3>
                  <p className="text-sm text-muted mt-1">{a.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted flex-wrap">
                    <span>{a.locality}</span><span>·</span><span>{a.disasterType}</span><span>·</span><span>{fmtDate(a.publishedAt)}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">Source: {a.source}</p>
                </div>
              </div>
              <span className={'badge ' + (a.severity === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>{a.severity}</span>
            </div>
          </div>
        ))}
        {alerts.length === 0 && <div className="card p-10 text-center text-muted">No active alerts.</div>}
      </div>
    </DashboardShell>
  );
}
