import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import About from "./pages/About";

function App() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  const addMovie = (movie) => {
    const newMovie = {
      id: Date.now(),
      title: movie.title,
      genre: movie.genre,
      platform: movie.platform,
      completed: false,
    };

    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const toggleCompleted = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, completed: !movie.completed }
          : movie
      )
    );
  };

  const saveEditedMovie = (updatedMovie) => {
    setMovies(
      movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );

    setEditingMovie(null);
  };

  return (
    <>
      <Navigation />

      <main className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                addMovie={addMovie}
                deleteMovie={deleteMovie}
                toggleCompleted={toggleCompleted}
                editingMovie={editingMovie}
                setEditingMovie={setEditingMovie}
                saveEditedMovie={saveEditedMovie}
              />
            }
          />

          <Route path="/completed" element={<Completed movies={movies} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;