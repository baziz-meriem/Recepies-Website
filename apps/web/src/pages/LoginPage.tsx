import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Page.css';

export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [mail, setMail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
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
    <div className="page">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Connexion' : 'Inscription'}</h1>
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            className={mode === 'login' ? 'cta' : 'btn-sm'}
            onClick={() => setMode('login')}
            style={{ marginRight: 8 }}
          >
            Connexion
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'cta' : 'btn-sm'}
            onClick={() => setMode('register')}
          >
            Inscription
          </button>
        </div>
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
          <button type="submit" className="cta" style={{ border: 'none' }}>
            {mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <Link to="/">Retour à l’accueil</Link>
        </p>
      </div>
    </div>
  );
}
