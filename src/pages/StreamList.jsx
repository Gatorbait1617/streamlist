import { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a movie or program title.");
      return;
    }

    console.log("StreamList submission:", title);
    alert(`"${title}" was sent to the console.`);

    setTitle("");
  }

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">YOUR PERSONAL WATCHLIST</p>
        <h1>Keep track of what you want to stream next.</h1>
        <p className="description">
          Add a movie or show to your StreamList. This week, submitted titles
          will appear in the browser console.
        </p>

        <form className="stream-form" onSubmit={handleSubmit}>
          <label htmlFor="streamTitle">Movie or program title</label>

          <div className="input-row">
            <input
              id="streamTitle"
              type="text"
              placeholder="Example: The Last of Us"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <button type="submit">
              <span className="material-symbols-outlined">add</span>
              Add to List
            </button>
          </div>
        </form>
      </div>

      <div className="hero-card">
        <span className="material-symbols-outlined hero-icon">
          smart_display
        </span>
        <h2>Your next favorite show is one list away.</h2>
        <p>
          StreamList will eventually help users organize movies and programs
          across their favorite streaming services.
        </p>
      </div>
    </section>
  );
}

export default StreamList;