import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { apiGet, apiPost } from '../api/client';
import { RecipeImage } from '../components/RecipeImage';
import type { RecipeMeta, Recette } from '../types';
import './Page.css';

function buildFallbackMeta(recipes: Recette[]): RecipeMeta {
  const categories = new Set<string>();
  const saisons = new Set<string>();
  const fetes = new Set<string>();
  const notations = new Set<string>();
  for (const r of recipes) {
    if (r.categorie) categories.add(r.categorie);
    if (r.saison) saisons.add(r.saison);
    if (r.fete) fetes.add(r.fete);
    if (r.notation) notations.add(r.notation);
  }
  const sortFr = (a: string, b: string) => a.localeCompare(b, 'fr');
  return {
    categories: [...categories].sort(sortFr),
    saisons: [...saisons].sort(sortFr),
    fetes: [...fetes].sort(sortFr),
    notations: [...notations].sort(sortFr),
  };
}

function groupRecipes(
  items: Recette[],
  mode: 'saison' | 'fete',
): { label: string; items: Recette[] }[] {
  const map = new Map<string, Recette[]>();
  const emptyLabel =
    mode === 'saison' ? 'Sans saison indiquée' : 'Sans fête indiquée';
  for (const r of items) {
    const raw = mode === 'saison' ? r.saison : r.fete;
    const label = raw?.trim() ? raw.trim() : emptyLabel;
    const prev = map.get(label);
    if (prev) prev.push(r);
    else map.set(label, [r]);
  }
  const labels = [...map.keys()].sort((a, b) => {
    const aEmpty = a === emptyLabel;
    const bEmpty = b === emptyLabel;
    if (aEmpty && !bEmpty) return 1;
    if (!aEmpty && bEmpty) return -1;
    return a.localeCompare(b, 'fr');
  });
  return labels.map((label) => ({ label, items: map.get(label)! }));
}

function useFilterState() {
  const [categorie, setCategorie] = useState<string[]>([]);
  const [saison, setSaison] = useState<string[]>([]);
  const [fete, setFete] = useState<string[]>([]);
  const [notation, setNotation] = useState<string[]>([]);
  const [minimum_prep, setMinPrep] = useState('');
  const [maximum_prep, setMaxPrep] = useState('');
  const [minimum_cuiss, setMinCuiss] = useState('');
  const [maximum_cuiss, setMaxCuiss] = useState('');

  const resetAll = useCallback(() => {
    setCategorie([]);
    setSaison([]);
    setFete([]);
    setNotation([]);
    setMinPrep('');
    setMaxPrep('');
    setMinCuiss('');
    setMaxCuiss('');
  }, []);

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const body = useMemo(
    () => ({
      categorie: categorie.length ? categorie : undefined,
      saison: saison.length ? saison : undefined,
      fete: fete.length ? fete : undefined,
      notation: notation.length ? notation : undefined,
      minimum_prep: minimum_prep || undefined,
      maximum_prep: maximum_prep || undefined,
      minimum_cuiss: minimum_cuiss || undefined,
      maximum_cuiss: maximum_cuiss || undefined,
    }),
    [
      categorie,
      saison,
      fete,
      notation,
      minimum_prep,
      maximum_prep,
      minimum_cuiss,
      maximum_cuiss,
    ],
  );

  return {
    meta: {
      categorie,
      saison,
      fete,
      notation,
      toggleCategorie: (v: string) => toggle(categorie, v, setCategorie),
      toggleSaison: (v: string) => toggle(saison, v, setSaison),
      toggleFete: (v: string) => toggle(fete, v, setFete),
      toggleNotation: (v: string) => toggle(notation, v, setNotation),
      minimum_prep,
      maximum_prep,
      minimum_cuiss,
      maximum_cuiss,
      setMinPrep,
      setMaxPrep,
      setMinCuiss,
      setMaxCuiss,
    },
    body,
    resetAll,
  };
}

type FilterGroupOrder =
  | 'categorie'
  | 'saison'
  | 'fete'
  | 'notation'
  | 'timePrep'
  | 'timeCuiss';

function filterGroupOrder(preset: 'saison' | 'fete' | null): FilterGroupOrder[] {
  if (preset === 'saison') {
    return [
      'saison',
      'fete',
      'categorie',
      'notation',
      'timePrep',
      'timeCuiss',
    ];
  }
  if (preset === 'fete') {
    return [
      'fete',
      'saison',
      'categorie',
      'notation',
      'timePrep',
      'timeCuiss',
    ];
  }
  return [
    'categorie',
    'saison',
    'fete',
    'notation',
    'timePrep',
    'timeCuiss',
  ];
}

