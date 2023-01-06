<?php

require_once "COMPOSANTS.php";
require_once "controllers/News_controller.php";


class News extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>News</title>
    <link rel="stylesheet" href="./User/styles/news.css" />
    <link rel="stylesheet" href="./User/styles/recettes.css" />
    <link rel="stylesheet" href="./User/styles/style.css" />
    <link href = "./User/styles/jquery-ui.css" rel = "stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

  </head>
  <body>
    <script src="./User/js/jquery-3.3.1.min.js"></script>
    <script src="./User/js/jquery-ui.js"></script>
        <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
}
public function mainSection(){?>
    <section class="post container" style="margin-bottom:60px">
        <div class="post-box">
            <img src="./assets/img/food-1.jpg" alt="" class="post-img">
            <h2 class="category">Mobile</h2>
            <a href="post-page.html" class="post-title">
                HOw to create ui ux
            </a>
            <span class="post-date">12 feb 2022</span>
            <span class="post-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam qui harum, neque beatae praesentium cum commodi dolorum vero et quos iusto, obcaecati inventore expedita quam consequuntur saepe, aperiam distinctio perferendis quibusdam corporis libero? Veritatis unde deleniti odio nesciunt architecto quisquam impedit. Iusto expedita quibusdam nulla harum, voluptate iste libero error repellendus voluptas ratione debitis itaque dolorum dolor maxime a dolore quos tempore commodi atque aperiam odit distinctio ea? Corporis nemo est molestias velit, porro eveniet perferendis modi? Magnam impedit non iste quam libero culpa, labore dolor. Quod adipisci ipsa veniam autem aperiam porro unde quidem doloribus
            </span>

        </div>

        <div class="post-box">
            <img src="./assets/img/food-1.jpg" alt="" width="200px" class="post-img">
            <h2 class="category">Mobile</h2>
            <a href="post-page.html" class="post-title">
                HOw to create ui ux
            </a>
            <span class="post-date">12 feb 2022</span>
            <span class="post-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam qui harum, neque beatae praesentium cum commodi dolorum vero et quos iusto, obcaecati inventore expedita quam consequuntur saepe, aperiam distinctio perferendis quibusdam corporis libero? Veritatis unde deleniti odio nesciunt architecto quisquam impedit. Iusto expedita quibusdam nulla harum, voluptate iste libero error repellendus voluptas ratione debitis itaque dolorum dolor maxime a dolore quos tempore commodi atque aperiam odit distinctio ea? Corporis nemo est molestias velit, porro eveniet perferendis modi? Magnam impedit non iste quam libero culpa, labore dolor. Quod adipisci ipsa veniam autem aperiam porro unde quidem doloribus
            </span>

        
        </div>
        <div class="post-box">
            <img src="./assets/img/food-4.jpg" alt="" width="200px" class="post-img">
            <h2 class="category">Mobile</h2>
            <a href="post-page.html" class="post-title">
                HOw to create ui ux
            </a>
            <span class="post-date">12 feb 2022</span>
            <span class="post-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam qui harum, neque beatae praesentium cum commodi dolorum vero et quos iusto, obcaecati inventore expedita quam consequuntur saepe, aperiam distinctio perferendis quibusdam corporis libero? Veritatis unde deleniti odio nesciunt architecto quisquam impedit. Iusto expedita quibusdam nulla harum, voluptate iste libero error repellendus voluptas ratione debitis itaque dolorum dolor maxime a dolore quos tempore commodi atque aperiam odit distinctio ea? Corporis nemo est molestias velit, porro eveniet perferendis modi? Magnam impedit non iste quam libero culpa, labore dolor. Quod adipisci ipsa veniam autem aperiam porro unde quidem doloribus
            </span>

        </div>
        <div class="post-box">
            <img src="./assets/img/food-1.jpg" alt="" class="post-img">
            <h2 class="category">Mobile</h2>
            <a href="post-page.html" class="post-title">
                HOw to create ui ux
            </a>
            <span class="post-date">12 feb 2022</span>
            <span class="post-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam qui harum, neque beatae praesentium cum commodi dolorum vero et quos iusto, obcaecati inventore expedita quam consequuntur saepe, aperiam distinctio perferendis quibusdam corporis libero? Veritatis unde deleniti odio nesciunt architecto quisquam impedit. Iusto expedita quibusdam nulla harum, voluptate iste libero error repellendus voluptas ratione debitis itaque dolorum dolor maxime a dolore quos tempore commodi atque aperiam odit distinctio ea? Corporis nemo est molestias velit, porro eveniet perferendis modi? Magnam impedit non iste quam libero culpa, labore dolor. Quod adipisci ipsa veniam autem aperiam porro unde quidem doloribus
            </span>

        </div>

        <div class="post-box">
            <img src="./assets/img/food-1.jpg" alt="" width="200px" class="post-img">
            <h2 class="category">Mobile</h2>
            <a href="post-page.html" class="post-title">
                HOw to create ui ux
            </a>
            <span class="post-date">12 feb 2022</span>
            <span class="post-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam qui harum, neque beatae praesentium cum commodi dolorum vero et quos iusto, obcaecati inventore expedita quam consequuntur saepe, aperiam distinctio perferendis quibusdam corporis libero? Veritatis unde deleniti odio nesciunt architecto quisquam impedit. Iusto expedita quibusdam nulla harum, voluptate iste libero error repellendus voluptas ratione debitis itaque dolorum dolor maxime a dolore quos tempore commodi atque aperiam odit distinctio ea? Corporis nemo est molestias velit, porro eveniet perferendis modi? Magnam impedit non iste quam libero culpa, labore dolor. Quod adipisci ipsa veniam autem aperiam porro unde quidem doloribus
            </span>

        
        </div>
        <div class="post-box">
            <img src="./assets/img/food-4.jpg" alt="" width="200px" class="post-img">
            <h2 class="category">Mobile</h2>
            <a href="post-page.html" class="post-title">
                HOw to create ui ux
            </a>
            <span class="post-date">12 feb 2022</span>
            <span class="post-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam qui harum, neque beatae praesentium cum commodi dolorum vero et quos iusto, obcaecati inventore expedita quam consequuntur saepe, aperiam distinctio perferendis quibusdam corporis libero? Veritatis unde deleniti odio nesciunt architecto quisquam impedit. Iusto expedita quibusdam nulla harum, voluptate iste libero error repellendus voluptas ratione debitis itaque dolorum dolor maxime a dolore quos tempore commodi atque aperiam odit distinctio ea? Corporis nemo est molestias velit, porro eveniet perferendis modi? Magnam impedit non iste quam libero culpa, labore dolor. Quod adipisci ipsa veniam autem aperiam porro unde quidem doloribus
            </span>

        </div>
    </section>
    <?php
}


public function Intro(){?>
    <div >
        <img class="bg-transparent position-absolute" style="z-index:999 ;margin-top:30px " src="./assets/img/logo.png">

        <h1 class="heading"> News & Actualités</h1>
       <center><p class="description" style="color:#51724e">Dans cette page vous pouver voir toute les recettes disponible et filtrer selon vos choix tout est disponibe en un seul click</p></center> 
    </div>


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

