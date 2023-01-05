<?php 
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require_once './User/models/UneRecette_model.php';
require_once './User/UneRecette.php';


class UneRecette_controller {

    public function getRecetteDetails($id) {  

            $model = new UneRecette_model();
            $recette=$model->getRecette($id);
            $etapes_recette=$model->getEtapes($id);
            $_SESSION["recette"] = $recette; 
            $_SESSION["etapes_recette"] = $etapes_recette;  
           // echo "?page=unerecette";
          
    }
    public function getIngredients($recette_id){
        $model = new UneRecette_model();
            $ingredients=$model->getIngredients($recette_id);
            return $ingredients;
    }

}

?>