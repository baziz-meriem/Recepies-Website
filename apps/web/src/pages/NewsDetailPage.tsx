import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import './Page.css';

type NewsArticle = {
  id: number;
  titre?: string;
  description?: string;
  image?: string;
  video?: string;
};

type NewsDescRow = {
  id: number;
  titre?: string;
  description?: string;
  image?: string;
};

type Bundle = { news: NewsArticle; details: NewsDescRow[] };

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Bundle | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiGet<Bundle>(`/api/news/${id}`)
      .then(setData)
      .catch((e) => setErr(e instanceof Error ? e.message : 'Erreur'));
  }, [id]);

  if (err) {
    return <p className="form-error">{err}</p>;
  }
  if (!data) {
    return <p>Chargement…</p>;
  }

  const { news, details } = data;
  const videoSrc = news.video?.startsWith('http')
    ? news.video
    : news.video
      ? `/static/img/${news.video}`
      : '';

  return (
    <div className="page">
      <Link to="/news">← News</Link>
      {news.image && (
        <div
          style={{
            height: 200,
            borderRadius: 10,
            margin: '1rem 0',
            background: `url(/static/img/${news.image}) center/cover`,
          }}
        />
      )}
      <h1>{news.titre}</h1>
      {videoSrc && (
        <div style={{ marginBottom: '1rem', maxWidth: 720 }}>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
            }}
          >
            <iframe
              title="news-video"
              src={videoSrc}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </div>
        </div>
      )}
      {details.map((d) => (
        <article key={d.id} style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem' }}>{d.titre}</h2>
          <p>{d.description}</p>
          {d.image && (
            <img
              src={`/static/img/${d.image}`}
              alt=""
              style={{ width: '100%', borderRadius: 8 }}
            />
          )}
        </article>
      ))}
    </div>
  );
}
