'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKeys, setSortKeys] = useState(['overall_score']);
  const [sortDir, setSortDir] = useState('desc');
  const [onlyBonus, setOnlyBonus] = useState(false);

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  function handleFilterChange({ sortKeys, sortDir, onlyBonus }) {
    setSortKeys(sortKeys);
    setSortDir(sortDir);
    setOnlyBonus(onlyBonus);
  }

  let filtered = [...movies];

  if (search.trim()) {
    filtered = filtered.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (onlyBonus) {
    filtered = filtered.filter((m) => m.bonus_label != null);
  }

  filtered.sort((a, b) => {
    // Sum all selected keys for each movie
    const aVal = sortKeys.reduce((sum, key) => sum + (a[key] ?? 0), 0);
    const bVal = sortKeys.reduce((sum, key) => sum + (b[key] ?? 0), 0);
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  return (
    <main className="min-h-screen bg-background px-6 py-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Hakkedrengene</h1>
        <p className="text-muted-foreground mt-2">Alle filmene hakkedrengene har set</p>
      </div>

      <div className="flex flex-row gap-4 mb-8 items-start">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel
          sortKeys={sortKeys}
          sortDir={sortDir}
          onlyBonus={onlyBonus}
          onChange={handleFilterChange}
        />
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