import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiUploadImage,
} from '../api/client';
import { RecipeImage } from '../components/RecipeImage';
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
      const rows = await apiGet<Recette[]>('/api/recipes/admin', token);
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
    <div className="page page--inner">
      <header className="page-header">
        <h1 className="page-header__title">Tableau de bord</h1>
        <p className="page-header__lead">Bonjour {user.mail}</p>
      </header>
      {err && <p className="form-error">{err}</p>}
      <p className="admin-toolbar">
        <Link to="/admin/nouvelle-recette" className="cta">
          + Ajouter une recette
        </Link>
      </p>
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table__col-thumb" aria-hidden />
            <th>ID</th>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id}>
              <td className="admin-table__thumb-cell">
                <RecipeImage
                  image={r.image}
                  alt=""
                  className="admin-thumb"
                  loading="lazy"
                />
              </td>
              <td>{r.id}</td>
              <td>{r.titre}</td>
              <td>{r.categorie}</td>
              <td>
                {Number(r.valide) === 1 ? (
                  <span className="admin-badge admin-badge--ok">Publiée</span>
                ) : (
                  <span className="admin-badge">Brouillon</span>
                )}
              </td>
              <td>
                <div className="admin-actions">
                  <Link
                    to={`/recettes/${r.id}`}
                    state={{ from: '/admin' }}
                    className="btn-sm"
                  >
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

const NEW_RECIPE_FIELDS: [string, string][] = [
  ['categorie', 'Catégorie'],
  ['titre', 'Titre'],
  ['video', 'Vidéo (URL ou fichier)'],
  ['description', 'Description'],
  ['saison', 'Saison'],
  ['fete', 'Fête'],
  ['temps_preparation', 'Temps préparation'],
  ['temps_cuisson', 'Temps cuisson'],
  ['temps_repos', 'Temps repos'],
  ['calories', 'Calories'],
  ['difficulte', 'Difficulté'],
];

export function AdminNewRecipePage() {
  const { token, user } = useAuth();
  const [err, setErr] = useState<string | null>(null);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  async function onImageFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !token) return;
    setErr(null);
    setUploadBusy(true);
    try {
      const { path } = await apiUploadImage(file, token);
      setUploadedPath(path);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Échec du téléversement');
    } finally {
      setUploadBusy(false);
    }
  }

  function clearImage() {
    setUploadedPath(null);
    setImageUrl('');
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const image = (uploadedPath || imageUrl.trim()).trim();
    if (!image) {
      setErr(
        'Ajoutez une image : téléversez un fichier (JPEG, PNG, WebP, GIF) ou collez une URL.',
      );
      return;
    }
    const fd = new FormData(e.currentTarget);
    const body = {
      categorie: String(fd.get('categorie') ?? ''),
      titre: String(fd.get('titre') ?? ''),
      image,
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
      clearImage();
      alert(
        'Recette enregistrée en brouillon. Validez-la dans le tableau de bord pour la rendre visible sur le site.',
      );
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Erreur');
    }
  }

  const previewImage = uploadedPath || imageUrl.trim();

  return (
    <div className="page page--inner">
      <Link to="/admin" className="back-link">
        ← Retour au tableau de bord
      </Link>
      <header className="page-header">
        <h1 className="page-header__title">Nouvelle recette</h1>
        <p className="page-header__lead">
          Téléversez une photo ou indiquez une URL — les fichiers sont enregistrés
          sur le serveur sous <code>assets/img/uploads/</code> et servis en{' '}
          <code>/static/img/uploads/…</code>.
        </p>
      </header>
      {err && <p className="form-error">{err}</p>}
      <form onSubmit={onSubmit} className="admin-form">
        <div className="form-field admin-upload-field">
          <span className="admin-upload-label">Image de la recette</span>
          <div className="admin-upload-row">
            <label className="admin-upload-btn">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploadBusy}
                onChange={onImageFile}
              />
              {uploadBusy ? 'Téléversement…' : 'Choisir un fichier'}
            </label>
            <button
              type="button"
              className="btn-sm admin-upload-clear"
              onClick={clearImage}
              disabled={!previewImage && !uploadedPath}
            >
              Effacer
            </button>
          </div>
          <p className="admin-upload-hint">
            Fichiers jusqu’à 5&nbsp;Mo. Si vous téléversez, ce fichier est utilisé
            à la place de l’URL ci-dessous.
          </p>
          <label htmlFor="image_url">Ou URL d’image (Unsplash, etc.)</label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="https://…"
            value={imageUrl}
            onChange={(ev) => setImageUrl(ev.target.value)}
          />
          {uploadedPath && (
            <p className="admin-upload-path">
              Fichier enregistré : <code>{uploadedPath}</code>
            </p>
          )}
          {previewImage && (
            <div className="admin-upload-preview">
              <RecipeImage
                image={previewImage}
                alt=""
                className="admin-upload-preview-img"
                loading="eager"
              />
            </div>
          )}
        </div>

        {NEW_RECIPE_FIELDS.map(([name, label]) => (
          <div key={name} className="form-field">
            <label htmlFor={name}>{label}</label>
            {name === 'description' ? (
              <textarea id={name} name={name} rows={4} required />
            ) : (
              <input id={name} name={name} required />
            )}
          </div>
        ))}
        <button type="submit" className="cta auth-submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
