
<?php
require_once './Authentication/AUTH_model.php';

class Accueil_model{

    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  


    public function getPlats(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT ID,titre,description,image FROM `recettes` WHERE `categorie`="plats"';
        $res=$auth-> query($conn,$sql);
        $auth-> disconnect($conn);
        return $res;
    }
    public function getEntrees(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $query='SELECT ID,titre,description,image FROM `recettes` WHERE `categorie`="entrees"';
        $res=$auth-> query($conn,$query);
        $auth-> disconnect($conn);
        return $res;
    }
    public function getDesserts(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $query='SELECT ID,titre,description,image FROM `recettes` WHERE `categorie`="desserts"';
        $res=$auth-> query($conn,$query);
        $auth-> disconnect($conn);
        return $res;
    }
    public function getBoissons(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $query='SELECT ID,titre,description,image FROM `recettes` WHERE `categorie`="boissons"';
        $res=$auth-> query($conn,$query);
        $auth-> disconnect($conn);
        return $res;
    }
}
?>