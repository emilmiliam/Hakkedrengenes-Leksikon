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
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch('/api/movies?carousel=true')
      .then((res) => res.json())
      .then((data) => setFeatured(data));
  }, []);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  const hosts = [
    {
      name: 'Jacob',
      role: 'Vært & Producer',
      socials: [
        // { label: 'Instagram', href: 'https://instagram.com/jacob' },
      ],
    },
    {
      name: 'Dan',
      role: 'Vært',
      socials: [
        // { label: 'Instagram', href: 'https://instagram.com/dan' },
      ],
    },
    {
      name: 'Morten',
      role: 'Vært',
      socials: [
        // { label: 'Instagram', href: 'https://instagram.com/morten' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Carousel ── */}
      {featured.length > 0 && (
        <section className="relative w-full">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {featured.map((movie) => (
                <CarouselItem key={movie.tmdb_id}>
                  <Link href={`/movies/${movie.tmdb_id}`}>
                    <div className="relative w-full h-[520px] overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover object-top"
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

      {/* ── Hvem er Hakkedrengene ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">

      {/* Logo */}
      <div className="flex justify-center mb-10">
        <div className="relative w-64 h-64">
          <Image
            src="/Hakkedrengene.jpg"
            alt="Hakkedrengene logo"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, oklch(0.145 0 0) 70%)'
          }} />
        </div>
      </div>


        <h2 className="text-3xl font-bold text-foreground text-center mb-4">
          Hvem er Hakkedrengene?
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed mb-12">
        {"I Hakkedrengene går Jacob, Dan og Morten i dybden med de største actionfilm fra 80'erne og frem til nu. De snakker om film med fremragende skuespillere som Arnold Schwarzenegger, Sylvester Stallone, Jean Claude Van Damme, Tom Cruise, Keanu Reeves m.fl. Det er film fra deres barndom som de elsker, og den kærlighed giver de nu videre i podcastformat."}
        </p>

        <Separator className="mb-12" />

        {/* Host cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {hosts.map((host) => (
            <div
              key={host.name}
              className="flex flex-col items-center text-center bg-card border border-border rounded-2xl p-6 gap-4"
            >
              {/* Headshot skeleton placeholder */}
              <div className="w-28 h-28 rounded-full bg-muted animate-pulse" />

              <div>
                <p className="text-lg font-bold text-foreground">{host.name}</p>
                <p className="text-sm text-muted-foreground">{host.role}</p>
              </div>

              {/* Socials — uncomment links in the hosts array above to activate */}
              {host.socials.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {host.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}