import { cartState, renderCart } from "./cart.js";
import { clickOutsideHandler } from "./sort.js";

export function stepper(event) {
  const pluses = event.target;
  let dPlus = pluses.getAttribute("data-plus");
  const cartInput = document.getElementById(dPlus);
  let title = dPlus.replace("cart-", "");
  let item = cartState.find((item) => item.title === title);

  item.quantity += 1;
  cartInput.setAttribute("value", item.quantity);
  saveToLocalStorage();

  updatetotal();
}

export function steppermin(event) {
  const minuses = event.target;
  let dMin = minuses.getAttribute("data-min");
  var cartInput = document.getElementById(dMin);
  let title = dMin.replace("cart-", "");
  let item = cartState.find((item) => item.title === title);

  item.quantity = Math.max(item.quantity - 1, 0);
  cartInput.setAttribute("value", item.quantity);
  saveToLocalStorage();
  updatetotal();

  if (item.quantity === 0) {
    removeCartItem(title);
  }
}

export function removeCartItem(title) {
  const indexToRemove = cartState.findIndex((item) => item.title === title);
  if (indexToRemove !== -1) {
    cartState.splice(indexToRemove, 1);

    saveToLocalStorage();
    document.removeEventListener("click", clickOutsideHandler);

    renderCart(cartState);

    setTimeout(() => {
      document.addEventListener("click", clickOutsideHandler);
    });
  }

  updatetotal();
}

export default function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

export function updatetotal() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("fox-item-aditional");

  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.getElementsByClassName("item-price")[0];
    const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    const price = parseFloat(priceElement.innerHTML.replace("$", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

export function saveToLocalStorage() {
  localStorage.setItem("cartState", JSON.stringify(cartState));
}

export function getFromLocalStorage() {
  try {
    const savedCartState = localStorage.getItem("cartState");
    return savedCartState ? JSON.parse(savedCartState) : [];
  } catch (error) {
    console.error("Error occured while parsing LS", error);
    return [];
  }
}
