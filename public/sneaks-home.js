document.addEventListener("DOMContentLoaded", () => {
  // const formEl = document.querySelector("form");
  // const inputEl = document.getElementById("cari");
  // const searchResult = document.querySelector(".box-container");
  // const showMoreBtn = document.getElementById("show-more");
  // const filterForm = document.getElementById("sneaker-filter-form");
  const sneakerContainer = document.querySelector(".box-container");
  const hearts = document.querySelectorAll(".fa-heart");

  let limit = 9;
  let offset = 0;
  // let inputData = "";
  // let isSearchActive = false;
  // let isPopularActive = false;
  // let isFilterActive = false;
  // let currentQuery = "";

  //   async function searchSneaker(clear = true) {
  //     inputData = inputEl.value;
  //     try {
  //       isSearchActive = true;
  //       isPopularActive = false;
  //       isFilterActive = false;
  //       const response = await fetch(
  //         `/api/search?q=${encodeURIComponent(
  //           inputData
  //         )}&limit=${limit}&offset=${offset}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //       }
  //       const products = await response.json();
  //       displaySneakers(products, clear);
  //     } catch (error) {
  //       console.error(error);
  //       alert("Product not found or error occurred.");
  //     }
  //   }

  //   function displaySneakers(products, clear = true) {
  //     if (clear) {
  //       searchResult.innerHTML = ""; // Clear previous results
  //     }

  //     products.forEach((product) => {
  //       const frameImg = createSneakerElement(product);
  //       searchResult.appendChild(frameImg);
  //     });
  //   }

  //   function createSneakerElement(result) {
  //     const frameImg = document.createElement("div");
  //     frameImg.classList.add("frameimg");

  //     const heartIconContainer = document.createElement("div");
  //     heartIconContainer.classList.add("circle");

  //     const heartIcon = document.createElement("i");
  //     heartIcon.classList.add("fa", "fa-heart");
  //     heartIconContainer.appendChild(heartIcon);

  //     // Asynchronous call to check wishlist
  //     async function checkWishlist() {
  //         try {
  //             const response = await fetch(`/api/check-wishlist?styleID=${result.styleID}`);
  //             const data = await response.json();
  //             if (data.isInWishlist) {
  //                 heartIcon.classList.add("active"); // Add 'active' class if sneaker is in wishlist
  //             }
  //         } catch (error) {
  //             console.error("Error checking wishlist:", error);
  //         }
  //     }
  //     checkWishlist();

  //     heartIcon.addEventListener("click", async (event) => {
  //       event.stopPropagation(); // Prevent triggering click events on parent elements
  //       const userLoggedIn = sessionStorage.getItem("userLoggedIn"); // Misalkan 'userLoggedIn' adalah status login yang tersimpan

  //       if (!userLoggedIn) {
  //         alert("Please login first");
  //         window.location.href = '/login'; // Redirect ke halaman login
  //         return; // Stop further execution
  //       }
  //         const isActive = heartIcon.classList.toggle("active");
  //         const url = isActive ? "/add-to-wishlist" : "/remove-from-wishlist";
  //         const method = "POST";

  //         try {
  //             const response = await fetch(url, {
  //                 method: method,
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({
  //                     shoeName: result.shoeName,
  //                     brand: result.brand,
  //                     releaseDate: result.releaseDate,
  //                     description: result.description,
  //                     colorway: result.colorway,
  //                     make: result.make,
  //                     retailPrice: result.retailPrice,
  //                     styleID: result.styleID,
  //                     thumbnail: result.thumbnail,
  //                     description: result.description,
  //                     resellLinks: result.resellLinks,
  //                     lowestResellPrice: result.lowestResellPrice,
  //                 }),
  //             });
  //             const data = await response.json();
  //             if (!response.ok) throw new Error(data.message);
  //             alert(`Sneaker ${isActive ? 'added to' : 'removed from'} wishlist!`);
  //         } catch (error) {
  //             console.error(`Error ${isActive ? 'adding to' : 'removing from'} wishlist:`, error);
  //             alert(`An error occurred: ${error.message}`);
  //         }
  //     });

  //     const image = document.createElement("img");
  //     image.src = result.thumbnail;
  //     image.alt = result.styleID;
  //     image.addEventListener("click", (event) => {
  //         event.preventDefault(); // Prevent default link behavior
  //         showPopUp_search(result);
  //     });

  //     const imageLink = document.createElement("a");
  //     imageLink.textContent = result.shoeName;
  //     imageLink.addEventListener("click", (event) => {
  //         event.preventDefault(); // Prevent default link behavior
  //         showPopUp_search(result);
  //     });

  //     frameImg.appendChild(heartIconContainer);
  //     frameImg.appendChild(image);
  //     frameImg.appendChild(imageLink);

  //     return frameImg;
  // }

  //   function showPopUp_search(sneaker) {
  //     if (!sneaker.lowestResellPrice || !sneaker.resellLinks) {
  //       console.log(sneaker);
  //       console.error("Error: Missing resell prices or links");
  //       return; // Stop execution if data is incomplete
  //     }

  //     const popUp = document.createElement("div");
  //     popUp.className = "pop-up";
  //     popUp.innerHTML = `
  //     <div class="pop-up">
  //       <div class="pop-up-content">
  //           <span class="close-button">&times;</span>
  //           <div class="previewimg">
  //             <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}">
  //           </div>
  //           <div class="description">
  //             <div class="framedes">
  //               <h3>${sneaker.shoeName}</h3>
  //               <hr>
  //               <p>Retail Price $${sneaker.retailPrice}</p>
  //               <a class="description-text">${sneaker.description}</a>
  //               <div class="info">
  //                 <div class="brand">
  //                   <a>Brand: <b class="nama">${sneaker.brand}</b></a>
  //                 </div>
  //                 <a>Release Date: <b class="nama">${sneaker.releaseDate}</b></a>
  //                 <a>Color: <b class="nama">${sneaker.colorway}</b></a>
  //               </div>
  //               <div class="toko">
  //                 <button class="btn">
  //                   <a href="${sneaker.resellLinks?.stockX
  //       }" target="_blank" class="btn__visible">
  //                     <img src="/img/home-login/logo/stockx.png" alt="StockX Logo" class="log">
  //                   </a>
  //                   <a href="${sneaker.resellLinks?.stockX
  //       }" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.stockX || " -"
  //       }</a>
  //                 </button>
  //                 <button class="btn">
  //                   <a href="${sneaker.resellLinks?.flightClub
  //       }" target="_blank" class="btn__visible">
  //                     <img src="/img/home-login/logo/flight.png" alt="Flight Club Logo" class="log">
  //                   </a>
  //                   <a href="${sneaker.resellLinks?.flightClub
  //       }" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.flightClub || " -"
  //       }</a>
  //                 </button>
  //                 <button class="btn">
  //                   <a href="${sneaker.resellLinks?.goat
  //       }" target="_blank" class="btn__visible">
  //                     <img src="/img/home-login/logo/GOAT-Logo.png" alt="GOAT Logo" class="log">
  //                   </a>
  //                   <a href="${sneaker.resellLinks?.goat
  //       }" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.goat || " -"
  //       }</a>
  //                 </button>
  //                 <button class="hearts">
  //                   <a href="#" class="like">
  //                     <i class="fas fa-heart"></i> <!-- Ikon hati Font Awesome -->
  //                   </a>
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //     </div>

  //   `;

  //     document.body.appendChild(popUp); // Append pop-up to the body

  //     // Add event listeners
  //     const closeBtn = popUp.querySelector(".close-button");
  //     closeBtn.addEventListener("click", () => {
  //       document.body.removeChild(popUp);
  //       updateHeartIconsOnPage()
  //     });

  //     const heartIcon = popUp.querySelector(".fa-heart");
  //     heartIcon.addEventListener("click", async (event) => {
  //       event.stopPropagation(); // Prevent triggering click events on parent elements
  //       const userLoggedIn = sessionStorage.getItem("userLoggedIn"); // Misalkan 'userLoggedIn' adalah status login yang tersimpan

  //       if (!userLoggedIn) {
  //         alert("Please login first");
  //         window.location.href = '/login'; // Redirect ke halaman login
  //         return; // Stop further execution
  //       }
  //       heartIcon.classList.toggle("active"); // Toggle active class to change icon color

  //       const isActive = heartIcon.classList.contains("active");
  //       const url = isActive ? "/add-to-wishlist" : "/remove-from-wishlist";
  //       const method = "POST"; // Use POST for both adding and removing

  //       try {
  //         const response = await fetch(url, {
  //           method: method,
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             shoeName: sneaker.shoeName,
  //             brand: sneaker.brand,
  //             releaseDate: sneaker.releaseDate,
  //             description: sneaker.description,
  //             colorway: sneaker.colorway,
  //             make: sneaker.make,
  //             retailPrice: sneaker.retailPrice,
  //             styleID: sneaker.styleID,
  //             thumbnail: sneaker.thumbnail,
  //             resellLinks: sneaker.resellLinks,
  //             lowestResellPrice: sneaker.lowestResellPrice,
  //           }),
  //         });
  //         const data = await response.json();
  //         if (!response.ok) throw new Error(data.message);
  //         alert(`Sneaker ${isActive ? 'added to' : 'removed from'} wishlist!`);
  //       } catch (error) {
  //         console.error(`Error ${isActive ? 'adding to' : 'removing from'} wishlist:`, error);
  //         alert(`An error occurred: ${error.message}`);
  //       }
  //     });
  //     checkWishlist(); 

  //     async function checkWishlist() {
  //       try {
  //           const response = await fetch(`/api/check-wishlist?styleID=${sneaker.styleID}`);
  //           if (!response.ok) {
  //               throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           const data = await response.json();
  //           if (data.isInWishlist) {
  //               heartIcon.classList.add("active"); // Add 'active' class if sneaker is in wishlist
  //           }
  //       } catch (error) {
  //           console.error("Error checking wishlist:", error);
  //       }
  //   }

  //   }

  //   formEl.addEventListener("submit", (event) => {
  //     event.preventDefault();
  //     offset = 0; // Reset offset to zero to Retail Price the beginning
  //     searchSneaker(true);

  //   });

  function createSneakerCard(sneaker) {
    const frameImg = document.createElement("div");
    frameImg.className = "frameimg";

    const circle = document.createElement("div");
    circle.className = "circle";
    const heartIcon = document.createElement("i");
    heartIcon.className = "fa fa-heart";
    heartIcon.setAttribute('data-styleID', sneaker.styleID);
    circle.appendChild(heartIcon);
    async function checkWishlist() {
      try {
        const response = await fetch(`/api/check-wishlist?styleID=${sneaker.styleID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.isInWishlist) {
          heartIcon.classList.add("active"); // Add 'active' class if sneaker is in wishlist
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    }
    checkWishlist();

    heartIcon.addEventListener("click", async (event) => {
      event.stopPropagation(); // Prevent triggering click events on parent elements
      const userLoggedIn = sessionStorage.getItem("userLoggedIn"); // Misalkan 'userLoggedIn' adalah status login yang tersimpan

      if (!userLoggedIn) {
        alert("Please login first");
        window.location.href = '/login'; // Redirect ke halaman login
        return; // Stop further execution
      }
      heartIcon.classList.toggle("active");
      if (heartIcon.classList.contains("active")) {
        // Add to wishlist
        try {
          const response = await fetch("/add-to-wishlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shoeName: sneaker.shoeName,
              brand: sneaker.brand,
              releaseDate: sneaker.releaseDate,
              description: sneaker.description,
              colorway: sneaker.colorway,
              make: sneaker.make,
              retailPrice: sneaker.retailPrice,
              styleID: sneaker.styleID,
              thumbnail: sneaker.thumbnail,
              description: sneaker.description,
              resellLinks: {
                goat: sneaker.resellLinks.goat,
                flightClub: sneaker.resellLinks.flightClub,
                stockX: sneaker.resellLinks.stockX,
              },
              lowestResellPrice: {
                stockX: sneaker.lowestResellPrice.stockX,
                flightClub: sneaker.lowestResellPrice.flightClub,
                goat: sneaker.lowestResellPrice.goat,
              },
            }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message);
          alert("Sneaker added to wishlist!");
        } catch (error) {
          console.error("Error adding to wishlist:", error);
          alert(`An error occurred: ${error.message}`);
        }
      } else {
        // Remove from wishlist
        try {
          const response = await fetch("/remove-from-wishlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ styleID: sneaker.styleID }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message);
          alert("Sneaker removed from wishlist!");
        } catch (error) {
          console.error("Error removing from wishlist:", error);
          alert(`An error occurred: ${error.message}`);
        }
      }
    });

    const image = document.createElement("img");
    image.src = sneaker.thumbnail;
    image.alt = sneaker.styleID;
    image.addEventListener("click", () => {
      showPopUp(sneaker);
    });

    const link = document.createElement("a");
    link.href = sneaker.resellLinks.goat;
    link.target = "_blank";
    link.textContent = sneaker.shoeName;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPopUp(sneaker);
    });

    frameImg.appendChild(circle);
    frameImg.appendChild(image);
    frameImg.appendChild(link);

    return frameImg;
  }

  function showPopUp(sneaker) {
    if (!sneaker.lowestResellPrice || !sneaker.resellLinks) {
      console.log(sneaker);
      console.error("Error: Missing resell prices or links");
      return; // Stop execution if data is incomplete
    }

    const popUp = document.createElement("div");
    popUp.className = "pop-up";
    popUp.innerHTML = `
    <div class="pop-up">
      <div class="pop-up-content">
          <span class="close-button">&times;</span>
          <div class="previewimg">
            <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}">
          </div>
          <div class="description">
            <div class="framedes">
              <h3>${sneaker.shoeName}</h3>
              <hr>
              <p>Retail Price $${sneaker.retailPrice}</p>
              <a class="description-text">${sneaker.description}</a>
              <div class="info">
                <div class="brand">
                  <a>Brand: <b class="nama">${sneaker.brand}</b></a>
                </div>
                <a>Release Date: <b class="nama">${sneaker.releaseDate}</b></a>
                <a>Color: <b class="nama">${sneaker.colorway}</b></a>
              </div>
              <div class="toko">
                <button class="btn">
                  <a href="${sneaker.resellLinks?.stockX
      }" target="_blank" class="btn__visible">
                    <img src="/img/home-login/logo/stockx.png" alt="StockX Logo" class="log">
                  </a>
                  <a href="${sneaker.resellLinks?.stockX
      }" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.stockX || " -"
      }</a>
                </button>
                <button class="btn">
                  <a href="${sneaker.resellLinks?.flightClub
      }" target="_blank" class="btn__visible">
                    <img src="/img/home-login/logo/flight.png" alt="Flight Club Logo" class="log">
                  </a>
                  <a href="${sneaker.resellLinks?.flightClub
      }" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.flightClub || " -"
      }</a>
                </button>
                <button class="btn">
                  <a href="${sneaker.resellLinks?.goat
      }" target="_blank" class="btn__visible">
                    <img src="/img/home-login/logo/GOAT-Logo.png" alt="GOAT Logo" class="log">
                  </a>
                  <a href="${sneaker.resellLinks?.goat
      }" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.goat || " -"
      }</a>
                </button>
                <button class="hearts">
                  <a href="#" class="like">
                    <i class="fas fa-heart"></i> <!-- Ikon hati Font Awesome -->
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  `;

    document.body.appendChild(popUp); // Append pop-up to the body

    // Add event listeners
    const closeBtn = popUp.querySelector(".close-button");
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(popUp);
      setTimeout(() => {
        checkWishlist();
        // location.reload()

        updateHeartIconsOnPage(); // Fungsi baru untuk mengupdate ikon hati pada halaman
      }, 0);
    });

    const heartIcon = popUp.querySelector(".fa-heart");
    heartIcon.setAttribute('data-styleID', sneaker.styleID);
    heartIcon.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation(); // Prevent triggering click events on parent elements
      const userLoggedIn = sessionStorage.getItem("userLoggedIn"); // Misalkan 'userLoggedIn' adalah status login yang tersimpan

      if (!userLoggedIn) {
        alert("Please login first");
        window.location.href = '/login'; // Redirect ke halaman login
        return; // Stop further execution
      }
      heartIcon.classList.toggle("active"); // Toggle active class to change icon color
      heartIcon.setAttribute('data-styleID', sneaker.styleID);
      const isActive = heartIcon.classList.contains("active");
      const url = isActive ? "/add-to-wishlist" : "/remove-from-wishlist";
      const method = "POST"; // Use POST for both adding and removing

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shoeName: sneaker.shoeName,
            brand: sneaker.brand,
            releaseDate: sneaker.releaseDate,
            description: sneaker.description,
            colorway: sneaker.colorway,
            make: sneaker.make,
            retailPrice: sneaker.retailPrice,
            styleID: sneaker.styleID,
            thumbnail: sneaker.thumbnail,
            resellLinks: sneaker.resellLinks,
            lowestResellPrice: sneaker.lowestResellPrice,
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        alert(`Sneaker ${isActive ? 'added to' : 'removed from'} wishlist!`);
      } catch (error) {
        console.error(`Error ${isActive ? 'adding to' : 'removing from'} wishlist:`, error);
        alert(`An error occurred: ${error.message}`);
      }
    });
    checkWishlist();

    async function checkWishlist() {
      try {
        const response = await fetch(`/api/check-wishlist?styleID=${sneaker.styleID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.isInWishlist) {
          heartIcon.classList.add("active"); // Add 'active' class if sneaker is in wishlist
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }

    }
  };

  function updateHeartIconsOnPage() {
    document.querySelectorAll('.fa-heart').forEach(async icon => {
      const styleID = icon.getAttribute('data-styleID');
      try {
        const response = await fetch(`/api/check-wishlist?styleID=${styleID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.isInWishlist) {
          icon.classList.add("active");
          console.log("active")
          console.log(styleID)

        } else {
          icon.classList.remove("active");
          console.log("remove")
          console.log(styleID)

        }
      } catch (error) {
        console.error("Error checking wishlist status for icon:", error);
      }
    });
  }

  function updateHeartIconsOnPage() {
    document.querySelectorAll('.fa-heart').forEach(async icon => {
      const styleID = icon.getAttribute('data-styleID');
      try {
        const response = await fetch(`/api/check-wishlist?styleID=${styleID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.isInWishlist) {
          icon.classList.add("active");
          console.log("active")
          console.log(styleID)

        } else {
          icon.classList.remove("active");
          console.log("remove")
          console.log(styleID)

        }
      } catch (error) {
        console.error("Error checking wishlist status for icon:", error);
      }
    });
  }

  hearts.forEach(function (heart) {
    heart.addEventListener("click", function () {
      // Toggle kelas 'active'
      heart.classList.toggle("active");
    });
  });


  //API most popular
  fetchMostPopularSneakers();

  function fetchMostPopularSneakers() {
    fetch(`/api/most-popular`)
      .then((response) => response.json())
      .then((sneakers) => {
        const container = document.getElementById("sneaker-mostpopular1");
        console.log("ini mostpopular else");
        isPopularActive = true;
        sneakerContainer.innerHTML = ""; // Clear existing content
        sneakers.forEach((sneaker) => {
          if (isNewRelease(sneaker.releaseDate)) {
            const sneakerCard = createSneakerCard(sneaker);
            container.appendChild(sneakerCard);
            console.log(`Updated offset: ${offset}`);
          }
          // offset += sneakers.length;

        });
      })
      .catch((error) =>
        console.error("Error fetching most popular sneakers:", error)
      );
  };


  function isNewRelease(releaseDate) {
    const release = new Date(releaseDate);
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-12-31");
    return release >= startDate && release <= endDate;
  }

  //API Onlu Jordan
  fetchonlyjordanSneakers();

  function fetchonlyjordanSneakers() {
    fetch("/api/onlyjordan")
      .then((response) => response.json())
      .then((sneakers) => {
        const container = document.getElementById("sneaker-mostpopular2");
        container.innerHTML = ""; // Clear existing content
        sneakers.map((sneaker) => {
          container.appendChild(createSneakerCard(sneaker));
        });
      })
      .catch((error) =>
        console.error("Error fetching only jordan sneakers:", error)
      );
  }


 

  
  // window.setTimeout(() => {
  //   window.showMoreHandled = false;
  // }, 100);

  
});


