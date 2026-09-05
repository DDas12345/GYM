import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Menu, X, Inbox, ArrowUpRight, PhoneCall } from 'lucide-react';

export default function Navbar({ onOpenInquiries, inquiryCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Programs', href: '#programs' },
    { label: 'Facilities', href: '#facilities' },
    { label: '3D Studio', href: '#three-studio' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Calculator', href: '#calculator' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080B]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#F6CE7D] via-[#E5A93C] to-[#925C08] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-gold-glow">
              <div className="w-full h-full bg-[#0B0D13] rounded-[7px] flex items-center justify-center">
                <span className="font-extrabold text-lg text-amber-400 font-display tracking-tighter">K</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                KINETIX
              </span>
              <span className="text-[9px] tracking-[0.25em] text-amber-500/80 font-semibold uppercase -mt-1">
                Athletic Club
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-slate-300 hover:text-amber-400 font-medium transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Inquiry History Badge Button */}
            <button
              onClick={onOpenInquiries}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all group"
              title="View your saved inquiries & tour bookings"
            >
              <Inbox className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Inquiries</span>
              {inquiryCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-black rounded-full">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Book Tour CTA Button */}
            <a
              href="#inquiry"
              onClick={(e) => handleLinkClick(e, '#inquiry')}
              className="relative group overflow-hidden rounded-lg p-[1px] font-medium text-xs uppercase tracking-wider"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 rounded-lg group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-1.5 px-4 py-2 bg-[#090B10] group-hover:bg-transparent rounded-lg text-amber-400 group-hover:text-black font-semibold transition-all duration-300">
                <span>Book VIP Tour</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenInquiries}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400"
              aria-label="View Inquiries"
            >
              <Inbox className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E15]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-wider text-slate-300 hover:text-amber-400 font-medium py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiries();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-200"
            >
              <Inbox className="w-4 h-4 text-amber-400" />
              <span>View Saved Inquiries ({inquiryCount})</span>
            </button>

            <a
              href="#inquiry"
              onClick={(e) => handleLinkClick(e, '#inquiry')}
              className="w-full py-3 text-center rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold text-xs uppercase tracking-wider shadow-gold-glow"
            >
              Book VIP Tour Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
