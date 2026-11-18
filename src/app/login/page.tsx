'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('citizen@resqhub.pk');
  const [password, setPassword] = useState('citizen123');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push(data.user.role === 'ADMIN' ? '/admin' : '/dashboard');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex relative bg-gradient-to-br from-navy via-primary to-navy p-12 flex-col justify-between overflow-hidden">
        <div className="relative"><Logo dark size={44} /></div>
        <div className="relative text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6"><Logo size={48} showText={false} /></div>
          <h2 className="font-display font-extrabold text-3xl leading-tight">Together for a<br /><span className="text-teal">Safer Pakistan</span></h2>
          <p className="mt-4 text-white/70 text-sm max-w-sm">Coordinate warnings, community reports, and verified relief on a single trusted platform.</p>
        </div>
        <div className="relative text-xs text-white/50">DEMO DATA — Lahore District pilot</div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-8"><Logo /></div>
          <h1 className="font-display font-extrabold text-3xl text-navy">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Sign in to your ResQHub account.</p>
          <div className="mt-6 bg-bg border border-slate-200 rounded-xl p-3 text-xs text-muted">
            <div className="font-semibold text-ink mb-1">Demo credentials</div>
            <div>Citizen: citizen@resqhub.pk / citizen123</div>
            <div>Admin: admin@resqhub.pk / admin123</div>
            <div>Volunteer: volunteer@resqhub.pk / volunteer123</div>
            <div>NGO: ngo@resqhub.pk / ngo123</div>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Email Address</label>
              <div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input pl-10" /></div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type={showPwd ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">{showPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Signing in...' : 'Login'} {!loading && <ArrowRight size={16} />}</button>
          </form>
          <div className="mt-6 text-center text-sm text-muted">Don&apos;t have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Register here</Link></div>
          <div className="mt-4 text-center text-xs"><Link href="/" className="text-muted hover:text-primary">← Back to home</Link></div>
        </div>
      </div>
    </div>
  );
}
