import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import { RecipeImage } from '../components/RecipeImage';
import { mediaUrl } from '../utils/mediaUrl';
import type { Etape, Recette } from '../types';
import './Page.css';

type Detail = {
  recette: Recette;
  etapes: Etape[];
  ingredients: string[];
};

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

  if (err) {
    return (
      <div className="page page--inner">
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
      <div className="page page--inner">
        <p className="page-header__lead">Chargement de la recette…</p>
      </div>
    );
  }

  const { recette, etapes, ingredients } = data;
  const back = recipeBackTarget(location.state);

  return (
    <div className="page page--inner recipe-detail">
      <Link to={back.to} className="back-link">
        {back.label}
      </Link>
      <div className="recipe-detail__cover-wrap">
        <RecipeImage
          image={recette.image}
          alt=""
          className="recipe-detail__cover"
          loading="eager"
        />
      </div>
      <div className="recipe-detail-hero">
        <h1>{recette.titre}</h1>
        <p className="lead">{recette.description}</p>
        <div className="meta-bar">
          <span>Total: {recette.tempsTotal ?? '—'} min</span>
          <span>Préparation: {recette.tempsPreparation ?? '—'}</span>
          <span>Cuisson: {recette.tempsCuisson ?? '—'}</span>
          <span>Calories: {recette.calories ?? '—'}</span>
          <span>Difficulté: {recette.difficulte ?? '—'}</span>
        </div>
      </div>

      {recette.video && (
        <div className="video-embed">
          <iframe title="video" src={mediaUrl(recette.video)} />
        </div>
      )}

      <div className="detail-grid">
        <div className="steps">
          <h2>Préparation</h2>
          <p className="steps-intro">
            Étapes détaillées pour réussir la recette (temps et repos indiqués en haut de page).
          </p>
          {etapes.map((e) => (
            <article key={e.id}>
              <h4>{e.titre}</h4>
              <p>{e.description}</p>
              {e.image && (
                <img
                  className="step-image"
                  src={mediaUrl(e.image)}
                  alt=""
                />
              )}
            </article>
          ))}
        </div>
        <aside className="ingredient-list">
          <h2>Ingrédients</h2>
          <ul>
            {ingredients.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
