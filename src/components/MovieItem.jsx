import {
  FaCheck,
  FaUndo,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function MovieItem({
  movie,
  deleteMovie,
  toggleCompleted,
  setEditingMovie,
}) {
  return (
    <li className={`movie-item ${movie.completed ? "completed" : ""}`}>
      <div>
        <h3>{movie.title}</h3>
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
        <p>
          <strong>Platform:</strong> {movie.platform}
        </p>
        <p className="status">
          Status: {movie.completed ? "Completed" : "Not Watched"}
        </p>
      </div>

      <div className="movie-actions">
        <button
          className="complete-button"
          onClick={() => toggleCompleted(movie.id)}
        >
          {movie.completed ? <FaUndo /> : <FaCheck />}
          {movie.completed ? " Undo" : " Complete"}
        </button>

        <button
          className="edit-button"
          onClick={() => setEditingMovie(movie)}
        >
          <FaEdit /> Edit
        </button>

        <button
          className="delete-button"
          onClick={() => deleteMovie(movie.id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </li>
  );
}

export default MovieItem;