import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import './Page.css';

type Ingredient = {
  id: number;
  nom?: string;
  titre?: string;
  saison?: string;
  description?: string;
  healthy?: string;
};

export function NutritionPage() {
  const [rows, setRows] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    apiGet<Ingredient[]>('/api/nutrition/ingredients')
      .then(setRows)
      .catch((e) =>
        setErr(
          e instanceof Error ? e.message : 'Impossible de charger les ingrédients.',
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page--inner" id="intro">
      <header className="page-header">
        <h1 className="page-header__title">Nutrition & informations</h1>
        <p className="page-header__lead">
          Fiches ingrédients, saisons et repères « healthy » pour composer des repas
          équilibrés.
        </p>
      </header>
      {err && (
        <p className="form-error" role="alert">
          {err}
        </p>
      )}
      {loading && !err && <p className="page-header__lead">Chargement…</p>}
      {!loading && !err && rows.length === 0 && (
        <div className="filters-empty nutrition-empty">
          <p>
            Aucun ingrédient n’est disponible pour le moment. Lancez la base de données et le
            jeu de données : <code>docker compose up -d</code> puis{' '}
            <code>npm run db:seed</code> à la racine du projet.
          </p>
        </div>
      )}
      <div className="news-grid">
        {rows.map((n) => (
          <article key={n.id} className="news-card">
            <div className="news-card__inner">
              <p className="news-card__meta">
                {n.nom ? `${n.nom} · ` : ''}
                {n.saison ?? '—'}
                {n.healthy === 'oui' ? ' · Healthy' : ''}
              </p>
              <h2 className="news-card__title">
                <Link to={`/nutrition/${n.id}`}>{n.titre ?? n.nom ?? 'Fiche'}</Link>
              </h2>
              <p className="news-card__excerpt">{n.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
