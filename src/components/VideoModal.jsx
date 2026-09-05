import React from 'react';
import { X, Play, Volume2, Shield } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-[#090A0F] border border-white/20 overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white transition-colors border border-white/10"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Frame with HTML5 Video and fallback */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            controls
            loop
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
          >
            {/* Free high quality fitness video stream */}
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
        </div>

        {/* Caption bar */}
        <div className="p-4 sm:p-6 bg-[#0E1017] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              Cinematic Brand Film • 4K
            </span>
            <h4 className="text-base font-bold text-white font-display">
              KINETIX: The Architecture of Absolute Human Performance
            </h4>
          </div>
          <button
            onClick={() => {
              onClose();
              const target = document.querySelector('#inquiry');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-gold-glow"
          >
            Experience In Person
          </button>
        </div>
      </div>
    </div>
  );
}
