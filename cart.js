function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartContainer = document.getElementById("cart-container");

  const emptyCartMessage = document.getElementById("empty-cart-message");
  
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block"; 
  } else {
    emptyCartMessage.style.display = "none";

  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    
    const imgElement = document.createElement("img");
    imgElement.src = item.image;
    imgElement.alt = item.name;
    cartItemDiv.appendChild(imgElement);

    
    const nameElement = document.createElement("p");
    nameElement.textContent = item.name;
    cartItemDiv.appendChild(nameElement);

    
    const priceElement = document.createElement("p");
    priceElement.textContent = item.price;
    cartItemDiv.appendChild(priceElement);

    const quantityElement = document.createElement("p");
    quantityElement.textContent = `Qty: ${item.quantity}`;
    cartItemDiv.appendChild(quantityElement);

    if (item.size) {
      const sizeElement = document.createElement("p");
      sizeElement.textContent = `Size: ${item.size}`;
      cartItemDiv.appendChild(sizeElement);
    }
    
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteItem(index));
    cartItemDiv.appendChild(deleteButton);

    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    cartContainer.appendChild(cartItemDiv);
  });
  
  const totalBeforeTax = subtotal;

    
  const shippingAndHandling = 0.00;

    
  const taxRate = 0.08; 
  const estimatedTax = totalBeforeTax * taxRate;

  
  const orderTotal = totalBeforeTax + shippingAndHandling + estimatedTax;

    
    displayTotals(subtotal, shippingAndHandling, totalBeforeTax, estimatedTax, orderTotal);
  }

function displayTotals(subtotal, shippingAndHandling, totalBeforeTax, estimatedTax, orderTotal) {
  const totalsContainer = document.getElementById("totals-container");

  if (subtotal > 0) {
    totalsContainer.innerHTML = `
      <div class="totals">
        <h2>ORDER SUMMARY</h2>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Shipping and Handling: $${shippingAndHandling.toFixed(2)}</p>
        <p>Total Before Tax: $${totalBeforeTax.toFixed(2)}</p>
        <p>Estimated Tax: $${estimatedTax.toFixed(2)}</p>
        <p><strong>Order Total: $${orderTotal.toFixed(2)}</strong></p>
        <img src="images/logo.png" alt="t-shirt business logo"/>
        <button id="placeOrder" type="button">PLACE ORDER HERE</button>
      </div>
    `;
    totalsContainer.style.display = "block";
    const placeOrderButton = document.getElementById("placeOrder");
    placeOrderButton.addEventListener("click", placeOrder);
  } else {

    totalsContainer.innerHTML = "";
    totalsContainer.style.display = "none";
  }
}

function selectSize(button) {
  const sizeButtons = document.querySelectorAll('.sizes button');
  sizeButtons.forEach(btn => btn.classList.remove('selected'));

  button.classList.add('selected');
  const selectedButton = document.querySelector('.sizes button.selected');
  
  if (selectedButton) {
    setSize(selectedButton.innerText);
  }
}

function deleteItem(index) {
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  
  cart.splice(index, 1);

  
  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

let selectedSize = ''; 

function setSize(size) {
  selectedSize = size;
}

function addToCart() {
  const productName = document.querySelector(".product-name").innerText;
  const productImage = document.querySelector(".product img").src;
  const productPrice = parseFloat(document.querySelector(".price").innerText.replace("$", ""));
  const productQty = parseInt(document.getElementById('quantity').value);

  if (selectedSize === '') {
    alert('Please select a size before adding to cart');
    return;
  }
  
  const product = {
    name: productName,
    image: productImage,
    price: productPrice,
    quantity: parseInt(productQty),
    size: selectedSize,
  };

  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  
  cart.push(product);

  saveCart();

  localStorage.setItem("cart", JSON.stringify(cart));

  
  alert("Product added to cart!");


  document.getElementById('quantity').value = 1;


  selectedSize = '';

  
  window.location.href = "cart.html";
}

displayCart();

function placeOrder() {
  const confirmOrder = confirm("Are you sure you want to place the order?");
  if (confirmOrder) {
    const body = document.body; 

    localStorage.removeItem("cart");

    body.innerHTML = `
      <div class="thank-you">
        <h1>THANK YOU FOR YOUR ORDER!</h1>
        <a href="shop.html">&#x2190; RETURN TO SHOP</a>
      </div>
    `;

    const cartContainer = document.getElementById("cart-container");
      const emptyCartMessage = document.getElementById("empty-cart-message");

      cartContainer.innerHTML = "";
      emptyCartMessage.style.display = "block";
}
}