<?php 
require_once './Authentication/AUTH_model.php';




class Recettes_model {
    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  

    public function getSaisons(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = "SELECT `nom` FROM `saison`  ORDER BY ID DESC";
        $q=$auth-> query($conn,$sql);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        
       // print_r($result);
        $auth-> disconnect($conn);
        return $result;
    }
    public function getRecettes(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = "SELECT * FROM `recettes`  ORDER BY temps_preparation ASC, calories ASC";
        $q=$auth-> query($conn,$sql);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        
       // print_r($result);
        $auth-> disconnect($conn);
        return $result;
    }
    public function getNotations(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $query = "SELECT DISTINCT(notation) FROM recettes  ORDER BY ID ASC";
        $q=$auth-> query($conn,$query);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        
       // print_r($result);
        $auth-> disconnect($conn);
        return $result;
    }
    public function getCategories(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $query = "SELECT DISTINCT(categorie) FROM recettes  ORDER BY ID ASC";
        $q=$auth-> query($conn,$query);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        
       // print_r($result);
        $auth-> disconnect($conn);
        return $result;
    }
    
}

?>