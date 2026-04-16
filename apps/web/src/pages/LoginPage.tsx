import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Page.css';

/** Must match `db/seed.sql` — run `npm run db:seed` so this account exists. */
const DEMO_PRENOM = 'Utilisateur';
const DEMO_NOM = 'Démo';
const DEMO_DISPLAY_NAME = `${DEMO_PRENOM} ${DEMO_NOM}`;
const DEMO_MAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo123';

export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [mail, setMail] = useState(DEMO_MAIL);
  const [motDePasse, setMotDePasse] = useState(DEMO_PASSWORD);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [sexe, setSexe] = useState<'homme' | 'femme'>('homme');
  const [dateNaissance, setDateNaissance] = useState('2000-01-01');
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    try {
      if (mode === 'login') {
        await login(mail, motDePasse);
        navigate('/admin');
      } else {
        await register({
          nom,
          prenom,
          mail,
          sexe,
          dateNaissance,
          motDePasse,
        });
        setOk('Inscription réussie. Vous pouvez vous connecter.');
        setMode('login');
      }
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Erreur');
    }
  }

  return (
    <div className="page page--inner">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Connexion' : 'Inscription'}</h1>
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => {
              setMode('login');
              setMail(DEMO_MAIL);
              setMotDePasse(DEMO_PASSWORD);
              setErr(null);
              setOk(null);
            }}
          >
            Connexion
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => {
              setMode('register');
              setMail('');
              setMotDePasse('');
              setErr(null);
              setOk(null);
            }}
          >
            Inscription
          </button>
        </div>
        {mode === 'login' && (
          <p className="auth-demo-hint">
            <strong>Compte de test :</strong> {DEMO_DISPLAY_NAME}
            <br />
            <code className="auth-demo-hint__code">{DEMO_MAIL}</code> · mot de passe{' '}
            <code className="auth-demo-hint__code">{DEMO_PASSWORD}</code>
            <span className="auth-demo-hint__note">
              {' '}
              (prérempli — exécutez <code>npm run db:seed</code> si la connexion échoue.)
            </span>
          </p>
        )}
        <form onSubmit={onSubmit}>
          {mode === 'register' && (
            <>
              <div className="form-field">
                <label htmlFor="nom">Nom</label>
                <input
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="prenom">Prénom</label>
                <input
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="sexe">Sexe</label>
                <select
                  id="sexe"
                  value={sexe}
                  onChange={(e) =>
                    setSexe(e.target.value as 'homme' | 'femme')
                  }
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="dn">Date de naissance</label>
                <input
                  id="dn"
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="form-field">
            <label htmlFor="mail">Email</label>
            <input
              id="mail"
              type="email"
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
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              minLength={4}
            />
          </div>
          {err && <p className="form-error">{err}</p>}
          {ok && <p className="form-success">{ok}</p>}
          <button type="submit" className="cta auth-submit">
            {mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
        <p className="auth-footer-link">
          <Link to="/">Retour à l’accueil</Link>
        </p>
      </div>
    </div>
  );
}
