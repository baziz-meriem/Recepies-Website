<?php
require_once "User/COMPOSANTS.php";
class Accueil extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="User/styles/style.css">
        <link rel="stylesheet" href="User/styles/fixed.css">
        <!-- font awesome cdn link  -->
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
        <!-- JavaScript Bundle with Popper -->
        <link rel="stylesheet" href="bootstrap-4.1.3-dist/css/bootstrap.min.css">
        <title>Site de Recettes</title>  

    </head>
    <body>
      
    <script src="User/js/jquery-3.3.1.min.js"></script>
        <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
}


public function Diaporama(){?>

<!----Start Home Section--->
<div id="home" >
	<img class="bg-transparent position-absolute" style="z-index:999 ;margin-bottom:30px " src="assets/img/logo.png">

    <div id="demo" class="carousel slide" data-ride="carousel" data-interval="5000">
	<!-- Indicators -->
	<ul class="carousel-indicators">
	  <li data-target="#demo" data-slide-to="0" class="active"></li>
	  <li data-target="#demo" data-slide-to="1"></li>
	  <li data-target="#demo" data-slide-to="2"></li>
	</ul>
	<!-- The slideshow -->
	<div class="carousel-inner">
		<!--------Slide1------->
		<div class="carousel-item active" style="background-image:url(assets/img/img-8.jpg)">
			<div class="carousel-caption text-center">
				<h1 class="display-3">premier site de cuisine en Algérie! </h1>
				<h3 class="summary">Il suffit juste de choisir les ingérédients dont vous disposer on vous affichera des centaines de recettes en un seul click</h3>
				<button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
			</div>
		</div>
		<!--------Slide2------->
		<div class="carousel-item" style="background-image:url(assets/img/img-6.jpg)">
			<div class="carousel-caption text-center">
				<h1 class="display-3">Nouvelles du Monde de cuisine</h1>
				<h3 class="summary">Ne manquer aucune nouvelle concernant le monde de cuisine soi en algérie ou bien au monde entier tous est disponible en un seul click</h3>
				<button type="button" class="btn btn-outline-light btn-lg " href="#"> Voir News</button>
			</div>
		</div>
		<!----------Slide3------------>
		<div class="carousel-item" style="background-image:url(assets/img/dishes-1.jpg)">
			<div class="carousel-caption text-center">
				<h1 class="display-3">divers Idées de recettes</h1>
				<h3 class="summary"> Le site qui vous offre une multitude d'idées de recette soi pour s'inspirer ou bien pour cuisiner</h3>
				<button type="button" class="btn btn-outline-light btn-lg "> Explorer le site</button>
			</div>
		</div>
	</div>
  
	<!-- Left and right controls -->
	<a class="carousel-control-prev" href="#demo" data-slide="prev">
	  <span class="carousel-control-prev-icon"></span>
	</a>
	<a class="carousel-control-next" href="#demo" data-slide="next">
	  <span class="carousel-control-next-icon"></span>
	</a>
  
  </div>
  </div>
  <!--End of ImageSlider-->


<?php
}


    public function afficher(){
      $this->header();
        $this->Diaporama();
        $this->afficherNavBar();
        $this->afficherCardPlat();
        $this->afficherCardEntree();
        $this->afficherCardDessert();
        $this->afficherFooter();
    }

}

?>

