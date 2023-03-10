<?php

session_start();
require_once './Admin/views/AdminDashboard.php';
require_once './Admin/views/AjoutRecette.php';



require_once './User/Accueil.php';
require_once './Authentication/connection.php';
require_once './User/News.php';
require_once './User/NewsDetails.php';
require_once './User/Recettes.php';
require_once './User/UneRecette.php';
require_once './User/controllers/UneRecette_controller.php';
require_once './User/controllers/Nutrition_controller.php';
require_once './User/controllers/News_controller.php';





$fulUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if(strpos($fulUrl,"page=recettes") == true){
    $view = new Recettes();
    $view->afficher();
}else if(strpos($fulUrl,"page=adminDashboard")== true){
    $view = new adminDashboard();
    $view->afficher();

} else if(strpos($fulUrl,"page=ajout")== true){
    $view = new AjoutRecette();
    $view->afficher();
} 
else if(strpos($fulUrl,"page=fete")== true){
    $controller = new Recettes_controller();
    $fetes = $controller->getFilters("fete");
    $view = new Recettes();
    $view->afficherOnefilter( $fetes,"fete");
}else if(strpos($fulUrl,"page=saison")== true){
    $controller = new Recettes_controller();
   $saisons = $controller->getFilters("saison");
    $view = new Recettes( );
    $view->afficherOnefilter($saisons,"saison");
}else if(strpos($fulUrl,"page=nutritionDetails")== true){
    $id = $_GET['id'];
    $controller = new Nutrition_controller();
    $ingredient = $controller->getIngredient($id);
    $ingredientDetails = $controller->getIngredientDetails($id);

    $view = new NewsDetails();
    $view->afficher($ingredientDetails,$ingredient);
 }
else if(strpos($fulUrl,"page=nutrition")== true){
   // $view = new Nutrition();
   // $view->afficher();
   $controller = new Nutrition_controller();
   $data = $controller->getIngredients();
   $view = new News();
   $view->afficher($data,"Nutrition & Informations");
}
else if(strpos($fulUrl,"page=newsDetails")== true){
    $id = $_GET['id'];
    //echo $id;
    $controller = new News_controller();
    $newsDetails=$controller->getNewsDetails($id);
    $news=$controller->getNewsrow($id);

    $view = new NewsDetails();
    $view->afficher($newsDetails,$news); 
}
else if(strpos($fulUrl,"page=news")== true){            
    $controller = new News_controller();
    $data = $controller->getNews();

    $view = new News();
    $view->afficher($data,"News & Actualit??s");
}
 else if(strpos($fulUrl,"page=connection")== true){
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