import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function getStoredUser() {
  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed?.name ? parsed : null;
  } catch {
    return null;
  }
}

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userFromStorage = getStoredUser();
    setUser(userFromStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="main-header">
      <a href="/">
        <h1>ZonaActividades</h1>
      </a>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={menuOpen ? "nav open" : "nav"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Inicio
        </Link>
        <Link to="/activities" onClick={() => setMenuOpen(false)}>
          Actividades
        </Link>
        <Link to="/search" onClick={() => setMenuOpen(false)}>
          Buscar
        </Link>
        {user ? (
          <>
            <Link to="/reservations" onClick={() => setMenuOpen(false)}>
              Mis reservas
            </Link>
            <span>Bienvenid@ {user.name}</span>
            <button className="closeSession" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
