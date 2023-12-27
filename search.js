document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");
  const originalResults = Array.from(resultsContainer.children);

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    fetchResults(searchTerm);
  });

  function fetchResults(searchTerm) {
    const mockFetchResults = () => {
      const resultsFromShop1 = [
        { name: "Plain Black Shirt", link: "plain-black.html" },
        { name: "Plain Red Shirt", link: "plain-red.html" },
        { name: "Plain Orange Shirt", link: "plain-orange.html" },
        { name: "Plain Purple Shirt", link: "plain-purple.html" },
      ];

      const resultsFromShop2 = [
        { name: "Plain Blue Shirt", link: "plain-blue.html" },
        { name: "Plain Green Shirt", link: "plain-green.html" },
        { name: "Plain Grey Shirt", link: "plain-grey.html" },
        { name: "Plain Brown Shirt", link: "plain-brown.html" },
      ];

      const allResults = resultsFromShop1.concat(resultsFromShop2);

      if (searchTerm === "") {
        restoreOriginalResults();
      } else {
        const filteredResults = allResults.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
        );
        updateResults(filteredResults);
      }
    };

    mockFetchResults();
  }

  function restoreOriginalResults() {
    resultsContainer.innerHTML = "";
    originalResults.forEach((item) => {
      resultsContainer.appendChild(item.cloneNode(true));
    });
  }

  function updateResults(results) {
    resultsContainer.innerHTML = "";

    results.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = 'name';

      listItem.innerHTML = `
        <div class="name">
          <a href="${item.link}">
            <img src="images/${item.name.replace(/\s+/g, '-')}.png" alt="${item.name}" />
            <p>${item.name}</p>
          </a>
        </div>
      `;
      resultsContainer.appendChild(listItem);
    });
  }
});

