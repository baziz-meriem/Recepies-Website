import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import type { RecetteCard } from '../types';
import './Page.css';

const slides = [
  {
    title: 'Premier site de cuisine en Algérie',
    subtitle:
      'Choisissez vos ingrédients, nous vous proposons des idées de recettes.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
  },
  {
    title: 'Actualités & cuisine',
    subtitle: 'Suivez les nouvelles du monde culinaire.',
    img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&q=80',
  },
  {
    title: 'Des centaines de recettes',
    subtitle: 'Pour vous inspirer ou cuisiner au quotidien.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
  },
];

export function HomePage() {
  const [sections, setSections] = useState<
    { key: string; label: string; items: RecetteCard[] }[]
  >([]);

  useEffect(() => {
    const cats = [
      { key: 'plats', label: 'Plats' },
      { key: 'entrees', label: 'Entrées' },
      { key: 'desserts', label: 'Desserts' },
      { key: 'boissons', label: 'Boissons' },
    ] as const;
    Promise.all(
      cats.map(async (c) => ({
        ...c,
        items: await apiGet<RecetteCard[]>(`/api/recipes/home/${c.key}`),
      })),
    ).then(setSections);
  }, []);

  return (
    <div className="page home">
      <section className="hero-carousel">
        {slides.map((s, i) => (
          <div
            key={i}
            className="hero-slide"
            style={{ backgroundImage: `url(${s.img})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-caption">
              <h1>{s.title}</h1>
              <p>{s.subtitle}</p>
              {i === 0 && (
                <Link to="/recettes" className="cta">
                  Voir les recettes
                </Link>
              )}
              {i === 1 && (
                <Link to="/news" className="cta">
                  Voir les news
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

      {sections.map((sec) => (
        <section key={sec.key} className="card-section">
          <h2>{sec.label}</h2>
          <div className="card-grid">
            {sec.items.map((r) => (
              <Link
                key={r.id}
                to={`/recettes/${r.id}`}
                className="recipe-card"
              >
                {r.image && (
                  <img src={`/static/img/${r.image}`} alt="" loading="lazy" />
                )}
                <div className="recipe-card-body">
                  <h3>{r.titre}</h3>
                  <p>{r.description?.slice(0, 120)}…</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
