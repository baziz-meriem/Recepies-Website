<?php 
require_once './User/models/Nutrition_model.php';



class Nutrition_controller {

    public function getData(){
        $model = new Nutrition_model();
        $data=$model->getData();
        return $data;
    }
    public function getIngredients(){
        $model = new Nutrition_model();
        $data=$model->getIngredients();
        return $data;
    }

}

?>