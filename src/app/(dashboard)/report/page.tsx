'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';

const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

export default function ReportPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [pos, setPos] = useState<[number, number]>([31.56, 74.31]);
  const [form, setForm] = useState({ locality: 'Rana Town', incidentType: 'Flood', description: '', affectedPeople: '', affectedHouseholds: '', needs: [] as string[] });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const needsOptions = ['Food', 'Clean Water', 'Shelter', 'Medical Aid', 'Rescue'];

  const toggleNeed = (n: string) => setForm(f => ({ ...f, needs: f.needs.includes(n) ? f.needs.filter(x => x !== n) : [...f.needs, n] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      const res = await fetch('/api/reports', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, affectedPeople: Number(form.affectedPeople) || 0, affectedHouseholds: Number(form.affectedHouseholds) || 0, needs: form.needs.join(','), lat: pos[0], lng: pos[1] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submit failed');
      setSubmitted(true);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Submit failed'); }
  };

  if (submitted) return (
    <DashboardShell title="Report Submitted">
      <div className="card p-10 text-center max-w-lg mx-auto">
        <CheckCircle2 size={56} className="text-relief mx-auto" />
        <h2 className="font-display font-extrabold text-2xl text-navy mt-4">Report Submitted</h2>
        <p className="text-muted mt-2">Your report is now pending verification. An admin will review it shortly.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => router.push('/my-reports')} className="btn-primary">View My Reports</button>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn-secondary">Submit Another</button>
        </div>
      </div>
    </DashboardShell>
  );

  return (
    <DashboardShell title="Report a Disaster" subtitle="Help us verify what's happening on the ground">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          {['Location', 'Details', 'Submit'].map((label, i) => {
            const n = i + 1; const active = step === n; const done = step > n;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ' + (active ? 'bg-primary text-white' : done ? 'bg-relief text-white' : 'bg-slate-200 text-muted')}>{done ? '✓' : n}</div>
                <span className={'text-sm font-semibold ' + (active || done ? 'text-ink' : 'text-muted')}>{label}</span>
                {n < 3 && <div className={'w-10 h-0.5 ' + (done ? 'bg-relief' : 'bg-slate-200')}></div>}
              </div>
            );
          })}
        </div>
        <form onSubmit={submit} className="card p-6 space-y-6">
          {step === 1 && (<>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Select Location</label>
              <MapPicker pos={pos} setPos={setPos} />
              <p className="text-xs text-muted mt-2 flex items-center gap-1"><MapPin size={12} /> Click map to set. Coordinates: {pos[0].toFixed(4)}, {pos[1].toFixed(4)}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Locality</label>
              <select value={form.locality} onChange={e => setForm({ ...form, locality: e.target.value })} className="input">
                <option>Rana Town</option><option>Parkview</option><option>Manga Mandi</option><option>Shahdara</option><option>Ravi Bridge Area</option>
              </select>
            </div>
            <div className="flex justify-end"><button type="button" onClick={() => setStep(2)} className="btn-primary">Continue <ArrowRight size={16} /></button></div>
          </>)}
          {step === 2 && (<>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Incident Type</label>
              <select value={form.incidentType} onChange={e => setForm({ ...form, incidentType: e.target.value })} className="input">
                <option>Flood</option><option>Heavy Rain</option><option>Landslide</option><option>Fire</option><option>Other</option>
              </select>
            </div>
            <div><label className="block text-sm font-semibold text-ink mb-2">Description</label><textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input" placeholder="Describe what you see..." required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold text-ink mb-2">Affected People</label><input type="number" value={form.affectedPeople} onChange={e => setForm({ ...form, affectedPeople: e.target.value })} className="input" placeholder="0" /></div>
              <div><label className="block text-sm font-semibold text-ink mb-2">Households</label><input type="number" value={form.affectedHouseholds} onChange={e => setForm({ ...form, affectedHouseholds: e.target.value })} className="input" placeholder="0" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Needs</label>
              <div className="flex flex-wrap gap-2">
                {needsOptions.map(n => (
                  <button key={n} type="button" onClick={() => toggleNeed(n)} className={'px-3 py-1.5 rounded-lg text-sm font-semibold border transition ' + (form.needs.includes(n) ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-ink hover:border-primary')}>{n}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-between"><button type="button" onClick={() => setStep(1)} className="btn-secondary">← Back</button><button type="button" onClick={() => setStep(3)} className="btn-primary">Continue <ArrowRight size={16} /></button></div>
          </>)}
          {step === 3 && (<>
            <div className="rounded-xl bg-bg p-4 text-sm">
              <div className="font-semibold text-ink mb-2">Review</div>
              <div className="grid grid-cols-2 gap-2 text-muted">
                <div>Locality: <span className="text-ink font-medium">{form.locality}</span></div>
                <div>Type: <span className="text-ink font-medium">{form.incidentType}</span></div>
                <div>People: <span className="text-ink font-medium">{form.affectedPeople || '—'}</span></div>
                <div>Households: <span className="text-ink font-medium">{form.affectedHouseholds || '—'}</span></div>
                <div className="col-span-2">Needs: <span className="text-ink font-medium">{form.needs.join(', ') || '—'}</span></div>
                <div className="col-span-2">Coordinates: <span className="text-ink font-medium">{pos[0].toFixed(4)}, {pos[1].toFixed(4)}</span></div>
              </div>
            </div>
            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
            <div className="flex justify-between"><button type="button" onClick={() => setStep(2)} className="btn-secondary">← Back</button><button type="submit" className="btn-primary">Submit Report <ArrowRight size={16} /></button></div>
          </>)}
        </form>
      </div>
    </DashboardShell>
  );
}
