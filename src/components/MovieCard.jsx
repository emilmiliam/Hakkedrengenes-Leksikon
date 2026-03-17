import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Link href={`/movies/${movie.tmdb_id}`}>
      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-card border-border p-0">
        
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full bg-muted">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Intet billede
            </div>
          )}

          {/* Score badge overlay */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-black/80 text-white border-none text-sm font-bold px-2 py-1">
              {movie.overall_score}/50
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {movie.year} · Afsnit {movie.episode_number}
          </p>
        </div>

      </Card>
    </Link>
  );
}
