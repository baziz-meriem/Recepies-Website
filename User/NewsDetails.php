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
public function mainSection(){?>
<div class="container">
    <div class="heroo">

    </div>
    <main>
        <h2>Beauty is here</h2>
        <div class="profile-container">
            <div class="profile">
            <div class="img-container">

            </div>
            <div class="text">
                <h3>Ellen deo</h3>
                <p>Ellen deo<p>

            </div>
        </div>

        </div>
        <div class="content">
  
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam harum, repell nemo quidem quisquam facilis? Dolore amet sequi reiciendis magnam tempore aperiam! Ad, assumenda consectetur. Commodi reprehenderit illo cumque id maxime illum, molestiae asperiores quae doloremque vel, hic omnis itaque ea, beatae error cupiditate. Voluptatem voluptate, odio ut, quo officiis at consequuntur, quibusdam corporis nulla hic non temporibus accusamus. Laudantium, porro consectetur quaerat voluptates doloremque fugiat similique distinctio quod maxime repudiandae tenetur dolorum libero. Ratione repudiandae quia quo aperiam mollitia atque molestias assumenda tempore beatae magnam labore architecto, accusamus dolore, iure corporis? Excepturi, quibusdam!</p>
    <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elittam porro sunt! Ipsum, obcaecati natus. Dolore harum tempore eum reprehenderit tenetur doloribus optio aperiam a natus nostrum pariatur quam blanditiis libero ipsa quasi beatae adipisci at, dolorem enim cupiditate molestias sed facilis nihil.</h4>
    <p>Lorem, ipsum dolor sit amet consema possimus exercitationem harum quasi aperiam delectus accusamus velit corporis a eveniet eum dolorem quam eos consequuntur! Sapiente doloremque officia fugiat dolore minima, dolorum optio illo voluptatem dolores voluptatibus laudantium perspiciatis aut rerum recusandae fuga numquam debitis odio enim reiciendis dignissimos provident eveniet eaque nihil. Quisquam numquam dolores nesciunt illum eum, a minus quo ipsum illo repellendus, dolore quis iusto repudiandae minima dolorum dicta! Cum.</p>
</div>
<div class="content-img-container">

</div>
<p>Lorem ipsum dolor sit amet consectetur adipisicing  doloribus tempore commodi atque illum ex quidem incidunt eaque, ratione itaque voluptatibus illo cupiditate quia facere impedit delectus, accusantium corporis autem? Recusandae, perspiciatis blanditiis. Hic quasi, ea quae laboriosam aut ullam est eius modi.</p>
  <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, in. Repellendus nobis voluptatum quas odit quam voluptatibus! Quasi temporibus quisquam eum provident enim error culpa asperiores, neque dolores sit, recusandae molestias numquam atque!</h4>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing  Delectus et dolorem commodi porro nam consequuntur voluptates quidem! Suscipit exercitationem atque, assumenda, beatae eos laboriosam commodi harum nostrum, odit nulla corrupti doloremque. Neque, enim perferendis? Tenetur quaerat, commodi doloribus vitae natus quisquam ad reiciendis dolores nihil voluptatum in quis ex ullam porro recusandae ipsam adipisci debitis autem perspiciatis. Temporibus accusamus suscipit quibusdam sint labore repellendus vitae sequi ipsum delectus odit.</p>
    

</div>

 
 </main>
 </div>

 
 
 
 <?php
              }      



    public function afficher(){
      $this->header();
      $this->afficherNavBar();
      $this->mainSection();
      $this->afficherFooter();
    }

}

?>

