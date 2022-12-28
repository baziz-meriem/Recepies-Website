 <?php  
 session_start();  
 $host = "localhost";  
 $name = "root";  
 $password = "";  
 $database = "recettes";  
 $message = "";  
 try  
 {  
      $connect = new PDO("mysql:host=$host; dbname=$database", $name, $password);  
      $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
      if(isset($_POST["login"]))  
      {  
           if(empty($_POST["mail"]) || empty($_POST["mot_de_passe"]))  
           {  
                $message = '<label>All fields are required</label>';  
           }  
           else  
           {  
                $query = "SELECT * FROM utilisateur WHERE mail = :mail AND mot_de_passe = :mot_de_passe";  
                $statement = $connect->prepare($query);  
                $statement->execute(  
                     array(  
                          'mail' => $_POST["mail"],  
                          'mot_de_passe' => $_POST["mot_de_passe"]  
                     )  
                );  
                $count = $statement->rowCount();  
                if($count > 0)  
                {  
                     $_SESSION["mail"] = $_POST["mail"];  
                     header("location:login_success.php");  
                }  
                else  
                {  
                     $message = '<label>Wrong Data</label>';  
                }  
           }  
      }  
 }  
 catch(PDOException $error)  
 {  
      $message = $error->getMessage();  
 }  
 ?>  
 <!DOCTYPE html>  
 <html>  
      <head>  
          
           <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>  
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />  
           <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>  
      </head>  
      <body>  
           <br />  
           <div class="container" style="width:500px;">  
                <?php  
                if(isset($message))  
                {  
                     echo '<label class="text-danger">'.$message.'</label>';  
                }  
                ?>  
                <h3 align="">PHP Login Script using PDO</h3><br />  
                <form method="post">  
                     <label>mail</label>  
                     <input type="text" name="mail" class="form-control" />  
                     <br />  
                     <labe>Mot de passe</label>  
                     <input type="mot_de_passe" name="mot_de_passe" class="form-control" />  
                     <br />  
                     <input type="submit" name="login" class="btn btn-info" value="Login" />  
                </form>  
           </div>  
           <br />  
      </body>  
 </html>  