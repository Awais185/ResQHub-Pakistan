'use client';
import { useEffect, useState } from 'react';
import { Utensils, Droplet, Home, Cross, TrendingUp, HeartHandshake } from 'lucide-react';
import DashboardShell from '@/components/DashboardShell';

const ICONS: Record<string, typeof Home> = { Food: Utensils, 'Clean Water': Droplet, Shelter: Home, 'Medical Aid': Cross, Rescue: HeartHandshake };
const COLORS: Record<string, string> = { Food: '#1769AA', 'Clean Water': '#13A89E', Shelter: '#F59E0B', 'Medical Aid': '#8B5CF6', Rescue: '#DC2626' };

type Need = { category: string; count: number };

export default function NeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [priorities, setPriorities] = useState<{ locality: string; count: number }[]>([]);

  useEffect(() => {
    fetch('/api/needs').then(r => r.json()).then(d => { setNeeds(d.needs || []); setPriorities(d.priorities || []); });
  }, []);

  const maxCount = Math.max(1, ...priorities.map(p => p.count));

  return (
    <DashboardShell title="Needs Dashboard" subtitle="DEMO DATA — aggregated from verified reports">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {needs.map(n => {
              const Icon = ICONS[n.category] || Home;
              const color = COLORS[n.category] || '#1769AA';
              return (
                <div key={n.category} className="card p-5 text-center">
                  <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3" style={{ backgroundColor: color + '15', color }}><Icon size={24} /></div>
                  <div className="font-display font-bold text-navy">{n.category}</div>
                  <div className="text-sm text-muted mt-1">{n.count} reports</div>
                </div>
              );
            })}
            {needs.length === 0 && <div className="col-span-4 card p-8 text-center text-muted">No verified needs yet.</div>}
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4"><TrendingUp size={18} className="text-primary" /><h3 className="font-display font-bold text-navy">Top Priority Areas</h3></div>
            <div className="space-y-4">
              {priorities.map(p => (
                <div key={p.locality}>
                  <div className="flex items-center justify-between text-sm mb-1"><span className="font-semibold text-ink">{p.locality}</span><span className="text-muted font-semibold">{p.count} reports</span></div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: ((p.count / maxCount) * 100) + '%' }}></div></div>
                </div>
              ))}
              {priorities.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
            </div>
          </div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-navy to-primary text-white h-fit">
          <HeartHandshake size={40} className="text-teal" />
          <h3 className="font-display font-extrabold text-2xl mt-4">How You Can Help?</h3>
          <p className="mt-2 text-white/80 text-sm leading-relaxed">Join relief efforts as a volunteer, NGO, or donor.</p>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal"></span> Donate</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal"></span> Volunteer</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal"></span> Share</div>
          </div>
          <a href="/ngo" className="mt-6 block text-center bg-white text-navy font-semibold py-2.5 rounded-xl hover:bg-slate-100 transition">Support Now</a>
        </div>
      </div>
    </DashboardShell>
  );
}
