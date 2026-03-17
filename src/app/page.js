'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('overall_score');
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  // Compute filtered list directly during render — no useEffect needed
  let filtered = [...movies];

  if (search.trim()) {
    filtered = filtered.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  filtered = filtered.filter((m) => m.overall_score >= minScore);

  filtered.sort((a, b) => {
    if (sortBy === 'overall_score') return b.overall_score - a.overall_score;
    if (sortBy === 'year_asc') return a.year - b.year;
    if (sortBy === 'year_desc') return b.year - a.year;
    if (sortBy === 'episode') return a.episode_number - b.episode_number;
    return 0;
  });

  return (
    <main className="min-h-screen bg-background px-6 py-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Alle film</h1>
        <p className="text-muted-foreground mt-2">Søg og filtrer Hakkedrengenes ratings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel sortBy={sortBy} setSortBy={setSortBy} minScore={minScore} setMinScore={setMinScore} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Ingen film matcher din søgning.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((movie) => (
            <MovieCard key={movie.tmdb_id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}