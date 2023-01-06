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
public function mainSection($data,$titre){?>
    <section class="post container" style="margin-bottom:60px">
    <?php
            foreach ($data as $row) { $id=$row['ID'];
                ?>
              
        <div class="post-box">
            <img src="./assets/img/food-1.jpg" alt="" class="post-img">
            
            <h2 class="category"><?php  if($titre =="News & Actualités") { echo $row['type']; } else echo $row['saison']; ?></h2>
            
          <?php echo ' <a href="./index.php?page=newsDetails&id= ' . $id . '" class="post-title">' ?>
              <?php if($titre =="News & Actualités") {echo  $row['titre'];} else echo  $row['nom']  ?>
            </a>
            <span class="post-date"><?php if($titre =="News & Actualités") {echo $row['date'] ;} else {if($row['healthy'] == "oui") {echo 'healthy';} else {echo 'unhealthy' ;}}?></span>
            <span class="post-description">
            <?php echo $row['description'] ?>

        </div>
        <?php  }  ?>

    </section>
    <?php
}


public function Intro($titre){?>
    <div >
        <img class="bg-transparent position-absolute" style="z-index:999 ;margin-top:30px " src="./assets/img/logo.png">

        <h1 class="heading"><?php echo $titre?></h1>
       <center><p class="description" style="color:#51724e">Dans cette page vous pouver voir toute les recettes disponible et filtrer selon vos choix tout est disponibe en un seul click</p></center> 
    </div>


<?php
}



    public function afficher($data,$titre){
      $this->header();
      $this->Intro($titre);
      $this->afficherNavBar();
      $this->mainSection($data,$titre);
      $this->afficherFooter();
    }


  }


?>

