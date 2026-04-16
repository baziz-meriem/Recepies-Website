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
  image?: string;
  video?: string;
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
