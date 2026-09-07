import { useEffect, useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";

function MovieForm({ addMovie, editingMovie, saveEditedMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setGenre(editingMovie.genre);
      setPlatform(editingMovie.platform);
    }
  }, [editingMovie]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !genre.trim() || !platform.trim()) {
      alert("Please complete all fields before adding a movie.");
      return;
    }

    if (editingMovie) {
      saveEditedMovie({
        ...editingMovie,
        title,
        genre,
        platform,
      });
    } else {
      addMovie({ title, genre, platform });
    }

    setTitle("");
    setGenre("");
    setPlatform("");
  };

  return (
    <section className="form-section">
      <h2>{editingMovie ? "Edit Movie" : "Add a Movie"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Movie Title</label>
        <input
          id="title"
          type="text"
          placeholder="Example: Black Panther"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          placeholder="Example: Action"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />

        <label htmlFor="platform">Streaming Platform</label>
        <select
          id="platform"
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
        >
          <option value="">Choose a platform</option>
          <option value="Netflix">Netflix</option>
          <option value="Hulu">Hulu</option>
          <option value="Disney+">Disney+</option>
          <option value="Prime Video">Prime Video</option>
          <option value="Max">Max</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">
          {editingMovie ? <FaSave /> : <FaPlus />}
          {editingMovie ? " Save Changes" : " Add to My List"}
        </button>
      </form>
    </section>
  );
}

export default MovieForm;