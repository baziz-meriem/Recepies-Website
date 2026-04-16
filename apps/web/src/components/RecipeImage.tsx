import { recipeImageUrl } from '../api/client';

type Props = {
  image?: string | null;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/**
 * Image recette avec repli automatique (fichier manquant, URL externe en erreur).
 */
export function RecipeImage({
  image,
  alt = '',
  className,
  loading = 'lazy',
}: Props) {
  const fallback = recipeImageUrl(null);
  const primary = recipeImageUrl(image);

  return (
    <img
      src={primary}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={(e) => {
        const el = e.currentTarget;
        if (el.dataset.fallback === '1') return;
        el.dataset.fallback = '1';
        el.src = fallback;
      }}
    />
  );
}
