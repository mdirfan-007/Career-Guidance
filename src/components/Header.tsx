import { ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="pt-12 pb-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Logo className="hover:opacity-90 transition-opacity" />
          <nav className="hidden md:flex space-x-2">
            {['Features', 'About', 'Contact'].map((item) => (
              <a key={item} href="#" className="nav-item text-white/80 hover:text-white transition-all">
                {item}
              </a>
            ))}
          </nav>
          <div className="px-4 py-1 bg-white/5 border border-[#11cb5f]/20 rounded-full backdrop-blur-sm text-xs font-medium text-white/80">
            +100 users already onboard
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Designed to <span className="gradient-text">Grow</span><br />
          Your <span className="text-white">Career</span>
        </h1>
        
        <div className="glass-card p-6 rounded-xl mb-8 backdrop-blur-md">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 rounded-full bg-[#11cb5f] mr-2 animate-pulse"></div>
            <p className="text-white/90">
              Kabhi laga ki career mein aage kya karna hai, samajh nahi aata?
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 rounded-full bg-[#11cb5f] mr-2 animate-pulse"></div>
            <p className="text-white/90">
              Kabhi chaha ki koi aapke jaise field ka real insan ho jisse aap baat kar paayein – bina judge kiye?
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#11cb5f] mr-2 animate-pulse"></div>
            <p className="text-white/90">
              Hum bana rahe hain <span className="font-semibold gradient-text">Effectsup</span> – ek career-based social networking app, jahan aap sirf apne field ke logon se jud sakte hain, help le sakte hain, aur grow kar sakte hain.
            </p>
          </div>
        </div>
        
        <p className="text-white/70 italic mb-10">
          Iss survey se hum samajhna chahte hain ki aapko kya chahiye – aapka honest feedback hume app ko perfect banane mein help karega.
        </p>
      </div>
    </header>
  );
}
