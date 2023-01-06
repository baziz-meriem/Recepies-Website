<?php 
require_once './User/models/Nutrition_model.php';



class Nutrition_controller {

    public function getIngredients(){
        $model = new Nutrition_model();
        $data=$model->getIngredients();
        return $data;
    }
    public function getIngredient($id){
        $model = new Nutrition_model();
        $data=$model->getIngredient($id);
        return $data;
    }
    public function getIngredientDetails($id){
        $model = new Nutrition_model();
        $data=$model->getIngredientDetails($id);
        return $data;
    }
}

?>