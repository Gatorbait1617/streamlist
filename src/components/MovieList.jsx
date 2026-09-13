import MovieItem from "./MovieItem";

function MovieList({ movies, onDeleteMovie, onToggleCompleted, onEditMovie }) {
  if (movies.length === 0) {
    return <p className="empty-message">Your StreamList is currently empty.</p>;
  }

  return (
    <section className="movie-list">
      <h2>Your Saved Titles</h2>

      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
          onToggleCompleted={onToggleCompleted}
          onEditMovie={onEditMovie}
        />
      ))}
    </section>
  );
}

export default MovieList;