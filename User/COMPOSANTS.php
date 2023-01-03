<?php

require_once 'controllers/Accueil_controller.php';
require_once 'controllers/UneRecette_controller.php';

class COMPOSANTS {

    public function navBar(){?>
        <!------------------NAvbar---------------->
        <div class="nav sticky-nav">
            <div class="nav-btn">
              <label for="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <div class="nav-links">
                <ul  >
                      <li><a href="#" >Accueil</a></li>
                      <li><a href="./index.php?page=recettes" target="_blank">Recettes</a></li>
                      <li><a href="#" target="_blank">News</a></li>
                      <li><a href="#" target="_blank">Healthy</a></li>
                      <li><a href="#" target="_blank">Saison</a></li>
                      <li><a href="#" target="_blank">Fete</a></li>
                      <li><a href="./index.php?page=nutrition"  target="_blank">Nutrition</a></li>
                      
                      <li><a href="#footer" >Contact</a></li>
                      <a href="./index.php?page=connection"><button id="commancer" class="btn btn-outline-light btn-ms  "> Commancer</button></a>
            </ul>     
            </div>
          </div>
            <!--------Social Media-------------->
          <nav class="social">
            <ul>
              <li><a href="https://twitter.com">Twitter <i class="fab fa-twitter"></i></a></li>
              <li><a href="https://github.com">Instagram <i class="fab fa-instagram"></i> </a></li>
              <li><a href="https://www.linkedin.com">Facebook <i class="fab fa-facebook-f"></i>		  </a></li>
              </ul>
          </nav>
        <!-------end Navbar------------------------------------>
          <?php
          }
          public function cards($catégorie,$categ_desc){
            $cpt=0;//to count the number of displayed cards 
            ?>
            <!---------Start Card Slider-------------------->
            <h1 class="heading"> <?php echo $catégorie; ?></h1>
               <center><p class="description"><?php echo $categ_desc; ?></p></center> 
               <div id="<?php echo $catégorie?>" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">

                    <div class="cards-wrapper">
                    <?php
                        $controller = new Accueil_controller();
                        $result = $controller->getCards($catégorie);
                      //--------- LOOP TILL END OF DATA
                      while ($card = $result->fetchAll(PDO::FETCH_ASSOC)) {
                        foreach($card as $card) { $id=$card['ID']; $cpt++; ?>
                  
                    <div class="card d-none d-md-block">
                     
                     <?php  echo '<img src="assets/img/'. $card['image'] .'" alt="tajin zitoun" class="card-img-top">';?>
                      <div class="card-body">
                        <h5 class="card-title"><?php echo $card["titre"]; ?></h5>
                        <p class="card-text"><?php echo $card["description"]; ?></p>
                      <!---  <form method="POST" action="<?php  #$_SESSION["id"] = $card['ID'];  $controller = new UneRecette_controller(); $controller->getRecetteDetails();?>">
                        <input type="text" name="id" value= "<?php #echo $card['ID']?>" >  
                        <input type="submit" name="detailsPage"  value= "voir plus"> 
                        </form>----->
                       <?php echo '<button class="btn btn-outline-light btn-lg "><a href="./index.php?page=unerecette&id= ' . $id . '"  target="_blank" style="text-decoration: none; color:black" > Voir Recettes</a></button>' ?>

                      </div>
                    </div>
                    <?php
                    //-----close the inner card if cards >4-------
                    if($cpt %4 == 0){
                      echo'
                      </div> 
                      </div>
                      <div class="carousel-item ">
                      <div class="cards-wrapper">
                      ';}

                     }}
                     ?>
                    </div>
                  </div>
                  </div>
                <a class="carousel-control-prev" style="z-index:999 ; color:red" href="#carouselExampleControls " role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" style="z-index:999" aria-hidden="true"></span>
                  <span class="sr-only" style="z-index:999">Previous</span>
                </a>
                <a class="carousel-control-next" href="#<?php echo $catégorie?>" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <!---------End Card Slider-------------------->
              <?php
              }
        public function footer(){?>
        <!-------------------Footer-------------->
        <footer id="footer" class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col">
                <h4>Site Web</h4>
                <p class="Website-description"> here we describe the  website , ce site web est le premier de son type en Algérie...</p>
              </div>
              <div class="footer-col">
                <h4>Liens du site</h4>
                <ul>
                  <li><a href="#">Accueil</a></li>
                  <li><a href="#">Idées recette</a></li>
                  <li><a href="#">News</a></li>
                  <li><a href="#">Healthy</a></li>
                  <li><a href="#">Saison</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>Autre liens</h4>
                <ul>
                  <li><a href="#">Fete</a></li>
                  <li><a href="#">Nutrition</a></li>
                  <li><a href="#">lorem</a></li>
                  <li><a href="#">lorem</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>aide</h4>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">contact</a></li>
                  <li><a href="#">lorem</a></li>
                  <li><a href="#">lorem</a></li>
                </ul>
              </div>
        
            </div>
          </div>
        </footer>
                <?php
                }

          public function afficherNavBar(){
            $this->navBar();

          }
          public function afficherCardPlat(){
            $this->cards("plats","this is a specific description for plats this is a specific description for plats");
            
          }
          public function afficherCardEntree(){
            $this->cards("entrees","this is a specific description for entrees this is a specific description for entrees");
            
          }
          public function afficherCardDessert(){
            $this->cards("desserts","this is a specific description for desserts this is a specific description for desserts");
            
          }
          public function afficherCardBoisson(){
            $this->cards("boissons","this is a specific description for boissons this is a specific description for boissons");
            
          }
          public function afficherFooter(){
            $this->footer();
            
          }
      
}