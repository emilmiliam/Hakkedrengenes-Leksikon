import { CATEGORIES } from '@/lib/categories';

export default function RatingBreakdown({ movie }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-6">
        <h2 className="text-xl font-semibold text-foreground">Hakkedrengenes dom</h2>
        <span className="text-3xl font-bold text-foreground">{movie.overall_score}</span>
        <span className="text-muted-foreground">/50</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORIES.map(({ key, label }) => (
          <div key={key} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground">
              {movie[key]}
              <span className="text-sm text-muted-foreground font-normal">/10</span>
            </p>
          </div>
        ))}

        <div className={`bg-card border border-border rounded-xl p-4 ${!movie.bonus_label ? 'opacity-30' : ''}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {movie.bonus_label ?? 'Ekstra Kategori'}
          </p>
          <p className="text-2xl font-bold text-foreground">
            {movie.bonus_score ?? '0'}
            <span className="text-sm text-muted-foreground font-normal">/10</span>
          </p>
        </div>
      </div>
    </div>
  );
}