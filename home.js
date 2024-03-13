const cont = document.querySelector("container");
const burgerBtn = document.getElementById("burger");
const cross = document.getElementById("cross");

document.addEventListener("DOMContentLoaded", function () {
  burgerBtn.addEventListener("click", function () {
    document.querySelector("header").classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  cross.addEventListener("click", function () {
    document.querySelector("header").classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mainPageButton = document.getElementById("mainPageButton");

  if (mainPageButton) {
    mainPageButton.addEventListener("click", function () {
      window.location.href = "home.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mainPageButton = document.getElementById("shopButton");

  if (mainPageButton) {
    mainPageButton.addEventListener("click", function () {
      window.location.href = "all-items.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mainPageButton = document.getElementById("historyButton");

  if (mainPageButton) {
    mainPageButton.addEventListener("click", function () {
      window.location.href = "our-history.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mainPageButton = document.getElementById("allItemsButton");

  if (mainPageButton) {
    mainPageButton.addEventListener("click", function () {
      window.location.href = "all-items.html";
    });
  }
});
