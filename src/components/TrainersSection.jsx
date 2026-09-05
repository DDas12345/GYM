import React from 'react';
import { TRAINERS } from '../assets/data/trainersData';
import { Award, ShieldCheck, Quote, ChevronRight, UserCheck } from 'lucide-react';

export default function TrainersSection({ onSelectTrainer }) {
  const handleConsult = (trainerName) => {
    if (onSelectTrainer) {
      onSelectTrainer(`Personal Coaching with ${trainerName}`);
    }
    const target = document.querySelector('#inquiry');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trainers" className="py-24 relative bg-[#090B10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Master Coaches & Physiologists</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            ARCHITECTS OF <span className="gold-gradient-text">PERFORMANCE</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our coaching staff has mentored Olympians, Tier-1 military operators, and world championship contenders. They don't count reps—they decode human kinetics.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Portrait */}
                <div className="relative h-72 overflow-hidden bg-[#151924]">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131C] via-transparent to-black/30" />

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/30">
                      {trainer.experience}
                    </span>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                    {trainer.role}
                  </p>

                  <p className="text-[11px] text-slate-400 mt-2 font-mono border-b border-white/5 pb-3">
                    {trainer.credentials}
                  </p>

                  {/* Specialties */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {trainer.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/5 text-slate-300 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-300 italic leading-relaxed">
                    <Quote className="w-3 h-3 text-amber-500/70 inline mr-1 -mt-1" />
                    {trainer.quote}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleConsult(trainer.name)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Request Coaching</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
