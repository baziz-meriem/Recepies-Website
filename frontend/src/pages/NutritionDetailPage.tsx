import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import { mediaUrl } from '../utils/mediaUrl';
import './Page.css';

type Ingredient = {
  id: number;
  nom?: string;
  titre?: string;
  saison?: string;
  description?: string;
  healthy?: string;
};

type Desc = { id: number; titre?: string; description?: string; image?: string };

type Bundle = { ingredient: Ingredient; details: Desc[] };

function paragraphs(text: string | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function NutritionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Bundle | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiGet<Bundle>(`/api/nutrition/ingredients/${id}`)
      .then(setData)
      .catch((e) => setErr(e instanceof Error ? e.message : 'Erreur'));
  }, [id]);

  if (err) {
    return (
      <div className="page page--inner">
        <p className="form-error">{err}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="page page--inner">
        <p className="page-header__lead">Chargement…</p>
      </div>
    );
  }

  const { ingredient, details } = data;
  const introParts = paragraphs(ingredient.description);
  const displayTitle = ingredient.titre || ingredient.nom || 'Ingrédient';

  return (
    <div className="page page--inner article-body nutrition-detail">
      <Link to="/nutrition" className="back-link">
        ← Nutrition & ingrédients
      </Link>

      <header className="nutrition-detail__header">
        <h1 className="article-body__title">{displayTitle}</h1>
        {ingredient.nom && ingredient.nom !== displayTitle && (
          <p className="nutrition-detail__aka">Aussi nommé : {ingredient.nom}</p>
        )}
        <div className="nutrition-detail__meta" role="group" aria-label="Informations rapides">
          {ingredient.saison && (
            <span className="nutrition-pill">
              Saison idéale : <strong>{ingredient.saison}</strong>
            </span>
          )}
          {ingredient.healthy === 'oui' && (
            <span className="nutrition-pill nutrition-pill--healthy">
              Repère « healthy »
            </span>
          )}
        </div>
      </header>

      {introParts.length > 0 && (
        <div className="nutrition-detail__intro">
          {introParts.map((block, i) => (
            <p key={i} className="nutrition-detail__intro-p">
              {block}
            </p>
          ))}
        </div>
      )}

      {details.length === 0 && (
        <p className="nutrition-detail__empty-note">
          D’autres fiches détaillées seront ajoutées prochainement pour cet ingrédient.
        </p>
      )}

      {details.map((d) => {
        const blocks = paragraphs(d.description);
        return (
          <article key={d.id} className="article-section nutrition-detail__section">
            <h2>{d.titre}</h2>
            <div className="nutrition-detail__section-body">
              {blocks.length > 0 ? (
                blocks.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{d.description}</p>
              )}
            </div>
            {d.image && (
              <img
                className="step-image"
                src={mediaUrl(d.image)}
                alt=""
                loading="lazy"
              />
            )}
          </article>
        );
      })}
    </div>
  );
}
