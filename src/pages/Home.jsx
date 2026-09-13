import { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";

function Home() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("streamListMovies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("streamListMovies", JSON.stringify(movies));
  }, [movies]);

  function addMovie(title) {
    const newMovie = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    setMovies([...movies, newMovie]);
  }

  function deleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function toggleCompleted(id) {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, completed: !movie.completed }
          : movie
      )
    );
  }

  function editMovie(id, updatedTitle) {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, title: updatedTitle }
          : movie
      )
    );
  }

  return (
    <section>
      <h1>My StreamList</h1>
      <p>Add movies or shows you would like to watch.</p>

      <MovieForm onAddMovie={addMovie} />

      <MovieList
        movies={movies}
        onDeleteMovie={deleteMovie}
        onToggleCompleted={toggleCompleted}
        onEditMovie={editMovie}
      />
    </section>
  );
}

export default Home;