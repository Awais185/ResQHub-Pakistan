'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, AlertTriangle, Bell, HeartHandshake, ShieldCheck, Users, User, LogOut, Map as MapIcon, Settings } from 'lucide-react';
import Logo from './Logo';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/report', label: 'Report Disaster', icon: AlertTriangle },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/needs', label: 'Needs', icon: HeartHandshake },
  { href: '/verified-hub', label: 'Verified Data Hub', icon: ShieldCheck },
  { href: '/ngo', label: 'Relief Coordination', icon: Users },
  { href: '/map', label: 'Disaster Map', icon: MapIcon }
];

export default function Sidebar({ mobileOpen, onClose, role }: { mobileOpen: boolean; onClose: () => void; role?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}
      <aside className={'fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy text-white flex flex-col z-50 transform transition-transform duration-300 ' + (mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        <div className="p-6 border-b border-white/10"><Link href="/"><Logo dark size={36} /></Link></div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} onClick={onClose}
                className={'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ' + (active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white')}>
                <Icon size={18} /><span>{label}</span>
              </Link>
            );
          })}
          {role === 'ADMIN' && (
            <div className="mt-2 pt-3 border-t border-white/10">
              <Link href="/admin" onClick={onClose}
                className={'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ' + (pathname.startsWith('/admin') ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white')}>
                <Settings size={18} /><span>Admin Dashboard</span>
              </Link>
              <Link href="/admin/alerts" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/60 hover:bg-white/5 hover:text-white pl-10">Alert Management</Link>
              <Link href="/admin/reports" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/60 hover:bg-white/5 hover:text-white pl-10">Report Verification</Link>
              <Link href="/admin/users" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/60 hover:bg-white/5 hover:text-white pl-10">Users</Link>
              <Link href="/admin/ngos" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/60 hover:bg-white/5 hover:text-white pl-10">NGOs</Link>
            </div>
          )}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link href="/profile" onClick={onClose}
            className={'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ' + (pathname === '/profile' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white')}>
            <User size={18} /><span>Profile</span>
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition">
            <LogOut size={18} /><span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
