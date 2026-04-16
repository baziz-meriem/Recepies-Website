import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiUploadImage,
  apiUploadVideo,
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
    return <Navigate to="/admin/connexion" replace />;
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
                  <Link
                    to={`/admin/recettes/${r.id}`}
                    className="btn-sm"
                  >
                    Modifier
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
  ['description', 'Description'],
  ['saison', 'Saison'],
  ['fete', 'Fête'],
  ['temps_preparation', 'Temps préparation'],
  ['temps_cuisson', 'Temps cuisson'],
  ['temps_repos', 'Temps repos'],
  ['calories', 'Calories'],
  ['difficulte', 'Difficulté'],
];

type AdminRecipeDetail = {
  recette: Recette;
  ingredients: string[];
  videos: string[];
};

function RecipeVideosAdminEditor({
  videoUrls,
  setVideoUrls,
  token,
}: {
  videoUrls: string[];
  setVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
  token: string;
}) {
  const [vBusy, setVBusy] = useState(false);

  async function onVideoFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !token) return;
    setVBusy(true);
    try {
      const { path } = await apiUploadVideo(file, token);
      setVideoUrls((rows) => [...rows.filter((x) => x.trim()), path]);
    } catch (ex) {
      alert(ex instanceof Error ? ex.message : 'Échec du téléversement vidéo');
    } finally {
      setVBusy(false);
    }
  }

  return (
    <div className="form-field admin-videos-field">
      <span className="admin-upload-label">Vidéos (optionnel)</span>
      <p className="admin-upload-hint">
        Plusieurs liens (YouTube, Vimeo) ou fichiers MP4 / WebM / MOV téléversés
        sur le serveur (environ 80&nbsp;Mo max. par fichier).
      </p>
      {videoUrls.map((url, i) => (
        <div key={i} className="admin-video-row">
          <input
            type="url"
            name={`video_url_${i}`}
            placeholder="https://www.youtube.com/watch?v=…"
            value={url}
            onChange={(ev) => {
              const next = [...videoUrls];
              next[i] = ev.target.value;
              setVideoUrls(next);
            }}
          />
          <button
            type="button"
            className="btn-sm"
            onClick={() =>
              setVideoUrls(videoUrls.filter((_, j) => j !== i))
            }
          >
            Retirer
          </button>
        </div>
      ))}
      <div className="admin-upload-row">
        <button
          type="button"
          className="btn-sm"
          onClick={() => setVideoUrls([...videoUrls, ''])}
        >
          + Ajouter un lien
        </button>
        <label className="admin-upload-btn">
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            disabled={vBusy}
            onChange={onVideoFile}
          />
          {vBusy ? 'Téléversement…' : 'Téléverser une vidéo'}
        </label>
      </div>
    </div>
  );
}

