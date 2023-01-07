
<?php 
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
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
        $auth-> disconnect($conn);
        return $result;
    }
    public function getRecette($id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql = 'SELECT * FROM `recettes` WHERE ID='.$id.'  LIMIT 1';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetch();
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
    public function updateRecette($id){

    }
      public function insererRecette($categorie,$titre,$image,$video,$description,$saison,$fete, 
      $temps_preparation,$temps_cuisson,$temps_repos, $calories,$difficulte){
        try{  $auth = new AUTH_model();
          $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);

          $sql = "INSERT INTO recettes (categorie,titre,image,video,description,saison,fete,
          temps_preparation,temps_cuisson,temps_repos,calories,difficulte) VALUES (:categorie,:titre,:image,:video,:description,:saison,:fete,
          :temps_preparation,:temps_cuisson,:temps_repos,:calories,:difficulte)";
          $stmt=$conn->prepare($sql);

          $data = [
            ':categorie' => $categorie,
            ':titre' => $titre,
            ':image' => $image,
            ':video' =>$video,
            ':description' => $description,
            ':saison' => $saison,
            ':fete' => $fete,
            ':temps_preparation'=>$temps_preparation,
            ':temps_cuisson'=>$temps_cuisson,
            ':temps_repos'=> $temps_repos,
            ':calories' => $calories,
            ':difficulte'=>$difficulte,
          ];
          
          $query_execute=$stmt->execute($data);
          if($query_execute){
            $_SESSION['message'] = "Insertion Réussi";
            exit(0);
          }else{
            $_SESSION['message'] = "Insertion NON Réussi";
            exit(0);
          }
          $auth-> disconnect($conn);
          }
          catch(PDOException $e){
              echo $e->getMessage();
              return false;
          }
      }


}

?>