<?php 
require_once './Authentication/AUTH_model.php';
require_once './User/models/Nutrition_model.php';



class Nutrition_model {
    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  


    public function getIngredients(){
            $auth = new AUTH_model();
            $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
            $sql = "SELECT * FROM `ingredients`  ORDER BY ID ASC";
            $q=$auth-> query($conn,$sql);
            $result= $q->fetchAll(PDO::FETCH_ASSOC);
            $auth-> disconnect($conn);
            return $result;
    }
    public function getIngredient($id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = 'SELECT * FROM `ingredients` WHERE `ID`='.$id.' LIMIT 1';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetch();
        $auth-> disconnect($conn);
        return $result;
}

    public function getIngredientDetails($id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = 'SELECT * FROM `ingredients_desc` WHERE `ingredient_id`='.$id.' ';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        $auth-> disconnect($conn);
        return $result;
    }
}

?>