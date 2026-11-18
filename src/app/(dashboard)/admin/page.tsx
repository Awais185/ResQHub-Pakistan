'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import { fmtDate } from '@/lib/utils';

type Stats = { users: number; alerts: number; reports: number; verifiedReports: number; orgs: number; commitments: number; recentReports: { id: string; incidentType: string; locality: string; createdAt: string }[] };

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => { fetch('/api/admin/stats').then(r => r.json()).then(setStats); }, []);

  const chartData = [
    { month: 'Jan', reports: 32 }, { month: 'Feb', reports: 41 }, { month: 'Mar', reports: 36 },
    { month: 'Apr', reports: 52 }, { month: 'May', reports: 61 }, { month: 'Jun', reports: 78 }
  ];

  return (
    <DashboardShell title="Admin Dashboard" subtitle="Platform overview — DEMO DATA">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={String(stats?.users ?? 0)} icon="users" color="#1769AA" trend="+12%" />
          <StatCard label="Total Alerts" value={String(stats?.alerts ?? 0)} icon="alert" color="#DC2626" trend="+4%" />
          <StatCard label="Reports" value={String(stats?.reports ?? 0)} icon="check" color="#15966B" />
          <StatCard label="Organizations" value={String(stats?.orgs ?? 0)} icon="building" color="#8B5CF6" trend="+8%" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <h3 className="font-display font-bold text-navy mb-1">Reports Overview</h3>
            <p className="text-sm text-muted mb-4">DEMO DATA — monthly</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#63758B' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#63758B' }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="reports" stroke="#1769AA" strokeWidth={2.5} dot={{ fill: '#1769AA', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-display font-bold text-navy mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {(stats?.recentReports || []).map(r => (
                <div key={r.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-primary"></div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink truncate">{r.incidentType} — {r.locality}</div>
                    <div className="text-xs text-muted">{fmtDate(r.createdAt)}</div>
                  </div>
                </div>
              ))}
              {(!stats || stats.recentReports.length === 0) && <p className="text-sm text-muted">No recent reports.</p>}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
