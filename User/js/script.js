
let products = {
  data: [
    {//------------------------------------------
      productName: "Tomate",
      category: "Fruits",
      Calories: "30",
      image: "./assets/img/food-1.jpg",
    },
    
    {//----------------------------------------
      productName: "Pomme de terre",
      category: "Legumes",
      Calories: "49",
      image: "./assets/img/food-2.jpg",
    },
    {//--------------------------------------
      productName: "Oignon",
      category: "Viande",
      Calories: "99",
      image: "./assets/img/food-1.jpg",
    },
    {//---------------------------------------
      productName: "ail",
      category: "Fruits",
      Calories: "29",
      image: "./assets/img/food-3.jpg",
    },
    {
      productName: "Concombre",
      category: "Viande",
      Calories: "129",
      image: "./assets/img/food-3.jpg",
    },
    {
      productName: "banane",
      category: "Legumes",
      Calories: "89",
      image: "./assets/img/food-4.jpg",
    },
    {
      productName: "ananas",
      category: "légumineuses",
      Calories: "189",
      image: "./assets/img/food-5.jpg",
    },
    {
      productName: "orange",
      category: "Legumes",
      Calories: "490",
      image: "./assets/img/img-11.jpg",
    },
  ],
};

for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //Calories
  let Calories = document.createElement("h6");
  Calories.innerText =  i.Calories+"Cal";
  container.appendChild(Calories);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "tous") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("tous");
};
