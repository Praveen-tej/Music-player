import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation()
  return (
    <nav className="navbar">
      <Link className="player"  to="/"  >🎵 Music Player</Link>
      <div className="navbar-links">
        <Link  to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""} `}     >All Songs</Link> 
        <Link to="/playlist" className={`nav-link ${location.pathname === "/playlist" ? "active" : ""} `}>Playlist</Link>
      </div>
    </nav>
  );
}