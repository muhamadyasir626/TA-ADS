const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

// sneaks.getMostPopular( 1, (err, products) => {

//   if (err) {
//     console.error('Error:', err);
//   } else {
//     console.log('Products:', products);
//   }
// });

// sneaks.getProductPrices("nike", function(err, product){
//   console.log(product)
// })

sneaks.getProductPrices("FZ8117-100", function (err, product) {
  console.log(product);
});


document.addEventListener("DOMContentLoaded", () => {
  const boxContainer = document.getElementById('sneaker-mostpopular1');

  boxContainer.addEventListener('click', function(event) {
    const target = event.target;

    if (target.tagName === 'IMG' && target.parentNode.classList.contains('frameimg')) {
      const sneakerId = target.parentNode.getAttribute('data-sneaker-id');
      showPopUp(sneakerId);
    }
  });

  async function showPopUp(sneakerId) {
    const sneaker = await findSneakerById(sneakerId);
    if (!sneaker) {
      console.error('Sneaker not found');
      return;
    }

    const popUp = document.createElement('div');
      popUp.className = 'pop-up';
      popUp.innerHTML = `
      <div class="pop-up-content">
      <span class="close-button">&times;</span>
      <div class="previewimg">
        <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}">
      </div>
      <div class="description1">
        <div class="framedes">
          <h3>${sneaker.shoeName}</h3>
          <hr>
          <p>Start from $${sneaker.retailPrice}</p>
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
              <a href="${sneaker.resellLinks?.stockX}" target="_blank" class="btn__visible">
                <img src="/img/home-login/logo/stockx.png" alt="StockX Logo" class="lo">
              </a>
              <a href="${sneaker.resellLinks?.stockX}" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.stockX || ' -'}</a>
            </button>
            <button class="btn">
              <a href="${sneaker.resellLinks?.flightClub}" target="_blank" class="btn__visible">
                <img src="/img/home-login/logo/flight.png" alt="Flight Club Logo" class="lo">
              </a>
              <a href="${sneaker.resellLinks?.flightClub}" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.flightClub || ' -'}</a>
            </button>
            <button class="btn">
              <a href="${sneaker.resellLinks?.goat}" target="_blank" class="btn__visible">
                <img src="/img/home-login/logo/GOAT-Logo.png" alt="GOAT Logo" class="lo">
              </a>
              <a href="${sneaker.resellLinks?.goat}" target="_blank" class="btn__invisible">$${sneaker.lowestResellPrice?.goat || ' -'}</a>
            </button>
            <button class="hearts1">
              <a href="#" class="like">
                <i class="fas fa-heart"></i> <!-- Ikon hati Font Awesome -->
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
      popUp.querySelector('.close-button').addEventListener('click', () => {
        document.body.removeChild(popUp);
      });
  
      document.body.appendChild(popUp);
  }

  async function findSneakerById(id) {
    try {
      const response = await fetch(`/api/wishlist/${id}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const sneaker = await response.json();
      return sneaker;
    } catch (error) {
      console.error('Failed to fetch sneaker:', error);
    }
  }
});
  

  document.addEventListener("DOMContentLoaded", function() {
    var head = document.getElementsByTagName('head')[0];
  
    // Membuat elemen link untuk stylesheet
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/.css';
  
    // Menambahkan link ke head
    head.appendChild(link);
  });
  