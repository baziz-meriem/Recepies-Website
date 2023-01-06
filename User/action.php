<?php 
require_once '../Authentication/AUTH_model.php';
  
        $auth = new AUTH_model();
        $conn=$auth->connectDB("localhost","root","","recettes");

        if(isset($_POST['action'])){
            $sql = "SELECT * FROM recettes WHERE titre !=''";
            if(isset($_POST['categorie'])){
                $categorie = implode("','", $_POST['categorie']); //the implode converts data from array to string
                $sql .="AND categorie IN('".$categorie."')";
            }
            if(isset($_POST['saison'])){
                $saison = implode("','", $_POST['saison']); 
                $sql .="AND saison IN('".$saison."')";
            }
            if(isset($_POST['fete'])){
                $fete = implode("','", $_POST['fete']); 
                $sql .="AND fete IN('".$fete."')";
            }
            if(isset($_POST['notation'])){
                $notation = implode("','", $_POST['notation']); 
                $sql .="AND notation IN('".$notation."')";
            }
            if(isset($_POST["minimum_prep"], $_POST["maximum_prep"]) && !empty($_POST["minimum_prep"]) && !empty($_POST["maximum_prep"]))
            {
                $sql .= "
                 AND temps_preparation BETWEEN '".$_POST["minimum_prep"]."' AND '".$_POST["maximum_prep"]."'
                ";
            }
            if(isset($_POST["minimum_cuiss"], $_POST["maximum_cuiss"]) && !empty($_POST["minimum_cuiss"]) && !empty($_POST["maximum_cuiss"]))
            {
                $sql .= "
                 AND temps_cuisson BETWEEN '".$_POST["minimum_cuiss"]."' AND '".$_POST["maximum_cuiss"]."'
                ";
            }

            $result = $auth->query($conn,$sql);
            $output='';
            $recettes=$result->fetchAll(PDO::FETCH_ASSOC);
           // $count = $recettes->rowCount();
            
            if(true){
                foreach ($recettes as $recette) {
                    //print_r($recette); //fetch all data from db in associative array
                    $output .='
                    <a href="single-recipe.html" class="recipe">
                     <img class="img recipe-img" src="assets/img/'. $recette['image'] .'" >
                    <h5>'.$recette['titre'].'</h5>
                    <p>Prep : '. $recette['temps_preparation'].'| Cal :   '.$recette['calories'].'<br/>
                    Cuiss : '. $recette['temps_cuisson'].'| Tot :  '.$recette['temps_total'].'
                    </p>
                  </a>';
                }
            }
            else{
                $output="<h3> pas de recette trouvés</h3>";
            }
        echo $output;
        }

?>