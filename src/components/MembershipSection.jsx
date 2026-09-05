import React, { useState } from 'react';
import { PRICING_TIERS, TESTIMONIALS } from '../assets/data/pricingData';
import { Check, Crown, Shield, Star, Sparkles, ArrowRight } from 'lucide-react';

export default function MembershipSection({ onSelectTier }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  const handleChooseTier = (tierName) => {
    if (onSelectTier) {
      onSelectTier(`Membership Tier: ${tierName} (${billingCycle.toUpperCase()})`);
    }
    const target = document.querySelector('#inquiry');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="memberships" className="py-24 relative bg-[#07080B] overflow-hidden">
      {/* Glow gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>Private Allocations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            MEMBERSHIP <span className="gold-gradient-text">SANCTUARY</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            All memberships include full biometric onboarding, complimentary valet, and access to our private mobile concierge.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="flex items-center bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white/15 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Flexible
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold shadow-gold-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Privileged</span>
                <span className="text-[10px] bg-black/40 text-amber-300 px-1.5 py-0.5 rounded-full uppercase">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {PRICING_TIERS.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'glass-card-gold shadow-gold-glow-lg border-2 border-amber-500/50 -translate-y-2'
                    : 'glass-card glass-card-hover border border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                    Signature Allocation
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-display mt-2">
                    {tier.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed min-h-[36px]">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white font-display">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">
                        / month
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {billingCycle === 'annual' ? 'Billed annually with zero joining fee' : 'Billed monthly, cancel anytime'}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Tier Privileges Included:
                    </div>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleChooseTier(tier.name)}
                  className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-gold-glow hover:opacity-90'
                      : 'bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Member Testimonials Carousel / Grid */}
        <div className="border-t border-white/10 pt-16">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Words From The Sovereign Roster
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.author}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                    <span className="text-[9px] text-amber-400 font-mono">{t.tier}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
