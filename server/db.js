import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure database directory exists
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'kinetix.db');
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    program TEXT NOT NULL,
    experience TEXT,
    preferred_time TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pending Concierge',
    notes TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default records if table is empty
const countRow = db.prepare('SELECT COUNT(*) as total FROM inquiries').get();
if (countRow.total === 0) {
  const seedStmt = db.prepare(`
    INSERT INTO inquiries (id, name, email, phone, program, experience, preferred_time, message, status, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))
  `);

  const SEED_DATA = [
    {
      id: 'INQ-9845',
      name: 'Victoria Vance-Sterling',
      email: 'v.sterling@vancecap.com',
      phone: '+1 (212) 555-0199',
      program: 'Membership: Founding Sovereign (ANNUAL)',
      experience: 'Advanced / Competitive',
      preferred_time: 'Morning (6:00 AM - 10:00 AM)',
      message: 'Looking for a private locker allocation, valet parking, and 1-on-1 Olympic weightlifting with Coach Henrik Lindqvist.',
      status: 'VIP Tour Scheduled',
      notes: 'Scheduled for private walkthrough this Thursday at 7:30 AM with Director Thorne.',
      offset: '-1 hours'
    },
    {
      id: 'INQ-9844',
      name: 'Alexander Wright',
      email: 'alex.wright@executiveholdings.com',
      phone: '+1 (555) 234-8901',
      program: 'HYROX Race Simulation & Engine Building',
      experience: 'Advanced / Competitive',
      preferred_time: 'Evening (5:00 PM - 8:00 PM)',
      message: 'Preparing for HYROX Pro Men category in November. Interested in lactate threshold testing and Woodway curve engine conditioning.',
      status: 'Pending Concierge',
      notes: 'Requested lactate threshold protocol specs.',
      offset: '-4 hours'
    },
    {
      id: 'INQ-9843',
      name: 'Elena Rostova',
      email: 'elena.rostova@designstudio.nyc',
      phone: '+1 (555) 876-5432',
      program: 'Sub-Zero Cryo & Infrared Contrast Suite',
      experience: 'Intermediate',
      preferred_time: 'Midday (11:00 AM - 2:00 PM)',
      message: 'Interested in the Obsidian Black tier with daily contrast bath and Finnish rock sauna access to relieve chronic running inflammation.',
      status: 'Contacted',
      notes: 'Called on Sept 4. Sent introductory thermal contrast guide.',
      offset: '-18 hours'
    },
    {
      id: 'INQ-9842',
      name: 'Marcus Brody',
      email: 'mbrody@meridianmedia.co',
      phone: '+1 (917) 443-8821',
      program: 'Striking Dynamics & Sweet Science Boxing',
      experience: 'Beginner / Rebuilding',
      preferred_time: 'Evening (5:00 PM - 8:00 PM)',
      message: 'Former collegiate athlete looking to resume high-intensity conditioning via boxing fundamentals with Coach Dante Ruiz.',
      status: 'Enrolled',
      notes: 'Completed onboarding scan and enrolled in Obsidian Black tier.',
      offset: '-2 days'
    }
  ];

  for (const item of SEED_DATA) {
    seedStmt.run(
      item.id,
      item.name,
      item.email,
      item.phone,
      item.program,
      item.experience,
      item.preferred_time,
      item.message,
      item.status,
      item.notes,
      item.offset
    );
  }
}

export const getAllInquiries = ({ status, search } = {}) => {
  let query = 'SELECT * FROM inquiries WHERE 1=1';
  const params = [];

  if (status && status !== 'All') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search && search.trim()) {
    query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR id LIKE ? OR program LIKE ?)';
    const term = `%${search.trim()}%`;
    params.push(term, term, term, term, term);
  }

  query += ' ORDER BY created_at DESC';

  return db.prepare(query).all(...params);
};

export const getInquiryById = (id) => {
  return db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id);
};

export const createInquiry = (data) => {
  const id = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const stmt = db.prepare(`
    INSERT INTO inquiries (id, name, email, phone, program, experience, preferred_time, message, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.name,
    data.email,
    data.phone || '',
    data.program || 'General VIP Sanctuary Tour',
    data.experience || 'Intermediate',
    data.preferredTime || data.preferred_time || 'Morning (6:00 AM - 10:00 AM)',
    data.message,
    data.status || 'Pending Concierge',
    data.notes || ''
  );

  return getInquiryById(id);
};

export const updateInquiry = (id, { status, notes }) => {
  const current = getInquiryById(id);
  if (!current) return null;

  const newStatus = status !== undefined ? status : current.status;
  const newNotes = notes !== undefined ? notes : current.notes;

  db.prepare(`
    UPDATE inquiries 
    SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(newStatus, newNotes, id);

  return getInquiryById(id);
};

export const deleteInquiry = (id) => {
  const info = db.prepare('DELETE FROM inquiries WHERE id = ?').run(id);
  return info.changes > 0;
};

export const getStats = () => {
  const total = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;
  const pending = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Pending Concierge'").get().count;
  const contacted = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Contacted'").get().count;
  const scheduled = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'VIP Tour Scheduled'").get().count;
  const enrolled = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Enrolled'").get().count;
  const archived = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Archived'").get().count;

  // Program Breakdown
  const programBreakdown = db.prepare(`
    SELECT program, COUNT(*) as count 
    FROM inquiries 
    GROUP BY program 
    ORDER BY count DESC 
    LIMIT 6
  `).all();

  return {
    total,
    pending,
    contacted,
    scheduled,
    enrolled,
    archived,
    conversionRate: total > 0 ? Math.round((enrolled / total) * 100) : 0,
    programBreakdown,
  };
};

export default db;
