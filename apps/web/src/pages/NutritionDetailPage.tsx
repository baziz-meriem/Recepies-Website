import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import './Page.css';

type Ingredient = {
  id: number;
  titre?: string;
  description?: string;
};

type Desc = { id: number; titre?: string; description?: string; image?: string };

type Bundle = { ingredient: Ingredient; details: Desc[] };

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
    return <p className="form-error">{err}</p>;
  }
  if (!data) {
    return <p>Chargement…</p>;
  }

  const { ingredient, details } = data;

  return (
    <div className="page">
      <Link to="/nutrition">← Nutrition</Link>
      <h1 style={{ marginTop: '1rem' }}>{ingredient.titre}</h1>
      <p>{ingredient.description}</p>
      {details.map((d) => (
        <article key={d.id} style={{ marginTop: '1.25rem' }}>
          <h2 style={{ fontSize: '1.05rem' }}>{d.titre}</h2>
          <p>{d.description}</p>
          {d.image && (
            <img
              src={`/static/img/${d.image}`}
              alt=""
              style={{ maxWidth: '100%', borderRadius: 8 }}
            />
          )}
        </article>
      ))}
    </div>
  );
}
