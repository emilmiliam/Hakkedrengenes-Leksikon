'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/api/movies?carousel=true')
      .then((res) => res.json())
      .then((data) => setFeatured(data));
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero carousel ── */}
      {featured.length > 0 && (
        <section className="relative w-full">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {featured.map((movie) => (
                <CarouselItem key={movie.tmdb_id}>
                  <Link href={`/movies/${movie.id}`}>
                    <div className="relative w-full h-[520px] overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div className="absolute bottom-12 left-10">
                        <p className="text-4xl font-bold text-white drop-shadow mb-3">{movie.title}</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-sm">
                            {movie.overall_score}/50
                          </Badge>
                          <span className="text-white/70 text-sm">{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>
      )}
    </div>
  );
}