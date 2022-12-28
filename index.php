<?php
require_once './User/Accueil.php';
require_once './User/Recettes.php';
require_once './User/UneRecette.php';
require_once './User/Nutrition.php';
require_once './Authentication/connection.php';



///$view=new Accueil();
///$view = new Recettes();
//$view = new UneRecette();
//$view = new Nutrition();
$view = new connection();

$view->afficher();

?>