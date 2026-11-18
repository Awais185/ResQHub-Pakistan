'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, Search } from 'lucide-react';
import Sidebar from './Sidebar';

type User = { id: string; name: string; email: string; role: string };

export default function DashboardShell({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (!d.user) router.push('/login');
      else setUser(d.user);
    }).catch(() => router.push('/login'));
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar mobileOpen={open} onClose={() => setOpen(false)} role={user?.role} />
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
          <div className="px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100"><Menu size={20} /></button>
              <div className="min-w-0">
                <h1 className="font-display font-bold text-lg text-navy truncate">{title}</h1>
                {subtitle && <p className="text-xs text-muted truncate">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {action}
              <div className="hidden md:flex items-center gap-2 bg-bg rounded-xl px-3 py-2 text-sm text-muted w-64">
                <Search size={16} />
                <input placeholder="Search..." className="bg-transparent outline-none text-sm w-full placeholder:text-muted/60" />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-slate-100">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>
              <div className="w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8 max-w-[1500px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
