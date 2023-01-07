<?php
require_once "User/COMPOSANTS.php";
class AdminDashboard extends COMPOSANTS{
    public function header(){?>
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="User/bootstrap-4.1.3-dist/css/bootstrap.min.css">
            <title>Admin Dashboard</title>
            <link rel="stylesheet" href="User/styles/style.css" />
            <link rel="stylesheet" href="Admin/styles/dashboard.css" />
            <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
        
          </head>
          <body>
            <script src="User/js/jquery-3.3.1.min.js"></script>
                <script src="User/bootstrap-4.1.3-dist/js/bootstrap.min.js"></script>
                <?php
        }
        public function heading(){?>
            <main>  
            <div class="page-header">
                <h1>Tableau de bord</h1>
                
            </div>
        <?php
        }
    public function cardSection(){?>

            
            <div class="page-content">
            
                <div class="analytics">

                    <div class="card" style="background: url(assets/img/users.png) no-repeat center center  / cover;text-align:center">
                        <div class="gestion_title" >
                            <h2 class="gestion_subtitle" >Utilisateurs</h2>
                            <small class="desc">Gesion des utilisateurs</small>
                        </div>
                    </div>
                    

                    <div class="card" style="background: url(assets/img/nutrition.png) no-repeat center center  / cover;text-align:center">
                        <div class="gestion_title" >
                            <h2 class="gestion_subtitle">Nutrition</h2>
                            <small class="desc">Gestion des ingredients</small>
                        </div>
                    </div>

                    <div class="card" style="background: url(assets/img/recette.png) no-repeat center center  / cover;text-align:center">
                        <div class="gestion_title">
                            <h2 class="gestion_subtitle" >Recettes</h2>
                            <small class="desc">Gestion des recettes</small>
                        </div>
                    </div>

                    <div class="card" style="background: url(assets/img/news.png) no-repeat center center  / cover;text-align:center">
                        <div class="gestion_title" >
                            <h2 class="gestion_subtitle" >News</h2>
                            <small class="desc">Gestion des Actualités</small>
                        </div>
                    </div>

                </div>
   <?php
    }
    public function nav(){?>
    
    <div class="main-content">
        
        <header>
            <div class="header-content nav sticky-nav ">

                <label for="menu-toggle">
                    <span class="las la-bars"></span>
                </label>
                <div class="nav-links">
               <ul>
                  <li><a href="#" >Accueil</a></li>
                  <li><a href="./index.php?page=recettes" target="_blank">Recettes</a></li>
                  <li><a href="./index.php?page=news" target="_blank">News</a></li>
                  <li><a href="#" target="_blank">Healthy</a></li>
                  <li><a href="./index.php?page=saison" target="_blank">Saison</a></li>
                  <li><a href="./index.php?page=fete" target="_blank">Fete</a></li>
                  <li><a href="./index.php?page=nutrition"  target="_blank">Nutrition</a></li>

                 
               </ul>     
            </div>
                <div class="header-menu">
                    
                    <div class="notify-icon">
                        <span class="las la-bell"></span>
                        <span class="notify">3</span>
                    </div>
                    
                    <div class="user">                        
                        <span class="las la-power-off"></span>
                        <span>Se deconnecter</span>
                    </div>
                </div>
            </div>

        </header>
    <?php
    }
        public function sideBar(){?>
<input type="checkbox" id="menu-toggle">
    <div class="sidebar">
        <div class="side-header">
        <img class="bg-transparent position-absolute" style="padding-top:1.1rem;width:70%;z-index:999 ;margin-bottom:30px " src="assets/img/logo.png">
        </div>
        
        <div class="side-content">
            <div class="profile">
                <h4>User name here</h4>
                <small>Administrateur</small>
            </div>

            <div class="side-menu">
                <ul>
                    <li>
                       <a href="" class="active">
                            <span class="las la-home"></span>
                            <small>Tableau de bord</small>
                        </a>
                    </li>

                    <li>
                       <a href="">
                            <span class="las la-clipboard-list"></span>
                            <small>Gesion nutrition</small>
                        </a>
                    </li>

                    <li>
                       <a href="">
                            <span class="las la-tasks"></span>
                            <small>Gestion recettes</small>
                        </a>
                    </li>
                    
                    <li>
                       <a href="">
                            <span class="las la-clipboard-list"></span>
                            <small>Gesion news</small>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </div>
            <?php
            }
        
