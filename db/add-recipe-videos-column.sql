-- À exécuter si votre base existante n’a pas encore la colonne `videos`.
-- Ex. : docker compose exec -T mysql mysql -uroot -proot recettes < db/add-recipe-videos-column.sql

USE recettes;

ALTER TABLE `recettes`
  ADD COLUMN `videos` JSON NULL DEFAULT NULL AFTER `video`;
