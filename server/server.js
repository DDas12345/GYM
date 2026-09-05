import express from 'express';
import cors from 'cors';
import {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getStats,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: 'sqlite',
    databaseFile: 'database/kinetix.db',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const { status, search } = req.query;
    const list = getAllInquiries({ status, search });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ success: false, error: 'Database read failed' });
  }
});

// GET /api/inquiries/:id
app.get('/api/inquiries/:id', (req, res) => {
  try {
    const item = getInquiryById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/inquiries
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const created = createInquiry(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ success: false, error: 'Database insert failed' });
  }
});

// PATCH /api/inquiries/:id
app.patch('/api/inquiries/:id', (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = updateInquiry(req.params.id, { status, notes });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating inquiry:', err);
    res.status(500).json({ success: false, error: 'Database update failed' });
  }
});

// DELETE /api/inquiries/:id
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const success = deleteInquiry(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted from database' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ success: false, error: 'Database delete failed' });
  }
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ success: false, error: 'Failed to aggregate stats' });
  }
});

app.listen(PORT, () => {
  console.log(`[KINETIX API] SQLite Backend Server active on http://localhost:${PORT}`);
});
