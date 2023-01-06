<?php

require_once "COMPOSANTS.php";
require_once "controllers/Recettes_controller.php";


class Recettes extends COMPOSANTS
{
  public function header()
  { ?>
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
      <link href="./User/styles/jquery-ui.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

    </head>

    <body>
      <script src="./User/js/jquery-3.3.1.min.js"></script>
      <script src="./User/js/jquery-ui.js"></script>
      <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
    <?php
  }


  public function Intro()
  { ?>
      <div>
        <img class="bg-transparent position-absolute" style="z-index:999 ;margin-top:30px " src="./assets/img/logo.png">

        <h1 class="heading"> Recettes divers</h1>
        <center>
          <p class="description" style="color:#51724e">Dans cette page vous pouver voir toute les recettes disponible et filtrer selon vos choix tout est disponibe en un seul click</p>
        </center>
      </div>


    <?php
  }
  public function filter($filters, $column)
  { ?>
      <main class="page">
        <section class="recipes-container">
          <!-- tag container -->
          <div class="tags-container">
            <div class="tags-list">
              <h5 class="select-text"> <?php echo 'Selectionner '.$column; ?> </h5>
              <ul class="list-group">
                <?php
                foreach ($filters as $row) {
                ?>
                  <li class="list-group-item">
                    <div class="item">
                      <div class="checkbox-rect2">
                        <input type="checkbox" class="product_check  <?php echo $column; ?>" id="<?php echo $row[$column]; ?>" value="<?php echo $row[$column]; ?>">
                        <label for="<?php echo $row[$column]; ?>" style="font-family: 'Merienda', cursive; font-weight:600"><?php echo $row[$column]; ?></label>
                      </div>
                    </div>
                  </li>
                <?php  }  ?>
              </ul>
            </div>
          </div>
        <?php
      }


