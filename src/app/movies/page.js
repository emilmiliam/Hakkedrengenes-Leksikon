'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';

const PAGE_SIZE = 20;

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKeys, setSortKeys] = useState(['overall_score']);
  const [sortDir, setSortDir] = useState('desc');
  const [onlyBonus, setOnlyBonus] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  function handleFilterChange({ sortKeys, sortDir, onlyBonus }) {
    setSortKeys(sortKeys);
    setSortDir(sortDir);
    setOnlyBonus(onlyBonus);
    setPage(1);
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
    const aVal = sortKeys.reduce((sum, key) => sum + (a[key] ?? 0), 0);
    const bVal = sortKeys.reduce((sum, key) => sum + (b[key] ?? 0), 0);
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="min-h-screen bg-background px-6 py-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Hakkedrengenes Leksikon</h1>
        <p className="text-muted-foreground mt-2">
          {filtered.length} film {search.trim() ? 'matcher din søgning' : 'i alt'}
        </p>
      </div>

      <div className="flex flex-row gap-4 mb-8 items-start">
        <SearchBar
          value={search}
          onChange={(val) => { setSearch(val); setPage(1); }}
        />
        <FilterPanel
          sortKeys={sortKeys}
          sortDir={sortDir}
          onlyBonus={onlyBonus}
          onChange={handleFilterChange}
        />
      </div>

      {paginated.length === 0 ? (
        <p className="text-muted-foreground">Ingen film matcher din søgning.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {paginated.map((movie) => (
            <MovieCard key={movie.tmdb_id} movie={movie} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground disabled:opacity-30 hover:border-primary transition-colors"
          >
            ← Forrige
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                n === page
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-foreground hover:border-primary'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground disabled:opacity-30 hover:border-primary transition-colors"
          >
            Næste →
          </button>
        </div>
      )}
    </main>
  );
}