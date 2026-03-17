export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const movieId = searchParams.get('movieId');

  const apiKey = process.env.TMDB_API_KEY;

  let url;
  if (movieId) {
    url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;
  } else if (query) {
    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`;
  } else {
    return Response.json({ error: 'No query or movieId provided' }, { status: 400 });
  }

  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}