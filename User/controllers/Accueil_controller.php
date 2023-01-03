<?php
require_once './User/models/Accueil_model.php';
class Accueil_controller {

    public function getCards($categorie){
        $model=new Accueil_model();
        if($categorie == "plats"){
            $res=$model->getPlats();
        }else if($categorie == "entrees"){
            $res=$model->getEntrees();
        } else if($categorie == "desserts"){
            $res=$model->getDesserts();
        }
        else if($categorie == "boissons"){
            $res=$model->getBoissons();
        }
        
        
        return $res;
    }
}
?>