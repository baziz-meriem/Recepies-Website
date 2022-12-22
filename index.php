<?php
require_once "./Views/User/Accueil.php";
$view=new UserView();
$view->afficher();
include ($_SERVER['DOCUMENT_ROOT'].'./WebProject/Views/components/footer.inc.php');
?>