export function AdminNewRecipePage() {
  const { token, user } = useAuth();
  const [err, setErr] = useState<string | null>(null);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrls, setVideoUrls] = useState<string[]>(['']);

  if (!user || !token) {
    return <Navigate to="/admin/connexion" replace />;
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

  function clearVideos() {
    setVideoUrls(['']);
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
    const vids = videoUrls.map((s) => s.trim()).filter(Boolean);
    const body = {
      categorie: String(fd.get('categorie') ?? ''),
      titre: String(fd.get('titre') ?? ''),
      image,
      videos: vids,
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
      clearVideos();
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
          <code>/static/img/uploads/…</code>. Les vidéos vont sous{' '}
          <code>assets/videos/uploads/</code>.
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

        {token && (
          <RecipeVideosAdminEditor
            videoUrls={videoUrls}
            setVideoUrls={setVideoUrls}
            token={token}
          />
        )}

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

export function AdminEditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const rid = Number.parseInt(id ?? '', 10);
  const { token, user } = useAuth();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrls, setVideoUrls] = useState<string[]>(['']);
  const [f, setF] = useState({
    categorie: '',
    titre: '',
    description: '',
    saison: '',
    fete: '',
    temps_preparation: '',
    temps_cuisson: '',
    temps_repos: '',
    calories: '',
    difficulte: '',
  });

  const load = useCallback(async () => {
    if (!token || Number.isNaN(rid)) return;
    setLoading(true);
    setErr(null);
    try {
      const d = await apiGet<AdminRecipeDetail>(
        `/api/recettes/admin/${rid}`,
        token,
      );
      const r = d.recette;
      const img = r.image ?? '';
      if (/^https?:\/\//i.test(img)) {
        setImageUrl(img);
        setUploadedPath(null);
      } else if (img) {
        setUploadedPath(img);
        setImageUrl('');
      } else {
        setImageUrl('');
        setUploadedPath(null);
      }
      setVideoUrls(d.videos?.length ? d.videos : ['']);
      setF({
        categorie: r.categorie ?? '',
        titre: r.titre ?? '',
        description: r.description ?? '',
        saison: r.saison ?? '',
        fete: r.fete ?? '',
        temps_preparation: r.tempsPreparation ?? '',
        temps_cuisson: r.tempsCuisson ?? '',
        temps_repos: r.tempsRepos ?? '',
        calories: r.calories ?? '',
        difficulte: r.difficulte ?? '',
      });
      setMissing(false);
    } catch {
      setMissing(true);
      setErr('Recette introuvable ou accès refusé.');
    } finally {
      setLoading(false);
    }
  }, [token, rid]);

  useEffect(() => {
    load();
  }, [load]);

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
    if (!token || Number.isNaN(rid)) return;
    const image = (uploadedPath || imageUrl.trim()).trim();
    if (!image) {
      setErr(
        'Ajoutez une image : téléversez un fichier ou indiquez une URL.',
      );
      return;
    }
    const vids = videoUrls.map((s) => s.trim()).filter(Boolean);
    setErr(null);
    try {
      await apiPatch(
        `/api/recettes/${rid}`,
        {
          categorie: f.categorie,
          titre: f.titre,
          image,
          videos: vids,
          description: f.description,
          saison: f.saison,
          fete: f.fete,
          temps_preparation: f.temps_preparation,
          temps_cuisson: f.temps_cuisson,
          temps_repos: f.temps_repos,
          calories: f.calories,
          difficulte: f.difficulte,
        },
        token,
      );
      alert('Recette mise à jour.');
      await load();
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Erreur');
    }
  }

  if (!user || !token) {
    return <Navigate to="/admin/connexion" replace />;
  }
  if (Number.isNaN(rid)) {
    return <Navigate to="/admin" replace />;
  }
  if (loading) {
    return (
      <div className="page page--inner">
        <p className="page-header__lead">Chargement de la recette…</p>
      </div>
    );
  }
  if (missing) {
    return (
      <div className="page page--inner">
        {err && <p className="form-error">{err}</p>}
        <Link to="/admin" className="back-link">
          ← Tableau de bord
        </Link>
      </div>
    );
  }

  const previewImage = uploadedPath || imageUrl.trim();

  return (
    <div className="page page--inner">
      <Link to="/admin" className="back-link">
        ← Tableau de bord
      </Link>
      <header className="page-header">
        <h1 className="page-header__title">Modifier la recette</h1>
        <p className="page-header__lead">
          Recette n°{rid} — enregistrez pour appliquer les changements sur le site
          (après validation si brouillon).
        </p>
      </header>
      {err && !missing && <p className="form-error">{err}</p>}
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
            Fichiers jusqu’à 5&nbsp;Mo. URL ou fichier sous{' '}
            <code>assets/img/uploads/</code>.
          </p>
          <label htmlFor="edit_image_url">Ou URL d’image</label>
          <input
            id="edit_image_url"
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

        {token && (
          <RecipeVideosAdminEditor
            videoUrls={videoUrls}
            setVideoUrls={setVideoUrls}
            token={token}
          />
        )}

        {NEW_RECIPE_FIELDS.map(([name, label]) => (
          <div key={name} className="form-field">
            <label htmlFor={`edit_${name}`}>{label}</label>
            {name === 'description' ? (
              <textarea
                id={`edit_${name}`}
                name={name}
                rows={4}
                required
                value={f[name as keyof typeof f] as string}
                onChange={(ev) =>
                  setF({ ...f, [name]: ev.target.value })
                }
              />
            ) : (
              <input
                id={`edit_${name}`}
                name={name}
                required
                value={f[name as keyof typeof f] as string}
                onChange={(ev) =>
                  setF({ ...f, [name]: ev.target.value })
                }
              />
            )}
          </div>
        ))}
        <button type="submit" className="cta auth-submit">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
