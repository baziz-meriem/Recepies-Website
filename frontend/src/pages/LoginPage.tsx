import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Page.css';

/** Compte de démo — doit exister en base (voir `db/seed.sql`, `npm run db:seed`). */
const DEMO_PRENOM = 'Utilisateur';
const DEMO_NOM = 'Démo';
const DEMO_DISPLAY_NAME = `${DEMO_PRENOM} ${DEMO_NOM}`;
const DEMO_MAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo123';

/**
 * Connexion réservée à l’équipe (rédaction / admin).
 * Pas d’inscription publique : les comptes se gèrent côté base ou outil interne.
 */
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mail, setMail] = useState(DEMO_MAIL);
  const [motDePasse, setMotDePasse] = useState(DEMO_PASSWORD);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login(mail, motDePasse);
      navigate('/admin');
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Erreur');
    }
  }

  return (
    <div className="page page--inner">
      <div className="auth-card auth-card--admin">
        <h1>Accès rédaction</h1>
        <p className="auth-lead">
          Cette page sert uniquement à l’équipe qui publie les recettes. Les
          visiteurs n’ont pas besoin de compte pour consulter le site.
        </p>
        <p className="auth-demo-hint">
          <strong>Compte de test :</strong> {DEMO_DISPLAY_NAME}
          <br />
          <code className="auth-demo-hint__code">{DEMO_MAIL}</code> · mot de passe{' '}
          <code className="auth-demo-hint__code">{DEMO_PASSWORD}</code>
          <span className="auth-demo-hint__note">
            {' '}
            (prérempli — exécutez <code>npm run db:seed</code> si la connexion
            échoue.)
          </span>
        </p>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="mail">Email</label>
            <input
              id="mail"
              type="email"
              autoComplete="username"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="pw">Mot de passe</label>
            <input
              id="pw"
              type="password"
              autoComplete="current-password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              minLength={4}
            />
          </div>
          {err && <p className="form-error">{err}</p>}
          <button type="submit" className="cta auth-submit">
            Se connecter
          </button>
        </form>
        <p className="auth-footer-link">
          <Link to="/">← Retour au site public</Link>
        </p>
      </div>
    </div>
  );
}
