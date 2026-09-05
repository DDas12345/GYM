import React, { useState } from 'react';
import { Target, Activity, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PhilosophySection() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'biometrics',
      title: 'Biometric Calibration',
      tag: 'Data Over Guesswork',
      icon: Activity,
      summary: 'Every repetition, heart-rate beat, and metabolic threshold is mapped through clinical-grade sensors.',
      details: 'We reject cookie-cutter routines. Your journey begins with a medical-grade InBody 970 segmental scan and VO2 Max metabolic cart analysis. Workouts are calibrated via barbell velocity encoders so you train at the precise neurological threshold required for cellular adaptation.',
      stats: '100% Data Backed',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'solitude',
      title: 'Architectural Solitude',
      tag: 'Zero Crowds. Total Immersion.',
      icon: Shield,
      summary: 'A bespoke sanctuary acoustically tuned to eliminate distraction and cultivate deep athletic focus.',
      details: 'Designed with custom acoustic dampening sub-floors and circadian lighting systems that shift with the natural biological clock. Our membership is strictly capped at 300 individuals across 35,000 square feet, guaranteeing you never queue for an Olympic platform or wait for a cold plunge.',
      stats: 'Max 300 Members',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'recovery',
      title: 'Sensory Contrast Recovery',
      tag: 'Microvascular Regeneration',
      icon: Sparkles,
      summary: 'World-class thermal contrast and oxygen protocols to halve downtime and eliminate systemic fatigue.',
      details: 'Training is only the stimulus; adaptation occurs in recovery. Our sensory bathhouse integrates continuous-filtration 38°F chilled mineral plunge tubs, 195°F dry Finnish cedar saunas, medical Joovv red-light panels, and Normatec 3 pneumatic compression boots.',
      stats: '50% Faster Restoration',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'coaching',
      title: 'Olympian Coaching Lineage',
      tag: 'Mentors, Not Cheerleaders',
      icon: Target,
      summary: 'Guided exclusively by certified exercise physiologists, former Olympians, and military combat veterans.',
      details: 'Every coach at KINETIX holds at least a Master’s degree in Human Kinetics, CSCS credential, or national championship podium. We maintain an uncompromising 4:1 member-to-coach ratio in all masterclasses, ensuring every millimeter of your bar path is scrutinized.',
      stats: '4:1 Density Ratio',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  return (
    <section id="philosophy" className="py-24 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>The KINETIX Doctrine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            NOT JUST A GYM. <br />
            <span className="gold-gradient-text">A HUMAN OPTIMIZATION LAB.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Conventional fitness facilities sell access to machines. KINETIX delivers an integrated ecosystem of biomechanics, thermal restorative medicine, and architectural serenity.
          </p>
        </div>

        {/* Interactive Pillars Grid / Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Pillar Selector Buttons (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#121520] border-amber-500/60 shadow-gold-glow'
                      : 'bg-[#0B0D13]/60 border-white/5 hover:border-white/20 hover:bg-[#0E111A]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono uppercase tracking-wider ${
                          isSelected ? 'text-amber-400' : 'text-slate-500'
                        }`}
                      >
                        {pillar.tag}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-display mt-0.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Visual Showcase (Right Column) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F121B] group">
              <div className="relative h-[380px] sm:h-[450px]">
                <img
                  src={pillars[activePillar].image}
                  alt={pillars[activePillar].title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-[#0B0D14]/60 to-transparent" />

                {/* Floating Metric Pill */}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">System Benchmark</div>
                  <div className="text-base font-extrabold text-amber-400 font-display">
                    {pillars[activePillar].stats}
                  </div>
                </div>

                {/* Bottom Content Card */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#090B10]/90 backdrop-blur-xl border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Scientific Standard</span>
                  </div>
                  <h4 className="text-xl font-bold text-white font-display mb-2">
                    {pillars[activePillar].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {pillars[activePillar].details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
