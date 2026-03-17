import MovieCard from '@/components/MovieCard';

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/movies', {
    cache: 'no-store',
  });
  const movies = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Hakkedrengene
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Movies yay
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.tmdb_id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
