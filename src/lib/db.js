import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'data/hakkedrengene.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tmdb_id INTEGER UNIQUE NOT NULL,
    title TEXT NOT NULL,
    year INTEGER,
    poster_path TEXT
  );

  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER REFERENCES movies(id),
    episode_number INTEGER,
    fed_skurk INTEGER,
    bar_hud_store_muskler INTEGER,
    vilde_vaaben INTEGER,
    staerke_oneliners INTEGER,
    episk_action INTEGER,
    bonus_score INTEGER,
    bonus_label TEXT,
    overall_score REAL, -- out of 50 (5 categories × 10 points each, + optional bonus)
    notes TEXT
  );
`);

export default db;