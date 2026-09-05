import React, { useState } from 'react';
import { PROGRAMS, PROGRAM_CATEGORIES } from '../assets/data/programsData';
import { Clock, Flame, Users, ArrowUpRight, Check, Zap, Dumbbell } from 'lucide-react';

export default function ProgramsSection({ onSelectProgram }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPrograms =
    activeCategory === 'All'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === activeCategory);

  const handleReserve = (programTitle) => {
    if (onSelectProgram) {
      onSelectProgram(programTitle);
    }
    const target = document.querySelector('#inquiry');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="py-24 relative bg-[#090B10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Curated Masterclasses</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              DISCIPLINES OF <span className="gold-gradient-text">MASTERY</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl">
              Every masterclass is capped at 6 to 12 athletes and directed by elite coaches with Olympic or sports-science credentials.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {PROGRAM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold shadow-gold-glow'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131C] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/30">
                      {prog.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-md text-slate-300 border border-white/10">
                      {prog.category}
                    </span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{prog.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                      <Flame className="w-3 h-3 text-crimson" />
                      <span>{prog.calories}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span>{prog.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    {prog.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between bg-black/20">
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-500 block">Lead Coach</span>
                  <span className="font-semibold text-slate-300 truncate max-w-[140px] block">
                    {prog.coach.split('(')[0]}
                  </span>
                </div>

                <button
                  onClick={() => handleReserve(prog.title)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 text-amber-300 hover:text-black font-semibold text-xs transition-all duration-300 group/btn"
                >
                  <span>Reserve Spot</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
