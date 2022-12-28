<?php
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
              <li><a href="#" target="_blank">Accueil</a></li>
              <li><a href="./User/recettes.php" target="_blank">Recettes</a></li>
              <li><a href="./User/news.php" target="_blank">News</a></li>
              <li><a href="./User/healthy.php" target="_blank">Healthy</a></li>
              <li><a href="./User/saison.php" target="_blank">Saison</a></li>
              <li><a href="./User/fete.php" target="_blank">Fete</a></li>
              <li><a href="./User/nutrition.php" target="_blank">Nutrition</a></li>
              <li><a href="#" target="_blank">Contact</a></li>
              <button id="commancer" class="btn btn-outline-light btn-ms  " onclick="location.href='./Authentication/connection.php'"; > Commancer</button>
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
          public function cardPlat(){?>
            <!---------Start Card Slider-------------------->
            <h1 class="heading"> Plats </h1>
               <center><p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam repudiandae nesciunt beatru</p></center> 
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="cards-wrapper">
                    <div class="card">
                      <img src="assets/img/img-11.jpg" class="card-img-top" alt="...">
                      <div class="card-body ">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                      </div>
                    </div>
                    <div class="card">
                        <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                        <div class="card-body ">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                    <div class="card d-none d-md-block">
                      <img src="assets/img/food-4.jpg" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                      </div>
                    </div>
                    <div class="card d-none d-md-block">
                      <img src="assets/img/img-13.jpg" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="carousel-item">
                    <div class="cards-wrapper">
                      <div class="card">
                        <img src="assets/img/img-11.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                      <div class="card d-none d-md-block">
                        <img src="assets/img/food-1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                      <div class="card d-none d-md-block">
                        <img src="assets/img/food-1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                      <div class="card d-none d-md-block">
                        <img src="assets/img/food-3.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="cards-wrapper">
                      <div class="card">
                        <img src="assets/img/food-2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                        
                      </div>
                      <div class="card d-none d-md-block">
                        <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                        </div>
                      </div>
                      <div class="card d-none d-md-block">
                        <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                      <div class="card d-none d-md-block">
                        <img src="assets/img/img-15.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-outline-light btn-lg " onclick="location.href='./User/etapes-recette.php'"> Voir Recettes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <!---------End Card Slider-------------------->
              <?php
              }
              public function cardsEntree(){?>
                <!---------------Second cards entree------------------->
                <h1 class="heading"> Entrées </h1>
                  <center><p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam repudiandae nesciunt beatru</p></center> 
               <div id="carouselExampleControls3" class="carousel slide" data-ride="carousel">
                   <div class="carousel-inner">
                     <div class="carousel-item active">
                       <div class="cards-wrapper">
                       <div class="card">
                         <img src="assets/img/img-11.jpg" class="card-img-top" alt="...">
                         <div class="card-body ">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                         </div>
                       </div>
                       <div class="card">
                           <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                           <div class="card-body ">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                       <div class="card d-none d-md-block">
                         <img src="assets/img/food-4.jpg" class="card-img-top" alt="...">
                         <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                         </div>
                       </div>
                       <div class="card d-none d-md-block">
                         <img src="assets/img/img-13.jpg" class="card-img-top" alt="...">
                         <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                         </div>
                       </div>
                     </div>
                     </div>
                     <div class="carousel-item">
                       <div class="cards-wrapper">
                         <div class="card">
                           <img src="assets/img/img-11.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/food-1.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/food-1.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/food-3.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div class="carousel-item">
                       <div class="cards-wrapper">
                         <div class="card">
                           <img src="assets/img/food-2.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                           
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/img-15.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <a class="carousel-control-prev" href="#carouselExampleControls3" role="button" data-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="sr-only">Previous</span>
                   </a>
                   <a class="carousel-control-next" href="#carouselExampleControls3" role="button" data-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="sr-only">Next</span>
                   </a>
                 </div>
                 <!---------------------End-Entrées---------------------->
                   <?php
                   }
                   public function cardsDessert(){?>
               <!---------------Third cards desserts------------------->
               <h1 class="heading"> Désserts </h1>
                  <center><p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam repudiandae nesciunt beatru</p></center> 
               <div id="carouselExampleControls2" class="carousel slide" data-ride="carousel">
                   <div class="carousel-inner">
                     <div class="carousel-item active">
                       <div class="cards-wrapper">
                       <div class="card">
                         <img src="assets/img/img-11.jpg" class="card-img-top" alt="...">
                         <div class="card-body ">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                         </div>
                       </div>
                       <div class="card">
                           <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                           <div class="card-body ">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                       <div class="card d-none d-md-block">
                         <img src="assets/img/food-4.jpg" class="card-img-top" alt="...">
                         <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                         </div>
                       </div>
                       <div class="card d-none d-md-block">
                         <img src="assets/img/img-13.jpg" class="card-img-top" alt="...">
                         <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                           <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                         </div>
                       </div>
                     </div>
                     </div>
                     <div class="carousel-item">
                       <div class="cards-wrapper">
                         <div class="card">
                           <img src="assets/img/img-11.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/food-1.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/food-1.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/food-3.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div class="carousel-item">
                       <div class="cards-wrapper">
                         <div class="card">
                           <img src="assets/img/food-2.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                           
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/img-10.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                         <div class="card d-none d-md-block">
                           <img src="assets/img/img-15.jpg" class="card-img-top" alt="...">
                           <div class="card-body">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                             <button class="btn btn-outline-light btn-lg "> Voir Recettes</button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <a class="carousel-control-prev" href="#carouselExampleControls2" role="button" data-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="sr-only">Previous</span>
                   </a>
                   <a class="carousel-control-next" href="#carouselExampleControls2" role="button" data-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="sr-only">Next</span>
                   </a>
                 </div>
                   <!---------------End third cards desserts------------------->
                     <?php
                     }
      public function footer(){?>
        <!-------------------Footer-------------->
        <footer class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col">
                <h4>Site Web</h4>
                <p class="Website-desc"> here we describe the  website , ce site web est le premier de son type en Algérie...</p>
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
            $this->cardPlat();
            
          }
          public function afficherCardEntree(){
            $this->cardsEntree();
            
          }
          public function afficherCardDessert(){
            $this->cardsDessert();
            
          }
          public function afficherFooter(){
            $this->footer();
            
          }
      
}