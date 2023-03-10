<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once "User/COMPOSANTS.php";
require_once "Admin/controllers/Recette_controller.php";

class AjoutRecette extends AdminDashboard
{
    public function header()
    { ?>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="User/bootstrap-4.1.3-dist/css/bootstrap.min.css">
            <title>Formulaire Recette</title>
            <link rel="stylesheet" href="User/styles/style.css" />
            <link rel="stylesheet" href="Admin/styles/dashboard.css" />
            <link rel="stylesheet" href="Admin/styles/form.css" />
            <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
        </head>

        <body>
            <script src="User/bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
        <?php
    }

    public function form()
    { ?>
     
            <div class="container" style="margin:auto">
            <?php  if(isset($_GET['id'])){ echo '<h1 class="form_title">Modifier une recette existante</h1>';}else echo '<h1 class="form_title">Ajouter une nouvelle recette</h1>'  ?>
                
                <?php
                    $controller = new Recette_controller();
                    $recette=$controller->getRecette();
                ?>
                <form method="post" action="<?php $controller = new Recette_controller();
                                                  if(isset($_GET['id'])){ $controller->updateRecette();}else $controller->insererRecette(); ?>">
                    <div class="form ">
                        <div class="fields">

                            <div class="input-field">
                                <label>Cat??gorie</label>
                                <select name="categorie" required>
                                    <option disabled selected>Selectionner la cat??gorie</option>
                                    <option value="plats" <?php if($recette['categorie']=='plats') echo ' selected="selected"'; ?>>Plats</option>
                                    <option value="entrees" <?php if($recette['categorie']=='entrees') echo ' selected="selected"'; ?>>Entr??es</option>
                                    <option value="desserts" <?php if($recette['categorie']=='desserts') echo ' selected="selected"'; ?>>D??sserts</option>
                                    <option value="boissons" <?php if($recette['categorie']=='boissons') echo ' selected="selected"'; ?>>Boissons</option>

                                </select>
                            </div>
                            <div class="input-field">
                                <label>Titre</label>
                                <input type="text" name="titre" value="<?php echo $recette['titre']?>" placeholder="Entrer le titre" required>
                            </div>
                            <div class="input-field">
                                <label>Image</label>
                                <input type="text" name="image" value="<?php echo $recette['image']?>" placeholder="Entrer le nom de l'image" required>
                            </div>
                            <div class="input-field">
                                <label>Vid??o</label>
                                <input type="text" name="video" value="<?php echo $recette['video']?>" placeholder="Entrer le nom de la video" >
                            </div>
                            <div class="input-field">
                                <label>Saison</label>
                                <select name="saison"  required>
                                    <option  disabled selected>Selectionner une saison</option>
                                    <option value="ete" <?php if($recette['saison']=='ete') echo ' selected="selected"'; ?>>Et??</option>
                                    <option value="printemps" <?php if($recette['saison']=='printemps') echo ' selected="selected"'; ?>>Printemps</option>
                                    <option value="hiver" <?php if($recette['saison']=='hiver') echo ' selected="selected"'; ?>>Hiver</option>
                                    <option value="automne" <?php if($recette['saison']=='automne') echo ' selected="selected"'; ?>>Automne</option>
                                </select>
                            </div>
                            <div class="input-field">
                                <label>Fete</label>
                                <select name="fete" required>
                                    <option  disabled selected>Selectionner une fete</option>
                                    <option value="aid adha"<?php if($recette['fete']=='aid adha') echo ' selected="selected"'; ?>>Aid Adha</option>
                                    <option value="aid fitr" <?php if($recette['fete']=='aid fitr') echo ' selected="selected"'; ?>>Aid Fitr</option>
                                    <option value="mouloud"<?php if($recette['fete']=='mouloud') echo ' selected="selected"'; ?> >Mouloud</option>
                                    <option value="yenayer" <?php if($recette['fete']=='yenayer') echo ' selected="selected"'; ?> >Yenayer</option>
                                    <option value="ramadan" <?php if($recette['fete']=='ramadan') echo ' selected="selected"'; ?> >Ramadhan</option>
                                </select>
                            </div>

                            <div class="input-field">
                                <label>Temps pr??paration</label>
                                <input type="number" name="temps_preparation" value="<?php echo $recette['temps_preparation']?>" placeholder="Entrer le temps de pr??p" required>
                            </div>
                            <div class="input-field">
                                <label>Temps Repos</label>
                                <input type="number" name="temps_repos" value="<?php echo $recette['temps_repos']?>" placeholder="Entrer le temps de repos" required>
                            </div>
                            <div class="input-field">
                                <label>Temps Cuisson</label>
                                <input type="number" name="temps_cuisson" value="<?php echo $recette['temps_cuisson']?>" placeholder="Entrer le temps de cuiss" required>
                            </div>
                            <div class="input-field">
                                <label>Nombre de Calories</label>
                                <input type="number" name="calories" value="<?php echo $recette['calories']?>" placeholder="Entrer le nombre de calories" required>
                            </div>
                            <div class="input-field">
                                <label>Difficult??</label>
                                <input type="Text" name="difficulte" value="<?php echo $recette['difficulte']?>" placeholder="Entrer la difficult??" required>
                            </div>
                            <div class="input-field">
                                <label>Description</label>
                                <textarea name="description"  rows="4" cols="50" placeholder="Entrer une d??scription">
                                <?php echo $recette['description']?>
                            </textarea>
                            </div>

                        </div>
                        <p style="color: #9bae14;font-size:18px;text-align:center;font-weight:bold"><?php if(isset($_SESSION['message'])) {echo $_SESSION['message'];} ?></p>
                        <button type="submit" name="inserer">
                            <span class="btnText">Envoyer</span>
                            <i class="uil uil-navigator"></i>
                        </button>
                        
                    </div>
                </form>
            </div>

    <?php  }



    /*<?php $this-> afficherFooter() ?>*/

    public function afficher()
    {
        $this->header();
        $this->sideBar();
        $this->nav();
        $this->heading();
        $this->form();
        //$this->gestionSection();
    }
}
 ?>