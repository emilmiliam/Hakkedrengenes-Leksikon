import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import RatingBreakdown from '@/components/RatingBreakdown';

export default async function MoviePage({ params }) {
  const { id } = await params;

  // Fetch our podcast ratings from the DB
  const ratingsRes = await fetch(`http://localhost:3000/api/movies`, {
    cache: 'no-store',
  });
  const allMovies = await ratingsRes.json();
  const movie = allMovies.find((m) => m.tmdb_id === parseInt(id));

  // Fetch full movie details + cast from TMDB via our secure proxy
  const tmdbRes = await fetch(`http://localhost:3000/api/tmdb?movieId=${id}`, {
    cache: 'no-store',
  });
  const tmdb = await tmdbRes.json();

  const posterUrl = tmdb.poster_path
    ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}`
    : null;

  const cast = tmdb.credits?.cast?.slice(0, 6) ?? [];

  return (
    <main className="min-h-screen bg-background max-w-5xl mx-auto px-6 py-12">

      {/* Back link */}
      <Link href="/" className="text-muted-foreground hover:text-foreground text-sm mb-8 inline-block">
        ← Tilbage
      </Link>

      {/* Hero section */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {posterUrl && (
          <div className="relative w-48 h-72 shrink-0 rounded-xl overflow-hidden shadow-2xl">
            <Image src={posterUrl} alt={tmdb.title} fill className="object-cover" />
          </div>
        )}

        <div className="flex flex-col justify-end gap-3">
          <h1 className="text-4xl font-bold text-foreground">{tmdb.title}</h1>
          <p className="text-muted-foreground">{tmdb.release_date?.slice(0, 4)} · {tmdb.runtime} min</p>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">{tmdb.overview}</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {tmdb.genres?.map((g) => (
              <Badge key={g.id} variant="secondary">{g.name}</Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Podcast ratings */}
      {movie && <RatingBreakdown movie={movie} />}

      <Separator className="my-8" />

      {/* Cast */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Cast</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {cast.map((actor) => (
            <div key={actor.id} className="flex flex-col items-center text-center gap-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">?</div>
                )}
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">{actor.name}</p>
              <p className="text-xs text-muted-foreground leading-tight">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}