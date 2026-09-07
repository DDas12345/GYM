import { getInquiries, saveInquiry, deleteInquiry } from './storage';

/**
 * Check if backend is reachable (Mocked to true since we use localStorage)
 */
export const checkBackendHealth = async () => {
  return { online: true, source: 'local_storage' };
};

/**
 * Fetch all inquiries with optional status/search filters
 */
export const fetchInquiries = async ({ status = 'All', search = '' } = {}) => {
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
 * Submit a new inquiry
 */
export const submitInquiry = async (formData) => {
  const localSaved = saveInquiry(formData);
  return { source: 'local_storage', data: localSaved };
};

/**
 * Update inquiry status & internal notes
 */
export const updateInquiryStatus = async (id, { status, notes }) => {
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
 * Delete an inquiry
 */
export const deleteInquiryApi = async (id) => {
  deleteInquiry(id);
  return { success: true, source: 'local_storage' };
};

/**
 * Fetch stats
 */
export const fetchStats = async () => {
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
