import React from 'react';
import { Award, ShieldAlert, Activity, Users, Flame, HeartHandshake } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: Award,
      value: '100% ELEIKO™',
      label: 'Competition Certified',
      description: 'Zero generic bars or commercial rubber'
    },
    {
      icon: Activity,
      value: 'VO2 & DEXA',
      label: 'Clinical Diagnostics',
      description: 'Segmental biometric scanning included'
    },
    {
      icon: Flame,
      value: '-110°C & 195°F',
      label: 'Thermal Contrast',
      description: 'Electric cryo & cedar rock sauna'
    },
    {
      icon: Users,
      value: '300 MEMBER CAP',
      label: 'Strict Roster Limits',
      description: 'Zero wait times, absolute exclusivity'
    }
  ];

  return (
    <section id="stats" className="relative z-20 py-10 bg-[#0B0D14] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-amber-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white font-display tracking-tight group-hover:text-amber-300 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
