import Image from 'next/image';

export default function MovieDetails({ tmdb, movie }) {
  const director = tmdb.credits?.crew?.find((c) => c.job === 'Director');
  const tmdbUrl = `https://www.themoviedb.org/movie/${tmdb.id}`;

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
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {fields.map(({ label, value }, i) =>
        value ? (
          <div key={label} className="px-4 py-3 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>

            {/* TMDB logo — only rendered on the first row */}
            {i === 0 && (
              <a
                href={tmdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Se på TMDB"
                className="opacity-50 hover:opacity-100 transition-opacity mt-0.5"
              >
                <Image
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                  alt="TMDB"
                  width={36}
                  height={18}
                  unoptimized
                />
              </a>
            )}
          </div>
        ) : null
      )}
    </div>
  );
}