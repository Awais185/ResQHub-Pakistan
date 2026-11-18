import Logo from './Logo';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Logo dark />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">A unified platform to report disasters, get help, and coordinate relief efforts across Pakistan.</p>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#how" className="hover:text-white">How It Works</a></li>
            <li><a href="#map" className="hover:text-white">Disaster Map</a></li>
            <li><a href="#ngo" className="hover:text-white">NGO Coordination</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Pilot Region</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Lahore District, Punjab</li>
            <li>Rana Town • Parkview • Manga Mandi</li>
            <li className="pt-2 text-xs text-white/40">All operational data marked DEMO</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="https://wa.me/923044335771" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/80 hover:text-teal"><MessageCircle size={16} /> WhatsApp: 0304 4335771</a></li>
            <li><a href="mailto:mazisial9296@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-teal break-all"><Mail size={16} /> mazisial9296@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} ResQHub Pakistan. All rights reserved.</span>
          <span>Connect. Support. Recover.</span>
        </div>
      </div>
    </footer>
  );
}
