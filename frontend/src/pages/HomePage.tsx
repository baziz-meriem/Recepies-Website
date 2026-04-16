import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import type { RecetteCard } from '../types';
import { HomeCategoryCarousel } from '../components/HomeCategoryCarousel';
import './Page.css';

const SLIDE_MS = 6500;

const slides = [
  {
    title: 'Premier site de cuisine en Algérie',
    subtitle:
      'Choisissez vos ingrédients : nous vous proposons des centaines d’idées en un clic.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&q=85',
    cta: { to: '/recettes', label: 'Voir les recettes' },
  },
  {
    title: 'Nouvelles du monde de la cuisine',
    subtitle:
      'Actualités en Algérie et ailleurs : ne manquez aucune inspiration culinaire.',
    img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1600&q=85',
    cta: { to: '/news', label: 'Voir les news' },
  },
  {
    title: 'Diverses idées de recettes',
    subtitle:
      'Pour vous inspirer ou cuisiner au quotidien — plats, desserts et boissons.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85',
    cta: { to: '/nutrition', label: 'Nutrition & infos' },
  },
];

export function HomePage() {
  const [sections, setSections] = useState<
    { key: string; label: string; desc: string; items: RecetteCard[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const cats = [
      {
        key: 'plats',
        label: 'Plats',
        desc: 'Plats mijotés, couscous, tajines et spécialités du terroir.',
      },
      {
        key: 'entrees',
        label: 'Entrées',
        desc: 'Soupes, salades et entrées pour commencer le repas en beauté.',
      },
      {
        key: 'desserts',
        label: 'Desserts',
        desc: 'Pâtisseries orientales et douceurs à partager.',
      },
      {
        key: 'boissons',
        label: 'Boissons',
        desc: 'Thés, jus et boissons rafraîchissantes maison.',
      },
    ] as const;
    setLoading(true);
    setLoadErr(null);
    Promise.all(
      cats.map(async (c) => ({
        ...c,
        items: await apiGet<RecetteCard[]>(`/api/recipes/home/${c.key}`),
      })),
    )
      .then((data) => {
        if (!cancelled) {
          setSections(data);
          setLoadErr(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setLoadErr(e instanceof Error ? e.message : 'Impossible de charger les recettes.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const n = slides.length;
  const go = useCallback((i: number) => {
    setSlide(((i % n) + n) % n);
  }, [n]);

  useEffect(() => {
    const t = window.setInterval(() => {
      setSlide((s) => (s + 1) % n);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className="page page--home">
      <section className="hero" aria-roledescription="carousel">
        <div className="hero__logo-badge" aria-hidden="true">
          <span className="hero__logo-icon" />
        </div>

        <div className="hero__viewport">
          <div
            className="hero__track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div
                key={i}
                className="hero__slide"
                style={{ backgroundImage: `url(${s.img})` }}
                aria-hidden={slide !== i}
              >
                <div className="hero__overlay" />
                <div className="hero__caption">
                  <h1 className="hero__title">{s.title}</h1>
                  <p className="hero__subtitle">{s.subtitle}</p>
                  <Link to={s.cta.to} className="hero__cta">
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="hero__arrow hero__arrow--prev"
          aria-label="Diapositive précédente"
          onClick={() => go(slide - 1)}
        />
        <button
          type="button"
          className="hero__arrow hero__arrow--next"
          aria-label="Diapositive suivante"
          onClick={() => go(slide + 1)}
        />

        <div className="hero__dots" role="tablist" aria-label="Choisir une diapositive">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              className={`hero__dot${slide === i ? ' hero__dot--active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Diapositive ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="page__inner">
        <section className="intro-band">
          <h2 className="intro-band__title">Bienvenue</h2>
          <p className="intro-band__text">
            Explorez nos recettes par catégorie, filtrez par saison ou par fête, et
            découvrez des idées adaptées à votre cuisine.
          </p>
        </section>

        {loadErr && (
          <p className="form-error" role="alert">
            {loadErr} Vérifiez que l’API tourne (port 3000) et que la base est
            accessible.
          </p>
        )}
        {loading && !loadErr && (
          <p className="page-header__lead">Chargement des recettes…</p>
        )}

        {!loading &&
          !loadErr &&
          sections.map((sec) => (
            <section key={sec.key} className="category-block">
              <header className="category-block__head">
                <h2 className="category-block__title">{sec.label}</h2>
                <p className="category-block__desc">{sec.desc}</p>
              </header>
              <HomeCategoryCarousel categoryLabel={sec.label} items={sec.items} />
            </section>
          ))}
      </div>
    </div>
  );
}
