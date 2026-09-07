import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";

function Home({
  movies,
  addMovie,
  deleteMovie,
  toggleCompleted,
  editingMovie,
  setEditingMovie,
  saveEditedMovie,
}) {
  return (
    <>
      <section className="hero">
        <h2>Build Your Personal Streaming List</h2>
        <p>Add movies you want to watch and keep track of what you finish.</p>
      </section>

      <MovieForm
        addMovie={addMovie}
        editingMovie={editingMovie}
        saveEditedMovie={saveEditedMovie}
      />

      <MovieList
        movies={movies}
        deleteMovie={deleteMovie}
        toggleCompleted={toggleCompleted}
        setEditingMovie={setEditingMovie}
      />
    </>
  );
}

export default Home;