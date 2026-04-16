import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { RecetteCard } from '../types';
import { RecipeImage } from './RecipeImage';

type Props = {
  categoryLabel: string;
  items: RecetteCard[];
};

export function HomeCategoryCarousel({ categoryLabel, items }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: -1 | 1) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.home-carousel__card');
    const step = card
      ? card.offsetWidth + 16
      : Math.min(el.clientWidth * 0.82, 300);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  if (items.length === 0) {
    return (
      <p className="category-block__empty">
        Aucune recette dans cette catégorie pour le moment.
      </p>
    );
  }

  return (
    <div className="home-carousel">
      <button
        type="button"
        className="home-carousel__arrow home-carousel__arrow--prev"
        aria-label="Recettes précédentes"
        onClick={() => scroll(-1)}
      />
      <div
        ref={viewportRef}
        className="home-carousel__viewport"
        tabIndex={0}
        role="region"
        aria-roledescription="carrousel"
        aria-label={`Recettes — ${categoryLabel}`}
      >
        {items.map((r) => (
            <Link
              key={r.id}
              to={`/recettes/${r.id}`}
              state={{ from: '/' }}
              className="recipe-card recipe-card--lift home-carousel__card"
            >
              <div className="recipe-card__media">
                <RecipeImage image={r.image} alt="" loading="lazy" />
              </div>
              <div className="recipe-card__body">
                <h3 className="recipe-card__title">{r.titre}</h3>
                <p className="recipe-card__excerpt">
                  {r.description
                    ? `${r.description.slice(0, 100)}${r.description.length > 100 ? '…' : ''}`
                    : 'Découvrir la recette'}
                </p>
                <span className="recipe-card__more">Voir la recette →</span>
              </div>
            </Link>
        ))}
      </div>
      <button
        type="button"
        className="home-carousel__arrow home-carousel__arrow--next"
        aria-label="Recettes suivantes"
        onClick={() => scroll(1)}
      />
    </div>
  );
}
