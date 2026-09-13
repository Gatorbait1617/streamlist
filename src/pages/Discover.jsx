import { useEffect, useState } from "react";

function Discover() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPopularMovies() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("TMDB movie data could not be retrieved.");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getPopularMovies();
  }, []);

  if (loading) {
    return <p>Loading popular movies...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section>
      <h1>Discover Popular Movies</h1>
      <p>Browse currently popular movies retrieved from The Movie Database API.</p>

      <div className="discover-grid">
        {movies.map((movie) => (
          <article className="discover-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="no-poster">No poster available</div>
            )}

            <div className="discover-content">
              <h2>{movie.title}</h2>
              <p>
                <strong>Release Date:</strong> {movie.release_date || "Not available"}
              </p>
              <p>
                <strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10
              </p>
              <p>{movie.overview || "No description is available."}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Discover;