const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/database');

const router = express.Router();

// Get all surveys
router.get('/', (req, res) => {
  const { published } = req.query;
  let sql = 'SELECT * FROM surveys';
  let params = [];
  
  if (published !== undefined) {
    sql += ' WHERE published = ?';
    params.push(published === 'true' ? 1 : 0);
  }
  
  sql += ' ORDER BY created_at DESC';
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    const surveys = rows.map(row => ({
      ...row,
      questions: JSON.parse(row.questions),
      settings: row.settings ? JSON.parse(row.settings) : {},
      creator_info: row.creator_info ? JSON.parse(row.creator_info) : null,
      published: Boolean(row.published)
    }));
    
    res.json(surveys);
  });
});

// Get survey by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM surveys WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Survey not found' });
      return;
    }
    
    const survey = {
      ...row,
      questions: JSON.parse(row.questions),
      settings: row.settings ? JSON.parse(row.settings) : {},
      creator_info: row.creator_info ? JSON.parse(row.creator_info) : null,
      published: Boolean(row.published)
    };
    
    res.json(survey);
  });
});

// Create new survey
router.post('/', (req, res) => {
  const { title, description, type = 'fun', questions, settings = {}, creator_info } = req.body;
  
  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    res.status(400).json({ error: 'Title and at least one question are required' });
    return;
  }
  
  const id = uuidv4();
  const created_at = new Date().toISOString();
  
  const sql = `INSERT INTO surveys (id, title, description, type, questions, settings, creator_info, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const params = [
    id,
    title,
    description,
    type,
    JSON.stringify(questions),
    JSON.stringify(settings),
    creator_info ? JSON.stringify(creator_info) : null,
    created_at,
    created_at
  ];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.status(201).json({
      id,
      title,
      description,
      type,
      questions,
      settings,
      creator_info,
      created_at,
      updated_at: created_at,
      published: false
    });
  });
});

// Update survey
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, type, questions, settings } = req.body;
  
  const updated_at = new Date().toISOString();
  
  const sql = `UPDATE surveys 
               SET title = ?, description = ?, type = ?, questions = ?, settings = ?, updated_at = ?
               WHERE id = ?`;
  
  const params = [
    title,
    description,
    type,
    JSON.stringify(questions),
    JSON.stringify(settings || {}),
    updated_at,
    id
  ];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Survey not found' });
      return;
    }
    
    res.json({ message: 'Survey updated successfully' });
  });
});

// Publish/unpublish survey
router.patch('/:id/publish', (req, res) => {
  const { id } = req.params;
  const { published } = req.body;
  
  const sql = `UPDATE surveys 
               SET published = ?, published_at = ?, updated_at = ?
               WHERE id = ?`;
  
  const params = [
    published ? 1 : 0,
    published ? new Date().toISOString() : null,
    new Date().toISOString(),
    id
  ];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Survey not found' });
      return;
    }
    
    res.json({ 
      message: `Survey ${published ? 'published' : 'unpublished'} successfully`,
      published: Boolean(published)
    });
  });
});

// Delete survey
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM surveys WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Survey not found' });
      return;
    }
    
    res.json({ message: 'Survey deleted successfully' });
  });
});

module.exports = router;