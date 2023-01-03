<?php

require_once "COMPOSANTS.php";
class Recettes extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>Catégorie recette</title>
    <link rel="stylesheet" href="./User/styles/recettes.css" />
    <link rel="stylesheet" href="./User/styles/style.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

  </head>
  <body>
    <script src="./User/js/jquery-3.3.1.min.js"></script>
        <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
}


public function Intro(){?>
    <div >
        <img class="bg-transparent position-absolute" style="z-index:999 ;margin-top:30px " src="./assets/img/logo.png">

        <h1 class="heading"> Recettes divers</h1>
       <center><p class="description" style="color:#51724e">Dans cette page vous pouver voir toute les recettes disponible et filtrer selon vos choix tout est disponibe en un seul click</p></center> 
    </div>

<?php
}
public function mainSection(){?>
    
    <!-- main -->
    <main class="page">
      <section class="recipes-container">
        <!-- tag container -->
        <div class="tags-container">
          <h4>Filtrer</h4>
          <div class="tags-list">
            <a href="tag-template.html">Viande (1)</a>
            <a href="tag-template.html">Breakfast (2)</a>
            <a href="tag-template.html">Carrots (3)</a>
            <a href="tag-template.html">Food (4)</a>
          </div>
        </div>
        <!-- end of tag container -->
        <!-- recipes list -->
        <div class="recipes-list">
          <!-- single recipe -->
          <a href="single-recipe.html" class="recipe">
            <img src="assets/img/dishes-1.jpg" class="img recipe-img" alt="" />
            <h5>Carne Asada</h5>
            <p>Prep : 15min | Cook : 5min</p>
          </a>
          <!-- end of single recipe -->
          <!-- single recipe -->
          <a href="single-recipe.html" class="recipe">
            <img src="assets/img/dishes-2.jpg" class="img recipe-img" alt="" />
            <h5>Greek Ribs</h5>
            <p>Prep : 15min | Cook : 5min</p>
          </a>
          <!-- end of single recipe -->
          <!-- single recipe -->
          <a href="single-recipe.html" class="recipe">
            <img src="assets/img/dishes-3.jpg" class="img recipe-img" alt="" />
            <h5>Vegetable Soup</h5>
            <p>Prep : 15min | Cook : 5min</p>
          </a>
          <!-- end of single recipe -->
          <!-- single recipe -->
          <a href="single-recipe.html" class="recipe">
            <img src="assets/img/food-2.jpg" class="img recipe-img" alt="" />
            <h5>Banana Pancakes</h5>
            <p>Prep : 15min | Cook : 5min</p>
          </a>
          <!-- end of single recipe -->
          <!-- single recipe -->
          <a href="single-recipe.html" class="recipe">
            <img src="assets/img/food-5.jpg" class="img recipe-img" alt="" />
            <h5>Banana Pancakes</h5>
            <p>Prep : 15min | Cook : 5min</p>
          </a>
          <!-- end of single recipe -->
          <!-- single recipe -->
          <a href="single-recipe.html" class="recipe">
            <img src="assets/img/food-3.jpg" class="img recipe-img" alt="" />
            <h5>Banana Pancakes</h5>
            <p>Prep : 15min | Cook : 5min</p>
          </a>
          <!-- end of single recipe -->
        </div>
      </section>
    </main>
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