        public function gestionSection(){?>
   <div class="records table-responsive">

                    <div class="record-header"  style="margin:0 2rem 0 2rem">
                        <div class="add">
                            <span>Entries</span>
                            <select name="" id="">
                                <option value="">ID</option>
                            </select>
                            <button>Add record</button>
                        </div>

                        <div class="browse">
                           <input type="search" placeholder="Search" class="record-search">
                            <select name="" id="">
                                <option value="">Status</option>
                            </select>
                        </div>
                    </div>

                    <div >
                        <table width="100%" style="text-align:center;margin:auto">
                            <thead>
                                <tr>
                                    <th>#notation</th>
                                    <th><span class="las la-sort"></span> Catég</th>
                                    <th><span class="las la-sort"></span> Titre</th>
                                    <th><span class=""></span> Image</th>
                                    <th><span class=""></span> Vidéo</th>
                                    <th><span class="las la-sort"></span> Desc</th>
                                    <th><span class="las la-sort"></span> Saison</th>
                                    <th><span class="las la-sort"></span> Fete</th>
                                    <th><span class="las la-sort"></span> TPrep</th>
                                    <th><span class="las la-sort"></span> TRepo</th>
                                    <th><span class="las la-sort"></span> TCuiss</th>
                                    <th><span class="las la-sort"></span> Cal</th>
                                    <th><span class="las la-sort"></span> Diff</th>

                                    <th><span class=""></span> Valide</th>
                                    <th><span style="padding-left:2rem"></span> ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>5</td>
                                    <td>
                                        Plats
                                    </td>
                                    <td>
                                        le titre ici
                                    </td>
                                    <td>
                                        image
                                    </td>
                                    <td>
                                        video
                                    </td>
                                    <td>
                                        description
                                    </td>
                                    
                                    <td>
                                        saison
                                    </td>
                                    
                                    <td>
                                        fete
                                    </td>
                                    
                                    <td>
                                       60
                                    </td>
                                    
                                    <td>
                                        60
                                    </td>
                                    
                                    <td>
                                        30
                                    </td>
                                    
                                    <td>
                                        150
                                    </td>
                                    
                                    <td>
                                        facile
                                    </td>
                                    
                                    <td>
                                       non
                                    </td>
                                    
                                   
                                    <td>
                                        <div class="actions">
                                        <span class="las la-check-circle"></span>
                                            <span class="las la-pencil-alt"></span>
                                            <span class="las la-trash"></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>
                                        Plats
                                    </td>
                                    <td>
                                        le titre ici
                                    </td>
                                    <td>
                                        image
                                    </td>
                                    <td>
                                        video
                                    </td>
                                    <td>
                                        description
                                    </td>
                                    
                                    <td>
                                        saison
                                    </td>
                                    
                                    <td>
                                        fete
                                    </td>
                                    
                                    <td>
                                       60
                                    </td>
                                    
                                    <td>
                                        60
                                    </td>
                                    
                                    <td>
                                        30
                                    </td>
                                    
                                    <td>
                                        150
                                    </td>
                                    
                                    <td>
                                        facile
                                    </td>
                                    
                                    <td>
                                       non
                                    </td>
                                    
                                   
                                    <td>
                                        <div class="actions">
                                        <span class="las la-check-circle"></span>
                                            <span class="las la-pencil-alt"></span>
                                            <span class="las la-trash"></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>
                                        Plats
                                    </td>
                                    <td>
                                        le titre ici
                                    </td>
                                    <td>
                                        image
                                    </td>
                                    <td>
                                        video
                                    </td>
                                    <td>
                                        description
                                    </td>
                                    
                                    <td>
                                        saison
                                    </td>
                                    
                                    <td>
                                        fete
                                    </td>
                                    
                                    <td>
                                       60
                                    </td>
                                    
                                    <td>
                                        60
                                    </td>
                                    
                                    <td>
                                        30
                                    </td>
                                    
                                    <td>
                                        150
                                    </td>
                                    
                                    <td>
                                        facile
                                    </td>
                                    
                                    <td>
                                       non
                                    </td>
                                    
                                   
                                    <td>
                                        <div class="actions">
                                        <span class="las la-check-circle"></span>
                                            <span class="las la-pencil-alt"></span>
                                            <span class="las la-trash"></span>
                                        </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                      
                    </div>
                    
                </div>
                <?php $this-> afficherFooter() ?>
            </div>
            
        </main>
        
    </div>
     <?php
          }
          public function tableauSection(){?>

            <?php
                 }

         public function afficher(){
            $this->header();
            $this->sideBar();
            $this->nav();
            $this->heading();
            $this->cardSection();
            $this->gestionSection();
          }
          public function afficherNews(){
            $this->header();
            $this->sideBar();
            $this->nav();
            $this->heading();
            //$this->cardSection();
            $this->gestionSection();
          }

}
?>