      public function filterSection()
      { ?>

          <!-- main -->
          <main class="page">
            <section class="recipes-container">
              <!-- tag container -->
              <div class="tags-container">
                <div class="tags-list">

                  <h5 class="select-text">Selectionner Catégorie </h5>
                  <ul class="list-group">
                    <?php
                    $controller = new Recettes_controller();
                    $catégories = $controller->getCategories();
                    foreach ($catégories as $row) {
                    ?>
                      <li class="list-group-item">
                        <div class="item">
                          <div class="checkbox-rect2">
                            <input type="checkbox" class="product_check categorie" id="<?php echo $row['categorie']; ?>" name="categorie" value="<?php echo $row['categorie']; ?>">
                            <label for="<?php echo $row['categorie']; ?>" style="font-family: 'Merienda', cursive; font-weight:600"><?php echo $row['categorie']; ?></label>
                          </div>
                        </div>
                      </li>
                    <?php  }  ?>
                  </ul>

                  <h5 class="select-text">Selectionner Saison </h5>
                  <ul class="list-group">
                    <?php
                    $controller = new Recettes_controller();
                    $saisons = $controller->getSaisons();
                    foreach ($saisons as $row) {
                    ?>
                      <li class="list-group-item">
                        <div class="checkbox-rect2">
                          <input id="<?php echo $row['nom']; ?>" class="product_check saison" type="checkbox" name="saison" value="<?php echo $row['nom']; ?>">
                          <label style="font-family: 'Merienda', cursive; font-weight:600" for="<?php echo $row['nom']; ?>"><?php echo $row['nom']; ?></label>
                        </div>
                      </li>
                    <?php  }          ?>
                  </ul>
                  <h5 class="select-text">Selectionner Notation </h5>
                  <ul class="list-group">
                    <?php
                    $controller = new Recettes_controller();
                    $notations = $controller->getNotations();
                    foreach ($notations as $row) {
                    ?>
                      <li class="list-group-item">
                        <div class="form-check">
                          <div class="checkbox-rect2">
                            <input id="<?php echo $row['notation']; ?>" class="product_check notation" type="checkbox" name="notation" value="<?php echo $row['notation']; ?>">
                            <label style="font-family: 'Merienda', cursive; font-weight:600" for="<?php echo $row['notation']; ?>"><?php echo $row['notation'] . ' étoiles'; ?></label>
                          </div>

                      </li>
                    <?php  } ?>
                  </ul>
                  <h5 class="select-text">Selectionner Temps de Preparation </h5>
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div class="item">
                        <input type="hidden" id="hidden_minimum_prep" value="0" />
                        <input type="hidden" id="hidden_maximum_prep" value="65000" />
                        <p id="price_show">10 - 500</p>
                        <div id="price_range"></div>

                      </div>
                    </li>


                  </ul>
                  <h5 class="select-text">Selectionner Temps de Cuisson </h5>
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div class="item">
                        <input type="hidden" id="hidden_minimum_cuiss" value="0" />
                        <input type="hidden" id="hidden_maximum_cuiss" value="65000" />
                        <p id="price_show_cuiss">10 - 500</p>
                        <div id="price_range_cuiss"></div>

                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- end of tag container -->
            <?php
          }
          public function recettesSection()
          { ?>
              <!-- recipes list -->
              <div id="result" class="recipes-list">

                <?php
                $controller = new Recettes_controller();
                $recettes = $controller->getRecettes();
                foreach ($recettes as $recette) {
                ?>
                  <!-- single recipe -->

                  <a href="single-recipe.html" class="recipe">
                    <?php echo '<img src="assets/img/' . $recette['image'] . '"  class="img recipe-img">'; ?>
                    <h5><?php echo $recette['titre'] ?></h5>
                    <p>Prep : <?php echo $recette['temps_preparation'] . 'min' ?> | <?php echo $recette['calories'] . 'Cal' ?><br /><br />
                      Cuiss : <?php echo $recette['temps_cuisson'] . 'min' ?>| Tot : <?php echo $recette['temps_total'] . 'min' ?>
                    </p>
                  </a>
                <?php  } ?>
              </div>
            </section>
          </main>
          <script type="text/javascript">
            $(document).ready(function() {

              //target all checkbox click activities product-check as a common selector
              $('.product_check').click(function() {
                filter_data();
              });

              function filter_data() {
                var action = 'data';
                var saison = get_filter_text('saison');
                var fete = get_filter_text('fete');
                var categorie = get_filter_text('categorie');
                var notation = get_filter_text('notation');
                var minimum_prep = $('#hidden_minimum_prep').val();
                var maximum_prep = $('#hidden_maximum_prep').val();

                var minimum_cuiss = $('#hidden_minimum_cuiss').val();
                var maximum_cuiss = $('#hidden_maximum_cuiss').val();


                $.ajax({
                  url: 'User/action.php',
                  method: 'POST',
                  data: {
                    action: action,
                    saison: saison,
                    fete:fete,
                    notation: notation,
                    categorie: categorie,
                    minimum_prep: minimum_prep,
                    maximum_prep: maximum_prep,
                    minimum_cuiss: minimum_cuiss,
                    maximum_cuiss: maximum_cuiss,
                  },
                  success: function(response) { //first show the response in the div with id=result
                    $("#result").html(response);

                  }
                })
              }

              function get_filter_text(text_selector) {
                var filterData = [];
                $('.' + text_selector + ':checked').each(function() { //select all checked checkboxes
                  filterData.push($(this).val()); //push 'store' all checked data in filterData array
                });
                console.log("getfilter entered");

                return filterData;
              }
              $('#price_range').slider({
                range: true,
                min: 10,
                max: 500,
                values: [10, 500],
                step: 10,
                stop: function(event, ui) {
                  $('#price_show').html(ui.values[0] + ' - ' + ui.values[1]); //afficher la valeur choisi
                  $('#hidden_minimum_prep').val(ui.values[0]); //set the min val
                  $('#hidden_maximum_prep').val(ui.values[1]);
                  filter_data();
                }
              });
              $('#price_range_cuiss').slider({
                range: true,
                min: 10,
                max: 500,
                values: [10, 500],
                step: 10,
                stop: function(event, ui) {
                  $('#price_show_cuiss').html(ui.values[0] + ' - ' + ui.values[1]);
                  $('#hidden_minimum_cuiss').val(ui.values[0]);
                  $('#hidden_maximum_cuiss').val(ui.values[1]);
                  filter_data();
                }
              });
            })
          </script>
      <?php
          }


          public function afficher()
          {
            $this->header();
            $this->Intro();
            $this->afficherNavBar();
            $this->filterSection();
            $this->recettesSection();
            $this->afficherFooter();
          }

          public function afficherOnefilter($filters, $column)
          {
            $this->header();
            $this->Intro();
            $this->afficherNavBar();
            $this->filter($filters, $column);
            $this->recettesSection();
            $this->afficherFooter();
          }
        }


      ?>