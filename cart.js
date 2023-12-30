// cart.js

document.addEventListener("DOMContentLoaded", function () {
  // Check if the cart exists in localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to display the cart content
  function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceContainer = document.getElementById("total-price");

    // Clear existing content
    cartContainer.innerHTML = "";

    // Display each item in the cart
    cart.forEach((item) => {
      const productHTML = `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <p>${item.name}</p>
          <p>${item.price}</p>
        </div>
      `;
      cartContainer.innerHTML += productHTML;
    });

    // Calculate and display the total price
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace("$", "")), 0);
    totalPriceContainer.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Display the initial cart content
  displayCart();
});