export function RecipesPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const preset = view === 'saison' || view === 'fete' ? view : null;

  const [meta, setMeta] = useState<RecipeMeta | null>(null);
  const [list, setList] = useState<Recette[]>([]);
  const [loading, setLoading] = useState(true);
  const [metaWarn, setMetaWarn] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const { meta: filterUi, body, resetAll } = useFilterState();

  const title = useMemo(() => {
    if (preset === 'saison') return 'Recettes par saison';
    if (preset === 'fete') return 'Recettes par fête';
    return 'Toutes les recettes';
  }, [preset]);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    setMetaWarn(null);
    try {
      const [rows, metaRaw] = await Promise.all([
        apiGet<Recette[]>('/api/recipes'),
        apiGet<RecipeMeta>('/api/recipes/meta').catch(() => null),
      ]);
      setList(rows);
      if (metaRaw) {
        setMeta(metaRaw);
      } else {
        setMeta(buildFallbackMeta(rows));
        setMetaWarn(
          'Les libellés de filtres sont dérivés des recettes affichées (meta API indisponible).',
        );
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
      setList([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const scrollDoneForView = useRef<string | null>(null);
  useEffect(() => {
    scrollDoneForView.current = null;
  }, [preset]);

  useEffect(() => {
    if (!preset || loading || !meta) return;
    const key = `${preset}-${location.key}`;
    if (scrollDoneForView.current === key) return;
    const id =
      preset === 'saison' ? 'filter-anchor-saison' : 'filter-anchor-fete';
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      scrollDoneForView.current = key;
    }, 100);
    return () => window.clearTimeout(t);
  }, [preset, loading, meta, location.key]);

  const applyFilters = async () => {
    setLoading(true);
    setErr(null);
    try {
      const rows = await apiPost<Recette[]>('/api/recipes/filter', body);
      setList(rows);
      if (!meta) {
        setMeta(buildFallbackMeta(rows));
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const resetFiltersAndReload = async () => {
    resetAll();
    setLoading(true);
    setErr(null);
    try {
      const rows = await apiGet<Recette[]>('/api/recipes');
      setList(rows);
      try {
        const m = await apiGet<RecipeMeta>('/api/recipes/meta');
        setMeta(m);
        setMetaWarn(null);
      } catch {
        setMeta(buildFallbackMeta(rows));
        setMetaWarn(
          'Les libellés de filtres sont dérivés des recettes affichées.',
        );
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const leadText = preset
    ? 'Recettes regroupées ci-dessous ; affinez avec le panneau à gauche (catégorie, saison, fête, notation, temps) puis cliquez sur « Appliquer les filtres ».'
    : 'Cochez une ou plusieurs valeurs dans chaque bloc utile, puis « Appliquer les filtres ». Vous pouvez combiner catégorie, saison, fête, notation et plages de temps (min. et/ou max.).';

  const grouped = useMemo(() => {
    if (!preset || list.length === 0) return null;
    return groupRecipes(list, preset);
  }, [preset, list]);

  const groupKeys = useMemo(() => filterGroupOrder(preset), [preset]);

  const renderRecipeCard = (r: Recette) => (
    <Link
      key={r.id}
      to={`/recettes/${r.id}`}
      state={{
        from: `${location.pathname}${location.search}`,
      }}
      className="recipe-card recipe-card--lift"
    >
      <div className="recipe-card__media">
        <RecipeImage image={r.image} alt="" loading="lazy" />
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{r.titre}</h3>
        <p className="recipe-card__excerpt">
          {preset === 'saison' && r.fete && `${r.fete} · `}
          {preset === 'fete' && r.saison && `Saison ${r.saison} · `}
          {preset == null && (
            <>
              {r.saison ?? '—'} · {r.fete || '—'} ·{' '}
            </>
          )}
          Préparation {r.tempsPreparation ?? '—'} · Calories{' '}
          {r.calories ?? '—'}
        </p>
        <span className="recipe-card__more">Voir la recette →</span>
      </div>
    </Link>
  );

  const renderFilterGroups = () => {
    if (!meta) return null;
    const blocks: Record<FilterGroupOrder, ReactElement> = {
      categorie: (
        <div key="categorie" className="filter-group">
          <h3 className="filter-group__title">Sélectionner catégorie</h3>
          <ul className="filter-group__list">
            {meta.categories.length === 0 ? (
              <li className="filter-group__empty">Aucune catégorie</li>
            ) : (
              meta.categories.map((c) => (
                <li key={c}>
                  <label className="filter-tag">
                    <input
                      type="checkbox"
                      checked={filterUi.categorie.includes(c)}
                      onChange={() => filterUi.toggleCategorie(c)}
                    />
                    <span>{c}</span>
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
      ),
      saison: (
        <div
          key="saison"
          id="filter-anchor-saison"
          className={
            preset === 'saison'
              ? 'filter-group filter-group--accent'
              : 'filter-group'
          }
        >
          <h3 className="filter-group__title">Sélectionner saison</h3>
          <ul className="filter-group__list">
            {meta.saisons.length === 0 ? (
              <li className="filter-group__empty">Aucune saison</li>
            ) : (
              meta.saisons.map((c) => (
                <li key={c}>
                  <label className="filter-tag">
                    <input
                      type="checkbox"
                      checked={filterUi.saison.includes(c)}
                      onChange={() => filterUi.toggleSaison(c)}
                    />
                    <span>{c}</span>
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
      ),
      fete: (
        <div
          key="fete"
          id="filter-anchor-fete"
          className={
            preset === 'fete'
              ? 'filter-group filter-group--accent'
              : 'filter-group'
          }
        >
          <h3 className="filter-group__title">Sélectionner fête</h3>
          <ul className="filter-group__list">
            {meta.fetes.length === 0 ? (
              <li className="filter-group__empty">Aucune fête</li>
            ) : (
              meta.fetes.map((c) => (
                <li key={c}>
                  <label className="filter-tag">
                    <input
                      type="checkbox"
                      checked={filterUi.fete.includes(c)}
                      onChange={() => filterUi.toggleFete(c)}
                    />
                    <span>{c}</span>
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
      ),
      notation: (
        <div key="notation" className="filter-group">
          <h3 className="filter-group__title">Sélectionner notation</h3>
          <ul className="filter-group__list">
            {meta.notations.length === 0 ? (
              <li className="filter-group__empty">Aucune notation</li>
            ) : (
              meta.notations.map((c) => (
                <li key={c}>
                  <label className="filter-tag">
                    <input
                      type="checkbox"
                      checked={filterUi.notation.includes(c)}
                      onChange={() => filterUi.toggleNotation(c)}
                    />
                    <span>{c}</span>
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
      ),
      timePrep: (
        <div key="timePrep" className="filter-group">
          <h3 className="filter-group__title">Temps préparation (min)</h3>
          <div className="range-row">
            <input
              type="number"
              min={0}
              placeholder="min"
              value={filterUi.minimum_prep}
              onChange={(e) => filterUi.setMinPrep(e.target.value)}
            />
            <span className="range-sep">—</span>
            <input
              type="number"
              min={0}
              placeholder="max"
              value={filterUi.maximum_prep}
              onChange={(e) => filterUi.setMaxPrep(e.target.value)}
            />
          </div>
        </div>
      ),
      timeCuiss: (
        <div key="timeCuiss" className="filter-group">
          <h3 className="filter-group__title">Temps cuisson (min)</h3>
          <div className="range-row">
            <input
              type="number"
              min={0}
              placeholder="min"
              value={filterUi.minimum_cuiss}
              onChange={(e) => filterUi.setMinCuiss(e.target.value)}
            />
            <span className="range-sep">—</span>
            <input
              type="number"
              min={0}
              placeholder="max"
              value={filterUi.maximum_cuiss}
              onChange={(e) => filterUi.setMaxCuiss(e.target.value)}
            />
          </div>
        </div>
      ),
    };

    return groupKeys.map((k) => blocks[k]);
  };

  return (
    <div className="page page--inner">
      <header className="page-header">
        <h1 className="page-header__title">{title}</h1>
        <p className="page-header__lead">{leadText}</p>
      </header>
      {err && <p className="form-error">{err}</p>}
      {metaWarn && !err && (
        <p className="form-hint form-hint--warn" role="status">
          {metaWarn}
        </p>
      )}

      <div className="filters-layout">
        <aside className="filter-panel" aria-label="Filtres des recettes">
          <h2 className="filter-panel__title">Filtres</h2>
          {preset && (
            <div className="filter-banner">
              <span className="filter-banner__label">
                Vue active :{' '}
                <strong>
                  {preset === 'saison' ? 'par saison' : 'par fête'}
                </strong>
              </span>
              <Link className="filter-banner__link" to="/recettes">
                Voir toutes les recettes
              </Link>
            </div>
          )}

          {!meta && loading ? (
            <div className="filter-panel__loading">
              <p>Chargement des filtres…</p>
            </div>
          ) : meta ? (
            <>
              <div className="filter-panel__body">{renderFilterGroups()}</div>
              <div className="filter-panel__actions">
                <button
                  type="button"
                  className="cta filter-apply"
                  onClick={applyFilters}
                  disabled={loading}
                >
                  Appliquer les filtres
                </button>
                <button
                  type="button"
                  className="filter-reset"
                  onClick={resetFiltersAndReload}
                  disabled={loading}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </>
          ) : (
            <div className="filter-panel__loading">
              <p>Impossible de charger les filtres sans recettes.</p>
            </div>
          )}
        </aside>

        <section className="filters-results" aria-live="polite">
          {loading && list.length === 0 ? (
            <div className="filters-results-loading">
              <p>Chargement des recettes…</p>
            </div>
          ) : list.length === 0 ? (
            <div className="filters-empty">
              <p>
                {err
                  ? 'Les recettes n’ont pas pu être chargées.'
                  : 'Aucune recette ne correspond à ces critères.'}
              </p>
              <button
                type="button"
                className="cta cta--secondary"
                onClick={resetFiltersAndReload}
              >
                Voir toutes les recettes
              </button>
            </div>
          ) : preset && grouped ? (
            <div className="recipe-groups">
              {grouped.map((g) => (
                <section key={g.label} className="recipe-group">
                  <h2 className="recipe-group__title">{g.label}</h2>
                  <div className="card-grid">{g.items.map((r) => renderRecipeCard(r))}</div>
                </section>
              ))}
            </div>
          ) : (
            <div className="card-grid">{list.map((r) => renderRecipeCard(r))}</div>
          )}
        </section>
      </div>
    </div>
  );
}
