
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">

        <Link to="/" className="brand">
          <span className="brand-icon">✈</span>
          Travel<span>Explorer</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/destinos">Destinos</NavLink>
        </nav>

        <Link to="/destinos" className="nav-button">
          Explorar viajes
        </Link>

      </div>
    </header>
  );
}

export default Navbar;