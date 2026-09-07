import MovieItem from "./MovieItem";

function MovieList({
  movies,
  deleteMovie,
  toggleCompleted,
  setEditingMovie,
}) {
  return (
    <section className="list-section">
      <h2>My Streaming List</h2>

      {movies.length === 0 ? (
        <p className="empty-message">
          Your list is empty. Add a movie to get started.
        </p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              deleteMovie={deleteMovie}
              toggleCompleted={toggleCompleted}
              setEditingMovie={setEditingMovie}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MovieList;