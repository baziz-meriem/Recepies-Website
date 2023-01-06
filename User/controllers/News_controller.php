
<?php 
require_once './User/models/News_model.php';



class News_controller {

    public function getNews(){
        $model = new News_model();
        $data=$model->getNews();
        return $data;
    }

    public function getNewsDetails($id){
        $model = new News_model();
        $result=$model->getNewsDetails($id);
        return $result;
    }
    
    public function getNewsrow($id){
        $model = new News_model();
        $result=$model->getNewsrow($id);
        return $result;
    }

}

?>