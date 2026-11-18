'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type Report = { id: string; locality: string; incidentType: string; description: string; affectedPeople: number; needs: string; status: string; createdAt: string };

export default function MyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/reports?mine=1').then(r => r.json()).then(d => setReports(d.reports || [])).finally(() => setLoading(false)); }, []);

  const badge = (s: string) => {
    const map: Record<string, string> = { VERIFIED: 'bg-emerald-100 text-emerald-700', PENDING: 'bg-amber-100 text-amber-700', REJECTED: 'bg-red-100 text-red-700', UNDER_REVIEW: 'bg-blue-100 text-blue-700' };
    return map[s] || 'bg-slate-100 text-ink';
  };

  return (
    <DashboardShell title="My Reports" subtitle="DEMO DATA — your submitted reports">
      <div className="card overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-bg text-xs font-bold uppercase tracking-wider text-muted border-b border-slate-200">
          <div className="col-span-4">Report</div><div className="col-span-2">Locality</div><div className="col-span-2">Affected</div><div className="col-span-2">Status</div><div className="col-span-2 text-right">Submitted</div>
        </div>
        {reports.map(r => (
          <div key={r.id} className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-slate-100 last:border-0 items-center">
            <div className="col-span-12 md:col-span-4">
              <div className="font-semibold text-ink">{r.incidentType}</div>
              <div className="text-xs text-muted line-clamp-1">{r.description}</div>
            </div>
            <div className="col-span-6 md:col-span-2 text-sm text-muted">{r.locality}</div>
            <div className="col-span-6 md:col-span-2 text-sm text-muted">{r.affectedPeople} people</div>
            <div className="col-span-6 md:col-span-2"><span className={'badge ' + badge(r.status)}>{r.status}</span></div>
            <div className="col-span-6 md:col-span-2 text-right text-xs text-muted">{fmtDate(r.createdAt)}</div>
          </div>
        ))}
        {reports.length === 0 && !loading && <div className="p-10 text-center text-muted">No reports yet. <a href="/report" className="text-primary font-semibold">Submit one →</a></div>}
      </div>
    </DashboardShell>
  );
}
