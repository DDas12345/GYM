import React, { useState, useEffect } from 'react';
import {
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiryApi,
  fetchStats,
  checkBackendHealth,
  submitInquiry
} from '../utils/api';
import {
  Database,
  Search,
  Filter,
  Download,
  PlusCircle,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  Clock,
  Calendar,
  Shield,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  UserCheck,
  ChevronRight,
  ArrowLeft,
  FileText,
  Sparkles,
  Save
} from 'lucide-react';

const STATUS_COLORS = {
  'Pending Concierge': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'Contacted': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'VIP Tour Scheduled': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Enrolled': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'Archived': 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

export default function Dashboard({ onBackToSite }) {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState({ online: false });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingNotes, setEditingNotes] = useState({});
  const [actionSuccess, setActionSuccess] = useState('');

  const loadDashboardData = async () => {
    setLoading(true);
    const [h, s, inq] = await Promise.all([
      checkBackendHealth(),
      fetchStats(),
      fetchInquiries({ status: statusFilter, search: searchQuery }),
    ]);

    setHealth(h);
    setStats(s.data);
    setInquiries(inq.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDashboardData();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateInquiryStatus(id, { status: newStatus });
    showNotification(`Inquiry ${id} marked as "${newStatus}"`);
    loadDashboardData();
  };

  const handleSaveNotes = async (id) => {
    const note = editingNotes[id];
    await updateInquiryStatus(id, { notes: note });
    showNotification(`Internal note updated for ${id}`);
    loadDashboardData();
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Permanently delete inquiry ${id} from SQLite database?`)) {
      await deleteInquiryApi(id);
      showNotification(`Inquiry ${id} deleted from database`);
      loadDashboardData();
    }
  };

  const showNotification = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleSimulateInquiry = async () => {
    const names = ['Soren Thorne', 'Cassandra Sterling', 'Dmitri Petrov', 'Amara Patel'];
    const programs = [
      'Titan Hypertrophy & Olympic Lifting',
      'Vortex Metabolic Conditioning (MetCon)',
      'Membership: Obsidian Black (ANNUAL)',
      'Sub-Zero Cryo & Infrared Contrast Suite'
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProg = programs[Math.floor(Math.random() * programs.length)];

    await submitInquiry({
      name: `${randomName}`,
      email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
      phone: '+1 (555) 019-' + Math.floor(1000 + Math.random() * 9000),
      program: randomProg,
      experience: 'Advanced / Competitive',
      preferredTime: 'Morning (6:00 AM - 10:00 AM)',
      message: 'Automated test intake from executive dashboard to verify SQLite persistence.',
      status: 'Pending Concierge',
    });

    showNotification(`Generated test intake for ${randomName}`);
    loadDashboardData();
  };

  const exportToCSV = () => {
    if (!inquiries.length) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Program', 'Status', 'Preferred Time', 'Created At', 'Message', 'Notes'];
    const rows = inquiries.map((item) => [
      item.id,
      `"${item.name || ''}"`,
      `"${item.email || ''}"`,
      `"${item.phone || ''}"`,
      `"${item.program || ''}"`,
      `"${item.status || ''}"`,
      `"${item.preferred_time || item.preferredTime || ''}"`,
      `"${item.created_at || item.timestamp || ''}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kinetix_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 font-sans pb-24">
      {/* Top Notification Toast */}
      {actionSuccess && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Dashboard Executive Header */}
      <header className="sticky top-0 z-40 bg-[#0A0C13]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Public Site</span>
            </button>

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-extrabold font-display text-sm shadow-gold-glow">
                K
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white font-display tracking-tight flex items-center gap-2">
                  CONCIERGE EXECUTIVE LEDGER
                </h1>
                <p className="text-[10px] text-amber-400/90 font-mono uppercase tracking-widest -mt-0.5">
                  Live Response Management
                </p>
              </div>
            </div>
          </div>

          {/* Database Health Badge & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Database Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              {health.online ? (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>SQLite (database/kinetix.db)</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Local Storage Mode</span>
                </span>
              )}
            </div>

            {/* Simulate Test Intake */}
            <button
              onClick={handleSimulateInquiry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
              title="Add a test submission directly into SQLite"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Mock Intake</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            {/* Refresh */}
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Refresh SQLite Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                Total Submissions
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                {stats?.total ?? inquiries.length}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Stored in persistent SQLite
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Pending */}
          <div className="glass-card p-5 rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block">
                Action Required
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display mt-1">
                {stats?.pending ?? inquiries.filter(i => i.status === 'Pending Concierge').length}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Unprocessed intakes
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Tours Scheduled */}
          <div className="glass-card p-5 rounded-2xl border border-blue-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 block">
                VIP Tours Booked
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-display mt-1">
                {stats?.scheduled ?? inquiries.filter(i => i.status === 'VIP Tour Scheduled').length}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Sanctuary walkthroughs
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Enrolled */}
          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block">
                Enrolled Members
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display mt-1">
                {stats?.enrolled ?? inquiries.filter(i => i.status === 'Enrolled').length}
              </div>
              <span className="text-[11px] text-emerald-400/80 mt-1 block flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stats?.conversionRate ?? 25}% Enrollment Rate</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Pending Concierge', 'Contacted', 'VIP Tour Scheduled', 'Enrolled', 'Archived'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-amber-500 text-black font-bold shadow-gold-glow'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, ID..."
              className="w-full pl-9 pr-16 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-slate-200"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Inquiry Records Ledger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Displaying {inquiries.length} Inquiries from SQLite Ledger</span>
            <span className="text-[11px] font-mono text-slate-500">Auto-synced with `database/kinetix.db`</span>
          </div>

          {inquiries.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center space-y-3">
              <Database className="w-10 h-10 text-slate-600 mx-auto stroke-[1.5]" />
              <h3 className="text-base font-bold text-slate-300">No records found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No inquiries matched your current filter criteria. Try changing status or clearing your search term.
              </p>
              <button
                onClick={() => { setStatusFilter('All'); setSearchQuery(''); loadDashboardData(); }}
                className="mt-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            inquiries.map((inq) => {
              const currentNote = editingNotes[inq.id] !== undefined ? editingNotes[inq.id] : (inq.notes || '');
              const statusStyle = STATUS_COLORS[inq.status] || STATUS_COLORS['Pending Concierge'];

              return (
                <div
                  key={inq.id}
                  className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-4"
                >
                  {/* Top Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        {inq.id}
                      </span>
                      <h3 className="text-lg font-bold text-white font-display">
                        {inq.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300">
                        {inq.experience || 'Fitness Member'}
                      </span>
                    </div>

                    {/* Status Select Dropdown & Delete */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Status:</span>
                        <select
                          value={inq.status || 'Pending Concierge'}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none cursor-pointer ${statusStyle}`}
                        >
                          <option value="Pending Concierge">Pending Concierge</option>
                          <option value="Contacted">Contacted</option>
                          <option value="VIP Tour Scheduled">VIP Tour Scheduled</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete inquiry from SQLite"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Core Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <a href={`mailto:${inq.email}`} className="hover:underline text-slate-200">
                        {inq.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <a href={`tel:${inq.phone}`} className="hover:underline text-slate-200">
                        {inq.phone || 'No phone provided'}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{inq.preferred_time || inq.preferredTime || 'Flexible Window'}</span>
                    </div>
                  </div>

                  {/* Requested Program Badge */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400">Target Discipline / Allocation:</span>
                    <span className="font-bold text-amber-300 font-display">
                      {inq.program}
                    </span>
                  </div>

                  {/* Message from Prospect */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 leading-relaxed">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono font-bold mb-1">
                      Applicant Inquiry / Objectives:
                    </span>
                    {inq.message}
                  </div>

                  {/* Concierge Internal Notes Input */}
                  <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                      Internal Concierge Notes:
                    </span>
                    <input
                      type="text"
                      value={currentNote}
                      onChange={(e) => setEditingNotes({ ...editingNotes, [inq.id]: e.target.value })}
                      placeholder="Add private staff notes (e.g. called back on 09/06, scheduled with Director Thorne)..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => handleSaveNotes(inq.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1 shrink-0"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>

                  {/* Timestamp Footer */}
                  <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1">
                    <span>Intake Timestamp: {new Date(inq.created_at || inq.timestamp).toLocaleString()}</span>
                    <span className="text-emerald-400/80">Indexed in SQLite</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
