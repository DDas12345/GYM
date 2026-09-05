import React, { useState, useEffect } from 'react';
import { getInquiries, deleteInquiry } from '../utils/storage';
import { X, Trash2, Mail, Phone, Calendar, Clock, Shield, Inbox, CheckCircle2 } from 'lucide-react';

export default function InquiriesModal({ isOpen, onClose, onRefreshCount }) {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setInquiries(getInquiries());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id) => {
    const updated = deleteInquiry(id);
    setInquiries(updated);
    if (onRefreshCount) onRefreshCount();
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all stored inquiries from local storage?')) {
      localStorage.removeItem('kinetix_inquiries_data');
      setInquiries([]);
      if (onRefreshCount) onRefreshCount();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-[#0C0E15] border border-white/15 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#10131D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">
                  Concierge Dispatch Vault
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {inquiries.length} Submissions
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Frontend client submissions recorded in browser localStorage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Purge Ledger</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {inquiries.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Inbox className="w-12 h-12 text-slate-600 mx-auto stroke-[1.5]" />
              <h4 className="text-base font-semibold text-slate-300">
                No Stored Inquiries in Vault
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submit a new inquiry using the form below, and it will be immediately displayed in this ledger.
              </p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-5 rounded-2xl bg-[#11141F] border border-white/10 hover:border-white/20 transition-all space-y-4 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                      {inq.id}
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {inq.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {inq.status || 'Active Dispatch'}
                    </span>
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{inq.email}</span>
                  </div>
                  {inq.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{inq.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{inq.preferredTime || 'Flexible Time'}</span>
                  </div>
                </div>

                {/* Target Program */}
                <div className="text-xs bg-black/40 p-3 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-slate-400">Target Protocol:</span>
                  <span className="font-semibold text-amber-300 font-display">
                    {inq.program}
                  </span>
                </div>

                {/* Message */}
                <div className="text-xs text-slate-300 bg-white/[0.02] p-3 rounded-xl border border-white/5 leading-relaxed">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold mb-1">
                    Athlete Notes / Objectives:
                  </span>
                  {inq.message}
                </div>

                {/* Timestamp */}
                <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1">
                  <span>Recorded: {new Date(inq.timestamp).toLocaleString()}</span>
                  <span>Browser LocalStorage Verified</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#10131D] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
}
