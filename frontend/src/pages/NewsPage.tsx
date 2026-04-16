import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import './Page.css';

type NewsRow = {
  id: number;
  type?: string;
  titre: string;
  date?: string;
  description?: string;
};

export function NewsPage() {
  const [rows, setRows] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    apiGet<NewsRow[]>('/api/news')
      .then((data) => {
        setRows(data);
      })
      .catch((e) =>
        setErr(e instanceof Error ? e.message : 'Impossible de charger les actualités.'),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page--inner">
      <header className="page-header">
        <h1 className="page-header__title">News & actualités</h1>
        <p className="page-header__lead">
          Tendances, salons et idées du monde culinaire — en Algérie et au-delà.
        </p>
      </header>
      {err && (
        <p className="form-error" role="alert">
          {err}
        </p>
      )}
      {loading && !err && <p className="page-header__lead">Chargement…</p>}
      <div className="news-grid">
        {rows.map((n) => (
          <article key={n.id} className="news-card">
            <div className="news-card__inner">
              <p className="news-card__meta">
                {n.type}
                {n.date ? ` · ${n.date}` : ''}
              </p>
              <h2 className="news-card__title">
                <Link to={`/news/${n.id}`}>{n.titre}</Link>
              </h2>
              <p className="news-card__excerpt">{n.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
