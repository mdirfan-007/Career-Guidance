import { Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="py-10 px-4 text-center text-white/60">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-4 mb-3">
          <Logo className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <p>Made with</p>
            <Heart className="w-4 h-4 text-[#11cb5f]" fill="currentColor" />
            <p>by Effectsup Team</p>
          </div>
        </div>
        
        <p className="text-sm mt-6">© {new Date().getFullYear()} Effectsup. All rights reserved.</p>
      </div>
    </footer>
  );
}
