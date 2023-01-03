<?php
require_once 'AUTH_Model.php';

class AUTH_controller{
     public function Register(){

          if(isset($_POST["register"]))  
          {    
                  $nom= strip_tags(trim($_POST['nom']));
                  $prenom= strip_tags(trim($_POST['prenom']));
                  $mail= strip_tags(trim($_POST['mail']));
                  $mot_de_passe= strip_tags(trim($_POST['mot_de_passe']));
                  $sexe= strip_tags(trim($_POST['sexe']));
                  $date_naissance= strip_tags(trim($_POST['date_naissance']));

                  $model=new  AUTH_Model();
                  $lastInsertId = $model->Register($nom,$prenom,$mail,$sexe,$date_naissance,$mot_de_passe);
                  
                  if($lastInsertId)
                  {
                    header("location:./?register=succ"); 
                  }
                  else 
                  {
                    header("location:./?register=err"); 
                  }
              
         }

      }
     
    public function Login(){
        if(isset($_POST["login"]))  
        {  
                $mail= strip_tags(trim($_POST['mail']));
                $mot_de_passe= strip_tags(trim($_POST['mot_de_passe']));
                $model=new  AUTH_Model();
                $res=$model->Login($mail,$mot_de_passe);
                session_start();
                unset($_POST);
                  if($res > 0)  
                  {  
                       $_SESSION["mail"] = $mail;  
                       header("location:Authentication/login_success.php");    
                    }  

                  else  
                  {  
                       header("location:./?login=err"); 
                       exit();  
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