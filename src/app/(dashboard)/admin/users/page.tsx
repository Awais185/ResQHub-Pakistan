'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { fmtDate } from '@/lib/utils';

type User = { id: string; name: string; email: string; role: string; locality?: string; createdAt: string };

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { fetch('/api/admin/users').then(r => r.json()).then(d => setUsers(d.users || [])); }, []);

  return (
    <DashboardShell title="User Management" subtitle="All registered users">
      <div className="card overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-bg text-xs font-bold uppercase tracking-wider text-muted border-b border-slate-200">
          <div className="col-span-4">User</div><div className="col-span-3">Email</div><div className="col-span-2">Role</div><div className="col-span-2">Locality</div><div className="col-span-1 text-right">Joined</div>
        </div>
        {users.map(u => (
          <div key={u.id} className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-slate-100 last:border-0 items-center">
            <div className="col-span-12 md:col-span-4 font-semibold text-ink">{u.name}</div>
            <div className="col-span-6 md:col-span-3 text-sm text-muted truncate">{u.email}</div>
            <div className="col-span-6 md:col-span-2"><span className="badge bg-primary/10 text-primary">{u.role}</span></div>
            <div className="col-span-6 md:col-span-2 text-sm text-muted">{u.locality || '—'}</div>
            <div className="col-span-6 md:col-span-1 text-right text-xs text-muted">{fmtDate(u.createdAt)}</div>
          </div>
        ))}
        {users.length === 0 && <div className="p-10 text-center text-muted">No users yet.</div>}
      </div>
    </DashboardShell>
  );
}
