<?php
require_once './Authentication/AUTH_controller.php';
 class connection {
    public function header() {
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <!-- ===== Iconscout CSS ===== -->
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">

            <!-- ===== CSS ===== -->
            <link rel="stylesheet" href="./Authentication/auth.css">
        </head>
        <body>
    <?php
    }

    public function login(){?>
    <div class="container">
        <div class="forms">
            <div class="form Connection">
                <span class="title">Connection</span>

                <form method="post" action="<?php $controller=new AUTH_controller();$controller->Login(); ?>">
                    <div class="input-field">
                        <input type="text" name="mail" placeholder="Entrer votre adresse mail" required>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" name="mot_de_passe" class="password" placeholder="Entrer votre mot de passe" required>
                        <i class="uil uil-lock icon"></i>
                    </div>

                    <div class="input-field button">
                        <input type="submit" name="login" value="Login">
                    </div>
                </form>

                <div class="Connection-signup">
                    <span class="text">Pas un membre?
                        <a href="#" class="text signup-link">S'inscrire</a>
                    </span>
                </div>
            </div>
           
            <!-- Inscription Form -->
            <div class="form signup">
                <span class="title">Inscription</span>

                <form method="post">
                 <div class="align">
                    <div class="input-field">
                        <input type="text" placeholder="Entrer votre nom" required>
                        <i class="uil uil-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Entrer votre prenom" required>
                        <i class="uil uil-user"></i>
                    </div>
                 </div>
                 <div class="align">
                    <div class="input-field">
                        <span>Date de naissance</span>
                        <input type="date" placeholder="Entrer votre age" required style="cursor:text">
                        
                    </div>
                    <div class="input-field">  
                    </div>
                </div>
                <div class="align"  style="padding-top:25px">
                <p>Sexe</p>
                <div class="">
                    <input type="radio" id="homme" name="sexe" value="homme">
                    <label for="homme">Homme</label><br>
                </div>
                <div class="">
                   <input type="radio" id="femme" name="sexe" value="felle">
                    <label for="femme">Femme</label><br>
                </div>

                </div>
              

                    <div class="input-field">
                        <input type="text" placeholder="Enter votre email" required>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Créer un mot de passe" required>
                        <i class="uil uil-lock icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Confirmer un mot de passe" required>
                        <i class="uil uil-lock icon"></i>
                        
                    </div>


                    <div class="input-field button">
                        <input type="button" value="Signup">
                    </div>
                </form>

                <div class="Connection-signup">
                    <span class="text">Déja un membre?
                        <a href="#" class="text Connection-link">Se connecter maintenant</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <script><?php require_once("script.js"); ?></script>
    <?php
    }

    public function afficher()
    {
        $this->header();
        $this->login();
    }
 }
?>





</body>
</html>
