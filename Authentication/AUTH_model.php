<?php

class AUTH_Model {
   
  private $host = "localhost";  
  private $name = "root";  
  private $password = "";  
  private $database = "recettes";  
  private $message = ""; 

 private function connectDB($host,$name,$password,$database){
 try{
    $connect = new PDO("mysql:host=$host; dbname=$database", $name, $password);  
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
    return $connect;
 }
    catch(PDOException $error)  
    {  
         $this->message = $error->getMessage();  
         throw new \PDOException($error->getMessage(), (int)$error->getCode());
    }  }
   
   private function disconnect($connect){
      $this->connection = null;
  }
  public function query($connect,$req){
   return $connect->query($req);
}
public function Login($mail,$password){

   $connect=$this->connectDB($this->host,$this->name,$this->password,$this->database);
   $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

             $query = "SELECT * FROM utilisateur WHERE mail = ? AND mot_de_passe = ?";  
             $statement = $connect->prepare($query);  
             $statement->execute(array($mail,$password));
             $count=$statement->fetch(PDO::FETCH_OBJ);
             $this->disconnect($connect); 
             return $count;
}
}
?>