export default function MovieDetails({ tmdb, movie }) {
  const director = tmdb.credits?.crew?.find((c) => c.job === 'Director');

  const fields = [
    { label: 'År', value: tmdb.release_date?.slice(0, 4) },
    { label: 'Spilletid', value: tmdb.runtime ? `${tmdb.runtime} min` : null },
    { label: 'Instruktør', value: director?.name },
    {
      label: 'Budget',
      value: tmdb.budget > 0 ? `$${(tmdb.budget / 1_000_000).toFixed(1)}M` : 'Ukendt',
    },
    {
      label: 'Indtjening',
      value: tmdb.revenue > 0 ? `$${(tmdb.revenue / 1_000_000).toFixed(1)}M` : 'Ukendt',
    },
    {
      label: 'Body count',
      value: movie?.body_count != null ? `${movie.body_count} dødsfald` : 'Ikke talt',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl">
      {fields.map(({ label, value }) =>
        value ? (
          <div key={label} className="px-4 py-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-foreground">{value}</p>
          </div>
        ) : null
      )}
    </div>
  );
}