import { getInquiries, saveInquiry, deleteInquiry } from './storage';

const API_BASE = '/api';

/**
 * Check if the SQLite backend server is reachable
 */
export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return { online: false };
    const data = await res.json();
    return { online: true, database: data.database, databaseFile: data.databaseFile };
  } catch (err) {
    return { online: false, error: err.message };
  }
};

/**
 * Fetch all inquiries with optional status/search filters
 */
export const fetchInquiries = async ({ status = 'All', search = '' } = {}) => {
  try {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.append('status', status);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/inquiries?${params.toString()}`, {
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      const json = await res.json();
      return { source: 'sqlite', data: json.data };
    }
  } catch (err) {
    console.warn('[API] SQLite backend unreachable, falling back to local storage:', err);
  }

  // Fallback to localStorage
  const localList = getInquiries();
  const filtered = localList.filter((item) => {
    const matchesStatus = status === 'All' || item.status === status;
    const matchesSearch =
      !search ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.id?.toLowerCase().includes(search.toLowerCase()) ||
      item.program?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return { source: 'local_storage', data: filtered };
};

/**
 * Submit a new inquiry to SQLite (with localStorage backup)
 */
export const submitInquiry = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      const json = await res.json();
      // Keep local storage synchronized
      saveInquiry(json.data);
      return { source: 'sqlite', data: json.data };
    }
  } catch (err) {
    console.warn('[API] SQLite insert failed, saving to localStorage:', err);
  }

  // Fallback
  const localSaved = saveInquiry(formData);
  return { source: 'local_storage', data: localSaved };
};

/**
 * Update inquiry status & internal notes in SQLite
 */
export const updateInquiryStatus = async (id, { status, notes }) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      const json = await res.json();
      return { source: 'sqlite', data: json.data };
    }
  } catch (err) {
    console.warn('[API] SQLite update failed:', err);
  }

  // Update in localStorage
  try {
    const raw = localStorage.getItem('kinetix_inquiries_data');
    if (raw) {
      const list = JSON.parse(raw);
      const updated = list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: status !== undefined ? status : item.status,
              notes: notes !== undefined ? notes : item.notes,
            }
          : item
      );
      localStorage.setItem('kinetix_inquiries_data', JSON.stringify(updated));
      const target = updated.find((i) => i.id === id);
      return { source: 'local_storage', data: target };
    }
  } catch (e) {
    console.error(e);
  }

  return { source: 'none', data: null };
};

/**
 * Delete an inquiry from SQLite
 */
export const deleteInquiryApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      deleteInquiry(id);
      return { success: true, source: 'sqlite' };
    }
  } catch (err) {
    console.warn('[API] SQLite delete failed, deleting locally:', err);
  }

  deleteInquiry(id);
  return { success: true, source: 'local_storage' };
};

/**
 * Fetch stats from SQLite or calculate from localStorage
 */
export const fetchStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/stats`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const json = await res.json();
      return { source: 'sqlite', data: json.data };
    }
  } catch (err) {
    console.warn('[API] SQLite stats failed, aggregating locally:', err);
  }

  const list = getInquiries();
  const total = list.length;
  const pending = list.filter((i) => i.status === 'Pending Concierge' || !i.status).length;
  const contacted = list.filter((i) => i.status === 'Contacted').length;
  const scheduled = list.filter((i) => i.status === 'VIP Tour Scheduled').length;
  const enrolled = list.filter((i) => i.status === 'Enrolled').length;
  const archived = list.filter((i) => i.status === 'Archived').length;

  return {
    source: 'local_storage',
    data: {
      total,
      pending,
      contacted,
      scheduled,
      enrolled,
      archived,
      conversionRate: total > 0 ? Math.round((enrolled / total) * 100) : 0,
      programBreakdown: [],
    },
  };
};
