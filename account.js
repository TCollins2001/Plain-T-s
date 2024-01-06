document.addEventListener("DOMContentLoaded", function () {
  const storedCartCount = localStorage.getItem("cartCount");
  const cartCount = storedCartCount ? parseInt(storedCartCount) : 0;
  updateCartCount(cartCount);

  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  displayAccountInfo(userInfo);
});

function displayAccountInfo(userInfo) {
  const accountInfoContainer = document.getElementById("account-info");

  if (userInfo) {
    accountInfoContainer.innerHTML = `
      <h2>Welcome, ${userInfo.username}!</h2>
      <p>Email: ${userInfo.email}</p>
    `;
  } else {
    accountInfoContainer.innerHTML = "<p>Please log in to view your account information.</p>";
  }
}
