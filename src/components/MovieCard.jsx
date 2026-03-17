import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { CATEGORIES } from '@/lib/categories';

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

          {/* Score badge with hover card */}
          <div
            className="absolute top-2 right-2"
            onClick={(e) => e.preventDefault()}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge className="bg-black/80 text-white border-none text-sm font-bold px-2 py-1 cursor-default">
                  {movie.overall_score}/50
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-56 p-3" side="left">
                <p className="text-xs font-semibold text-foreground mb-2">Hakkedrengenes dom</p>
                <div className="space-y-1">
                  {CATEGORIES.map(({ key, label }) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{movie[key]}/10</span>
                    </div>
                  ))}
                  {movie.bonus_label && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{movie.bonus_label}</span>
                      <span className="font-medium text-foreground">{movie.bonus_score}/10</span>
                    </div>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">{movie.year}</p>
        </div>

      </Card>
    </Link>
  );
}