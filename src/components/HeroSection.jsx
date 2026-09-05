import React from 'react';
import ThreeHeroCanvas from './ThreeHeroCanvas';
import { Play, ArrowRight, ShieldCheck, Flame, Compass, ChevronDown } from 'lucide-react';

export default function HeroSection({ onOpenVideo }) {
  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#07080B]">
      {/* Background imagery with layered gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
          alt="KINETIX Athletic Club Interior"
          className="w-full h-full object-cover object-center opacity-20 filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080B] via-[#07080B]/90 to-[#07080B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            {/* VIP Status Capsule */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 font-semibold tracking-wide uppercase text-[11px]">Private Membership</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Quarter 4 Allocations Open</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-[1.05]">
                ENGINEERED <br />
                <span className="gold-gradient-text">WITHOUT</span> <br />
                COMPROMISE.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-light">
              KINETIX is a 35,000 sq ft private athletic sanctuary blending Olympic-caliber biomechanics, contrast hydrotherapy, and data-driven physiology. No crowds. No friction. Only absolute progression.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('#inquiry')}
                className="relative group overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-sm tracking-wider uppercase shadow-gold-glow-lg hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Request Private Tour</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenVideo}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all duration-300 backdrop-blur-md group"
              >
                <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Film (2:14)</span>
              </button>
            </div>

            {/* Badges / Micro Specs */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-display">35,000</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Square Feet</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-display">4:1</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Athlete / Coach</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-display">38°F</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Cold Plunges</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Kinetic Ring Element */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <ThreeHeroCanvas />
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-6">
        <button
          onClick={() => scrollToSection('#stats')}
          className="flex flex-col items-center text-slate-500 hover:text-amber-400 transition-colors group"
          aria-label="Scroll Down"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1">Explore Sanctuary</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
