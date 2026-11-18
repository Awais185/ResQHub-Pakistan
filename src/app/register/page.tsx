'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CITIZEN', locality: 'Rana Town' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      router.push('/dashboard'); router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="w-full max-w-md card p-8">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h1 className="font-display font-extrabold text-2xl text-navy text-center">Create your account</h1>
        <p className="text-center text-sm text-muted mt-1">Join ResQHub Pakistan</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label className="block text-xs font-semibold text-ink mb-1.5">Full Name</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input" placeholder="Your full name" /></div>
          <div><label className="block text-xs font-semibold text-ink mb-1.5">Email</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@example.com" /></div>
          <div><label className="block text-xs font-semibold text-ink mb-1.5">Password</label><input type="password" required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input" placeholder="At least 6 characters" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Role</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="input">
                <option value="CITIZEN">Citizen</option>
                <option value="VOLUNTEER">Volunteer</option>
                <option value="NGO">NGO</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Locality</label>
              <select value={form.locality} onChange={e => setForm({ ...form, locality: e.target.value })} className="input">
                <option>Rana Town</option><option>Parkview</option><option>Manga Mandi</option><option>Shahdara</option><option>Ravi Bridge Area</option>
              </select>
            </div>
          </div>
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <div className="mt-6 text-center text-sm text-muted">Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Login</Link></div>
      </div>
    </div>
  );
}
