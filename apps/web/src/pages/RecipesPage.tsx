import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiGet, apiPost } from '../api/client';
import type { RecipeMeta, Recette } from '../types';
import './Page.css';

function useFilterState() {
  const [categorie, setCategorie] = useState<string[]>([]);
  const [saison, setSaison] = useState<string[]>([]);
  const [fete, setFete] = useState<string[]>([]);
  const [notation, setNotation] = useState<string[]>([]);
  const [minimum_prep, setMinPrep] = useState('');
  const [maximum_prep, setMaxPrep] = useState('');
  const [minimum_cuiss, setMinCuiss] = useState('');
  const [maximum_cuiss, setMaxCuiss] = useState('');

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
  };
}

export function RecipesPage() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const preset = view === 'saison' || view === 'fete' ? view : null;

  const [meta, setMeta] = useState<RecipeMeta | null>(null);
  const [list, setList] = useState<Recette[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { meta: filterUi, body } = useFilterState();

  const title = useMemo(() => {
    if (preset === 'saison') return 'Recettes par saison';
    if (preset === 'fete') return 'Recettes par fête';
    return 'Toutes les recettes';
  }, [preset]);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      if (!preset) {
        const m = await apiGet<RecipeMeta>('/api/recipes/meta');
        setMeta(m);
        const rows = await apiGet<Recette[]>('/api/recipes');
        setList(rows);
      } else if (preset === 'saison') {
        const opts = await apiGet<{ saison: string }[]>(
          '/api/recipes/filter-options/saison',
        );
        const saisonVals = opts.map((o) => o.saison).filter(Boolean);
        const rows = await apiPost<Recette[]>('/api/recipes/filter', {
          saison: saisonVals,
        });
        setList(rows);
      } else {
        const opts = await apiGet<{ fete: string }[]>(
          '/api/recipes/filter-options/fete',
        );
        const feteVals = opts.map((o) => o.fete).filter(Boolean);
        const rows = await apiPost<Recette[]>('/api/recipes/filter', {
          fete: feteVals,
        });
        setList(rows);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }, [preset]);

  useEffect(() => {
    load();
  }, [load]);

  const applyFilters = async () => {
    setLoading(true);
    setErr(null);
    try {
      const rows = await apiPost<Recette[]>('/api/recipes/filter', body);
      setList(rows);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !preset && !meta) {
    return <p>Chargement…</p>;
  }

  return (
    <div className="page">
      <h1>{title}</h1>
      <p className="lead">
        Filtrez par catégorie, saison, notation et temps de préparation.
      </p>
      {err && <p className="form-error">{err}</p>}

      <div className="filters-layout">
        {meta && !preset && (
          <aside className="filter-panel">
            <h3>Catégorie</h3>
            {meta.categories.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={filterUi.categorie.includes(c)}
                  onChange={() => filterUi.toggleCategorie(c)}
                />
                {c}
              </label>
            ))}
            <h3>Saison</h3>
            {meta.saisons.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={filterUi.saison.includes(c)}
                  onChange={() => filterUi.toggleSaison(c)}
                />
                {c}
              </label>
            ))}
            <h3>Fête</h3>
            {meta.fetes.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={filterUi.fete.includes(c)}
                  onChange={() => filterUi.toggleFete(c)}
                />
                {c}
              </label>
            ))}
            <h3>Notation</h3>
            {meta.notations.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={filterUi.notation.includes(c)}
                  onChange={() => filterUi.toggleNotation(c)}
                />
                {c}
              </label>
            ))}
            <h3>Temps préparation (min)</h3>
            <div className="range-row">
              <input
                type="number"
                placeholder="min"
                value={filterUi.minimum_prep}
                onChange={(e) => filterUi.setMinPrep(e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                placeholder="max"
                value={filterUi.maximum_prep}
                onChange={(e) => filterUi.setMaxPrep(e.target.value)}
              />
            </div>
            <h3>Temps cuisson (min)</h3>
            <div className="range-row">
              <input
                type="number"
                placeholder="min"
                value={filterUi.minimum_cuiss}
                onChange={(e) => filterUi.setMinCuiss(e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                placeholder="max"
                value={filterUi.maximum_cuiss}
                onChange={(e) => filterUi.setMaxCuiss(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="cta"
              style={{ marginTop: '1rem', border: 'none', cursor: 'pointer' }}
              onClick={applyFilters}
            >
              Appliquer les filtres
            </button>
          </aside>
        )}
        {preset && (
          <aside className="filter-panel">
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              Liste filtrée ({preset}).{' '}
              <Link to="/recettes">Toutes les recettes avec filtres</Link>
            </p>
          </aside>
        )}

        <section>
          {loading ? (
            <p>Chargement…</p>
          ) : (
            <div className="card-grid">
              {list.map((r) => (
                <Link
                  key={r.id}
                  to={`/recettes/${r.id}`}
                  className="recipe-card"
                >
                  {r.image && (
                    <img
                      src={`/static/img/${r.image}`}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <div className="recipe-card-body">
                    <h3>{r.titre}</h3>
                    <p>
                      Prép. {r.tempsPreparation ?? '—'} · Cal.{' '}
                      {r.calories ?? '—'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
