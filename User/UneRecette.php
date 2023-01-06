<?php
require_once "COMPOSANTS.php";
require_once "User/UneRecette.php";
class UneRecette extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>Details recette</title>
    <link rel="stylesheet" href="./User/styles/recettes.css" />
    <link rel="stylesheet" href="./User/styles/style.css" />
    <link rel="stylesheet" href="./User/styles/une-recette.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

  </head>
  <body>
    <script src="../User/js/jquery-3.3.1.min.js"></script>
        <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
}
public function Intro($recette){?>
    <header class="hero">
        <div class="hero-container">
          <div class="hero-text">
            <h1><?php echo $recette['titre']; ?></h1>
            <h4><?php echo $recette['description']; ?></h4>
          </div>
        </div>
      </header>

<?php
}
public function mainSection($recette,$etapes){?>
      <section class="recipe-content">
        <article>
          <h4 class="left-heading">Instructions</h4>
          <?php 
          if($recette['video']) 
          echo '
          <div class="embed-responsive embed-responsive-16by9">
             <iframe class="embed-responsive-item rounded" src="assets/img/'. $recette['video'] .'" allowfullscreen></iframe> ;
          </div>
          '?>
          <?php
        foreach ($etapes as $etape) {
          ?>
          <!-- single instruction -->
          <div class="single-instruction">
            <header>
              <p><?php echo $etape['titre']?></p>
              <div class=""></div>
            </header>
            <p>
           <?php echo $etape['description'];?>
            </p>
            <?php if($etape['image']) echo '<img src="assets/img/'. $etape['image'] .'" width="100%" alt="tajin zitoun" class="card-img-top">';?>
          </div>
          <!-- end of single instruction -->
      <?php  }          ?>
        </article>
      
        <article class="second-column">
          <div class="ingredients">
            <h4 class="left-heading">ingredients</h4>
            <?php
                  $controller = new UneRecette_controller();
                  $ingredients = $controller-> getIngredients($recette['ID']);
                //--------- LOOP TILL END OF DATA-----------------//
                  foreach($ingredients as $ingredient) {?>

            <p class="single-ingredient"><?php echo $ingredient['nom'] ?></p>
            <?php }?> 
            <div class="outils">
                <h4 class="left-heading">Outils</h4>
                <p class="single-tool">Hand Blender</p>
                <p class="single-tool">Measuring Spoons</p>
                <p class="single-tool">Large Heavy Pot With Lid</p>
                <p class="single-tool">Measuring Spoons</p>
                <p class="single-tool">Measuring Cups</p>
              </div>
             
          </div>

        </article>

      </section>
      <?php
              }      
  public function iconsBar($recette){?>
<section class="recipe-hero">

<div class="recipe-icons">
  <article>
    <i class="fas fa-clock"></i>
    <h5>Temps Total</h5>
    <p><?php echo $recette['temps_total'].'min'; ?></p>
  </article>
  <article>
      <i class="far fa-clock"></i>
      <h5 >Temps Cuisson</h5>
      <p><?php echo $recette['temps_cuisson'].'min'; ?></p>
    </article>
 
      <article>
          <i class="far fa-clock"></i>
          <h5>Temps Peparation</h5>
          <p><?php echo $recette['temps_preparation'].'min'; ?></p>
        </article>

  <article>
    <i class="far fa-clock"></i>
    <h5>Temps Repos</h5>
    <p><?php echo $recette['temps_repos'].'min'; ?></p>
  </article>
  <article>
      <i class="fas fa-bicycle"></i>
      <h5>Nombre Calories</h5>
      <p><?php echo $recette['calories'].'Cal'; ?></p>
    </article>
</div>
</section>
<?php
  }


    public function afficher($recette,$etapes){
        $this->afficherNavBar();
      $this->header();
      $this->Intro($recette);
   
      $this->iconsBar($recette);
      $this->mainSection($recette,$etapes);
      $this->afficherFooter();
    }

}

?>

