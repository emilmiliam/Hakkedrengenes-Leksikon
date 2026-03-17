import db from '@/lib/db';

export async function GET() {
  const insertMovie = db.prepare(`
    INSERT OR IGNORE INTO movies (tmdb_id, title, year, poster_path)
    VALUES (@tmdb_id, @title, @year, @poster_path)
  `);

  const insertRating = db.prepare(`
    INSERT INTO ratings (
      movie_id, episode_number,
      fed_skurk, bar_hud_store_muskler, vilde_vaaben,
      staerke_oneliners, episk_action,
      bonus_label, bonus_score,
      overall_score, notes
    ) VALUES (
      (SELECT id FROM movies WHERE tmdb_id = @tmdb_id),
      @episode_number,
      @fed_skurk, @bar_hud_store_muskler, @vilde_vaaben,
      @staerke_oneliners, @episk_action,
      @bonus_label, @bonus_score,
      @overall_score, @notes
    )
  `);

  const addMovie = db.transaction((data) => {
    insertMovie.run(data);
    insertRating.run(data);
  });

  // The Terminator (1984)
  addMovie({
    tmdb_id: 218,
    title: 'The Terminator',
    year: 1984,
    poster_path: '/qvktm0BHcnmDpul4Hz0lGIazWPr.jpg',
    episode_number: 1,
    fed_skurk: 10,
    bar_hud_store_muskler: 9,
    vilde_vaaben: 10,
    staerke_oneliners: 10,
    episk_action: 9,
    bonus_label: null,
    bonus_score: null,
    overall_score: 48,
    notes: 'En klassiker. Arnold er perfekt som maskine.',
  });

  // Die Hard (1988)
  addMovie({
    tmdb_id: 562,
    title: 'Die Hard',
    year: 1988,
    poster_path: '/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg',
    episode_number: 2,
    fed_skurk: 10,
    bar_hud_store_muskler: 7,
    vilde_vaaben: 9,
    staerke_oneliners: 10,
    episk_action: 10,
    bonus_label: 'Julestemning',
    bonus_score: 10,
    overall_score: 46,
    notes: 'Yippee-ki-yay. Nok en julefilm.',
  });

  return Response.json({ success: true, message: 'Seeded 2 movies!' });
}