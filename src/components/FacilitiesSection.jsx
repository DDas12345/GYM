import React, { useState } from 'react';
import { FACILITIES } from '../assets/data/facilitiesData';
import { Maximize2, X, Check, Building2, Shield, Sparkles } from 'lucide-react';

export default function FacilitiesSection() {
  const [selectedFacility, setSelectedFacility] = useState(null);

  return (
    <section id="facilities" className="py-24 relative bg-[#07080B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Architectural Tour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            SANCTUARY <span className="gold-gradient-text">ZONES</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every square foot is engineered with intention: acoustic decoupling, medical-grade air purification, and competition Eleiko iron.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedFacility(facility)}
            >
              <div>
                {/* Image Showcase with Zoom Button */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-black/30" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/30">
                      {facility.tag}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mt-1">
                    {facility.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {facility.description}
                  </p>

                  {/* Features list */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    {facility.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] text-slate-500">Tap to view equipment specs</span>
                <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                  Inspect Zone →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Lightbox Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-[#0D1017] border border-white/15 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white transition-colors border border-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 shrink-0">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-black/30" />
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-black">
                  {selectedFacility.tag}
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-2">
                  {selectedFacility.name}
                </h3>
              </div>
            </div>

            {/* Modal Details Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
                  Zone Overview & Architecture
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedFacility.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
                  Machinery & Equipment Inventory
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedFacility.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
                    >
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Included in Obsidian Black & Sovereign Tiers</span>
                <button
                  onClick={() => {
                    setSelectedFacility(null);
                    const target = document.querySelector('#inquiry');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  Schedule Tour of Zone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
