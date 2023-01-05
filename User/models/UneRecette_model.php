
<?php
require_once './Authentication/AUTH_model.php';

class UneRecette_model{

    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  

    public function getRecette($id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT * FROM `recettes` WHERE `ID`='.$id.' LIMIT 1';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetch();

        $auth-> disconnect($conn);
        return $result;
    }
    public function getEtapes($recette_id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT * FROM `etapes_recette` WHERE `recette_id`='.$recette_id.' ORDER BY ID ASC ';
        $q=$auth-> query($conn,$sql);
       $res= $q->fetchAll(PDO::FETCH_ASSOC);
        $auth-> disconnect($conn);
       // print_r($q);
        return $res;
    }
    public function getIngredients($recette_id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql1='SELECT * 
        FROM `ingredients_recettes`  
        INNER JOIN `ingredients`
        ON ingredients.ID = ingredients_recettes.ingredient_id
        WHERE `recette_id`='.$recette_id.'';
        $q=$auth-> query($conn,$sql1);
       $ingredients_id = $q->fetchAll(PDO::FETCH_ASSOC);
        $auth-> disconnect($conn);
        //print_r($ingredients_id);
        return $ingredients_id;
    }

}
?>