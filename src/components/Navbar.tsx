'use client';
import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/"><Logo /></Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
          <Link href="/" className="hover:text-primary">Home</Link>
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#how" className="hover:text-primary">How It Works</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-ink hover:text-primary px-3 py-2">Login</Link>
          <Link href="/register" className="btn-primary text-sm">Register</Link>
        </div>
      </div>
    </header>
  );
}
