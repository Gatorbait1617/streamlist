function Completed({ movies }) {
  const completedMovies = movies.filter((movie) => movie.completed);

  return (
    <section className="completed-page">
      <h2>Completed Movies</h2>

      {completedMovies.length === 0 ? (
        <p>You have not completed any movies yet.</p>
      ) : (
        <ul className="movie-list">
          {completedMovies.map((movie) => (
            <li className="movie-item completed" key={movie.id}>
              <div>
                <h3>{movie.title}</h3>
                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p>
                  <strong>Platform:</strong> {movie.platform}
                </p>
                <p className="status">Status: Completed</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Completed;