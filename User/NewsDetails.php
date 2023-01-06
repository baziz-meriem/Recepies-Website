<?php
require_once "COMPOSANTS.php";

class NewsDetails extends COMPOSANTS {
  public function header(){?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="User/bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <title>Details News</title>
    <link rel="stylesheet" href="User/styles/style.css" />
    <link rel="stylesheet" href="User/styles/news.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

  </head>
  <body>
    <script src="./User/js/jquery-3.3.1.min.js"></script>
        <script src="bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
}
public function Intro(){?>
    <header class="hero">
        <div class="hero-container">
          <div class="hero-text">
            <h1>Ici titre news</h1>
            <h4>Ici description News</h4>
          </div>
        </div>
      </header>

<?php
}
public function mainSection($dataDetails,$data){?>
<div class="container">
    <div class="heroo" style="background:url(<?php echo './assets/img/'.$data['image']; ?>) no-repeat center center  / cover;">

    </div>
    <main>
    <h2 class="big_title" style="text-align:center"><?php echo $data["titre"] ?></h2>
       <?php if($data['video']) echo '
          <div class="news_video">
          
               <iframe  src="assets/img/'.$data["video"].'" allowfullscreen></iframe> 
          </div>'
        ?>
        <?php
        foreach ($dataDetails as $row) {
          ?>
        <div class="content">
          <h4 class="title"><?php echo $row['titre']?></h4>
          <p class="paragraph"> <?php echo $row['description']?></p>
        </div>
        <?php if($row['image']) echo '<img src="assets/img/'. $row['image'] .'" width="100%" alt="tajin zitoun" class="news_img">';?>
      <?php  }          ?>     


</div>

 
 </main>
 </div>

 
 
 
 <?php
              }      



    public function afficher($dataDetails,$data){
      $this->header();
      $this->afficherNavBar();
      $this->mainSection($dataDetails,$data);
      $this->afficherFooter();
    }

}

?>

