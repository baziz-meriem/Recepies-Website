import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { EtapeRecette } from '../entities/etape-recette.entity';
import { Recette } from '../entities/recette.entity';
import { Saison } from '../entities/saison.entity';
import { CreateRecetteDto } from './dto/create-recette.dto';
import { FilterRecipesDto } from './dto/filter-recipes.dto';
import { UpdateRecetteDto } from './dto/update-recette.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recette)
    private readonly recettes: Repository<Recette>,
    @InjectRepository(EtapeRecette)
    private readonly etapes: Repository<EtapeRecette>,
    @InjectRepository(Saison)
    private readonly saisons: Repository<Saison>,
  ) {}

  findAllOrdered() {
    return this.recettes.find({
      order: { tempsPreparation: 'ASC', calories: 'ASC' },
    });
  }

  async meta() {
    const [categories, notations, fetes, saisonRows] = await Promise.all([
      this.recettes
        .createQueryBuilder('r')
        .select('r.categorie', 'categorie')
        .distinct(true)
        .where("r.categorie IS NOT NULL AND r.categorie != ''")
        .orderBy('r.id', 'ASC')
        .getRawMany(),
      this.recettes
        .createQueryBuilder('r')
        .select('r.notation', 'notation')
        .distinct(true)
        .where("r.notation IS NOT NULL AND r.notation != ''")
        .orderBy('r.id', 'ASC')
        .getRawMany(),
      this.recettes
        .createQueryBuilder('r')
        .select('r.fete', 'fete')
        .distinct(true)
        .where("r.fete IS NOT NULL AND r.fete != ''")
        .orderBy('r.id', 'ASC')
        .getRawMany(),
      this.saisons.find({ order: { id: 'DESC' } }),
    ]);

    return {
      categories: categories
        .map((c: { categorie: string }) => c.categorie)
        .filter(Boolean),
      notations: notations
        .map((n: { notation: string }) => n.notation)
        .filter(Boolean),
      fetes: fetes.map((f: { fete: string }) => f.fete).filter(Boolean),
      saisons: saisonRows.map((s) => s.nom).filter(Boolean),
    };
  }

  distinctColumn(column: 'fete' | 'saison') {
    return this.recettes
      .createQueryBuilder('r')
      .select(`r.${column}`, column)
      .distinct(true)
      .where(`r.${column} IS NOT NULL AND r.${column} != ''`)
      .orderBy('r.id', 'ASC')
      .getRawMany();
  }

  byHomeCategory(cat: 'plats' | 'entrees' | 'desserts' | 'boissons') {
    return this.recettes.find({
      where: { categorie: cat },
      select: ['id', 'titre', 'description', 'image'],
    });
  }

  private applyFilters(
    qb: SelectQueryBuilder<Recette>,
    dto: FilterRecipesDto,
  ) {
    qb.where("r.titre IS NOT NULL AND r.titre != ''");
    if (dto.categorie?.length) {
      qb.andWhere('r.categorie IN (:...categorie)', {
        categorie: dto.categorie,
      });
    }
    if (dto.saison?.length) {
      qb.andWhere('r.saison IN (:...saison)', { saison: dto.saison });
    }
    if (dto.fete?.length) {
      qb.andWhere('r.fete IN (:...fete)', { fete: dto.fete });
    }
    if (dto.notation?.length) {
      qb.andWhere('r.notation IN (:...notation)', {
        notation: dto.notation,
      });
    }
    if (dto.minimum_prep && dto.maximum_prep) {
      qb.andWhere(
        'CAST(r.tempsPreparation AS UNSIGNED) BETWEEN :minp AND :maxp',
        {
          minp: Number(dto.minimum_prep),
          maxp: Number(dto.maximum_prep),
        },
      );
    }
    if (dto.minimum_cuiss && dto.maximum_cuiss) {
      qb.andWhere(
        'CAST(r.tempsCuisson AS UNSIGNED) BETWEEN :minc AND :maxc',
        {
          minc: Number(dto.minimum_cuiss),
          maxc: Number(dto.maximum_cuiss),
        },
      );
    }
    return qb;
  }

  filter(dto: FilterRecipesDto) {
    const qb = this.recettes.createQueryBuilder('r');
    this.applyFilters(qb, dto);
    return qb.orderBy('r.tempsPreparation', 'ASC').addOrderBy('r.calories', 'ASC').getMany();
  }

  async findOneWithDetails(id: number) {
    const recette = await this.recettes.findOne({ where: { id } });
    if (!recette) {
      throw new NotFoundException('Recette introuvable');
    }
    const etapes = await this.etapes.find({
      where: { recetteId: id },
      order: { id: 'ASC' },
    });
    const rows = await this.recettes.manager.query<{ nom: string }[]>(
      `SELECT i.nom AS nom FROM ingredients i
       INNER JOIN ingredients_recettes ir ON i.ID = ir.ingredient_id
       WHERE ir.recette_id = ?`,
      [id],
    );

    return {
      recette,
      etapes,
      ingredients: rows.map((x: { nom: string }) => x.nom).filter(Boolean),
    };
  }

  create(dto: CreateRecetteDto) {
    const row = this.recettes.create({
      categorie: dto.categorie,
      titre: dto.titre,
      image: dto.image,
      video: dto.video,
      description: dto.description,
      saison: dto.saison,
      fete: dto.fete,
      tempsPreparation: dto.temps_preparation,
      tempsCuisson: dto.temps_cuisson,
      tempsRepos: dto.temps_repos,
      calories: dto.calories,
      difficulte: dto.difficulte,
    });
    return this.recettes.save(row);
  }

  async update(id: number, dto: UpdateRecetteDto) {
    const row = await this.recettes.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }
    if (dto.categorie !== undefined) row.categorie = dto.categorie;
    if (dto.titre !== undefined) row.titre = dto.titre;
    if (dto.image !== undefined) row.image = dto.image;
    if (dto.video !== undefined) row.video = dto.video;
    if (dto.description !== undefined) row.description = dto.description;
    if (dto.saison !== undefined) row.saison = dto.saison;
    if (dto.fete !== undefined) row.fete = dto.fete;
    if (dto.temps_preparation !== undefined) {
      row.tempsPreparation = dto.temps_preparation;
    }
    if (dto.temps_cuisson !== undefined) row.tempsCuisson = dto.temps_cuisson;
    if (dto.temps_repos !== undefined) row.tempsRepos = dto.temps_repos;
    if (dto.calories !== undefined) row.calories = dto.calories;
    if (dto.difficulte !== undefined) row.difficulte = dto.difficulte;
    return this.recettes.save(row);
  }

  async remove(id: number) {
    const row = await this.recettes.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }
    await this.recettes.remove(row);
    return { ok: true };
  }

  async validate(id: number) {
    const row = await this.recettes.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }
    row.valide = 1;
    await this.recettes.save(row);
    return { ok: true };
  }
}
