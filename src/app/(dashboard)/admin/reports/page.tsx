'use client';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type Report = { id: string; incidentType: string; locality: string; description: string; affectedPeople: number; needs: string; status: string; source: string; createdAt: string };

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState('PENDING');

  const load = () => fetch('/api/reports?status=' + filter).then(r => r.json()).then(d => setReports(d.reports || []));
  useEffect(() => { load(); }, [filter]);

  const update = async (id: string, status: string) => {
    const res = await fetch('/api/reports/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (res.ok) load();
  };

  return (
    <DashboardShell title="Report Verification" subtitle="DEMO DATA — Review and verify community reports">
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {['PENDING', 'VERIFIED', 'REJECTED'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={'px-4 py-1.5 rounded-full text-sm font-semibold transition ' + (filter === f ? 'bg-primary text-white' : 'bg-white text-ink border border-slate-200 hover:border-primary')}>{f}</button>
          ))}
        </div>
        <div className="space-y-3">
          {reports.map(r => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-navy">{r.incidentType} — {r.locality}</h3>
                    <span className={'badge ' + (r.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : r.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{r.status}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">{r.description}</p>
                  <p className="text-xs text-muted mt-2">{r.affectedPeople} people · Needs: {r.needs || '—'} · {r.source} · {fmtDate(r.createdAt)}</p>
                </div>
                {r.status === 'PENDING' && (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => update(r.id, 'VERIFIED')} className="btn-primary text-xs"><CheckCircle2 size={14} /> Verify</button>
                    <button onClick={() => update(r.id, 'REJECTED')} className="btn-secondary text-xs"><XCircle size={14} /> Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {reports.length === 0 && <div className="card p-10 text-center text-muted">No {filter.toLowerCase()} reports.</div>}
        </div>
      </div>
    </DashboardShell>
  );
}
