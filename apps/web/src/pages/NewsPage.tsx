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

  useEffect(() => {
    apiGet<NewsRow[]>('/api/news').then(setRows);
  }, []);

  return (
    <div className="page">
      <h1>News & actualités</h1>
      <p className="lead">Les dernières nouvelles autour de la cuisine.</p>
      <div className="news-grid">
        {rows.map((n) => (
          <article key={n.id} className="news-card">
            <span style={{ fontSize: '0.8rem', color: '#666' }}>
              {n.type} · {n.date}
            </span>
            <h2 style={{ fontSize: '1.1rem', margin: '0.35rem 0' }}>
              <Link to={`/news/${n.id}`}>{n.titre}</Link>
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{n.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
