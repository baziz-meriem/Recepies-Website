<?php

require_once "COMPOSANTS.php";
require_once "controllers/Recettes_controller.php";


class Recettes extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>Recettes</title>
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


public function filterSection(){?>
    
    <!-- main -->
    <main class="page">
      <section class="recipes-container">
        <!-- tag container -->
        <div class="tags-container">
          <div class="tags-list">
          <h5 class="select-text"  >Selectionner Catégorie </h5>
            <ul class="list-group" >
              <?php
              $controller = new Recettes_controller();
               $catégories = $controller->getCategories();
               foreach ($catégories as $row) {
              ?>
              <li class="list-group-item">
              <div class="item">
              <div class="checkbox-rect2">
              <input type="checkbox" class="product_check categorie" id="<?php echo $row['categorie']; ?>"  name="categorie"  value="<?php echo $row['categorie']; ?>">
              <label for="<?php echo $row['categorie']; ?>" style="font-family: 'Merienda', cursive; font-weight:600"  ><?php echo $row['categorie']; ?></label>
               </div>
            </div>
              </li>
              <?php  }  ?>
            </ul>
            <h5 class="select-text" >Selectionner Saison </h5>
            <ul class="list-group" >
              <?php
              $controller = new Recettes_controller();
               $saisons = $controller->getSaisons();
               foreach ($saisons as $row) {
              ?>
              <li class="list-group-item" >
            <div class="checkbox-rect2" >
              <input  id="<?php echo $row['nom']; ?>" class="product_check saison"  type="checkbox"  name="saison"  value="<?php echo $row['nom']; ?>">
              <label  style="font-family: 'Merienda', cursive; font-weight:600" for="<?php echo $row['nom']; ?>"><?php echo $row['nom']; ?></label>
            </div>
              </li>
              <?php  }          ?>
            </ul>
            <h5 class="select-text" >Selectionner Notation </h5>
            <ul class="list-group" >
              <?php
              $controller = new Recettes_controller();
               $notations = $controller->getNotations();
               foreach ($notations as $row) {
              ?>
              <li class="list-group-item">
                <div class="form-check">
                <div class="checkbox-rect2">
                <input id="<?php echo $row['notation']; ?>" class="product_check notation" type="checkbox"  name="notation"  value="<?php echo $row['notation']; ?>">
                <label  style="font-family: 'Merienda', cursive; font-weight:600"  for="<?php echo $row['notation']; ?>"><?php echo $row['notation']; ?></label>
              </div>

              </li>
              <?php  } ?>
            </ul>
          </div>
        </div>
        <!-- end of tag container -->
        <!-- recipes list -->
        <div id="result" class="recipes-list">
          
           <?php
              $controller = new Recettes_controller();
               $recettes = $controller->getRecettes();
               foreach ($recettes as $recette) {
              ?>
          <!-- single recipe -->
      
          <a href="single-recipe.html" class="recipe">
            <?php echo '<img src="assets/img/'. $recette['image'] .'"  class="img recipe-img">';?>
            <h5><?php echo $recette['titre']?></h5>
            <p>Prep : <?php echo $recette['temps_preparation'].'min'?> | <?php echo $recette['calories'].'Cal'?></p>
          </a>
        <?php  } ?>
        </div>
      </section>
    </main>
    <script type="text/javascript">
      $(document).ready(function() {
        
        //target all checkbox click activities product-check as a common selector
        $('.product_check').click(function(){
          var action = 'data';
          var saison = get_filter_text('saison');
          var categorie = get_filter_text('categorie');
          var notation = get_filter_text('notation');

          $.ajax({
            url:'User/action.php',
            method:'POST',
            data:{action:action,saison:saison,notation:notation,categorie:categorie},
            success:function(response){//first show the response in the div with id=result
              $("#result").html(response);
             
            }
          })
        });
        
        function get_filter_text(text_selector){
          var filterData = [];
          $('.'+text_selector+':checked').each(function(){//select all checked checkboxes
            filterData.push($(this).val()); //push 'store' all checked data in filterData array
          });
          console.log("getfilter entered");

          return filterData; 
        }
      })
      </script>
  <?php
  }


    public function afficher(){
      $this->header();
      $this->Intro();
      $this->afficherNavBar();
      $this->filterSection();
      $this->afficherFooter();
    }

}


?>

