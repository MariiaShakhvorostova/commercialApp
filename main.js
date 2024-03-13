import { addToObject, renderCart, cartState } from "./cart.js";

const itemsCont = document.getElementById("items");
export let itemsArr = await getItems();

async function getItems() {
  const res = await fetch("./items.json");

  const items = await res.json();

  renderItems(itemsCont, items);

  return items;
}

export function renderItems($itemsCont, items) {
  let htmlcard = "";

  items.forEach((item) => {
    htmlcard += `
        <li class="main-item fox-item ${item.id}">
        <img class="main-img" src=${item.img} />
        <div class="info">
        <p class="item-name">${item.name}</p>
        <span class="item-price">$${item.price}</span>
        <ul class="rating">
          <li class="stars"></li>
          <li class="stars"></li>
          <li class="stars"></li>
          <li class="stars"></li>
          <li class="stars"></li>
        </ul>
        <div class="category">${item.category}</div>
        </div>
        <button class="add-red"></button>
        <button class="add-white"></button>
      </li>
        `;
  });

  const cartContent = document.createElement("div");
  cartContent.innerHTML = `
    <ul class="items-container">
        ${htmlcard}
        </ul>
        `;
  $itemsCont.innerHTML = "";
  $itemsCont.appendChild(cartContent);

  const addRedButtons = cartContent.querySelectorAll(".add-red");

  addRedButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const currentItem = items[index];
      addToObject(currentItem.name, currentItem.price, currentItem.img);
      renderCart(cartState);
      console.log(cartState);
    });
  });
}
