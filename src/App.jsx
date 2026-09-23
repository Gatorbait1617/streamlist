import { useEffect, useState } from "react";

const EVENT_TYPES = {
  watchlist_added: "Added to watchlist",
  movie_watched: "Watched movie"
};

function formatDate(dateValue) {
  if (!dateValue) return "Just now";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [type, setType] = useState("watchlist_added");
  const [online, setOnline] = useState(navigator.onLine);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadEvents() {
    try {
      const response = await fetch("/api/events", {
        credentials: "same-origin",
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Events could not be loaded.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected event response.");
      }

      setEvents(data);
      setMessage("");
    } catch {
      setMessage("Customer events are unavailable. Connect and try again.");
    }
  }

  useEffect(() => {
    loadEvents();

    function handleOnline() {
      setOnline(true);
      setMessage("");
      loadEvents();
    }

    function handleOffline() {
      setOnline(false);
      setMessage("You are offline. Changes cannot be saved yet.");
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const title = movieTitle.trim();

    if (!title) {
      setMessage("Please enter a movie title.");
      return;
    }

    if (!online) {
      setMessage("You are offline. Reconnect before saving a movie.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
          movieTitle: title,
          type
        })
      });

      if (!response.ok) {
        throw new Error("Movie could not be saved.");
      }

      setMovieTitle("");
      setType("watchlist_added");
      setMessage(`“${title}” was saved successfully.`);
      await loadEvents();
    } catch {
      setMessage("Movie could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <nav className="navigation">
        <h1>StreamList</h1>

        <div className="nav-links">
          <a className="active" href="#watchlist">
            Watchlist
          </a>
          <a href="#activity">Activity</a>
        </div>
      </nav>

      <main className="app-container">
        <section className="hero">
          <p className="eyebrow">MOVIE TRACKER</p>
          <h2>Keep track of what you want to watch.</h2>
          <p>Add movies to your watchlist or mark them as watched.</p>

          <span className={`status ${online ? "online" : "offline"}`}>
            <span className="status-dot" />
            {online ? "Online" : "Offline"}
          </span>
        </section>

        <section className="form-section" id="watchlist">
          <h3>Add a movie</h3>

          <form onSubmit={handleSubmit}>
            <label htmlFor="movie-title">Movie title</label>
            <input
              id="movie-title"
              type="text"
              placeholder="For example: Spirited Away"
              value={movieTitle}
              onChange={(event) => setMovieTitle(event.target.value)}
              disabled={saving}
            />

            <label htmlFor="event-type">Activity</label>
            <select
              id="event-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              disabled={saving}
            >
              {Object.entries(EVENT_TYPES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button type="submit" disabled={saving || !online}>
              {saving ? "Saving..." : "Save movie"}
            </button>
          </form>

          {message && (
            <p className="message" role="status">
              {message}
            </p>
          )}
        </section>

        <section className="list-section" id="activity">
          <div className="section-heading">
            <div>
              <h3>Recent activity</h3>
              <p>Your latest movie updates appear here.</p>
            </div>

            <button className="secondary-button" onClick={loadEvents}>
              Refresh
            </button>
          </div>

          {events.length === 0 ? (
            <div className="empty-state">
              <p>No movie activity yet.</p>
              <span>Add your first movie above.</span>
            </div>
          ) : (
            <ul className="movie-list">
              {events.map((event, index) => {
                const title =
                  event.movieTitle ||
                  event.title ||
                  event.movie ||
                  "Untitled movie";

                const eventType =
                  EVENT_TYPES[event.type] || event.type || "Movie activity";

                return (
                  <li
                    className="movie-item"
                    key={event.id || event._id || `${title}-${index}`}
                  >
                    <div className="movie-icon">
                      {event.type === "movie_watched" ? "✓" : "+"}
                    </div>

                    <div className="movie-details">
                      <strong>{title}</strong>
                      <span>{eventType}</span>
                    </div>

                    <time dateTime={event.createdAt || event.timestamp}>
                      {formatDate(event.createdAt || event.timestamp)}
                    </time>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}