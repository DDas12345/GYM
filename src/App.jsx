import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import PhilosophySection from './components/PhilosophySection';
import ProgramsSection from './components/ProgramsSection';
import FacilitiesSection from './components/FacilitiesSection';
import ThreeEquipmentViewer from './components/ThreeEquipmentViewer';
import TrainersSection from './components/TrainersSection';
import MembershipSection from './components/MembershipSection';
import FitnessCalculator from './components/FitnessCalculator';
import InquirySection from './components/InquirySection';
import InquiriesModal from './components/InquiriesModal';
import VideoModal from './components/VideoModal';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { fetchStats } from './utils/api';

export default function App() {
  const [viewMode, setViewMode] = useState('site'); // 'site' | 'dashboard'
  const [selectedProgram, setSelectedProgram] = useState('');
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(0);

  const refreshInquiryCount = async () => {
    try {
      const res = await fetchStats();
      if (res?.data?.total !== undefined) {
        setInquiryCount(res.data.total);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshInquiryCount();

    // Check hash on load for deep linking to #dashboard
    if (window.location.hash === '#dashboard') {
      setViewMode('dashboard');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setViewMode('dashboard');
      } else if (window.location.hash === '#site' || !window.location.hash) {
        setViewMode('site');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleProgramSelect = (progTitle) => {
    setSelectedProgram(progTitle);
  };

  const openDashboard = () => {
    setViewMode('dashboard');
    window.location.hash = 'dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToSite = () => {
    setViewMode('site');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Dashboard View, render the Executive Concierge Dashboard
  if (viewMode === 'dashboard') {
    return <Dashboard onBackToSite={backToSite} />;
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 selection:bg-amber-500 selection:text-black font-sans">
      {/* Sticky Navigation */}
      <Navbar
        onOpenInquiries={() => setIsInquiriesOpen(true)}
        onOpenDashboard={openDashboard}
        inquiryCount={inquiryCount}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with 3D Kinetic Ring Gyroscope */}
        <HeroSection onOpenVideo={() => setIsVideoOpen(true)} />

        {/* 2. Quick Metrics Bar */}
        <StatsBar />

        {/* 3. Philosophy & Pillars */}
        <PhilosophySection />

        {/* 4. Programs & Masterclasses */}
        <ProgramsSection onSelectProgram={handleProgramSelect} />

        {/* 5. Luxury Facilities & Interactive Lightbox */}
        <FacilitiesSection />

        {/* 6. Dedicated Interactive 3D Equipment Studio */}
        <ThreeEquipmentViewer />

        {/* 7. Master Trainers & Physiologists */}
        <TrainersSection onSelectTrainer={handleProgramSelect} />

        {/* 8. Membership Tiers & Testimonials */}
        <MembershipSection onSelectTier={handleProgramSelect} />

        {/* 9. Interactive Biometric & Metabolic Calculator */}
        <FitnessCalculator onApplyRecommendation={handleProgramSelect} />

        {/* 10. Inquiry & Tour Booking Section (Connected to SQLite) */}
        <InquirySection
          selectedProgram={selectedProgram}
          onOpenInquiries={() => setIsInquiriesOpen(true)}
          onOpenDashboard={openDashboard}
          onInquirySubmitted={refreshInquiryCount}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <InquiriesModal
        isOpen={isInquiriesOpen}
        onClose={() => setIsInquiriesOpen(false)}
        onRefreshCount={refreshInquiryCount}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
