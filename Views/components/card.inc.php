<style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap');

:root{
    --yellow:#f9d806;
    --light-yellow:#ffee80;
    --black:#130f40;
    --light-color:#666;
    --box-shadow:0 .5rem 1rem rgba(0,0,0,.1);
    --border:.1rem solid rgba(0,0,0,.1);
}

*{
    font-family: 'Poppins', sans-serif;
    margin:0; padding:0;
    box-sizing: border-box;
    outline: none; border:none;
    text-decoration: none;
    text-transform: capitalize;
    transition: .2s linear;
}

html{
    font-size: 62.5%;
    overflow-x: hidden;
    scroll-padding-top: 7rem;
    scroll-behavior: smooth;
}

section{
    padding:2rem 9%;
}

.heading{
    padding-bottom: 2rem;
    text-align: center;
    font-size: 4.5rem;
    color:var(--black);
}

.heading span{
    position: relative;
    z-index: 0;
}

.heading span::before{
    content: '';
    position: absolute;
    bottom:1rem; left:0;
    height: 100%;
    width: 100%;
    background: var(--light-yellow);
    z-index: -1;
    clip-path: polygon(0 90%, 100% 80%, 100% 100%, 0% 100%);
}

.btn{
    display: inline-block;
    margin-top: 1rem;
    padding:.8rem 3rem;
    background:var(--light-yellow);
    color:var(--black);
    cursor: pointer;
    font-size: 1.7rem;
    border-radius: .5rem;
    font-weight: 500;
    text-align: center;
}

.btn:hover{
    background:var(--yellow);
}


.vehicles .vehicles-slider{
    padding-bottom: 5rem;
}

.vehicles .vehicles-slider .box{
    text-align: center;
}

.vehicles .vehicles-slider .box img{
    width:100%;
    transform: scale(.8);
    opacity: .5;
}

.vehicles .vehicles-slider .box .content{
    padding-top: 1rem;
    transform: scale(0);
}

.vehicles .vehicles-slider .swiper-slide-active .content{
    transform: scale(1);
}

.vehicles .vehicles-slider .swiper-slide-active img{
    transform: scale(1);    
    opacity: 1;
}

.vehicles .vehicles-slider .box .content h3{
    font-size: 2.5rem;
    color:var(--black);
}

.vehicles .vehicles-slider .box .content .price{
    font-size: 2.2rem;
    color:var(--yellow);
    padding:1rem 0;
    font-weight: bolder;
}

.vehicles .vehicles-slider .box .content .price span{
    color:var(--light-color);
    font-size: 1.5rem;
    font-weight: normal;
}

.vehicles .vehicles-slider .box .content p{
    font-size: 1.6rem;
    color:var(--light-color);
    padding: 1rem 0;
    padding-top: 1.5rem;
    border-top: var(--border);
}

.vehicles .vehicles-slider .box .content span{
    font-size: 1rem;
    color:var(--yellow);
    padding:0 .5rem;
}

.swiper-pagination-bullet-active{
    background: var(--yellow);
}





@media (max-width:991px){

    html{
        font-size: 55%;
    }


    section{
        padding:2rem;
    }

}

@media (max-width:768px){

    #menu-btn{
        display: block;
    }

    #menu-btn.fa-times{
        transform:rotate(180deg);
    }

    #login-btn .btn{
        display: none;
    }

    #login-btn i{
        display: block;
    }


}

@media (max-width:450px){

    html{
        font-size: 50%;
    }

    .heading{
        font-size: 3rem;
    }

}
    </style>
<header class="header">

    <div id="menu-btn" ></div>
    <div id="login-btn">
    </div>

</header> 
    
<div class="">

    <span id="close-login-form" class=""></span>

</div>

<section class="home" id="home">

</section>


<section class="vehicles" id="vehicles">

    <h1 class="heading"> Plats </h1>
   <center><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam repudiandae nesciunt beatae omnis, nulla velit est deserunt sapiente exercitationem!</p></center> 
        

    <div class="swiper vehicles-slider">

        <div class="swiper-wrapper">

            <div class="swiper-slide box">
                <img src="image/food-1.jpg" alt="">
                <div class="content">
                    <h3>description</h3>
                    <div class="price"> 
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maxime voluptatum odit voluptatibus atque ipsum iusto beatae quam laborum rem.</p>
                    </div>
                    <a href="#" class="btn">voir plus</a>
                </div>
            </div>

            <div class="swiper-slide box">
                <img src="image/food-2.jpg" alt="">
                <div class="content">
                    <h3>description</h3>
                    <div class="price"> 
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maxime voluptatum odit voluptatibus atque ipsum iusto beatae quam laborum rem.</p>
                    </div>
                    <a href="#" class="btn">voir plus</a>
                </div>
            </div>

            <div class="swiper-slide box">
                <img src="image/food-3.jpg" alt="">
                <div class="content">
                    <h3>description</h3>
                    <div class="price"> 
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maxime voluptatum odit voluptatibus atque ipsum iusto beatae quam laborum rem.</p>
                    </div>
                    <a href="#" class="btn">voir plus</a>
                </div>
            </div>

            <div class="swiper-slide box">
                <img src="image/food-4.jpg" alt="">
                <div class="content">
                    <h3>description</h3>
                    <div class="price"> 
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maxime voluptatum odit voluptatibus atque ipsum iusto beatae quam laborum rem.</p>
                    </div>
                    <a href="#" class="btn">voir plus</a>
                </div>
            </div>

            <div class="swiper-slide box">
                <img src="image/food-5.jpg" alt="">
                <div class="content">
                    <h3>description</h3>
                    <div class="price"> 
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maxime voluptatum odit voluptatibus atque ipsum iusto beatae quam laborum rem.</p>
                    </div>
                    <a href="#" class="btn">voir plus</a>
                </div>
            </div>

            <div class="swiper-slide box">
                <img src="image/food-6.jpg" alt="">
                <div class="content">
                    <h3>Description</h3>
                    <div class="price"> 
                        <p> Lorem ipsum dolor sit amet c voluptatibus atque ipsum iusto beatae quam laborum rem.</p>
                    </div>
                    <a href="#" class="btn">voir plus</a>
                </div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</section>
<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

<script src="js/script.js"></script>
<script>
    let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () =>{
  document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick = () =>{
  document.querySelector('.login-form-container').classList.remove('active');
}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 0){
    document.querySelector('.header').classList.add('active');
  }else{
    document.querySelector('.header').classList.remove('active');
  };

};

document.querySelector('.home').onmousemove = (e) =>{

  document.querySelectorAll('.home-parallax').forEach(elm =>{

    let speed = elm.getAttribute('data-speed');

    let x = (window.innerWidth - e.pageX * speed) / 90;
    let y = (window.innerHeight - e.pageY * speed) / 90;

    elm.style.transform = `translateX(${y}px) translateY(${x}px)`;

  });

};


document.querySelector('.home').onmouseleave = (e) =>{

  document.querySelectorAll('.home-parallax').forEach(elm =>{

    elm.style.transform = `translateX(0px) translateY(0px)`;

  });

};

var swiper = new Swiper(".vehicles-slider", {
  grabCursor: true,
  centeredSlides: true,  
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  grabCursor: true,
  centeredSlides: true,  
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  grabCursor: true,
  centeredSlides: true,  
  spaceBetween: 20,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
</script>