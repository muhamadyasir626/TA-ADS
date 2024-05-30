// document.addEventListener("DOMContentLoaded", () => {
//   const filterForm = document.getElementById("sneaker-filter-form");
//   const sneakerContainer = document.querySelector(".box-container");
//   const showMoreBtn = document.getElementById("show-more");
  
//   let currentQuery = "";
//   let limit = 9;
//   let offset = 0;
//   let isFilterActive = false;

//   filterForm.addEventListener("submit", async (event) => {
//       event.preventDefault();
//       isFilterActive = true;
//       const selectedBrands = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'))
//                                   .map(checkbox => checkbox.value);
//       currentQuery = encodeURIComponent(selectedBrands.join(" "));
//       offset = 0; // Reset offset saat filter baru diterapkan
//       sneakerContainer.innerHTML = ""; // Clear previous results
//       fetchFilteredData();
//   });

//   showMoreBtn.addEventListener("click", () => {
//     if (window.showMoreHandled) {
//       event.stopImmediatePropagation();
//       return; // Hentikan jika sudah ditangani
//     }
//       if (isFilterActive) {
//           fetchFilteredData(); // Fetch hanya ketika filter aktif
//       }
//   });
  
//   window.setTimeout(() => {
//     window.showMoreHandled = false;
//   }, 500);

//   function fetchFilteredData() {
//     console.log(`Fetching data with query: ${currentQuery}, offset: ${offset}`);
//     fetch(`/api/filter?q=${currentQuery}&limit=${limit}&offset=${offset}`, {
//         headers: {
//             'Cache-Control': 'no-cache'
//         }
//     })
//     .then(response => response.json())
//     .then(products => {
//         if (offset === 0) sneakerContainer.innerHTML = ""; // Hapus konten lama saat query baru
//         if (products.length > 0) {
//             displaySneakers(products);
//             offset += products.length; // Perbarui offset hanya jika produk diterima
//         } else {
//             console.log("Tidak ada produk lebih untuk ditampilkan.");
//         }
//     })
//     .catch(error => {
//         console.error('Gagal mengambil data sneakers:', error);
//         sneakerContainer.innerHTML = `<p class="error">Gagal memuat produk. Silakan coba lagi.</p>`;
//     });
// }

//   function displaySneakers(products) {
//       products.forEach(product => {
//           const sneakerElement = createSneakerCard(product);
//           sneakerContainer.appendChild(sneakerElement);
//       });
//   }

//     function createSneakerCard(sneaker) {
//         const frameImg = document.createElement("div");
//         frameImg.className = "frameimg";
    
//         const circle = document.createElement("div");
//         circle.className = "circle";
//         const heartIcon = document.createElement("i");
//         heartIcon.className = "fa fa-heart";
//         circle.appendChild(heartIcon);
    
//         heartIcon.addEventListener("click", async (event) => {
//           event.stopPropagation(); // Prevent triggering click events on parent elements
//           heartIcon.classList.toggle("liked");
//           if (heartIcon.classList.contains("liked")) {
//             // Add to wishlist
//             try {
//               const response = await fetch("/add-to-wishlist", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   shoeName: sneaker.shoeName,
//                   brand: sneaker.brand,
//                   releaseDate: sneaker.releaseDate,
//                   description: sneaker.description,
//                   colorway: sneaker.colorway,
//                   make: sneaker.make,
//                   retailPrice: sneaker.retailPrice,
//                   styleID: sneaker.styleID,
//                   thumbnail: sneaker.thumbnail,
//                   description: sneaker.description,
//                   resellLinks: {
//                     goat: sneaker.resellLinks.goat,
//                     flightClub: sneaker.resellLinks.flightClub,
//                     stockX: sneaker.resellLinks.stockX,
//                   },
//                   lowestResellPrice: {
//                     stockX: sneaker.lowestResellPrice.stockX,
//                     flightClub: sneaker.lowestResellPrice.flightClub,
//                     goat: sneaker.lowestResellPrice.goat,
//                   },
//                 }),
//               });
//               const data = await response.json();
//               if (!response.ok) throw new Error(data.message);
//               alert("Sneaker added to wishlist!");
//             } catch (error) {
//               console.error("Error adding to wishlist:", error);
//               alert(`An error occurred: ${error.message}`);
//             }
//           } else {
//             // Remove from wishlist
//             try {
//               const response = await fetch("/remove-from-wishlist", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ styleID: sneaker.styleID }),
//               });
//               const data = await response.json();
//               if (!response.ok) throw new Error(data.message);
//               alert("Sneaker removed from wishlist!");
//             } catch (error) {
//               console.error("Error removing from wishlist:", error);
//               alert(`An error occurred: ${error.message}`);
//             }
//           }
//         });
    
