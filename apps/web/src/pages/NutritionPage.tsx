import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import './Page.css';

type Ingredient = {
  id: number;
  titre?: string;
  saison?: string;
  description?: string;
  healthy?: string;
};

export function NutritionPage() {
  const [rows, setRows] = useState<Ingredient[]>([]);

  useEffect(() => {
    apiGet<Ingredient[]>('/api/nutrition/ingredients').then(setRows);
  }, []);

  return (
    <div className="page">
      <h1>Nutrition & informations</h1>
      <p className="lead">Ingrédients et fiches pratiques.</p>
      <div className="news-grid">
        {rows.map((n) => (
          <article key={n.id} className="news-card">
            <span style={{ fontSize: '0.8rem', color: '#666' }}>
              {n.saison} · {n.healthy === 'oui' ? 'healthy' : '—'}
            </span>
            <h2 style={{ fontSize: '1.1rem', margin: '0.35rem 0' }}>
              <Link to={`/nutrition/${n.id}`}>{n.titre}</Link>
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{n.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
