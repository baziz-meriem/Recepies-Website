import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import type { Etape, Recette } from '../types';
import './Page.css';

type Detail = {
  recette: Recette;
  etapes: Etape[];
  ingredients: string[];
};

export function RecipeDetailPage() {
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
    return <p className="form-error">{err}</p>;
  }
  if (!data) {
    return <p>Chargement…</p>;
  }

  const { recette, etapes, ingredients } = data;

  return (
    <div className="page recipe-detail">
      <Link to="/recettes">← Retour aux recettes</Link>
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
        <div
          className="video-wrap"
          style={{ marginBottom: '1.5rem', maxWidth: 720 }}
        >
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: 8,
            }}
          >
            <iframe
              title="video"
              src={
                recette.video.startsWith('http')
                  ? recette.video
                  : `/static/img/${recette.video}`
              }
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </div>
        </div>
      )}

      <div className="detail-grid">
        <div className="steps">
          <h2>Instructions</h2>
          {etapes.map((e) => (
            <article key={e.id}>
              <h4>{e.titre}</h4>
              <p>{e.description}</p>
              {e.image && (
                <img
                  src={`/static/img/${e.image}`}
                  alt=""
                  style={{ width: '100%', borderRadius: 8 }}
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
