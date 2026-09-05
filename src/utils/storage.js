const STORAGE_KEY = 'kinetix_inquiries_data';

const DEFAULT_INQUIRIES = [
  {
    id: 'INQ-9842',
    name: 'Alexander Wright',
    email: 'alex.wright@executiveholdings.com',
    phone: '+1 (555) 234-8901',
    program: 'HYROX & MetCon Conditioning',
    experience: 'Advanced / Competitive',
    preferredTime: 'Morning (6:00 AM - 9:00 AM)',
    message: 'Interested in the Obsidian Black tier with private locker and 1-on-1 metabolic conditioning with Coach Thorne.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: 'Confirmed - VIP Tour'
  },
  {
    id: 'INQ-9841',
    name: 'Elena Rostova',
    email: 'elena.rostova@designstudio.nyc',
    phone: '+1 (555) 876-5432',
    program: 'Sensory Recovery & Contrast Bath',
    experience: 'Intermediate',
    preferredTime: 'Evening (5:00 PM - 8:00 PM)',
    message: 'Looking to incorporate contrast hydrotherapy, infrared sauna, and reformer mobility into my weekly routine.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: 'In Review'
  }
];

export const getInquiries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read inquiries from localStorage:', err);
    return DEFAULT_INQUIRIES;
  }
};

export const saveInquiry = (inquiry) => {
  try {
    const existing = getInquiries();
    const newEntry = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      status: 'Pending Concierge Contact',
      ...inquiry,
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Failed to save inquiry to localStorage:', err);
    return null;
  }
};

export const deleteInquiry = (id) => {
  try {
    const existing = getInquiries();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete inquiry:', err);
    return [];
  }
};
