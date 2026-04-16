import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <Link to="/" className="brand">
          Recettes
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/recettes">Recettes</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/nutrition">Nutrition</NavLink>
          <NavLink to={{ pathname: '/recettes', search: '?view=saison' }}>
            Saison
          </NavLink>
          <NavLink to={{ pathname: '/recettes', search: '?view=fete' }}>
            Fête
          </NavLink>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <NavLink to="/admin" className="btn-outline">
                Admin
              </NavLink>
              <button type="button" className="btn-solid" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-solid">
              Connexion
            </NavLink>
          )}
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Site de recettes — monorepo NestJS + React</p>
      </footer>
    </div>
  );
}
