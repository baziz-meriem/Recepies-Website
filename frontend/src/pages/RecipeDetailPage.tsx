import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { apiGet, staticUrl } from '../api/client';
import { RecipeImage } from '../components/RecipeImage';
import { mediaUrl } from '../utils/mediaUrl';
import { parseVideoUrl } from '../utils/videoEmbed';
import type { Etape, Recette } from '../types';
import './Page.css';

type Detail = {
  recette: Recette;
  etapes: Etape[];
  ingredients: string[];
  videos: string[];
};

function RecipeVideoBlock({ raw, index }: { raw: string; index: number }) {
  const t = raw.trim();
  if (!t) return null;
  const block = parseVideoUrl(t);
  if (block.kind === 'iframe') {
    return (
      <div className="recipe-video-item recipe-video-item--embed">
        <iframe
          title={`Vidéo ${index + 1}`}
          src={block.src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
  if (block.kind === 'video') {
    const src = /^https?:\/\//i.test(block.src)
      ? block.src
      : staticUrl(block.src);
    return (
      <div className="recipe-video-item recipe-video-item--native">
        <video controls playsInline preload="metadata" src={src} />
      </div>
    );
  }
  const href = /^https?:\/\//i.test(block.href)
    ? block.href
    : staticUrl(block.href);
  return (
    <div className="recipe-video-item recipe-video-item--link">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="recipe-video-external"
      >
        Ouvrir la vidéo {index + 1} →
      </a>
    </div>
  );
}

type LocationState = { from?: string };

function recipeBackTarget(state: unknown): { to: string; label: string } {
  const from = (state as LocationState | null)?.from;
  if (from === '/') {
    return { to: '/', label: '← Retour à l’accueil' };
  }
  if (typeof from === 'string' && from.startsWith('/admin')) {
    return { to: '/admin', label: '← Retour au tableau de bord' };
  }
  if (typeof from === 'string' && from.startsWith('/recettes')) {
    return { to: from, label: '← Retour aux recettes' };
  }
  return { to: '/recettes', label: '← Retour aux recettes' };
}

function formatMinutes(v: string | undefined): string {
  if (v == null || String(v).trim() === '') return '—';
  return `${v} min`;
}

function difficultyClass(d: string | undefined): string {
  const x = (d ?? '').toLowerCase();
  if (x.includes('facile')) return 'recipe-kpi__badge--easy';
  if (x.includes('moyen')) return 'recipe-kpi__badge--mid';
  if (x.includes('difficile')) return 'recipe-kpi__badge--hard';
  return '';
}

function notationStars(n: string | undefined): string | null {
  if (n == null || n === '') return null;
  const num = Number.parseInt(String(n).trim(), 10);
  if (Number.isNaN(num) || num < 1 || num > 5) return null;
  return '★'.repeat(num) + '☆'.repeat(5 - num);
}

export function RecipeDetailPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Detail | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiGet<Detail>(`/api/recipes/${id}`)
      .then(setData)
      .catch((e) => setErr(e instanceof Error ? e.message : 'Erreur'));
  }, [id]);

  const back = recipeBackTarget(location.state);

  const categoryLabel = useMemo(() => {
    if (!data?.recette.categorie) return null;
    const c = data.recette.categorie;
    return c.charAt(0).toUpperCase() + c.slice(1);
  }, [data?.recette.categorie]);

  if (err) {
    return (
      <div className="page page--inner recipe-detail-page">
        <p className="form-error">{err}</p>
        <p>
          <Link to="/recettes" className="back-link">
            ← Retour aux recettes
          </Link>
        </p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="page page--inner recipe-detail-page">
        <p className="page-header__lead recipe-detail-loading">
          Chargement de la recette…
        </p>
      </div>
    );
  }

  const { recette, etapes, ingredients, videos: videoList } = data;
  const videos =
    videoList?.length > 0
      ? videoList
      : recette.video?.trim()
        ? [recette.video.trim()]
        : [];
  const stars = notationStars(recette.notation);

  return (
    <div className="page page--inner recipe-detail-page">
      <Link to={back.to} className="back-link recipe-detail-back">
        {back.label}
      </Link>

      <nav className="recipe-breadcrumb" aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link>
        <span className="recipe-breadcrumb__sep" aria-hidden>
          /
        </span>
        <Link to="/recettes">Recettes</Link>
        {categoryLabel && (
          <>
            <span className="recipe-breadcrumb__sep" aria-hidden>
              /
            </span>
            <span className="recipe-breadcrumb__current">{categoryLabel}</span>
          </>
        )}
      </nav>

      <header className="recipe-detail-header">
        <div className="recipe-detail-header__media">
          <RecipeImage
            image={recette.image}
            alt={recette.titre}
            className="recipe-detail-header__img"
            loading="eager"
          />
        </div>
        <div className="recipe-detail-header__text">
          {categoryLabel && (
            <p className="recipe-detail-eyebrow">{categoryLabel}</p>
          )}
          <h1 className="recipe-detail-title">{recette.titre}</h1>
          {recette.description && (
            <p className="recipe-detail-lead">{recette.description}</p>
          )}

          <div className="recipe-context-chips" aria-label="Contexte">
            {recette.saison && (
              <span className="recipe-chip recipe-chip--season">
                Saison · {recette.saison}
              </span>
            )}
            {recette.fete && (
              <span className="recipe-chip recipe-chip--fest">
                Fête · {recette.fete}
              </span>
            )}
            {stars && (
              <span className="recipe-chip recipe-chip--stars" title="Notation">
                {stars}
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="recipe-kpi-strip" aria-label="Temps et difficulté">
        <div className="recipe-kpi">
          <span className="recipe-kpi__label">Préparation</span>
          <strong className="recipe-kpi__value">
            {formatMinutes(recette.tempsPreparation)}
          </strong>
        </div>
        <div className="recipe-kpi">
          <span className="recipe-kpi__label">Cuisson</span>
          <strong className="recipe-kpi__value">
            {formatMinutes(recette.tempsCuisson)}
          </strong>
        </div>
        <div className="recipe-kpi">
          <span className="recipe-kpi__label">Repos</span>
          <strong className="recipe-kpi__value">
            {formatMinutes(recette.tempsRepos)}
          </strong>
        </div>
        <div className="recipe-kpi recipe-kpi--accent">
          <span className="recipe-kpi__label">Temps total</span>
          <strong className="recipe-kpi__value">
            {formatMinutes(recette.tempsTotal)}
          </strong>
        </div>
        <div className="recipe-kpi">
          <span className="recipe-kpi__label">Calories</span>
          <strong className="recipe-kpi__value">
            {recette.calories?.trim() ? `${recette.calories} kcal` : '—'}
          </strong>
        </div>
        <div className="recipe-kpi">
          <span className="recipe-kpi__label">Difficulté</span>
          <strong
            className={`recipe-kpi__value recipe-kpi__badge ${difficultyClass(recette.difficulte)}`}
          >
            {recette.difficulte?.trim() ? recette.difficulte : '—'}
          </strong>
        </div>
      </section>

      {videos.length > 0 && (
        <section
          className="recipe-video-section"
          aria-labelledby="recipe-video-title"
        >
          <h2
            id="recipe-video-title"
            className="recipe-section-title recipe-section-title--inline"
          >
            {videos.length > 1 ? 'Vidéos' : 'Vidéo'}
          </h2>
          <div className="recipe-video-grid">
            {videos.map((url, i) => (
              <RecipeVideoBlock key={`${url}-${i}`} raw={url} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="recipe-detail-layout">
        <main className="recipe-detail-main">
          <section className="recipe-steps-section" aria-labelledby="prep-title">
            <div className="recipe-section-head">
              <h2 id="prep-title" className="recipe-section-title">
                Préparation
              </h2>
              <p className="recipe-section-sub">
                Suivez les étapes dans l’ordre pour un résultat fidèle au plat
                d’origine.
              </p>
            </div>

            {etapes.length === 0 ? (
              <div className="recipe-empty-steps">
                <p>
                  Les étapes détaillées ne sont pas encore renseignées pour cette
                  recette. Le résumé ci-dessus et la liste d’ingrédients vous
                  guident néanmoins pour vous lancer.
                </p>
              </div>
            ) : (
              <ol className="recipe-step-list">
                {etapes.map((e, index) => (
                  <li key={e.id} className="recipe-step">
                    <div className="recipe-step__marker" aria-hidden>
                      <span className="recipe-step__num">{index + 1}</span>
                    </div>
                    <div className="recipe-step__body">
                      {e.titre && (
                        <h3 className="recipe-step__title">{e.titre}</h3>
                      )}
                      {e.description && (
                        <p className="recipe-step__text">{e.description}</p>
                      )}
                      {e.image && (
                        <img
                          className="recipe-step__img"
                          src={mediaUrl(e.image)}
                          alt=""
                          loading="lazy"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </main>

        <aside className="recipe-ingredients-aside">
          <div className="recipe-ingredients-card">
            <h2 className="recipe-ingredients-card__title">Ingrédients</h2>
            <p className="recipe-ingredients-card__hint">
              Liste indicative — ajustez les quantités selon le nombre de
              convives.
            </p>
            {ingredients.length === 0 ? (
              <p className="recipe-ingredients-card__empty">
                Aucun ingrédient lié pour l’instant. Consultez la fiche ou les
                étapes pour les produits utilisés.
              </p>
            ) : (
              <ul className="recipe-ingredients-list">
                {ingredients.map((n, i) => (
                  <li key={i}>
                    <span className="recipe-ingredients-list__dot" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
