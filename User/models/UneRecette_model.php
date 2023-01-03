
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
        $sql="SELECT * FROM `etapes_recette` WHERE `recette_id`='.$recette_id.' ORDER BY ID ASC";
        $q=$auth-> query($conn,$sql);
        $results = $q->fetchAll(PDO::FETCH_ASSOC);
        $auth-> disconnect($conn);
        return $results;
    }
}
?>