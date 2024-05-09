document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.querySelector("form");
  const inputEl = document.getElementById("cari");
  const searchResult = document.querySelector(".content");
  const showmore = document.getElementById("showmore");

  let inputData = "";
  let max = 9;

  async function searchSneaker() {
    inputData = inputEl.value;
    try {
      const response = await fetch(`/api/search?q=${inputData}&limit=${max}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const products = await response.json();
      displaySneakers(products);
    } catch (error) {
      console.error(error);
      alert("Product not found or error occurred.");
    }
  }

  function displaySneakers(products) {
    searchResult.innerHTML = ""; // Clear previous results

    products.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("frameimg");
      const image = document.createElement("img");
      image.src = result.thumbnail;
      image.alt = result.description;
      const imageLink = document.createElement("a");
      imageLink.href = result.resellLinks;
      imageLink.target = "_blank"; // Open in a new tab

      imageLink.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResult.appendChild(imageWrapper);
    });
  }

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    searchSneaker();
  });
});
