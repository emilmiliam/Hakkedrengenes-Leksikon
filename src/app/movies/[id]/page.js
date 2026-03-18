import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import RatingBreakdown from '@/components/RatingBreakdown';
import MovieDetails from '@/components/MovieDetails';

export default async function MoviePage({ params }) {
  const { id } = await params;

  const ratingsRes = await fetch(`http://localhost:3000/api/movies`, {
    cache: 'no-store',
  });
  const allMovies = await ratingsRes.json();
  const movie = allMovies.find((m) => m.tmdb_id === parseInt(id));

  const tmdbRes = await fetch(`http://localhost:3000/api/tmdb?movieId=${id}`, {
    cache: 'no-store',
  });
  const tmdb = await tmdbRes.json();

  const posterUrl = tmdb.poster_path
    ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}`
    : null;

  const backdropPath = movie?.backdrop_path ?? tmdb.backdrop_path;
  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
    : null;

  const cast = tmdb.credits?.cast?.slice(0, 6) ?? [];
  const tmdbUrl = `https://www.themoviedb.org/movie/${id}`;

  return (
    <main className="min-h-screen bg-background">

      {/* Backdrop hero with gradient */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={tmdb.title}
            fill
            className="object-cover object-top"
            priority
          />
        )}
        {/* Gradient — fades into background at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Tilbage link sits on top of the backdrop */}
        <div className="absolute top-6 left-6 max-w-5xl">
          <Link href="/movies" className="text-white/80 hover:text-white text-sm transition-colors">
            ← Tilbage
          </Link>
        </div>
      </div>

      {/* Content — pulled up over the backdrop gradient */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 pb-16">

        {/* Hero — poster + info side by side */}
        <div className="flex flex-col md:flex-row gap-8 mt-4">

          {/* Poster */}
          {posterUrl && (
            <div className="relative w-48 shrink-0 rounded-xl overflow-hidden shadow-2xl self-start" style={{ aspectRatio: '2/3' }}>
              <Image src={posterUrl} alt={tmdb.title} fill className="object-cover" />
            </div>
          )}

          {/* Middle — title, synopsis, genres */}
          <div className="flex flex-col gap-3 flex-1">
            <h1 className="text-4xl font-bold text-foreground">{tmdb.title}</h1>
            <p className="text-muted-foreground text-sm">{tmdb.release_date?.slice(0, 4)} · {tmdb.runtime} min</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{tmdb.overview}</p>
            <div className="flex gap-2 flex-wrap mt-1">
              {tmdb.genres?.map((g) => (
                <Badge key={g.id} variant="secondary">{g.name}</Badge>
              ))}
            </div>
          </div>

          {/* Right — film info box */}
          <div className="shrink-0 w-full md:w-56">
            <MovieDetails tmdb={tmdb} movie={movie} />
          </div>

        </div>

        <Separator className="my-8" />

        {/* Podcast ratings */}
        {movie && <RatingBreakdown movie={movie} />}

        <Separator className="my-8" />

        {/* Cast */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Cast</h2>
            <a
              href={`${tmdbUrl}/cast`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Se hele castet på TMDB →
            </a>
          </div>

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

      </div>
    </main>
  );
}