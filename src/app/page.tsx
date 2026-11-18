import Link from 'next/link';
import { Bell, ShieldCheck, Truck, ArrowRight, MapPin, AlertTriangle, CheckCircle2, HeartHandshake, Clock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-primary to-bright opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span> Lahore District Pilot
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight">
              Connect. Support.<br /><span className="text-teal">Recover.</span>
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
              A unified platform to report disasters, get help, and coordinate relief efforts across Pakistan — from early warnings to effective relief.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/report" className="btn-danger text-base px-6 py-3"><AlertTriangle size={18} /> Report Emergency</Link>
              <a href="#features" className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition">Learn More <ArrowRight size={18} /></a>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[{ icon: Clock, label: '24/7', sub: 'Monitoring' }, { icon: ShieldCheck, label: 'Trusted', sub: 'Organizations' }, { icon: Truck, label: 'Faster', sub: 'Relief' }].map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon size={24} className="text-teal mx-auto" />
                  <div className="font-display font-bold text-xl mt-2">{s.label}</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-pulse">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="badge bg-red-100 text-red-700"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Live Alert</span>
                <span className="text-xs text-muted">Rana Town, Lahore</span>
              </div>
              <div className="rounded-xl h-40 bg-gradient-to-br from-sky-100 to-teal/20 relative overflow-hidden mb-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><MapPin className="text-red-600" size={32} /></div>
              </div>
              <div className="space-y-2">
                {[{ label: 'Report submitted', done: true }, { label: 'Verified by volunteer', done: true }, { label: 'NGO committed food & water', done: true }, { label: 'Relief dispatched', done: false }].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className={step.done ? 'text-relief' : 'text-slate-300'} />
                    <span className={step.done ? 'text-ink' : 'text-muted'}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy">Everything you need to coordinate relief</h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">Purpose-built modules for citizens, volunteers, NGOs and administrators.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Bell, title: 'Emergency Alerts', desc: 'Verified alerts distributed to affected localities in real time.' },
            { icon: AlertTriangle, title: 'Disaster Reporting', desc: 'Multi-step forms to report incidents, needs and affected people.' },
            { icon: ShieldCheck, title: 'Verified Data Hub', desc: 'Centralized, verified information from multiple trusted sources.' },
            { icon: HeartHandshake, title: 'Needs Dashboard', desc: 'Track food, water, shelter and medical requirements per locality.' },
            { icon: Users, title: 'NGO Coordination', desc: 'Match verified needs with NGOs and volunteers.' },
            { icon: MapPin, title: 'Interactive Map', desc: 'Live disaster map for the Lahore District pilot.' }
          ].map((f, i) => (
            <div key={i} className="card p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4"><f.icon size={24} /></div>
              <h3 className="font-display font-bold text-lg text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy">From warning to relief</h2>
            <p className="mt-3 text-muted">A coordinated disaster response workflow.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[{ n: '01', t: 'Warning', d: 'Alerts issued for affected localities.' }, { n: '02', t: 'Report', d: 'Citizens & volunteers report incidents.' }, { n: '03', t: 'Verify', d: 'Admins verify to prevent duplicate/misinformation.' }, { n: '04', t: 'Relief', d: 'NGOs commit and deliver aid.' }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-bright text-white font-display font-extrabold text-xl flex items-center justify-center mx-auto">{s.n}</div>
                <h3 className="mt-4 font-display font-bold text-navy">{s.t}</h3>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-navy to-primary p-10 md:p-16 text-center text-white">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Be part of the relief mission</h2>
          <p className="mt-3 text-white/85 max-w-2xl mx-auto">Join as a citizen, volunteer, or NGO and help build a safer Pakistan.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition">Get Started <ArrowRight size={18} /></Link>
            <Link href="/login" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition">Sign In</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
