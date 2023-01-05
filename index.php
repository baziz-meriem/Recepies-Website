<?php

    session_start();

require_once './User/Accueil.php';
require_once './Authentication/connection.php';
require_once './User/Nutrition.php';
require_once './User/Recettes.php';
require_once './User/UneRecette.php';
require_once './User/controllers/UneRecette_controller.php';




$fulUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if(strpos($fulUrl,"page=recettes") == true){
    $view = new Recettes();
    $view->afficher();
} else if(strpos($fulUrl,"page=nutrition")== true){
    $view = new Nutrition();
    $view->afficher();
} else if(strpos($fulUrl,"page=connection")== true){
    $view = new connection();
    $view->afficher();
}else if(strpos($fulUrl,"page=unerecette")== true ) {
    $id = $_GET['id'];
    //echo $id;
    $controller = new UneRecette_controller();
    $controller->getRecetteDetails($id);
    $view = new UneRecette();
    $view->afficher( $_SESSION["recette"],$_SESSION["etapes_recette"] );
    

}
else {
    $view = new Accueil();
    $view->afficher();

}


?>