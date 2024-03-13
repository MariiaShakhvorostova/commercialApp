import quantityChanged, {
  stepper,
  steppermin,
  updatetotal,
  removeCartItem,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./quantity.js";

export function addToObject(title, price, prodImg) {
  const newItem = {
    title: title,
    price: price,
    prodImg: prodImg,
    id: title,
    quantity: 1,
  };

  const existingItem = cartState.find((item) => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartState.push(newItem);
  }

  saveToLocalStorage();
}

export const cartItems = document.getElementsByClassName("cart-content")[0];

export function renderCart(cartState) {
  cartItems.innerHTML = "";

  cartState.forEach((item) => {
    const { title, prodImg, price, quantity } = item;
    let cartBoxContent = `                
      <div class="flex-cart" >
        <div class="item-inf">
          <img class="main-img" src="${prodImg}" />
          <p class="item-name">${title}</p>
          <p class="item-price">${price}</p>
        </div>
        <div class="count-quantity">
          <button data-min="cart-${title}" id="decrement" class="decrements">-</button>
          <input
            type="number"
            id="cart-${title}"
            min="0"
            max="100"
            step="1"
            value="${quantity}"
            class="cart-quantity"
            readonly
          />
          <button data-plus="cart-${title}" id="increment" class="increments">+</button>
          <div class="rmv">
            <span>Remove</span>
            <i class="cart-remove" data-id="${title}"></i>
          </div>
        </div>
      </div> `;

    let cartShopBox = document.createElement("div");
    cartShopBox.innerHTML = cartBoxContent;
    cartShopBox.classList.add("fox-item-aditional");
    cartItems.append(cartShopBox);
    updatetotal();
  });

  const removeCartButtons = document.getElementsByClassName("cart-remove");
  const buttonsArray = Array.from(removeCartButtons);
  buttonsArray.forEach((button) => {
    button.addEventListener("click", () => {
      const titleToRemove = button.getAttribute("data-id");
      removeCartItem(titleToRemove);
    });
  });

  const incrementButtons = document.getElementsByClassName("increments");
  const decrementButtons = document.getElementsByClassName("decrements");

  Array.from(incrementButtons).forEach((button) => {
    button.addEventListener("click", stepper);
  });

  Array.from(decrementButtons).forEach((button) => {
    button.addEventListener("click", steppermin);
  });
}

export let cartState = [];
cartState = getFromLocalStorage();
renderCart(cartState);
