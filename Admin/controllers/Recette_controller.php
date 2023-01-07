<?php 
require_once './Admin/models/Recette_model.php';



class Recette_controller {

    public function getRecettes(){
        $model = new Recette_model();
        $data=$model->getRecettes();
        return $data;
    }

    public function deleteRecettes(){
        if(isset($_POST["delete"])){
            $id= strip_tags(trim($_POST['id']));
           // echo $id;
            $model = new Recette_model();
            $data=$model->deleteRecettes($id);
        }

    }
    public function validerRecette(){
        if(isset($_POST["valider"])){
            $id= strip_tags(trim($_POST['id']));
           // echo $id;
            $model = new Recette_model();
            $data=$model->validerRecette($id);
        }
    }
    public function getRecette(){
        if(isset($_GET['id']))
        {
            $row_id = $_GET['id'];
            $model = new Recette_model();
            $data=$model->getRecette($row_id);

            return $data;
        }

    }
    public function updateRecette(){
        if(isset($_POST["inserer"])&& isset($_GET['id']))
        {
            $id = $_GET['id'];
            $categorie= strip_tags(trim($_POST['categorie']));
            $titre= strip_tags(trim($_POST['titre']));
            $image= strip_tags(trim($_POST['image']));
            $video= strip_tags(trim($_POST['video']));
            $description= strip_tags(trim($_POST['description']));
            $saison= strip_tags(trim($_POST['saison']));
            $temps_preparation= $_POST['temps_preparation'];
            $temps_cuisson= $_POST['temps_cuisson'];
            $temps_repos= $_POST['temps_repos'];
            $calories= $_POST['calories'];
            $difficulte= strip_tags(trim($_POST['difficulte']));
           // $fete= strip_tags(trim($_POST['fete']));
            $model = new Recette_model();
            $model->updateRecette($id,$categorie,$titre,$image,$video,$description,$saison
            , $temps_preparation,$temps_cuisson,$temps_repos, $calories,$difficulte);

          
        }
    }
    public function insererRecette(){
        if(isset($_POST["inserer"])&& !isset($_GET['id'])){
            $categorie= strip_tags(trim($_POST['categorie']));
            $titre= strip_tags(trim($_POST['titre']));
            $image= strip_tags(trim($_POST['image']));
            $video= strip_tags(trim($_POST['video']));
            $description= strip_tags(trim($_POST['description']));
            $saison= strip_tags(trim($_POST['saison']));
            $fete= strip_tags(trim($_POST['fete']));
            $temps_preparation= $_POST['temps_preparation'];
            $temps_cuisson= $_POST['temps_cuisson'];
            $temps_repos= $_POST['temps_repos'];
            $calories= $_POST['calories'];
            $difficulte= strip_tags(trim($_POST['difficulte']));
            $model = new Recette_model();

            $data=$model->insererRecette($categorie,$titre,$image,$video,$description,$saison,$fete
            , $temps_preparation,$temps_cuisson,$temps_repos, $calories,$difficulte);
        }
    }
}


?>