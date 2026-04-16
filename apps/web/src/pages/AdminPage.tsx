import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from '../api/client';
import { useAuth } from '../context/AuthContext';
import type { Recette } from '../types';
import './Page.css';

export function AdminPage() {
  const { token, user } = useAuth();
  const [list, setList] = useState<Recette[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setErr(null);
    try {
      const rows = await apiGet<Recette[]>('/api/recipes');
      setList(rows);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  async function onValidate(id: number) {
    if (!token) return;
    setBusy(true);
    try {
      await apiPatch(`/api/recipes/${id}/validate`, {}, token);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: number) {
    if (!token || !confirm('Supprimer cette recette ?')) return;
    setBusy(true);
    try {
      await apiDelete(`/api/recipes/${id}`, token);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <h1>Tableau de bord</h1>
      <p className="lead">Bonjour {user.mail}</p>
      {err && <p className="form-error">{err}</p>}
      <p>
        <Link to="/admin/nouvelle-recette">Ajouter une recette</Link>
      </p>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.titre}</td>
              <td>{r.categorie}</td>
              <td>
                <div className="admin-actions">
                  <Link to={`/recettes/${r.id}`} className="btn-sm">
                    Voir
                  </Link>
                  <button
                    type="button"
                    className="btn-sm"
                    disabled={busy}
                    onClick={() => onValidate(r.id)}
                  >
                    Valider
                  </button>
                  <button
                    type="button"
                    className="btn-sm btn-danger"
                    disabled={busy}
                    onClick={() => onDelete(r.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminNewRecipePage() {
  const { token, user } = useAuth();
  const [err, setErr] = useState<string | null>(null);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      categorie: String(fd.get('categorie') ?? ''),
      titre: String(fd.get('titre') ?? ''),
      image: String(fd.get('image') ?? ''),
      video: String(fd.get('video') ?? ''),
      description: String(fd.get('description') ?? ''),
      saison: String(fd.get('saison') ?? ''),
      fete: String(fd.get('fete') ?? ''),
      temps_preparation: String(fd.get('temps_preparation') ?? ''),
      temps_cuisson: String(fd.get('temps_cuisson') ?? ''),
      temps_repos: String(fd.get('temps_repos') ?? ''),
      calories: String(fd.get('calories') ?? ''),
      difficulte: String(fd.get('difficulte') ?? ''),
    };
    setErr(null);
    try {
      await apiPost('/api/recipes', body, token);
      e.currentTarget.reset();
      alert('Recette créée');
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Erreur');
    }
  }

  return (
    <div className="page">
      <h1>Nouvelle recette</h1>
      <Link to="/admin">← Admin</Link>
      {err && <p className="form-error">{err}</p>}
      <form
        onSubmit={onSubmit}
        style={{
          maxWidth: 560,
          marginTop: '1rem',
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        {[
          ['categorie', 'Catégorie'],
          ['titre', 'Titre'],
          ['image', 'Fichier image'],
          ['video', 'Vidéo (URL ou fichier)'],
          ['description', 'Description'],
          ['saison', 'Saison'],
          ['fete', 'Fête'],
          ['temps_preparation', 'Temps préparation'],
          ['temps_cuisson', 'Temps cuisson'],
          ['temps_repos', 'Temps repos'],
          ['calories', 'Calories'],
          ['difficulte', 'Difficulté'],
        ].map(([name, label]) => (
          <div key={name} className="form-field">
            <label htmlFor={name}>{label}</label>
            {name === 'description' ? (
              <textarea
                id={name}
                name={name}
                rows={4}
                required
              />
            ) : (
              <input id={name} name={name} required />
            )}
          </div>
        ))}
        <button type="submit" className="cta" style={{ border: 'none' }}>
          Enregistrer
        </button>
      </form>
    </div>
  );
}
