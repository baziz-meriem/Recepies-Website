<?php 
require_once './Admin/models/Recette_model.php';



class Recette_controller {

    public function getRecettes(){
        $model = new Recette_model();
        $data=$model->getRecettes();
        return $data;
    }

    public function deleteRecettes(){
        if(isset($_POST["id"])){
            $id= strip_tags(trim($_POST['id']));
           // echo $id;
            $model = new Recette_model();
            $data=$model->deleteRecettes($id);
        }else
        echo 'erreur';
        {
            

    }
    }
}


?>