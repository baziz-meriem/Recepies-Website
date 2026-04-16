import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const view = new URLSearchParams(location.search).get('view');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  const onRecettes = location.pathname === '/recettes';
  const activeRecettes = onRecettes && !view;
  const activeSaison = onRecettes && view === 'saison';
  const activeFete = onRecettes && view === 'fete';

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">
              <span className="brand__title">Recettes</span>
              <span className="brand__tagline">Cuisine & partage</span>
            </span>
          </Link>

          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'nav-toggle--open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
            <span className="visually-hidden">Menu</span>
          </button>

          <nav
            id="site-nav"
            className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              Accueil
            </NavLink>
            <Link
              to="/recettes"
              className={`nav-item${activeRecettes ? ' nav-item--active' : ''}`}
            >
              Recettes
            </Link>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              News
            </NavLink>
            <Link
              to={{ pathname: '/recettes', search: '?view=saison' }}
              className={`nav-item${activeSaison ? ' nav-item--active' : ''}`}
            >
              Saison
            </Link>
            <Link
              to={{ pathname: '/recettes', search: '?view=fete' }}
              className={`nav-item${activeFete ? ' nav-item--active' : ''}`}
            >
              Fête
            </Link>
            <NavLink
              to="/nutrition"
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              Nutrition
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-item nav-item--ghost${isActive ? ' nav-item--active' : ''}`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="nav-actions">
            {user ? (
              <>
                <NavLink to="/admin" className="btn btn--outline">
                  Admin
                </NavLink>
                <button type="button" className="btn btn--solid" onClick={logout}>
                  Déconnexion
                </button>
              </>
            ) : null}
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className="social-rail" aria-label="Réseaux sociaux">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </aside>

      <main
        className={
          location.pathname === '/' ? 'main-content main--flush' : 'main-content'
        }
      >
        <Outlet />
      </main>

      <footer id="footer" className="site-footer">
        <div className="site-footer__grid">
          <div>
            <h3 className="site-footer__heading">Site</h3>
            <p className="site-footer__blurb">
              Le premier espace de recettes pensé pour la cuisine algérienne et
              méditerranéenne — idées, actus et nutrition en un seul lieu.
            </p>
            <p className="site-footer__admin-hint">
              <Link to="/admin/connexion">Accès rédaction</Link>
              <span className="site-footer__admin-hint__note">
                {' '}
                (réservé à l’équipe)
              </span>
            </p>
          </div>
          <div>
            <h3 className="site-footer__heading">Parcourir</h3>
            <ul className="site-footer__links">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/recettes">Idées recettes</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/nutrition">Healthy & nutrition</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="site-footer__heading">Collections</h3>
            <ul className="site-footer__links">
              <li>
                <Link to={{ pathname: '/recettes', search: '?view=saison' }}>
                  Par saison
                </Link>
              </li>
              <li>
                <Link to={{ pathname: '/recettes', search: '?view=fete' }}>
                  Par fête
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="site-footer__heading">Aide</h3>
            <section
              id="faq"
              className="site-footer__faq"
              aria-label="Questions fréquentes"
            >
              <p>
                Les recettes sont consultables librement, sans compte. L’ajout et
                la validation des contenus sont réservés à l’équipe éditoriale.
              </p>
            </section>
            <ul className="site-footer__links">
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href="mailto:contact@example.com">contact@example.com</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Recettes — fait avec passion.
        </p>
      </footer>
    </div>
  );
}
