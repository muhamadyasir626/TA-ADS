document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.querySelector("form");
  const inputEl = document.getElementById("cari");
  const searchResult = document.querySelector(".box-container");
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
    searchSneaker();
  });
});
