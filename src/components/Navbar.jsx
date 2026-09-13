import { NavLink } from "react-router-dom";
import { FaFilm, FaHouse, FaCompass, FaCircleInfo } from "react-icons/fa6";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <FaFilm />
        StreamList
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">
          <FaHouse /> My List
        </NavLink>

        <NavLink to="/discover">
          <FaCompass /> Discover
        </NavLink>

        <NavLink to="/about">
          <FaCircleInfo /> About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;