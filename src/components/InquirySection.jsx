import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { saveInquiry } from '../utils/storage';
import { Send, CheckCircle, AlertCircle, Sparkles, Clock, Shield, Phone, Mail, User, Calendar } from 'lucide-react';

export default function InquirySection({ selectedProgram, onOpenInquiries, onInquirySubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'General VIP Sanctuary Tour',
    experience: 'Intermediate',
    preferredTime: 'Morning (6:00 AM - 10:00 AM)',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Update program if passed from programs or pricing section
  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, program: selectedProgram }));
    }
  }, [selectedProgram]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full legal name';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details on your athletic goals or questions';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please write at least 10 characters so our concierge can prepare';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const saved = saveInquiry(formData);
      setIsSubmitting(false);
      setSubmittedData(saved);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E5A93C', '#F6CE7D', '#00F2FE', '#FFFFFF'],
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }

      if (onInquirySubmitted) {
        onInquirySubmitted();
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      program: 'General VIP Sanctuary Tour',
      experience: 'Intermediate',
      preferredTime: 'Morning (6:00 AM - 10:00 AM)',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="inquiry" className="py-24 relative bg-[#07080B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Concierge Info & Sanctuary Promises */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Consultation</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
                REQUEST A <br />
                <span className="gold-gradient-text">VIP ADMISSION</span>
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                Experience the acoustic quietude, Eleiko platforms, and contrast hydrotherapy firsthand with a dedicated Performance Director.
              </p>
            </div>

            {/* Quick contact perks */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">4-Hour Response Guarantee</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Our Senior Membership Concierge will personally review your intake within four business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Complimentary Biometric Baseline</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every scheduled VIP tour includes an InBody 970 segmental scan and private locker amenities.
                  </p>
                </div>
              </div>
            </div>

            {/* Inquiries History Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenInquiries}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 underline underline-offset-4"
              >
                <span>Looking for your previously submitted inquiries? View Vault →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Premium Frontend Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
              {submittedData ? (
                /* Success Feedback State */
                <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-500/20 shadow-lg">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      Submission Authenticated
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display">
                      VIP Inquiry Received
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{submittedData.name}</strong>. Your consultation request has been stored in our concierge dispatch ledger.
                    </p>
                  </div>

                  {/* Submission Receipt Box */}
                  <div className="bg-[#0B0D13] p-5 rounded-2xl border border-white/10 text-left text-xs max-w-md mx-auto space-y-2.5">
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Reference ID:</span>
                      <span className="font-mono font-bold text-amber-400">{submittedData.id}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Target Protocol:</span>
                      <span className="font-medium text-white truncate max-w-[200px]">{submittedData.program}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Registered Email:</span>
                      <span className="text-slate-300 font-mono">{submittedData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-emerald-400 font-semibold">{submittedData.status}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                    <button
                      onClick={onOpenInquiries}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold uppercase tracking-wider shadow-gold-glow transition-all"
                    >
                      View All Stored Inquiries
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-white font-display">
                      Sanctuary Consultation Form
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete this intake form to schedule your tour or reserve a coach consultation.
                    </p>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        Full Legal Name <span className="text-amber-400">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Hayes"
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm placeholder:text-slate-500 focus:outline-none transition-all ${
                        errors.name
                          ? 'border-crimson focus:ring-1 focus:ring-crimson'
                          : 'border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Dual Column */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. j.hayes@domain.com"
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm placeholder:text-slate-500 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-crimson focus:ring-1 focus:ring-crimson'
                            : 'border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        Phone (SMS Updates)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Program / Interest Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Selected Program or Membership Inquiry
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F121B] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-all"
                    >
                      <option value="General VIP Sanctuary Tour">General VIP Sanctuary Tour</option>
                      <option value="Titan Hypertrophy & Olympic Lifting">Titan Hypertrophy & Olympic Lifting</option>
                      <option value="Vortex Metabolic Conditioning (MetCon)">Vortex Metabolic Conditioning (MetCon)</option>
                      <option value="Striking Dynamics & Sweet Science Boxing">Striking Dynamics & Sweet Science Boxing</option>
                      <option value="Reformer Precision & Spinal Decompression">Reformer Precision & Spinal Decompression</option>
                      <option value="HYROX Race Simulation & Engine Building">HYROX Race Simulation & Engine Building</option>
                      <option value="Sub-Zero Cryo & Infrared Contrast Suite">Sub-Zero Cryo & Infrared Contrast Suite</option>
                      <option value="Membership Tier: The Athletic Pass">Membership: The Athletic Pass ($195/mo)</option>
                      <option value="Membership Tier: Obsidian Black (ANNUAL)">Membership: Obsidian Black ($275/mo)</option>
                      <option value="Membership Tier: Founding Sovereign (ANNUAL)">Membership: Founding Sovereign ($495/mo)</option>
                      <option value="1-on-1 Biomechanics Personal Coaching">1-on-1 Biomechanics Personal Coaching</option>
                    </select>
                  </div>

                  {/* Experience & Time Preference Dual Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Current Fitness Level
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F121B] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-all"
                      >
                        <option value="Beginner / Rebuilding">Beginner / Rebuilding</option>
                        <option value="Intermediate">Intermediate Fitness</option>
                        <option value="Advanced / Competitive">Advanced / Competitive Athlete</option>
                        <option value="Elite / Professional">Elite / Professional Sport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Preferred Tour Window
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F121B] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-all"
                      >
                        <option value="Morning (6:00 AM - 10:00 AM)">Morning (6:00 AM - 10:00 AM)</option>
                        <option value="Midday (11:00 AM - 2:00 PM)">Midday (11:00 AM - 2:00 PM)</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                        <option value="Weekend Priority">Weekend Priority</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                      <span>
                        Message / Athletic Objectives <span className="text-amber-400">*</span>
                      </span>
                      <span className="text-[11px] text-slate-500 lowercase font-normal">
                        ({formData.message.length} chars)
                      </span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your current training focus, previous injuries, or specific questions regarding our facility and coaching..."
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm placeholder:text-slate-500 focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-crimson focus:ring-1 focus:ring-crimson'
                          : 'border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Dispatching to Concierge...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit VIP Application</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-2">
                    Stored securely in your local browser ledger. Zero spam policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
