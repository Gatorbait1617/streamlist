import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="material-symbols-outlined">movie</span>
        StreamList
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>
          StreamList
        </NavLink>

        <NavLink to="/movies">
          Movies
        </NavLink>

        <NavLink to="/cart">
          Cart
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;