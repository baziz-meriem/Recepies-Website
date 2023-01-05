<?php 
require_once './Authentication/AUTH_model.php';
require_once './User/models/Nutrition_model.php';



class Nutrition_model {
    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  

    public function getData(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT `productName` FROM `products`  ';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetch();
//print_r($result['0']);
        $auth-> disconnect($conn);
        return $result;
    }

}

?>