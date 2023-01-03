<?php
class AUTH_Model {

   private $host = "localhost";  
   private $name = "root";  
   private $password = "";  
   private $database = "recettes";  
   private $message = ""; 
 public function connectDB($host,$name,$password,$database){
   try{
      $connect = new PDO("mysql:host=$host; dbname=$database", $name, $password);  
      $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
      return $connect;
   }
      catch(PDOException $error)  
      {  
            $this->message = $error->getMessage();  
            throw new \PDOException($error->getMessage(), (int)$error->getCode());
      }  
   }
   
   public function disconnect($connect){
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
public function Register($nom,$prenom,$mail,$sexe,$date_naissance,$mot_de_passe){

   $connect=$this->connectDB($this->host,$this->name,$this->password,$this->database);
   $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
   // Query for validation of username and email-id
   $ret="SELECT * FROM utilisateur where (nom=:nom ||  mail=:mail)";
   $queryt = $connect -> prepare($ret);
   $queryt->bindParam(':mail',$mail,PDO::PARAM_STR);
   $queryt->bindParam(':nom',$nom,PDO::PARAM_STR);
   $queryt -> execute();
   //$results = $queryt -> fetchAll(PDO::FETCH_OBJ);

   if($queryt -> rowCount() == 0)
   {
   // Query for Insertion
   $sql="INSERT INTO utilisateur(nom,prenom,mail,sexe,date_naissance,mot_de_passe) VALUES(:nom,:prenom,:mail,:sexe,:date_naissance,:mot_de_passe)";
   $query = $connect->prepare($sql);
   // Binding Post Values
   $query->bindParam(':nom',$nom,PDO::PARAM_STR);
   $query->bindParam(':prenom',$prenom,PDO::PARAM_STR);
   $query->bindParam(':mail',$mail,PDO::PARAM_STR);
   $query->bindParam(':sexe',$sexe,PDO::PARAM_STR);
   $query->bindParam(':date_naissance',$date_naissance,PDO::PARAM_STR);
   $query->bindParam(':mot_de_passe',$mot_de_passe,PDO::PARAM_STR);
   $query->execute();
   $lastInsertId = $connect->lastInsertId();
   $this->disconnect($connect); 
   return $lastInsertId;

   } else
  { $err ="user already has account";}

}
}
?>