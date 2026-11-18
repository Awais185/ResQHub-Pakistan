'use client';
import { useEffect, useState } from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type Report = { id: string; incidentType: string; locality: string; source: string; status: string; updatedAt: string; verifiedBy?: string };

export default function VerifiedHub() {
  const [reports, setReports] = useState<Report[]>([]);
  const [q, setQ] = useState('');
  useEffect(() => { fetch('/api/reports').then(r => r.json()).then(d => setReports(d.reports || [])); }, []);

  const filtered = reports.filter(r => !q || r.incidentType.toLowerCase().includes(q.toLowerCase()) || r.locality.toLowerCase().includes(q.toLowerCase()));

  return (
    <DashboardShell title="Verified Data Hub" subtitle="Accurate & verified information from multiple sources">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-slate-200 w-full sm:w-80">
            <Search size={16} className="text-muted" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search reports..." className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="badge bg-slate-100 text-ink">All</span>
            <span className="badge bg-primary/10 text-primary">Verified</span>
            <span className="badge bg-amber-100 text-amber-700">Pending</span>
          </div>
        </div>
        <div className="card overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-bg text-xs font-bold uppercase tracking-wider text-muted border-b border-slate-200">
            <div className="col-span-5">Report</div><div className="col-span-2">Locality</div><div className="col-span-2">Source</div><div className="col-span-2">Status</div><div className="col-span-1 text-right">Updated</div>
          </div>
          {filtered.map(r => (
            <div key={r.id} className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-bg/60 items-center">
              <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><ShieldCheck size={18} /></div>
                <div className="min-w-0"><div className="font-semibold text-ink truncate">{r.incidentType}</div><div className="text-xs text-muted">#{r.id.slice(-8)}</div></div>
              </div>
              <div className="col-span-6 md:col-span-2 text-sm text-muted">{r.locality}</div>
              <div className="col-span-6 md:col-span-2 text-sm text-muted">{r.source}</div>
              <div className="col-span-6 md:col-span-2"><span className={'badge ' + (r.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : r.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{r.status}</span></div>
              <div className="col-span-6 md:col-span-1 text-right text-xs text-muted">{fmtDate(r.updatedAt)}</div>
            </div>
          ))}
          {filtered.length === 0 && <div className="p-10 text-center text-sm text-muted">No reports match your search.</div>}
        </div>
      </div>
    </DashboardShell>
  );
}
