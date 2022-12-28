<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- ===== Iconscout CSS ===== -->
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">

    <!-- ===== CSS ===== -->
    <link rel="stylesheet" href="connection.css">
</head>
<style>
    /* ===== Google Font Import - Poformsins ===== */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
body{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(155, 174, 20, .3)
}
.container{
    position: relative;
    max-width: 540px;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 0 20px;
}
.container .forms{
    display: flex;
    align-items: center;
    height: 450px;
    width: 200%;
    transition: height 0.2s ease;
}
.container .form{
    width: 50%;
    padding: 30px;
    background-color: #fff;
    transition: margin-left 0.18s ease;
}
.container.active .Connection{
    margin-left: -50%;
    opacity: 0;
    transition: margin-left 0.18s ease, opacity 0.15s ease;
}
.container .signup{
    opacity: 0;
    transition: opacity 0.09s ease;
}
.container.active .signup{
    opacity: 1;
    transition: opacity 0.2s ease;
}
.container.active .forms{
    height: 600px;
}
.container .form .title{
    position: relative;
    font-size: 27px;
    font-weight: 600;
} 
.align{
    display: flex;
    justify-content: space-around;
}
.form .title::before{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    background-color: #9bae14;
    border-radius: 25px;
}
.form .input-field{
    position: relative;
    height: 40px;
    width: 100%;
    margin-top: 30px;
}
.input-field input{
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 0 35px;
    border: none;
    outline: none;
    font-size: 16px;
    border-bottom: 2px solid #ccc;
    border-top: 2px solid transparent;
    transition: all 0.2s ease;
}
.input-field input:is(:focus, :valid){
    border-bottom-color: #9bae14;
}
.input-field i{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 23px;
    transition: all 0.2s ease;
}
.input-field input:is(:focus, :valid) ~ i{
    color: #9bae14;
}
.input-field i.icon{
    left: 0;
}
.input-field i.showHidePw{
    right: 0;
    cursor: pointer;
    padding: 10px;
}
.form .checkbox-text{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}
.checkbox-text .checkbox-content{
    display: flex;
    align-items: center;
}
.checkbox-content input{
    margin-right: 10px;
    accent-color: #9bae14;
}
.form .text{
    color: #333;
    font-size: 14px;
}
.form a.text{
    color: #9bae14;
    text-decoration: none;
}
.form a:hover{
    text-decoration: underline;
}
.form .button{
    margin-top: 35px;
}
.form .button input{
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 6px;
    background-color: #9bae14;
    cursor: pointer;
    transition: all 0.3s ease;
}
.button input:hover{
    background-color: #9bae14;
}

.form .Connection-signup{
    margin-top: 30px;
    text-align: center;
}
</style>
<body>
    
    <div class="container">
        <div class="forms">
            <div class="form Connection">
                <span class="title">Connection</span>

                <form action="#">
                    <div class="input-field">
                        <input type="text" placeholder="Entrer votre adresse mail" required>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Entrer votre mot de passe" required>
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="logCheck">
                            <label for="logCheck" class="text">Se souvenir de moi</label>
                        </div>
                        
                        <a href="#" class="text">Mot de passe oublié?</a>
                    </div>

                    <div class="input-field button">
                        <input type="button" value="Connection">
                    </div>
                </form>

                <div class="Connection-signup">
                    <span class="text">Pas un membre?
                        <a href="#" class="text signup-link">S'inscrire</a>
                    </span>
                </div>
            </div>

            <!-- Inscription Form -->
            <div class="form signup">
                <span class="title">Inscription</span>

                <form action="#">
                 <div class="align">
                    <div class="input-field">
                        <input type="text" placeholder="Entrer votre nom" required>
                        <i class="uil uil-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Entrer votre prenom" required>
                        <i class="uil uil-user"></i>
                    </div>
                 </div>
                 <div class="align">
                    <div class="input-field">
                        <span>Date de naissance</span>
                        <input type="date" placeholder="Entrer votre age" required style="cursor:text">
                        
                    </div>
                    <div class="input-field">  
                    </div>
                </div>
                <div class="align"  style="padding-top:25px">
                <p>Sexe</p>
                <div class="">
                    <input type="radio" id="homme" name="sexe" value="homme">
                    <label for="homme">Homme</label><br>
                </div>
                <div class="">
                   <input type="radio" id="femme" name="sexe" value="felle">
                    <label for="femme">Femme</label><br>
                </div>

                </div>
              

                    <div class="input-field">
                        <input type="text" placeholder="Enter votre email" required>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Créer un mot de passe" required>
                        <i class="uil uil-lock icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Confirmer un mot de passe" required>
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>


                    <div class="input-field button">
                        <input type="button" value="Signup">
                    </div>
                </form>

                <div class="Connection-signup">
                    <span class="text">Déja un membre?
                        <a href="#" class="text Connection-link">Se connecter maintenant</a>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      Connection = document.querySelector(".Connection-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and Connection form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    Connection.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });

    </script>

</body>
</html>
