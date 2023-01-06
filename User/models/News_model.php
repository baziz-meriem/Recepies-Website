
<?php 
require_once './Authentication/AUTH_model.php';



class News_model {
    private $host = "localhost";  
    private $name = "root";  
    private $password = "";  
    private $database = "recettes";  

    public function getNews(){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT * FROM `news`  ORDER BY ID ASC ';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        $auth-> disconnect($conn);
        //print_r($result);
        return $result;
    }
    public function getNewsDetails($id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT * FROM `news_desc` WHERE `news_id`='.$id.' ORDER BY ID ASC ';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetchAll(PDO::FETCH_ASSOC);
        $auth-> disconnect($conn);
        return $result;
    }
    public function getNewsrow($id){
        $auth = new AUTH_model();
        $conn=$auth->connectDB($this->host,$this->name,$this->password,$this->database);
        $sql='SELECT * FROM `news` WHERE `ID`='.$id.' ORDER BY ID ASC LIMIT 1 ';
        $q=$auth-> query($conn,$sql);
        $result= $q->fetch();
        $auth-> disconnect($conn);
        return $result;
    }

}

?>