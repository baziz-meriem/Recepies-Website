-- Dev seed: recreates tables and rich sample data (French copy, cuisine algérienne & méditerranéenne).
-- Run: npm run db:seed  (requires Docker MySQL from docker-compose.yml)
SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS `recettes`;
SET FOREIGN_KEY_CHECKS = 0;

USE recettes;

DROP TABLE IF EXISTS `ingredients_recettes`;
DROP TABLE IF EXISTS `etapes_recette`;
DROP TABLE IF EXISTS `ingredients_desc`;
DROP TABLE IF EXISTS `news_desc`;
DROP TABLE IF EXISTS `recettes`;
DROP TABLE IF EXISTS `ingredients`;
DROP TABLE IF EXISTS `news`;
DROP TABLE IF EXISTS `saison`;
DROP TABLE IF EXISTS `utilisateur`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `saison` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `utilisateur` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `date_naissance` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UQ_utilisateur_mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ingredients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `saison` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text,
  `healthy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `recettes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) DEFAULT NULL,
  `titre` varchar(255) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `video` varchar(500) DEFAULT NULL,
  `description` text,
  `saison` varchar(255) DEFAULT NULL,
  `fete` varchar(255) DEFAULT NULL,
  `temps_preparation` varchar(255) DEFAULT NULL,
  `temps_cuisson` varchar(255) DEFAULT NULL,
  `temps_repos` varchar(255) DEFAULT NULL,
  `temps_total` varchar(255) DEFAULT NULL,
  `calories` varchar(255) DEFAULT NULL,
  `difficulte` varchar(255) DEFAULT NULL,
  `notation` varchar(255) DEFAULT NULL,
  `valide` tinyint DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `etapes_recette` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `recette_id` int NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_etapes_recette` (`recette_id`),
  CONSTRAINT `FK_etapes_recette` FOREIGN KEY (`recette_id`) REFERENCES `recettes` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ingredients_recettes` (
  `recette_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`recette_id`,`ingredient_id`),
  KEY `FK_ir_ingredient` (`ingredient_id`),
  CONSTRAINT `FK_ir_recette` FOREIGN KEY (`recette_id`) REFERENCES `recettes` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_ir_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `news` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(500) DEFAULT NULL,
  `video` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `news_desc` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_news_desc_news` (`news_id`),
  CONSTRAINT `FK_news_desc_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ingredients_desc` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ingredient_id` int NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ingredients_desc_ing` (`ingredient_id`),
  CONSTRAINT `FK_ingredients_desc_ing` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `saison` (`ID`, `nom`) VALUES
(1, 'printemps'),
(2, 'été'),
(3, 'automne'),
(4, 'hiver');

INSERT INTO `utilisateur` (`ID`, `nom`, `prenom`, `mail`, `sexe`, `date_naissance`, `mot_de_passe`) VALUES
(1, 'Démo', 'Utilisateur', 'demo@example.com', 'homme', '1990-01-15', 'demo123');

INSERT INTO `ingredients` (`ID`, `nom`, `saison`, `titre`, `description`, `healthy`) VALUES
(1, 'Semoule', 'été', 'Semoule de blé dur', 'Base noble du couscous : apport en glucides complexes et texture légère après cuisson à la vapeur.', 'oui'),
(2, 'Tomate', 'été', 'Tomate fraîche', 'Riche en lycopène et vitamine C, idéale grillée ou en sauce.', 'oui'),
(3, 'Pois chiches', 'printemps', 'Pois chiches', 'Légumineuse nourrissante : fibres, protéines végétales, minéraux.', 'oui'),
(4, 'Menthe', 'printemps', 'Menthe fraîche', 'Parfume thés, taboulés et certaines salades du Maghreb.', 'oui'),
(5, 'Huile d''olive', 'automne', 'Huile d''olive vierge', 'Graisse principale de la cuisine méditerranéenne, riche en acides gras mono-insaturés.', 'oui'),
(6, 'Blé concassé', 'hiver', 'Frik / blé vert', 'Le frik — aussi appelé blé vert concassé — est du blé récolté encore immature, séché puis brisé en grains irréguliers. Pilier des soupes maghrébines (chorba, harira), il épaissit naturellement le bouillon et offre une texture rustique très appréciée. Riche en fibres alimentaires et en glucides complexes à index glycémique modéré lorsqu''il est associé à des légumes et des légumineuses, il participe à un repas équilibré et durablement rassasiant.', 'oui'),
(7, 'Amande', 'automne', 'Amande douce', 'Fruits à coque : lipides de qualité, vitamine E, usage en pâtisserie orientale.', 'oui'),
(8, 'Miel', 'printemps', 'Miel de fleurs', 'Sucre naturel aux arômes variés, parfait pour desserts et boissons.', 'oui'),
(9, 'Citron', 'hiver', 'Citron frais', 'Acidité qui équilibre les plats mijotés et les salades.', 'oui'),
(10, 'Pomme de terre', 'automne', 'Pomme de terre', 'Féculent polyvalent : four, friture ou purée.', 'oui'),
(11, 'Orge', 'hiver', 'Orge perlée', 'Céréale pour soupes (harira) et plats réconfortants.', 'oui'),
(12, 'Fleur d''oranger', 'printemps', 'Eau de fleur d''oranger', 'Parfum floral indispensable aux pâtisseries maghrébines.', 'oui'),
(13, 'Bissap', 'été', 'Hibiscus sabdariffa', 'Fleur séchée pour infusion rouge, riche en anthocyanes.', 'oui'),
(14, 'Thé vert', 'toutes', 'Thé vert gunpowder', 'Base du thé à la menthe : légèrement tannique, se marie à la chaleur.', 'oui'),
(15, 'Datte', 'automne', 'Datte Deglet Nour', 'Fruit sucré, fibres et potassium — collation ou desserts.', 'oui'),
(16, 'Courgette', 'été', 'Courgette', 'Légume d''été peu calorique, poêlée ou farcie.', 'oui');

INSERT INTO `ingredients_desc` (`ID`, `ingredient_id`, `titre`, `description`, `image`) VALUES
(1, 1, 'Choix et conservation', 'Préférer une semoule moyenne pour couscous ; conserver au sec, à l''abri de l''humidité.', NULL),
(2, 1, 'Astuce vapeur', 'La semoule se déshydrate en plusieurs passages vapeur pour éviter le grumeau.', NULL),
(3, 2, 'Conservation', 'À maturité, conserver au frais ; éviter le froid pour les tomates encore vertes.', NULL),
(4, 2, 'Idées recettes', 'Salade méchouia, chakchouka, sauces mijotées.', NULL),
(5, 3, 'Trempage', 'Faire tremper les pois chiches secs la veille pour une cuisson homogène.', NULL),
(6, 5, 'Température d''utilisation', 'Pour une saveur maximale, ajouter un filet à la fin de cuisson sur les plats chauds.', NULL),
(7, 7, 'Toastage', 'Les amandes se torréfient à sec quelques minutes avant broyage pour les pâtisseries.', NULL),
(8, 13, 'Infusion', 'Laisser infuser 10 à 15 minutes, sucrer après refroidissement pour un jus bien rouge.', NULL),
(9, 14, 'Montée en mousse', 'Verser un filet d''eau bouillante sur le thé dans le verre pour faire mousser avant la menthe.', NULL),
(10, 15, 'Remplacer le sucre', 'En purée, les dattes peuvent sucrer naturellement smoothies et pâtés à tartiner.', NULL),
(11, 6, 'D''où vient le frik ?', 'Très présent en Algérie, Tunisie et Libye, le frik prolonge une tradition de valorisation du blé avant maturité complète : le grain garde une note herbacée et une couleur verdâtre. Il ne doit pas être confondu avec la semoule : le frik reste granuleux après cuisson et ne se dissout pas dans le liquide.', NULL),
(12, 6, 'Atouts nutritionnels', 'Le blé concassé apporte des glucides complexes, des fibres utiles au confort digestif, ainsi que des protéines végétales modestes mais complémentaires des légumineuses (lentilles, pois chiches) souvent cuisinées avec lui. Associé à un bouillon riche en légumes, il participe à un plat complet sans excès de matières grasses.', NULL),
(13, 6, 'En cuisine : les classiques', 'On l''utilise surtout dans la chorba frik (soupe épaisse à la viande et aux légumes), dans certaines hariras, ou comme élément d''un plat unique mijoté. Il absorbe les parfums d''épices (cannelle, coriandre, paprika doux) et se marie avec tomates, céleri et pois chiches. Comptez en général 20 à 35 minutes de cuisson à frémissement après trempage.', NULL),
(14, 6, 'Trempage, cuisson et conservation', 'Rincez le frik à l''eau froide. Faites-le tremper 30 à 60 minutes (voire la nuit) pour réduire le temps de cuisson et une meilleure digestibilité. Conservez-le au sec dans un bocal hermétique, à l''abri de l''humidité et des insectes ; à l''ouverture, sentez l''odeur : elle doit rester douce et « céréalière », sans moisi.', NULL);

INSERT INTO `recettes` (`ID`, `categorie`, `titre`, `image`, `video`, `description`, `saison`, `fete`, `temps_preparation`, `temps_cuisson`, `temps_repos`, `temps_total`, `calories`, `difficulte`, `notation`, `valide`) VALUES
(1, 'plats', 'Couscous aux légumes', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=80', '', 'Semoule vapeur, légumes de saison fondants dans un bouillon parfumé au ras el hanout — le plat convivial par excellence.', 'automne', 'aid', '30', '60', '10', '100', '420', 'moyenne', '5', 1),
(2, 'plats', 'Rfiss bel batata', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80', '', 'Pommes de terre fondantes, sauce tomate épicée et viande tendre : réconfort d''hiver.', 'hiver', '', '25', '45', '0', '70', '380', 'facile', '4', 1),
(3, 'plats', 'Rechta au poulet', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80', '', 'Pâtes fines maison, bouillon clair au safran et poulet mijoté — spécialité des fêtes familiales.', 'hiver', 'mouloud', '40', '50', '20', '110', '445', 'difficile', '5', 1),
(4, 'plats', 'Mhadjeb oranais', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80', '', 'Crêpes feuilletées farcies à la harissa, tomates et herbes — croustillant et parfumé.', 'été', '', '35', '25', '30', '90', '295', 'moyenne', '4', 1),
(5, 'plats', 'Tajine de courgettes', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80', '', 'Courgettes fondantes, œufs et épices douces en cocotte — léger et parfumé.', 'été', '', '20', '35', '0', '55', '220', 'facile', '4', 1),
(6, 'plats', 'Bourek à la viande', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80', '', 'Feuilles de brick croustillantes, farce épicée — entrée chaude appréciée au ramadan.', 'printemps', 'ramadan', '45', '20', '0', '65', '310', 'moyenne', '5', 1),
(7, 'entrees', 'Chorba frik', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', '', 'Soupe épaisse au blé concassé, légumes et coriandre — réconfort des soirées d''hiver.', 'hiver', 'ramadan', '20', '40', '5', '65', '210', 'facile', '5', 1),
(8, 'entrees', 'Salade méchouia', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80', '', 'Poivrons et tomates grillés, huile d''olive, ail et câpres — fraîcheur et fumé.', 'été', '', '15', '10', '0', '25', '120', 'facile', '4', 1),
(9, 'entrees', 'Harira marocaine', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80', '', 'Soupe nourrissante tomate, lentilles, pois chiches et vermicelle — repas complet.', 'automne', 'ramadan', '25', '45', '10', '80', '265', 'moyenne', '5', 1),
(10, 'entrees', 'Chakchouka', 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=1200&q=80', '', 'Poivrons, tomates et œufs pochés — coloré et express pour un brunch.', 'printemps', '', '15', '20', '0', '35', '185', 'facile', '5', 1),
(11, 'entrees', 'Salade d''oranges à la cannelle', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80', '', 'Oranges en tranches, miel, cannelle et fleur d''oranger — dessert d''agrumes rafraîchissant.', 'hiver', '', '12', '0', '15', '27', '95', 'facile', '3', 1),
(12, 'entrees', 'Soupe de lentilles corail', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80', '', 'Velouté épicé au cumin, servi avec un filet de citron — équilibre et couleur.', 'automne', '', '10', '25', '0', '35', '155', 'facile', '4', 1),
(13, 'desserts', 'Makroud el louse', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80', '', 'Gâteau aux amandes, parfumé à l''eau de fleur d''oranger et enrobé de miel.', 'printemps', 'aid', '40', '25', '120', '185', '310', 'moyenne', '5', 1),
(14, 'desserts', 'Sablés à la confiture', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80', '', 'Petits sablés fondants pour le thé — confiture de figues ou d''abricots.', 'printemps', '', '35', '15', '30', '80', '180', 'facile', '3', 1),
(15, 'desserts', 'Baklawa aux amandes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80', '', 'Filo croustillant, sirop parfumé et amandes — sucrerie de partage.', 'hiver', 'aid', '50', '35', '60', '145', '385', 'difficile', '5', 1),
(16, 'desserts', 'Mhalbi à la fleur d''oranger', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80', '', 'Crème de riz parfumée, saupoudrée de cannelle — douceur glacée.', 'été', '', '15', '10', '240', '265', '195', 'facile', '4', 1),
(17, 'desserts', 'Griwech aux sésames', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80', '', 'Torsades frites enrobées de miel et graines de sésame — croquant sucré.', 'printemps', 'mouloud', '55', '25', '0', '80', '340', 'moyenne', '4', 1),
(18, 'boissons', 'Thé à la menthe', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=80', '', 'Thé vert, menthe fraîche et sucre — mousse à l''envi, rituel du partage.', 'été', '', '5', '10', '0', '15', '40', 'facile', '5', 1),
(19, 'boissons', 'Jus de bissap', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80', '', 'Infusion d''hibiscus glacée, acidulée et profondément rouge.', 'été', '', '10', '5', '120', '135', '90', 'facile', '4', 1),
(20, 'boissons', 'Sharbat aux amandes', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1200&q=80', '', 'Lait d''amande maison, eau de rose et sucre — boisson opulente pour les fêtes.', 'printemps', 'aid', '15', '0', '60', '75', '210', 'facile', '4', 1),
(21, 'boissons', 'Lben maison', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80', '', 'Boisson lactée fermentée, légèrement effervescente — digestion et fraîcheur.', 'été', '', '5', '0', '720', '725', '55', 'facile', '3', 1),
(22, 'boissons', 'Café aux dattes', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', '', 'Expresso corsé servi avec une datte — équilibre amer-sucré.', 'automne', '', '3', '2', '0', '5', '35', 'facile', '4', 1);

INSERT INTO `etapes_recette` (`ID`, `recette_id`, `titre`, `description`, `image`) VALUES
(1, 1, 'Préparer le bouillon', 'Faire revenir oignons et épices, ajouter les légumes coupés en gros morceaux, couvrir d''eau et mijoter 30 minutes.', NULL),
(2, 1, 'Cuire la semoule', 'Passer la semoule à la vapeur en trois fois en l''égrainant entre chaque étape pour une texture légère.', NULL),
(3, 1, 'Dresser', 'Former un dôme de semoule, entourer de légumes et arroser de bouillon fumant.', NULL),
(4, 2, 'Saisir la viande', 'Colorer la viande avec les épices, ajouter l''oignon jusqu''à fondre.', NULL),
(5, 2, 'Ajouter les pommes de terre', 'Couvrir d''eau ou de tomates, laisser mijoter jusqu''à cuisson complète des pommes de terre.', NULL),
(6, 3, 'Bouillon parfumé', 'Mijoter le poulet avec oignon, carotte, safran et épices pour un bouillon doré.', NULL),
(7, 3, 'Pâtes rechta', 'Étaler et couper les feuilles de pâte fines, les cuire dans le bouillon filtré.', NULL),
(8, 3, 'Service', 'Disposer viande, pâtes et bouillon dans un grand plat de service.', NULL),
(9, 4, 'Pâte feuilletée', 'Pétrir une pâte souple, la badigeonner d''huile et la plier plusieurs fois.', NULL),
(10, 4, 'Farce', 'Mélanger tomates râpées, harissa douce, herbes et épices ; farcir et plier les mhadjeb.', NULL),
(11, 5, 'Émincer', 'Couper les courgettes en rondelles épaisses pour qu''elles tiennent à la cuisson.', NULL),
(12, 5, 'Mijoter', 'Cuire à couvert avec tomates, ail et cumin jusqu''à fondant, puis casser les œufs sur le dessus.', NULL),
(13, 6, 'Préparer la farce', 'Faire revenir la viande hachée avec oignon, ail, paprika et coriandre ; saler et laisser tiédir.', NULL),
(14, 6, 'Garnir les bricks', 'Découper les feuilles de brick, déposer une cuillerée de farce au centre, plier en triangles ou rouler en cigares bien serrés.', NULL),
(15, 6, 'Cuisson', 'Frire dans une huile chaude (170–180 °C) jusqu''à dorure ; éponger sur papier absorbant et servir aussitôt.', NULL),
(16, 7, 'Base aromatique', 'Faire suer céleri et oignon, ajouter tomate concentrée et épices.', NULL),
(17, 7, 'Frik', 'Verser le blé concassé et mouiller progressivement jusqu''à soupe épaisse.', NULL),
(18, 8, 'Griller', 'Griller poivrons et tomates jusqu''à peau noire, puis peler et épépiner.', NULL),
(19, 8, 'Assaisonner', 'Écraser grossièrement, ajouter huile d''olive, ail, citron et câpres.', NULL),
(20, 9, 'Fond de soupe', 'Faire revenir oignon et viande (optionnel) avec coriandre séchée, gingembre, curcuma et tomate ; mouiller d''eau chaude.', NULL),
(21, 9, 'Légumineuses et céréales', 'Ajouter lentilles vertes, pois chiches égouttés et orge ; laisser mijoter à frémissement jusqu''à tendreté.', NULL),
(22, 9, 'Finition', 'Incorporer le vermicelle en fin de cuisson, ajouter coriandre fraîche hachée ; rectifier l''assaisonnement et servir avec un quartier de citron.', NULL),
(23, 9, 'Repos (optionnel)', 'Laisser reposer quelques minutes hors du feu : la soupe s''épaissit légèrement et les saveurs se marient.', NULL),
(24, 10, 'Fond de légumes', 'Faire revenir poivrons et oignon dans l''huile d''olive, ajouter ail et tomates en dés ; laisser compoter à feu moyen.', NULL),
(25, 10, 'Œufs', 'Former des petits puits, casser les œufs délicatement ; couvrir jusqu''à cuisson des blancs et jaunes encore coulants.', NULL),
(26, 10, 'Assaisonnement', 'Saler, poivrer, parsemer de coriandre ou de persil ; servir dans la poêle avec du pain pour tremper.', NULL),
(27, 11, 'Préparer les agrumes', 'Peler les oranges à vif pour retirer la peau blanche, couper en rondelles fines en retirant les pépins.', NULL),
(28, 11, 'Parfumer', 'Arroser de miel liquide tiédi, d''une pincée de cannelle et de quelques gouttes d''eau de fleur d''oranger.', NULL),
(29, 11, 'Repos', 'Laisser mariner 10 à 15 minutes au frais ; décorer de pistaches ou de feuilles de menthe avant de servir.', NULL),
(30, 12, 'Préparer les lentilles', 'Rincer les lentilles corail, émincer oignon et carotte ; faire revenir avec cumin et ail dans un filet d''huile.', NULL),
(31, 12, 'Mijoter', 'Mouiller de bouillon ou d''eau, laisser cuire 20 à 25 minutes à frémissement ; mixer en velouté ou laisser rustique.', NULL),
(32, 12, 'Service', 'Rectifier l''assaisonnement, ajouter un filet de citron et un trait d''huile d''olive ; coriandre fraîche si désiré.', NULL),
(33, 13, 'Pâte d''amande', 'Mélanger amandes moulues, sucre et fleur d''oranger ; former des losanges.', NULL),
(34, 13, 'Cuisson', 'Cuire au four doré puis tremper brièvement dans le miel chaud.', NULL),
(35, 14, 'Pâte sablée', 'Travailler beurre, sucre et farine jusqu''à sablage ; ajouter jaune d''œuf et former une boule ; laisser reposer au frais.', NULL),
(36, 14, 'Montage', 'Étaler la pâte, découper des cercles ; garnir le centre de confiture sans trop en mettre sur les bords.', NULL),
(37, 14, 'Cuisson', 'Recouvrir d''un second disque ou refermer les bords ; cuire au four jusqu''à coloration dorée.', NULL),
(38, 15, 'Montage des feuilles', 'Beurrer le moule, superposer plusieurs feuilles de filo en les badigeonnant de beurre fondu ; saupoudrer d''amandes moulues entre les couches.', NULL),
(39, 15, 'Découpe et cuisson', 'Avant cuisson, entailler en losanges ou carrés ; enfourner jusqu''à filo bien doré et croustillant.', NULL),
(40, 15, 'Sirop', 'Préparer un sirop (sucre, eau, jus de citron, eau de rose ou fleur d''oranger) ; verser sur la baklawa encore chaude et laisser imbiber.', NULL),
(41, 15, 'Repos', 'Laisser refroidir complètement avant de découper proprement les parts.', NULL),
(42, 16, 'Cuire le riz', 'Porter à ébullition lait, sucre et riz rond ; mijoter à feu doux en remuant jusqu''à crème épaisse.', NULL),
(43, 16, 'Parfumer', 'Hors du feu, ajouter fleur d''oranger et une pincée de cannelle ; verser dans un plat ou des verrines.', NULL),
(44, 16, 'Refroidissement', 'Filmer au contact et réserver au frais plusieurs heures ; saupoudrer de cannelle au moment de servir.', NULL),
(45, 17, 'Pâte et forme', 'Préparer une pâte légèrement sucrée, l''étaler finement et découper des bandes ; les torsader ou nouer.', NULL),
(46, 17, 'Première friture', 'Frire à l''huile chaude jusqu''à légère coloration ; égoutter.', NULL),
(47, 17, 'Enrobage', 'Tremper dans un miel tièdi liquide, puis saupoudrer généreusement de graines de sésame toastées.', NULL),
(48, 17, 'Séchage', 'Laisser refroidir sur grille : le miel fige et le griwech reste croquant.', NULL),
(49, 18, 'Infuser le thé', 'Mettre le thé vert (gunpowder) dans la théière avec un peu d''eau bouillante ; laisser infuser 2 à 3 minutes pour un concentré.', NULL),
(50, 18, 'Montée en mousse et menthe', 'Ajouter une grande poignée de menthe fraîche, compléter d''eau bouillante ; verser d''un geste haut dans le verre pour mousser. Ajuster le sucre.', NULL),
(51, 19, 'Infusion', 'Faire bouillir l''eau, éteindre le feu et infuser les fleurs d''hibiscus 10 à 15 minutes jusqu''à couleur profonde.', NULL),
(52, 19, 'Sucrer et refroidir', 'Filtrer, sucrer à votre goût quand l''infusion est encore tiède ; laisser refroidir puis réserver au frais.', NULL),
(53, 19, 'Service', 'Servir bien glacé avec menthe fraîche, tranche de citron vert ou pétales de fleurs comestibles.', NULL),
(54, 20, 'Lait d''amande', 'Mixer amandes émondées trempées avec eau et sucre ; filtrer à travers un linge pour obtenir un lait onctueux.', NULL),
(55, 20, 'Parfumer', 'Ajouter eau de rose et une pincée de cannelle ; mélanger et ajuster la douceur.', NULL),
(56, 20, 'Repos', 'Réserver au frais au moins 1 heure ; remuer avant de servir dans des verres givrés.', NULL),
(57, 21, 'Fermentation', 'Mélanger lait entier avec un peu de yaourt nature ou de ferment (lben commercial) ; couvrir et laisser fermenter 12 à 24 h à température ambiante tiède.', NULL),
(58, 21, 'Texture', 'Remuer délicatement : la boisson doit être légèrement épaisse et pétillante ; saler très légèrement si tradition locale.', NULL),
(59, 21, 'Conservation', 'Conserver au frais et consommer en quelques jours ; secouer avant de servir bien frais.', NULL),
(60, 22, 'Extraire le café', 'Préparer un café serré (expresso ou moka) selon votre habitude.', NULL),
(61, 22, 'Accord', 'Servir aussitôt avec une datte moelleuse : croquer la datte entre deux gorgées pour adoucir l''amertume.', NULL);

INSERT INTO `ingredients_recettes` (`recette_id`, `ingredient_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 5),
(2, 2), (2, 10), (2, 5),
(3, 1), (3, 2), (3, 5),
(4, 2), (4, 5),
(5, 16), (5, 2), (5, 5),
(6, 2), (6, 5),
(7, 6), (7, 2), (7, 5),
(8, 2), (8, 5), (8, 9),
(9, 3), (9, 2), (9, 11),
(10, 2), (10, 5),
(13, 7), (13, 12), (13, 8),
(14, 8), (15, 7), (15, 12),
(16, 12), (17, 7), (17, 8),
(18, 4), (18, 14),
(19, 13), (20, 7), (20, 12),
(21, 8), (22, 15);

INSERT INTO `news` (`ID`, `type`, `titre`, `date`, `description`, `image`, `video`) VALUES
(1, 'Gastronomie', 'Salon de la cuisine méditerranéenne à Alger', '2026-04-10', 'Chefs, producteurs et grand public se retrouvent pour célébrer olive, blé et épices du bassin méditerranéen.', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80', ''),
(2, 'Tendance', 'Manger local : la saison comme guide', '2026-04-05', 'Marchés, AMAP et petits producteurs : comment varier les assiettes sans sacrifier le budget.', 'https://images.unsplash.com/photo-1488459716781-31db52582fe1?w=900&q=80', ''),
(3, 'Patrimoine', 'Yennayer : le nouvel amazigh et la table', '2026-01-12', 'Couscous aux sept légumes, dattes et lait caillé : symboles de prospérité pour la nouvelle année.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80', ''),
(4, 'Santé', 'Jeûne et hydratation : l''eau aromatisée maison', '2026-03-18', 'Citron, menthe, concombre : des alternatives sucrées aux sodas pour les longues journées d''été.', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=80', ''),
(5, 'Chef', 'Les femmes chefs reprennent le devant de la scène', '2026-02-22', 'Tables gastronomiques et street-food : portraits de cuisinières qui réinventent la tradition.', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900&q=80', ''),
(6, 'Voyage', 'Épices du Souk : de Tripoli à Tunis', '2026-04-01', 'Ras el hanout, harissa et z''houg : un road-trip gustatif le long du littoral.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80', ''),
(7, 'Éco', 'Réduire le gaspillage : transformer les restes', '2026-03-28', 'Brick du lendemain, frittata de légumes grillés et bouillon de parures : astuces anti-gaspi.', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=80', ''),
(8, 'Événement', 'Nuits du Ramadan : horaires étendus aux marchés', '2026-03-10', 'Fruits secs, jus et pâtisseries : les étals s''animent avant l''heure du ftour.', 'https://images.unsplash.com/photo-1606787366850-de633012258b?w=900&q=80', '');

INSERT INTO `news_desc` (`ID`, `news_id`, `titre`, `description`, `image`) VALUES
(1, 1, 'Programme des démonstrations', 'Ateliers sur le pain traditionnel, le couscous vapeur et les marinades au citron confit animés par des chefs invités.', NULL),
(2, 1, 'Infos pratiques', 'Entrée gratuite sur inscription en ligne. Places limitées pour les ateliers enfants le week-end.', NULL),
(3, 1, 'Village producteurs', 'Huiles d''olive AOC, épices et dattes en dégustation directe avec les exploitations partenaires.', NULL),
(4, 2, 'Pourquoi la saison ?', 'Les légumes de plein champ offrent plus de goût, nourrissent les circuits courts et soutiennent l''emploi local.', NULL),
(5, 2, 'Panier type d''avril', 'Artichauts, fèves, asperges et herbes fraîches : idées de menus sur une semaine type.', NULL),
(6, 3, 'Rituels et partage', 'La table d''Yennayer rassemble souvent trois générations autour de plats symboliques et de contes.', NULL),
(7, 3, 'Recettes associées', 'Pensez au couscous aux sept légumes et aux beignets de blé pour compléter votre menu festif.', NULL),
(8, 4, 'Recettes d''infusions', 'Bissap léger, thé glacé à la menthe citronnée, ou eau de concombre : trois bases à préparer la veille.', NULL),
(9, 5, 'Tables ouvertes', 'Des formats « chef à domicile » et pop-up dans les médinas gagnent les réseaux sociaux.', NULL),
(10, 6, 'Épices à emporter', 'Conseils pour choisir une harissa artisanale et conserver les mélanges secs à l''abri de la lumière.', NULL),
(11, 7, 'Semaine type', 'Jour 1 : bouillon ; jour 2 : gratin ; jour 3 : wrap — trois vies pour les mêmes légumes.', NULL),
(12, 8, 'Respecter le sommeil', 'Préparez les jus et salades de fruits la veille pour gagner du temps à l''approche de l''iftar.', NULL);
