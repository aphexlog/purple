const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/database');

const router = express.Router();

// Submit survey response
router.post('/:surveyId', (req, res) => {
  const { surveyId } = req.params;
  const { responses } = req.body;
  
  if (!responses || typeof responses !== 'object') {
    res.status(400).json({ error: 'Responses are required' });
    return;
  }
  
  // First check if survey exists and is published
  db.get('SELECT id, published FROM surveys WHERE id = ?', [surveyId], (err, survey) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!survey) {
      res.status(404).json({ error: 'Survey not found' });
      return;
    }
    
    if (!survey.published) {
      res.status(400).json({ error: 'Survey is not published' });
      return;
    }
    
    const responseId = uuidv4();
    const submitted_at = new Date().toISOString();
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.headers['user-agent'];
    
    const sql = `INSERT INTO survey_responses (id, survey_id, responses, submitted_at, ip_address, user_agent)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    const params = [
      responseId,
      surveyId,
      JSON.stringify(responses),
      submitted_at,
      ip_address,
      user_agent
    ];
    
    db.run(sql, params, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.status(201).json({
        id: responseId,
        message: 'Response submitted successfully',
        submitted_at
      });
    });
  });
});

// Get responses for a survey (for survey creators)
router.get('/survey/:surveyId', (req, res) => {
  const { surveyId } = req.params;
  const { limit = 100, offset = 0 } = req.query;
  
  const sql = `SELECT * FROM survey_responses 
               WHERE survey_id = ? 
               ORDER BY submitted_at DESC 
               LIMIT ? OFFSET ?`;
  
  db.all(sql, [surveyId, parseInt(limit), parseInt(offset)], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    const responses = rows.map(row => ({
      ...row,
      responses: JSON.parse(row.responses)
    }));
    
    res.json(responses);
  });
});

// Get response analytics for a survey
router.get('/analytics/:surveyId', (req, res) => {
  const { surveyId } = req.params;
  
  // Get basic stats
  const statsPromises = [
    new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as total_responses FROM survey_responses WHERE survey_id = ?', 
        [surveyId], (err, row) => {
          if (err) reject(err);
          else resolve({ total_responses: row.total_responses });
        });
    }),
    
    new Promise((resolve, reject) => {
      db.get(`SELECT 
                MIN(submitted_at) as first_response,
                MAX(submitted_at) as latest_response
              FROM survey_responses 
              WHERE survey_id = ?`, 
        [surveyId], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
    }),
    
    new Promise((resolve, reject) => {
      db.all(`SELECT 
                DATE(submitted_at) as date,
                COUNT(*) as count
              FROM survey_responses 
              WHERE survey_id = ? 
              GROUP BY DATE(submitted_at) 
              ORDER BY date DESC 
              LIMIT 30`, 
        [surveyId], (err, rows) => {
          if (err) reject(err);
          else resolve({ daily_responses: rows });
        });
    })
  ];
  
  Promise.all(statsPromises)
    .then(results => {
      const analytics = Object.assign({}, ...results);
      res.json(analytics);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a specific response
router.delete('/:responseId', (req, res) => {
  const { responseId } = req.params;
  
  db.run('DELETE FROM survey_responses WHERE id = ?', [responseId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Response not found' });
      return;
    }
    
    res.json({ message: 'Response deleted successfully' });
  });
});

module.exports = router;