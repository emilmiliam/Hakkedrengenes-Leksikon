import db from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const carousel = searchParams.get('carousel') === 'true';

  if (carousel) {
    const movies = db.prepare(`
      SELECT movies.*, ratings.*
      FROM movies
      LEFT JOIN ratings ON movies.id = ratings.movie_id
      WHERE movies.backdrop_path IS NOT NULL
      ORDER BY RANDOM()
      LIMIT 6
    `).all();
    return Response.json(movies);
  }

  const movies = db.prepare(`
    SELECT movies.*, ratings.*
    FROM movies
    LEFT JOIN ratings ON movies.id = ratings.movie_id
    ORDER BY ratings.overall_score DESC
  `).all();

  return Response.json(movies);
}

export async function POST(request) {
  const body = await request.json();

  const insertMovie = db.prepare(`
    INSERT OR IGNORE INTO movies (tmdb_id, title, year, poster_path, backdrop_path)
    VALUES (@tmdb_id, @title, @year, @poster_path, @backdrop_path)
  `);

  const insertRating = db.prepare(`
    INSERT INTO ratings (
      movie_id,
      fed_skurk, bar_hud_store_muskler, vilde_vaaben,
      staerke_oneliners, episk_action,
      bonus_label, bonus_score,
      overall_score, notes, body_count
    ) VALUES (
      (SELECT id FROM movies WHERE tmdb_id = @tmdb_id),
      @fed_skurk, @bar_hud_store_muskler, @vilde_vaaben,
      @staerke_oneliners, @episk_action,
      @bonus_label, @bonus_score,
      @overall_score, @notes, @body_count
    )
  `);

  const addMovie = db.transaction((data) => {
    insertMovie.run(data);
    insertRating.run(data);
  });

  addMovie(body);

  return Response.json({ success: true }, { status: 201 });
}