import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    onAddMovie(title.trim());
    setTitle("");
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <label htmlFor="movie-title">Movie or show title</label>

      <div className="form-row">
        <input
          id="movie-title"
          type="text"
          value={title}
          placeholder="Example: The Dark Knight"
          onChange={(event) => setTitle(event.target.value)}
        />

        <button type="submit">
          <FaPlus /> Add to List
        </button>
      </div>
    </form>
  );
}

export default MovieForm;