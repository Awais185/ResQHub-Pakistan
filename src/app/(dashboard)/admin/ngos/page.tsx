'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';

type Org = { id: string; name: string; focus: string; verified: boolean; areas: string };

export default function AdminNGOs() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const load = () => fetch('/api/ngos').then(r => r.json()).then(d => setOrgs(d.orgs || []));
  useEffect(() => { load(); }, []);

  const toggle = async (id: string, verified: boolean) => {
    const res = await fetch('/api/ngos/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ verified }) });
    if (res.ok) load();
  };

  return (
    <DashboardShell title="NGO Verification" subtitle="Verify registered organizations">
      <div className="space-y-3">
        {orgs.map(o => (
          <div key={o.id} className="card p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-bright text-white font-bold flex items-center justify-center shrink-0">{o.name.slice(0, 2).toUpperCase()}</div>
              <div className="min-w-0">
                <div className="font-display font-bold text-navy truncate">{o.name}</div>
                <div className="text-sm text-muted">Focus: {o.focus}</div>
                <div className="text-xs text-muted">Areas: {o.areas}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={'badge ' + (o.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>{o.verified ? 'Verified' : 'Pending'}</span>
              <button onClick={() => toggle(o.id, !o.verified)} className="btn-secondary text-xs">{o.verified ? 'Unverify' : 'Verify'}</button>
            </div>
          </div>
        ))}
        {orgs.length === 0 && <div className="card p-10 text-center text-muted">No organizations.</div>}
      </div>
    </DashboardShell>
  );
}
