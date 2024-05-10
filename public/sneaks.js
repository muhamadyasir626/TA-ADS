document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.querySelector("form");
  const inputEl = document.getElementById("cari");
  const searchResult = document.querySelector(".box-container");
  const showMoreBtn = document.getElementById("show-more");

  let inputData = "";
  let limit = 9;
  let offset = 0;

  async function searchSneaker(clear = true) {
    inputData = inputEl.value || 'Nike';
    try {
      const response = await fetch(`/api/search?q=${inputData}&limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const products = await response.json();
      displaySneakers(products, clear);
    } catch (error) {
      console.error(error);
      alert("Product not found or error occurred.");
    }
  }

  function displaySneakers(products, clear = true) {
    if (clear) {
      searchResult.innerHTML = ""; // Clear previous results
    }

    products.forEach((result) => {
      const frameImg = document.createElement("div");
      frameImg.classList.add("frameimg");

      // Create heart icon container
      const heartIconContainer = document.createElement("div");
      heartIconContainer.classList.add("circle");

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fa", "fa-heart");

      heartIconContainer.appendChild(heartIcon);

      // Create and set sneaker image
      const image = document.createElement("img");
      image.src = result.thumbnail;
      image.alt = result.shoeName;

      // Create link to resell site
      const imageLink = document.createElement("a");
      imageLink.href = result.resellLinks;
      imageLink.target = "_blank"; // Open in a new tab
      imageLink.textContent = result.shoeName;

      // Append elements in the desired structure
      frameImg.appendChild(heartIconContainer);
      frameImg.appendChild(image);
      frameImg.appendChild(document.createElement("hr"));
      frameImg.appendChild(imageLink);

      searchResult.appendChild(frameImg);
    });
  }

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    offset = 0; // Reset offset when starting a new search
    searchSneaker(true); // Clear previous results
  });

  showMoreBtn.addEventListener("click", () => {
    offset += limit; // Increment offset by limit
    searchSneaker(false); // Don't clear previous results
  });
});
