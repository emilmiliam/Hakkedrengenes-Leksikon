'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES } from '@/lib/categories';

export default function AdminPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState({});
  const [bonusLabel, setBonusLabel] = useState('');
  const [bonusScore, setBonusScore] = useState('');
  const [bodyCount, setBodyCount] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(null);

  async function handleSearch() {
    if (!query.trim()) return;
    const res = await fetch(`/api/tmdb?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results?.slice(0, 6) ?? []);
    setSelected(null);
  }

  function handleSelect(movie) {
    setSelected(movie);
    setResults([]);
    setQuery(movie.title);
    setScores({});
  }

  function handleScoreChange(key, value) {
    const num = Math.min(10, Math.max(0, Number(value)));
    setScores((prev) => ({ ...prev, [key]: num }));
  }

  async function handleSubmit() {
    if (!selected) return;
    setStatus('loading');

    const payload = {
      tmdb_id: selected.id,
      title: selected.title,
      year: parseInt(selected.release_date?.slice(0, 4)),
      poster_path: selected.poster_path,
      backdrop_path: selected.backdrop_path ?? null,
      notes: notes || null,
      bonus_label: bonusLabel || null,
      bonus_score: bonusScore ? parseInt(bonusScore) : null,
      body_count: bodyCount ? parseInt(bodyCount) : null,
      // Only sum the 5 fixed categories — bonus does not affect ranking
      overall_score: CATEGORIES.reduce((sum, { key }) => sum + (scores[key] ?? 0), 0),
      ...Object.fromEntries(CATEGORIES.map(({ key }) => [key, scores[key] ?? 0])),
    };

    const res = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus('success');
      setSelected(null);
      setQuery('');
      setScores({});
      setBonusLabel('');
      setBonusScore('');
      setBodyCount('');
      setNotes('');
    } else {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-2">Tilføj film</h1>
      <p className="text-muted-foreground mb-8">Søg efter en film og tilføj Hakkedrengenes scores</p>

      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Søg efter film på TMDB..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Søg
        </button>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          {results.map((movie) => (
            <Card
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="cursor-pointer hover:border-primary transition-colors p-3 flex gap-3 items-center"
            >
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  width={40}
                  height={60}
                  className="rounded object-cover shrink-0"
                />
              )}
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">{movie.title}</p>
                <p className="text-xs text-muted-foreground">{movie.release_date?.slice(0, 4)}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selected && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {selected.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w92${selected.poster_path}`}
                alt={selected.title}
                width={50}
                height={75}
                className="rounded object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-foreground">{selected.title}</h2>
              <p className="text-muted-foreground text-sm">{selected.release_date?.slice(0, 4)}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Valgt</Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Kategorier (0–10)</h3>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs text-muted-foreground">{label}</label>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    value={scores[key] ?? ''}
                    onChange={(e) => handleScoreChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Ekstra kategori (valgfri)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Navn</label>
                <Input
                  placeholder="fx Julestemning"
                  value={bonusLabel}
                  onChange={(e) => setBonusLabel(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Score (0–10)</label>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  value={bonusScore}
                  onChange={(e) => setBonusScore(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Body count</label>
            <Input
              type="number"
              min={0}
              placeholder="Antal dødsfald på skærmen"
              value={bodyCount}
              onChange={(e) => setBodyCount(e.target.value)}
              className="w-48"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Noter (valgfri)</label>
            <Input
              placeholder="Kommentarer fra episoden..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Total preview — bonus excluded */}
          <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total score</span>
            <span className="text-2xl font-bold text-foreground">
              {CATEGORIES.reduce((sum, { key }) => sum + (scores[key] ?? 0), 0)}
              <span className="text-sm font-normal text-muted-foreground">/50</span>
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Gemmer...' : 'Tilføj film'}
          </button>

          {status === 'success' && (
            <p className="text-green-500 text-sm text-center">Film tilføjet! ✓</p>
          )}
          {status === 'error' && (
            <p className="text-destructive text-sm text-center">Noget gik galt. Prøv igen.</p>
          )}
        </div>
      )}
    </main>
  );
}