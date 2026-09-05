import React, { useState, useMemo } from 'react';
import { Activity, Gauge, Heart, Flame, ArrowRight, Sparkles } from 'lucide-react';

export default function FitnessCalculator({ onApplyRecommendation }) {
  const [age, setAge] = useState(32);
  const [weightKg, setWeightKg] = useState(78);
  const [restingHr, setRestingHr] = useState(58);
  const [focus, setFocus] = useState('strength'); // 'strength' | 'metcon' | 'endurance' | 'recovery'
  const [frequency, setFrequency] = useState(4); // days/week

  // Calculate biometric targets
  const results = useMemo(() => {
    // Tanaka formula for Max HR: 208 - (0.7 * age)
    const maxHr = Math.round(208 - 0.7 * age);
    const hrReserve = maxHr - restingHr;

    // Karvonen Heart Rate Zones
    const zone2Low = Math.round(restingHr + hrReserve * 0.6);
    const zone2High = Math.round(restingHr + hrReserve * 0.7);

    const zone4Low = Math.round(restingHr + hrReserve * 0.8);
    const zone4High = Math.round(restingHr + hrReserve * 0.9);

    // Estimated burn per session
    let perSessionBurn = 550;
    let recommendedClass = 'Titan Hypertrophy & Olympic Lifting';

    if (focus === 'strength') {
      perSessionBurn = Math.round(weightKg * 7.5);
      recommendedClass = 'Titan Hypertrophy & Olympic Lifting';
    } else if (focus === 'metcon') {
      perSessionBurn = Math.round(weightKg * 9.5);
      recommendedClass = 'Vortex Metabolic Conditioning (MetCon)';
    } else if (focus === 'endurance') {
      perSessionBurn = Math.round(weightKg * 11.2);
      recommendedClass = 'HYROX Race Simulation & Engine Building';
    } else {
      perSessionBurn = Math.round(weightKg * 4.8);
      recommendedClass = 'Reformer Precision & Spinal Decompression';
    }

    const weeklyBurn = perSessionBurn * frequency;

    return {
      maxHr,
      zone2Range: `${zone2Low} - ${zone2High} BPM`,
      zone4Range: `${zone4Low} - ${zone4High} BPM`,
      perSessionBurn,
      weeklyBurn,
      recommendedClass,
    };
  }, [age, weightKg, restingHr, focus, frequency]);

  const handleApply = () => {
    if (onApplyRecommendation) {
      onApplyRecommendation(results.recommendedClass);
    }
    const target = document.querySelector('#inquiry');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-24 relative bg-[#090B10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Biometric Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            METABOLIC <span className="cyan-gradient-text">CALCULATOR</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Calibrate your physiological heart rate zones and weekly energy expenditure before stepping onto our competition floor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              Configure Physiological Parameters
            </h3>

            {/* Age Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Biological Age</span>
                <span className="text-cyan-400 font-bold font-mono">{age} Years Old</span>
              </div>
              <input
                type="range"
                min="18"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Body Mass Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Body Weight</span>
                <span className="text-cyan-400 font-bold font-mono">{weightKg} kg / {Math.round(weightKg * 2.204)} lbs</span>
              </div>
              <input
                type="range"
                min="45"
                max="140"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Resting HR Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Resting Heart Rate (BPM)</span>
                <span className="text-cyan-400 font-bold font-mono">{restingHr} BPM</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={restingHr}
                onChange={(e) => setRestingHr(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Training Focus Pills */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-2">
                Primary Performance Objective
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'strength', label: 'Hypertrophy' },
                  { id: 'metcon', label: 'MetCon HIIT' },
                  { id: 'endurance', label: 'HYROX Race' },
                  { id: 'recovery', label: 'Restoration' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFocus(item.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      focus === item.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-glow'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Days */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Weekly Training Sessions</span>
                <span className="text-cyan-400 font-bold font-mono">{frequency} Days / Week</span>
              </div>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map((day) => (
                  <button
                    key={day}
                    onClick={() => setFrequency(day)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      frequency === day
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {day}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Telemetry Display */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-cyan-glow relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono font-bold block">
                    Calculated Telemetry
                  </span>
                  <h4 className="text-xl font-bold text-white font-display mt-0.5">
                    Your Physiological Profile
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  <Heart className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <div className="text-[11px] text-slate-400">Max Heart Rate</div>
                  <div className="text-xl font-extrabold text-white font-display mt-1">
                    {results.maxHr} <span className="text-xs text-slate-400 font-normal">BPM</span>
                  </div>
                </div>

                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <div className="text-[11px] text-slate-400">Zone 2 Aerobic Base</div>
                  <div className="text-sm font-extrabold text-cyan-300 font-display mt-1">
                    {results.zone2Range}
                  </div>
                </div>

                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <div className="text-[11px] text-slate-400">Session Expenditure</div>
                  <div className="text-xl font-extrabold text-amber-400 font-display mt-1">
                    ~{results.perSessionBurn} <span className="text-xs text-slate-400 font-normal">kcal</span>
                  </div>
                </div>

                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <div className="text-[11px] text-slate-400">Weekly Energy Burn</div>
                  <div className="text-xl font-extrabold text-emerald-400 font-display mt-1">
                    ~{results.weeklyBurn.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kcal</span>
                  </div>
                </div>
              </div>

              {/* Recommended Discipline Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30">
                <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Algorithmically Matched Program
                </div>
                <div className="text-sm font-bold text-white font-display">
                  {results.recommendedClass}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleApply}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-cyan-glow"
              >
                <span>Book With This Protocol</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
