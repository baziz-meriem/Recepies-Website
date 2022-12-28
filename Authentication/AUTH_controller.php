<?php
require_once './Authentication/AUTH_Model.php';

class AUTH_controller{

    public function Login(){
        if(isset($_POST["login"]))  
        {  
             if(empty($_POST["mail"]) || empty($_POST["mot_de_passe"]))  
             {  
                  $message = '<label>All fields are required</label>';  
             }  
             else  
             {  
                $usermail= strip_tags(trim($_POST['mail']));
                $password= strip_tags(trim($_POST['mot_de_passe']));
                $model=new  AUTH_Model();
                $res=$model->Login($usermail,$password);
                session_start();
                unset($_POST);
                  if($res > 0)  
                  {  
                       $_SESSION["mail"] = $usermail;  
                       header("location:Authentication/login_success.php");  
                  }  
                  else  
                  {  
                       $message = '<label>Wrong Data</label>';  
                  }  
             }
             return $res;   
        }
       
        if(isset($message))  
        {  
             echo '<label class="text-danger">'.$message.'</label>';  
        } 
    }
}
?>