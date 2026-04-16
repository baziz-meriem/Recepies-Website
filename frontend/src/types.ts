export type RecetteCard = {
  id: number;
  titre: string;
  description?: string;
  image?: string;
};

export type Recette = {
  id: number;
  categorie?: string;
  titre: string;
  /** 1 = visible on the public site; 0 = draft until validated in admin. */
  valide?: number;
  image?: string;
  /** @deprecated premier lien ; préférer `videos`. */
  video?: string;
  /** Liste de liens ou chemins après upload (JSON côté API). */
  videos?: string[] | null;
  description?: string;
  saison?: string;
  fete?: string;
  tempsPreparation?: string;
  tempsCuisson?: string;
  tempsRepos?: string;
  tempsTotal?: string;
  calories?: string;
  difficulte?: string;
  notation?: string;
};

export type Etape = {
  id: number;
  titre?: string;
  description?: string;
  image?: string;
};

export type RecipeMeta = {
  categories: string[];
  notations: string[];
  fetes: string[];
  saisons: string[];
};
