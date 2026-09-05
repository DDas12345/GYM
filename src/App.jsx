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
import Footer from './components/Footer';
import { getInquiries } from './utils/storage';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(0);

  const refreshInquiryCount = () => {
    const list = getInquiries();
    setInquiryCount(list.length);
  };

  useEffect(() => {
    refreshInquiryCount();
  }, []);

  const handleProgramSelect = (progTitle) => {
    setSelectedProgram(progTitle);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 selection:bg-amber-500 selection:text-black font-sans">
      {/* Sticky Navigation */}
      <Navbar
        onOpenInquiries={() => setIsInquiriesOpen(true)}
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

        {/* 10. Inquiry & Tour Booking Section (Frontend Only) */}
        <InquirySection
          selectedProgram={selectedProgram}
          onOpenInquiries={() => setIsInquiriesOpen(true)}
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
