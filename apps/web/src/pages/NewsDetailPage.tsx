import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import { mediaUrl } from '../utils/mediaUrl';
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

  const { news, details } = data;
  const videoSrc = news.video ? mediaUrl(news.video) : '';

  return (
    <div className="page page--inner article-body">
      <Link to="/news" className="back-link">
        ← Toutes les actualités
      </Link>

      {news.image && (
        <div
          className="article-hero"
          style={{
            backgroundImage: `url(${mediaUrl(news.image)})`,
          }}
        />
      )}

      <h1 className="article-body__title">{news.titre}</h1>

      {videoSrc && (
        <div className="video-embed">
          <iframe title="news-video" src={videoSrc} />
        </div>
      )}

      {details.map((d) => (
        <article key={d.id} className="article-section">
          <h2>{d.titre}</h2>
          <p>{d.description}</p>
          {d.image && (
            <img className="step-image" src={mediaUrl(d.image)} alt="" />
          )}
        </article>
      ))}
    </div>
  );
}
