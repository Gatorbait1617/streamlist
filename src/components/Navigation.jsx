import { NavLink } from "react-router-dom";
import { FaHome, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

function Navigation() {
  return (
    <nav className="navigation">
      <h1>StreamList</h1>

      <div className="nav-links">
        <NavLink to="/">
          <FaHome /> My List
        </NavLink>

        <NavLink to="/completed">
          <FaCheckCircle /> Completed
        </NavLink>

        <NavLink to="/about">
          <FaInfoCircle /> About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;