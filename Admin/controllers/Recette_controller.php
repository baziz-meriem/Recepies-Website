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
}


?>