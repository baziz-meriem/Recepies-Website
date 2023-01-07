<?php

require_once 'Authentication/AUTH_controller.php';
class Connection {
    public function header()
    {
?>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- ===== CSS ===== -->
            <link rel="stylesheet" href="./Authentication/auth.css">
        </head>

        <body>
        <?php
    }
    public function login()
    { ?>
            <div class="container">

                <div class="forms">
                    <div class="form Connection">
                        <span class="title">Connection</span>

                        <form method="post" action="<?php $controller = new AUTH_controller();
                                                    $controller->Login(); ?>">
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
                        <?php
                        $fulUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

                        if(strpos($fulUrl,"login=err") == true){
                            echo "<center><p style='color:red'>Mot de passe ou mail incorrect</p> </center>";
                        }
                        ?>

                    </div>

                    <!-- Inscription Form -->

                    <div class="form signup">
                        <span class="title">Inscription</span>

                        <form method="post" action="<?php $controller = new AUTH_controller();
                                                    $controller->Register(); ?>">
                            <div class="align">
                                <div class="input-field">
                                    <input type="text" name="nom" value="" placeholder="Entrer votre nom" required>
                                    <i class="uil uil-user"></i>
                                </div>
                                <div class="input-field">
                                    <input type="text" name="prenom" value="" placeholder="Entrer votre prenom" required>
                                    <i class="uil uil-user"></i>
                                </div>
                            </div>
                            <div class="align">
                                <div class="input-field">
                                    <span>Date de naissance</span>
                                    <input type="date" name="date_naissance" placeholder="Entrer votre age" value="" required style="cursor:text">

                                </div>
                                <div class="input-field">
                                </div>
                            </div>
                            <div class="align" style="padding-top:25px">
                                <p>Sexe</p>
                                <div class="">
                                    <input type="radio" id="homme" name="sexe" value="homme" required>
                                    <label for="homme">Homme</label><br>
                                </div>
                                <div class="">
                                    <input type="radio" id="femme" name="sexe" value="femme">
                                    <label for="femme">Femme</label><br>
                                </div>
                            </div>
                            <div class="input-field">
                                <input type="text" name="mail" value="" placeholder="Enter votre email" required>
                                <i class="uil uil-envelope icon"></i>
                            </div>
                            <div class="input-field">
                                <input type="password" id="password" name="mot_de_passe" value="" class="password" placeholder="Créer un mot de passe" required>
                                <i class="uil uil-lock icon"></i>
                            </div>
                            <div class="input-field">
                                <input type="password" id="confirm_password" class="password" name="verif_mot_de_passe" placeholder="Confirmer un mot de passe" required>
                                <i class="uil uil-lock icon"></i>

                            </div>
                            <div class="input-field button">
                                <input type="submit" name="register" value="S'inscrire">
                            </div>
                        </form>

                        <div class="Connection-signup">
                            <span class="text">Déja un membre?
                                <a href="#" class="text Connection-link">Se connecter maintenant</a>
                            </span>
                        </div>
                        <?php
                        $fulUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

                        if(strpos($fulUrl,"register=err") == true){
                            echo "<center><p style='color:red'>Inscription échoué, Compte deja existant</p> </center>";
                        }
                        ?>
                        <?php
                        $fulUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

                        if(strpos($fulUrl,"register=succ") == true){
                            echo "<center><p style='color:green'>Inscription réussi</p> </center>";
                        }
                        ?>
                    </div>
                </div>
            </div>
            <script>
                <?php require_once("script.js"); ?>
            </script>
    <?php
    }

    public function afficher()
    {
        $this->header();
        $this->login();
    }
}

    ?>