import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Youtube, Twitter, ArrowUp, Send, Check } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 p-[1px] shadow-gold-glow">
                <div className="w-full h-full bg-[#0B0D13] rounded-[7px] flex items-center justify-center text-amber-400 font-extrabold font-display">
                  K
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-wider text-base text-white">
                  KINETIX
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-500 uppercase -mt-0.5">
                  Athletic Club
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A private 35,000 square-foot high-performance athletic facility. Dedicated to the science of human longevity, Olympic weightlifting, and contrast restorative medicine.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-colors border border-white/5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-colors border border-white/5"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-colors border border-white/5"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sanctuary Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">
              Sanctuary Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-300 font-medium block">Mon – Fri</span>
                <span className="text-slate-500 font-mono">5:00 AM – 11:00 PM</span>
              </div>
              <div>
                <span className="text-slate-300 font-medium block">Sat – Sun</span>
                <span className="text-slate-500 font-mono">6:00 AM – 9:00 PM</span>
              </div>
              <div>
                <span className="text-amber-400 font-medium block">Sovereign Suites</span>
                <span className="text-slate-500 font-mono">24/7 Keyless Biometric Access</span>
              </div>
            </div>
          </div>

          {/* Concierge & Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">
              Location & Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>450 Hudson Street, Tribeca<br />New York, NY 10014</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono">+1 (212) 890-4400</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>concierge@kinetixclub.com</span>
              </div>
            </div>
          </div>

          {/* Dispatch Journal / Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">
              The Kinetix Dispatch
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bi-weekly journal on human kinetics, metabolic threshold research, and recovery protocols.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter athlete email..."
                  className="w-full pl-3 pr-9 py-2.5 rounded-lg bg-[#0F1118] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-amber-500 text-black hover:bg-amber-400 transition-colors"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400">
                  Welcome to the private journal.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} KINETIX ATHLETIC CLUB LLC. All rights reserved. Eleiko is a registered trademark of Eleiko Group AB.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">
              Privacy Doctrine
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">
              Terms of Residency
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors ml-4"
            >
              <span>Ascend to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
