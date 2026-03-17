'use client';

import { useRef, useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/categories';

const SOLO_OPTIONS = [
  { key: 'overall_score', label: 'Score' },
  { key: 'year', label: 'Udgivelsesår' },
];

export default function FilterPanel({ sortKeys, sortDir, onlyBonus, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isFiltered = !(sortKeys.length === 1 && sortKeys[0] === 'overall_score' && sortDir === 'desc') || onlyBonus;

  // Solo options (Score, Udgivelsesår) — selecting clears category selection
  function handleSolo(key) {
    if (sortKeys.length === 1 && sortKeys[0] === key) {
      onChange({ sortKeys: [key], sortDir: sortDir === 'desc' ? 'asc' : 'desc', onlyBonus });
    } else {
      onChange({ sortKeys: [key], sortDir: 'desc', onlyBonus });
    }
  }

  // Category options — multi-selectable, clears solo options
  function handleCategory(key) {
    const isSoloActive = SOLO_OPTIONS.some(o => sortKeys.includes(o.key));
    let newKeys;

    if (isSoloActive) {
      // Switch from solo to category
      newKeys = [key];
    } else if (sortKeys.includes(key)) {
      // Deselect — but keep at least one
      newKeys = sortKeys.filter((k) => k !== key);
      if (newKeys.length === 0) newKeys = ['overall_score'];
    } else {
      // Add to selection
      newKeys = [...sortKeys, key];
    }

    onChange({ sortKeys: newKeys, sortDir, onlyBonus });
  }

  function toggleDir() {
    onChange({ sortKeys, sortDir: sortDir === 'desc' ? 'asc' : 'desc', onlyBonus });
  }

  function handleBonus() {
    onChange({ sortKeys, sortDir, onlyBonus: !onlyBonus });
  }

  const isSoloActive = (key) => sortKeys.length === 1 && sortKeys[0] === key;
  const isCatActive = (key) => !SOLO_OPTIONS.some(o => sortKeys.includes(o.key)) && sortKeys.includes(key);

  return (
    <div className="relative" ref={ref}>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors
          ${open
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground'
          }`}
      >
        <span>Filter</span>
        {isFiltered && (
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: open ? 'white' : 'var(--primary)' }}
          />
        )}
        <span className="text-xs">{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 bg-card border border-border rounded-2xl p-4 shadow-2xl w-80 space-y-4">

          {/* Solo sort options */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sortér efter</p>
            <div className="flex flex-wrap gap-2">
              {SOLO_OPTIONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleSolo(key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                    ${isSoloActive(key)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground'
                    }`}
                >
                  {label}
                  <span className="text-sm leading-none w-3 inline-block text-center">
                    {isSoloActive(key) ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category multi-select */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Kategorier <span className="normal-case font-normal">(vælg flere)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleCategory(key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                    ${isCatActive(key)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Direction toggle — only show when categories are selected */}
            {!SOLO_OPTIONS.some(o => sortKeys.includes(o.key)) && (
              <button
                onClick={toggleDir}
                className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border bg-background text-muted-foreground border-border hover:text-foreground transition-colors"
              >
                Retning: {sortDir === 'desc' ? 'Højeste først ↓' : 'Laveste først ↑'}
              </button>
            )}
          </div>

          {/* Bonus filter */}
          <div className="border-t border-border pt-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Vis kun</p>
            <button
              onClick={handleBonus}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                ${onlyBonus
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground'
                }`}
            >
              ⭐ Kun med ekstra kategori
            </button>
          </div>

        </div>
      )}
    </div>
  );
}