'use client';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type Alert = { id: string; title: string; description: string; disasterType: string; severity: string; locality: string; source: string; status: string; publishedAt: string };

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', disasterType: 'Flood', severity: 'HIGH', locality: 'Rana Town', source: 'DEMO — Admin' });

  const load = () => fetch('/api/alerts').then(r => r.json()).then(d => setAlerts(d.alerts || []));
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowForm(false); setForm({ ...form, title: '', description: '' }); load(); }
  };

  const archive = async (id: string) => {
    const res = await fetch('/api/alerts/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'ARCHIVED' }) });
    if (res.ok) load();
  };

  return (
    <DashboardShell title="Alert Management" subtitle="DEMO DATA — Create and manage emergency alerts" action={<button onClick={() => setShowForm(s => !s)} className="btn-primary text-sm"><Plus size={14} /> New Alert</button>}>
      <div className="space-y-6">
        {showForm && (
          <form onSubmit={submit} className="card p-6 space-y-3">
            <h3 className="font-display font-bold text-navy">Create Alert</h3>
            <div><label className="block text-xs font-semibold text-ink mb-1">Title</label><input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" /></div>
            <div><label className="block text-xs font-semibold text-ink mb-1">Description</label><textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input" /></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div><label className="block text-xs font-semibold text-ink mb-1">Type</label><select value={form.disasterType} onChange={e => setForm({ ...form, disasterType: e.target.value })} className="input"><option>Flood</option><option>Heavy Rainfall</option><option>Fire</option><option>Landslide</option></select></div>
              <div><label className="block text-xs font-semibold text-ink mb-1">Severity</label><select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} className="input"><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></div>
              <div><label className="block text-xs font-semibold text-ink mb-1">Locality</label><select value={form.locality} onChange={e => setForm({ ...form, locality: e.target.value })} className="input"><option>Rana Town</option><option>Parkview</option><option>Manga Mandi</option><option>Shahdara</option><option>Ravi Bridge Area</option></select></div>
              <div><label className="block text-xs font-semibold text-ink mb-1">Source</label><input value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} className="input" /></div>
            </div>
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button><button type="submit" className="btn-primary text-sm">Publish Alert</button></div>
          </form>
        )}
        <div className="card overflow-hidden">
          {alerts.map(a => (
            <div key={a.id} className="p-4 border-b border-slate-100 last:border-0 flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-navy">{a.title}</h3>
                  <span className={'badge ' + (a.severity === 'HIGH' ? 'bg-red-100 text-red-700' : a.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-ink')}>{a.severity}</span>
                  <span className={'badge ' + (a.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-muted')}>{a.status}</span>
                </div>
                <p className="text-sm text-muted mt-1 line-clamp-2">{a.description}</p>
                <p className="text-xs text-muted mt-1">{a.locality} · {fmtDate(a.publishedAt)} · {a.source}</p>
              </div>
              {a.status === 'ACTIVE' && <button onClick={() => archive(a.id)} className="btn-secondary text-xs shrink-0">Archive</button>}
            </div>
          ))}
          {alerts.length === 0 && <div className="p-10 text-center text-muted">No alerts yet.</div>}
        </div>
      </div>
    </DashboardShell>
  );
}
