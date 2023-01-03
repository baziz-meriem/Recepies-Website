

        const container = document.querySelector(".container"),
     
      signUp = document.querySelector(".signup-link"),
      Connection = document.querySelector(".Connection-link");


    // js code to appear signup and Connection form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    Connection.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });
    //-----------password validation with js -------------------------------------------

    var password = document.getElementById("password");
    confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Les mots de passe ne sont pas identiques");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;