//         const image = document.createElement("img");
//         image.src = sneaker.thumbnail;
//         image.alt = sneaker.styleID;
//         image.addEventListener("click", () => {
//           showPopUp(sneaker);
//         });
    
//         const link = document.createElement("a");
//         link.href = sneaker.resellLinks.goat;
//         link.target = "_blank";
//         link.textContent = sneaker.shoeName;
//         link.addEventListener("click", (event) => {
//           event.preventDefault();
//           showPopUp(sneaker);
//         });
    
//         frameImg.appendChild(circle);
//         frameImg.appendChild(image);
//         frameImg.appendChild(link);
    
//         return frameImg;
//       }
    
//       function showPopUp(sneaker) {
//         // Tambahkan pengecekan untuk menghindari error
//         if (!sneaker.lowestResellPrice || !sneaker.resellLinks) {
//           console.log(sneaker);
//           console.error("Error: Missing resell prices or links");
//           return; // Hentikan eksekusi jika data tidak lengkap
//         }
    
//         const popUp = document.createElement("div");
//         popUp.className = "pop-up";
//         popUp.innerHTML = `
//         <div class="pop-up-content">
//         <span class="close-button">&times;</span>
//         <div class="previewimg">
//           <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}">
//         </div>
//         <div class="description">
//           <div class="framedes">
//             <h3>${sneaker.shoeName}</h3>
//             <hr>
//             <p>Retail Price $${sneaker.retailPrice}</p>
//             <a class="description-text">${sneaker.description}</a>
//             <div class="info">
//               <div class="brand">
//                 <a>Brand: <b class="nama">${sneaker.brand}</b></a>
//               </div>
//               <a>Release Date: <b class="nama">${sneaker.releaseDate}</b></a>
//               <a>Color: <b class="nama">${sneaker.colorway}</b></a>
//             </div>
//             <div class="toko">
//               <button class="btn">
//                 <a href="${
//                   sneaker.resellLinks?.stockX
//                 }" target="_blank" class="btn__visible">
//                   <img src="/img/home-login/logo/stockx.png" alt="StockX Logo" class="log">
//                 </a>
//                 <a href="${
//                   sneaker.resellLinks?.stockX
//                 }" target="_blank" class="btn__invisible">$${
//           sneaker.lowestResellPrice?.stockX || " -"
//         }</a>
//               </button>
//               <button class="btn">
//                 <a href="${
//                   sneaker.resellLinks?.flightClub
//                 }" target="_blank" class="btn__visible">
//                   <img src="/img/home-login/logo/flight.png" alt="Flight Club Logo" class="log">
//                 </a>
//                 <a href="${
//                   sneaker.resellLinks?.flightClub
//                 }" target="_blank" class="btn__invisible">$${
//           sneaker.lowestResellPrice?.flightClub || " -"
//         }</a>
//               </button>
//               <button class="btn">
//                 <a href="${
//                   sneaker.resellLinks?.goat
//                 }" target="_blank" class="btn__visible">
//                   <img src="/img/home-login/logo/GOAT-Logo.png" alt="GOAT Logo" class="log">
//                 </a>
//                 <a href="${
//                   sneaker.resellLinks?.goat
//                 }" target="_blank" class="btn__invisible">$${
//           sneaker.lowestResellPrice?.goat || " -"
//         }</a>
//               </button>
//               <button class="hearts">
//                 <a href="#" class="like">
//                   <i class="fas fa-heart"></i> <!-- Ikon hati Font Awesome -->
//                 </a>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
    
//     popUp.querySelector(".close-button").addEventListener("click", () => {
//         document.body.removeChild(popUp);
//       });
  
//       document.body.appendChild(popUp);
//     }
  
//     formEl.addEventListener("submit", (event) => {
//       event.preventDefault();
//       offset = 0; // Reset offset to zero to Retail Price the beginning
//       searchSneaker(true);
//     });
  
//     showMoreBtn.addEventListener("click", () => {
//       if (isFilterActive) {
//         limit += offset
//         console.log("berjalan filter")
//           fetchFilteredData()
//       } 
//   });
// });