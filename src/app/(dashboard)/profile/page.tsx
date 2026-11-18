'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';

type User = { id: string; name: string; email: string; role: string; locality?: string; organization?: string };

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => { fetch('/api/auth/me').then(r => r.json()).then(d => setUser(d.user)); }, []);
  if (!user) return <DashboardShell title="Profile"><div className="card p-10 text-center text-muted">Loading...</div></DashboardShell>;

  return (
    <DashboardShell title="My Profile" subtitle="Account information">
      <div className="max-w-xl card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-white font-bold flex items-center justify-center text-2xl">{user.name.charAt(0).toUpperCase()}</div>
          <div><h2 className="font-display font-extrabold text-xl text-navy">{user.name}</h2><p className="text-sm text-muted">{user.email}</p></div>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-muted">Role</span><span className="font-semibold text-ink">{user.role}</span></div>
          {user.locality && <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-muted">Locality</span><span className="font-semibold text-ink">{user.locality}</span></div>}
          {user.organization && <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-muted">Organization</span><span className="font-semibold text-ink">{user.organization}</span></div>}
          <div className="flex justify-between py-2"><span className="text-muted">User ID</span><span className="font-mono text-xs text-muted">{user.id}</span></div>
        </div>
      </div>
    </DashboardShell>
  );
}
