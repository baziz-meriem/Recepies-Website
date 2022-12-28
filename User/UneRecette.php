<?php
require_once "User/COMPOSANTS.php";
class UneRecette extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>Catégorie recette</title>
    <link rel="stylesheet" href="User/styles/recettes.css" />
    <link rel="stylesheet" href="User/styles/style.css" />
    <link rel="stylesheet" href="User/styles/une-recette.css" />

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

  </head>
  <body>
    <script src="User/js/jquery-3.3.1.min.js"></script>
        <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
}


public function Intro(){?>
    <header class="hero">
        <div class="hero-container">
          <div class="hero-text">
            <h1>Brownies</h1>
            <h4>Temps de preparation,temps de cuisson et temps total, notation , saison , nombre de calories</h4>
          </div>
        </div>
      </header>

<?php
}
public function mainSection(){?>
      <section class="recipe-content">
        <article>
          <h4 class="left-heading">Instructions</h4>
          <!-- single instruction -->
          <div class="single-instruction">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item rounded" src="assets/img/vid-1.mp4" allowfullscreen></iframe>
              </div>
            <header>
              <p>etape 1</p>
              <div class=""></div>
            </header>
            <p>
              I'm baby mustache man braid fingerstache small batch venmo
              succulents shoreditch.
            </p>
            <img src="assets/img/dishes-3.jpg" width="100%">
          </div>
          <!-- end of single instruction -->
          <!-- single instruction -->
          <div class="single-instruction">
            <header>
              <p>etape 2</p>
            </header>
            <p>
              Pabst pitchfork you probably haven't heard of them, asymmetrical
              seitan tousled succulents wolf banh mi man bun bespoke selfies
              freegan ethical hexagon.
            </p>
            <img src="assets/img/dishes-1.jpg" width="100%">
          </div>
          <!-- end of single instruction -->
          <!-- single instruction -->
          <div class="single-instruction">
            <header>
              <p>etape 3</p>
      
            </header>
            <p>
              Polaroid iPhone bitters chambray. Cornhole swag kombucha
              live-edge.
            </p>

          </div>

          <!-- end of single instruction -->
        </article>

        <article class="second-column">
          <div class="ingredients">
            <h4 class="left-heading">ingredients</h4>
            <p class="single-ingredient">1 1/2 cups dry pancake mix</p>
            <p class="single-ingredient">1/2 cup flax seed meal</p>
            <p class="single-ingredient">1 cup skim milk</p>
            <div class="outils">
                <h4 class="left-heading">Outils</h4>
                <p class="single-tool">Hand Blender</p>
                <p class="single-tool">Large Heavy Pot With Lid</p>
                <p class="single-tool">Measuring Spoons</p>
                <p class="single-tool">Measuring Cups</p>
              </div>
          </div>

        </article>

      </section>
  <?php
  }
  public function iconsBar(){?>
      <section class="recipe-hero">

<div class="recipe-icons">
  <article>
    <i class="fas fa-clock"></i>
    <h5>Temps Total</h5>
    <p>15min</p>
  </article>
  <article>
      <i class="far fa-clock"></i>
      <h5 >Temps Cuisson</h5>
      <p>15min</p>
    </article>
 
      <article>
          <i class="far fa-clock"></i>
          <h5>Temps Peparation</h5>
          <p>15min</p>
        </article>

  <article>
    <i class="far fa-clock"></i>
    <h5>Temps Repos</h5>
    <p>hiver</p>
  </article>
  <article>
      <i class="fas fa-bicycle"></i>
      <h5>Nombre Calories</h5>
      <p>150 cal</p>
    </article>
</div>
</section>
<?php
  }


    public function afficher(){
        $this->afficherNavBar();
      $this->header();
      $this->Intro();
   
      $this->iconsBar();
      $this->mainSection();
      $this->afficherFooter();
    }

}


?>

