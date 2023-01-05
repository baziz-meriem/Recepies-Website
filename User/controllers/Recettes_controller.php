<?php 
require_once './User/models/Recettes_model.php';



class Recettes_controller {

    public function getSaisons(){
        $model = new Recettes_model();
        $data=$model->getSaisons();
        return $data;
    }
    public function getNotations(){
        $model = new Recettes_model();
        $data=$model->getNotations();
        return $data;
    }
    public function getCategories(){
        $model = new Recettes_model();
        $data=$model->getCategories();
        return $data;
    }
    public function getRecettes(){
        $model = new Recettes_model();
        $data=$model->getRecettes();
        return $data;
    }
}

?>