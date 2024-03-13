import { renderItems, itemsArr } from "./main.js";

// slider

const itemsCont = document.getElementById("items");
var slider = document.getElementById("myRange");
var output = document.getElementById("value");

slider.addEventListener("mousemove", () => {
  let filteredBySlider = itemsArr.filter(
    (item) => item.price <= Number(slider.value)
  );
  renderItems(itemsCont, filteredBySlider), console.log(itemsArr);
});

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

slider.addEventListener("mousemove", function () {
  var x = slider.value;
  var color =
    "linear-gradient(90deg, rgba(204, 85, 32, 1)" +
    x +
    "%, rgb(214,214,214)" +
    x +
    "%";
  slider.style.background = color;
});

// input

const search = document.querySelector(".input");
const itemName = document.getElementsByClassName("item-name");

search.addEventListener("input", () => {
  Array.from(itemName).forEach((elem) => {
    console.log(elem);
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});

// topic

const cardItems = document.getElementsByClassName("fox-item");
const itemsBtns = document.querySelectorAll(".item-btn");

itemsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetActiveBtn();
    showItems(btn.id);
    btn.classList.add("active-btn");
  });
});

function resetActiveBtn() {
  itemsBtns.forEach((btn) => {
    btn.classList.remove("active-btn");
  });
}

function showItems(activeBtn) {
  Array.from(cardItems).forEach((item) => {
    if (item.classList.contains(activeBtn)) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
}

// open/remove cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".shopping-cart");
let closeCart = document.querySelector(".close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

export function clickOutsideHandler(e) {
  if (!cart.contains(e.target) && !cartIcon.contains(e.target)) {
    if (cart.classList.contains("active")) {
      cart.classList.remove("active");
    }
  }
}

document.addEventListener("click", clickOutsideHandler);
