import { useState } from "react";
import {
  FaCheck,
  FaPen,
  FaTrash,
  FaFloppyDisk,
  FaXmark,
} from "react-icons/fa6";

function MovieItem({
  movie,
  onDeleteMovie,
  onToggleCompleted,
  onEditMovie,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(movie.title);

  function saveEdit() {
    if (updatedTitle.trim() !== "") {
      onEditMovie(movie.id, updatedTitle.trim());
      setIsEditing(false);
    }
  }

  function cancelEdit() {
    setUpdatedTitle(movie.title);
    setIsEditing(false);
  }

  return (
    <article className={`movie-item ${movie.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={updatedTitle}
          onChange={(event) => setUpdatedTitle(event.target.value)}
        />
      ) : (
        <p>{movie.title}</p>
      )}

      <div className="movie-actions">
        {isEditing ? (
          <>
            <button onClick={saveEdit} className="save-button">
              <FaFloppyDisk /> Save
            </button>

            <button onClick={cancelEdit} className="cancel-button">
              <FaXmark /> Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onToggleCompleted(movie.id)}>
              <FaCheck /> {movie.completed ? "Watched" : "Complete"}
            </button>

            <button onClick={() => setIsEditing(true)}>
              <FaPen /> Edit
            </button>

            <button
              onClick={() => onDeleteMovie(movie.id)}
              className="delete-button"
            >
              <FaTrash /> Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default MovieItem;