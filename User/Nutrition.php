<?php
require_once "COMPOSANTS.php";
class Nutrition extends COMPOSANTS {
  
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>Catégorie recette</title>
    <link rel="stylesheet" href="./User/styles/nutrition.css" />
    <link rel="stylesheet" href="./User/styles/style.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

   
  </head>
  <body>
  <?php
}


public function Intro(){?>
    <div >
        <img class="bg-transparent position-absolute" style="z-index:999 ;width:200px; margin-bottom: 30px;" src="./assets/img/logo.png">

        <h1 class="heading">News</h1>
       <center><p class="description" style="color:#51724e">Dans cette page vous pouver voir toute les recettes disponible et filtrer selon vos choix tout est disponibe en un seul click</p></center> 
    </div>
<?php
}
public function mainSection(){?>
<div class="wrapper">
      <div id="search-container">
        <input
          type="search"
          id="search-input"
          placeholder="Chercher le nom de l'aliment içi"
        />
        <button id="search">chercher</button>
      </div>
      <div id="buttons">
        <button class="button-value" onclick="filterProduct('tous')">Tous</button>
        <button class="button-value" onclick="filterProduct('Fruits')">
          Fruits
        </button>
        <button class="button-value" onclick="filterProduct('Legumes')">
          Legumes
        </button>
        <button class="button-value" onclick="filterProduct('légumineuses')">
          légumineuses
        </button>
        <button class="button-value" onclick="filterProduct('Viande')">
          Viande
        </button>
      </div>
      <div id="products"></div>
    </div>
    <script><?php require_once("js/script.js"); ?></script>
  <?php
  }


    public function afficher(){
      $this->header();
      $this->Intro();
      $this->afficherNavBar();
      
      $this->mainSection();
      $this->afficherFooter();
    }
  

}


?>

