'use client';
import { useEffect, useState } from 'react';
import { Users, Heart, Plus } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type Org = { id: string; name: string; focus: string; verified: boolean; areas: string };
type Aid = { id: string; organization: string; locality: string; category: string; quantity: string; status: string; committedAt: string };

export default function NGOPage() {
  const [ngos, setNgos] = useState<Org[]>([]);
  const [aids, setAids] = useState<Aid[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ organization: 'Pakistan Red Crescent', locality: 'Rana Town', category: 'Food', quantity: '', notes: '' });

  const load = () => {
    fetch('/api/ngos').then(r => r.json()).then(d => setNgos(d.orgs || []));
    fetch('/api/aid').then(r => r.json()).then(d => setAids(d.commitments || []));
  };
  useEffect(load, []);

  const submitCommitment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/aid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowForm(false); setForm({ ...form, quantity: '', notes: '' }); load(); }
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch('/api/aid/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (res.ok) load();
  };

  const badge = (s: string) => ({ COMMITTED: 'bg-blue-100 text-blue-700', DISPATCHED: 'bg-amber-100 text-amber-700', DELIVERED: 'bg-emerald-100 text-emerald-700' }[s] || 'bg-slate-100 text-ink');

  return (
    <DashboardShell title="NGO / Relief Coordination" subtitle="DEMO DATA — Lahore District" action={<button onClick={() => setShowForm(s => !s)} className="btn-primary text-sm"><Plus size={14} /> Commit Aid</button>}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {showForm && (
            <form onSubmit={submitCommitment} className="card p-5 space-y-3">
              <h3 className="font-display font-bold text-navy">New Aid Commitment</h3>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-ink mb-1">Organization</label><select value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className="input">{ngos.map(n => <option key={n.id}>{n.name}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-ink mb-1">Locality</label><select value={form.locality} onChange={e => setForm({ ...form, locality: e.target.value })} className="input"><option>Rana Town</option><option>Parkview</option><option>Manga Mandi</option><option>Shahdara</option><option>Ravi Bridge Area</option></select></div>
                <div><label className="block text-xs font-semibold text-ink mb-1">Category</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input"><option>Food</option><option>Clean Water</option><option>Shelter</option><option>Medical Aid</option></select></div>
                <div><label className="block text-xs font-semibold text-ink mb-1">Quantity</label><input required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="input" placeholder="e.g. 500 meals" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-ink mb-1">Notes</label><input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="input" placeholder="Optional" /></div>
              <div className="flex gap-2 justify-end"><button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button><button type="submit" className="btn-primary text-sm">Save Commitment</button></div>
            </form>
          )}
          <div className="card p-5">
            <h3 className="font-display font-bold text-navy mb-4">Registered Organizations</h3>
            <div className="space-y-3">
              {ngos.map(n => (
                <div key={n.id} className="p-4 rounded-xl bg-bg border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-bright text-white font-bold flex items-center justify-center shrink-0">{n.name.slice(0, 2).toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-navy truncate">{n.name}</div>
                    <div className="text-sm text-muted">Focus: {n.focus}</div>
                  </div>
                  <span className={'badge shrink-0 ' + (n.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>{n.verified ? 'Verified' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-display font-bold text-navy mb-4">Aid Commitments</h3>
            <div className="space-y-3">
              {aids.map(a => (
                <div key={a.id} className="p-4 rounded-xl bg-bg border border-slate-100">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <span className="font-semibold text-ink">{a.organization}</span>
                    <span className={'badge ' + badge(a.status)}>{a.status}</span>
                  </div>
                  <div className="text-sm text-muted">{a.quantity} {a.category} → {a.locality}</div>
                  <div className="text-xs text-muted mt-1">Committed {fmtDate(a.committedAt)}</div>
                  <div className="mt-2 flex gap-2">
                    {a.status === 'COMMITTED' && <button onClick={() => updateStatus(a.id, 'DISPATCHED')} className="text-xs font-semibold text-primary hover:underline">Mark Dispatched →</button>}
                    {a.status === 'DISPATCHED' && <button onClick={() => updateStatus(a.id, 'DELIVERED')} className="text-xs font-semibold text-relief hover:underline">Mark Delivered →</button>}
                  </div>
                </div>
              ))}
              {aids.length === 0 && <p className="text-sm text-muted">No commitments yet.</p>}
            </div>
          </div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-navy to-primary text-white h-fit">
          <Users size={36} className="text-teal" />
          <h3 className="font-display font-extrabold text-xl mt-4">Join Relief Efforts</h3>
          <p className="mt-2 text-white/80 text-sm leading-relaxed">Be a part of the relief mission.</p>
          <button onClick={() => setShowForm(true)} className="mt-6 w-full bg-white text-navy font-semibold py-2.5 rounded-xl hover:bg-slate-100 transition inline-flex items-center justify-center gap-2"><Heart size={16} /> Commit Aid Now</button>
        </div>
      </div>
    </DashboardShell>
  );
}
