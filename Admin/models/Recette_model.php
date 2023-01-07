
<?php 
require_once './Authentication/AUTH_model.php';



class Recette_model {
    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  

    public function getRecettes(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = "SELECT * FROM `recettes`  ORDER BY ID ASC";
        $q=$auth-> query($conn,$sql);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        
       // print_r($result);
        $auth-> disconnect($conn);
        return $result;
    }
    
    public function deleteRecettes($id){
      try{  $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = "delete from recettes where ID = :id ORDER BY ID ASC";
        $stmt=$conn->prepare($sql);
        $stmt->bindparam(':id',$id);
        $stmt->execute();
        $auth-> disconnect($conn);
        return true;}
        catch(PDOException $e){
            echo $e->getMessage();
            return false;
        }
    }
    public function validerRecette($id){
        try{  $auth = new AUTH_model();
          $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);

          $sql = "UPDATE recettes SET valide='1' where ID = :id ORDER BY ID ASC";
          $stmt=$conn->prepare($sql);
          $stmt->bindparam(':id',$id);
          $stmt->execute();
          $auth-> disconnect($conn);
          return true;}
          catch(PDOException $e){
              echo $e->getMessage();
              return false;
          }
      }
      public function insererRecette(){
        try{  $auth = new AUTH_model();
          $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);

          $sql = "UPDATE recettes SET valide='1' where ID = :id ORDER BY ID ASC";
          $stmt=$conn->prepare($sql);
          $stmt->bindparam(':id',$id);
          $stmt->execute();
          $auth-> disconnect($conn);
          return true;}
          catch(PDOException $e){
              echo $e->getMessage();
              return false;
          }
      }

}

?>