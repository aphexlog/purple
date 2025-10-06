const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../data/surveys.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('📁 Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Surveys table
  db.run(`CREATE TABLE IF NOT EXISTS surveys (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,

    questions TEXT NOT NULL,
    settings TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT 0,
    published_at DATETIME,
    creator_info TEXT
  )`);

  // Survey responses table
  db.run(`CREATE TABLE IF NOT EXISTS survey_responses (
    id TEXT PRIMARY KEY,
    survey_id TEXT NOT NULL,
    responses TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT,
    FOREIGN KEY (survey_id) REFERENCES surveys (id)
  )`);

  // Survey analytics table
  db.run(`CREATE TABLE IF NOT EXISTS survey_analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (survey_id) REFERENCES surveys (id)
  )`);

  console.log('✅ Database tables initialized');
}

module.exports = db;