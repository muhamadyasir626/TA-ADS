document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.querySelector("form");
  const inputEl = document.getElementById("cari");
  const searchResult = document.querySelector(".box-container");
  const showMoreBtn = document.getElementById("show-more");

  let inputData = "";
  let limit = 9;
  let offset = 0;

  async function searchSneaker(clear = true) {
    inputData = inputEl.value;
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(inputData)}&limit=${limit}&offset=${offset}`);
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

    products.forEach(product => {
      const frameImg = createSneakerElement(product);
      searchResult.appendChild(frameImg);
    });
  }

  function createSneakerElement(result) {
    const frameImg = document.createElement("div");
    frameImg.classList.add("frameimg");

    const heartIconContainer = document.createElement("div");
    heartIconContainer.classList.add("circle");


    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart");
    heartIconContainer.appendChild(heartIcon);

    const image = document.createElement("img");
    image.src = result.thumbnail;
    image.alt = result.styleID;
    image.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      showPopUp_search(result);
    });

    const imageLink = document.createElement("a");
    imageLink.textContent = result.shoeName;
    imageLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      showPopUp_search(result);
    });

    frameImg.appendChild(heartIconContainer);
    frameImg.appendChild(image);
    frameImg.appendChild(imageLink);

    return frameImg;
  }

  function showPopUp_search(sneaker) {
    if (!sneaker) {
      console.error('Error: Sneaker data is missing');
      return;
    }

    const popUp = document.createElement('div');
    popUp.className = 'pop-up';
    popUp.innerHTML = `
      <div class="pop-up-content">
        <span class="close-button">&times;</span>
        <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}" style="max-width: 90%; margin-bottom: 20px;"/>
        <h3>${sneaker.shoeName}</h3>
        <p>ID: ${sneaker.styleID}</p>
        <p>Brand: ${sneaker.brand}</p>
        <p>Release Date: ${sneaker.releaseDate}</p>
        <p>Colorway: ${sneaker.colorway}</p>
        <p>Description: ${sneaker.description}</p>
        <p>Retail Price: $${sneaker.retailPrice}</p>
        <div class="resell-links">
            <a href="${sneaker.resellLinks?.stockX}" target="_blank">StockX</a> | 
            <a href="${sneaker.resellLinks?.goat}" target="_blank">Goat</a> | 
            <a href="${sneaker.resellLinks?.flightClub}" target="_blank">Flight Club</a>
        </div>
      </div>
    `;

    popUp.querySelector('.close-button').addEventListener('click', () => {
      document.body.removeChild(popUp);
    });

    document.body.appendChild(popUp);
  }

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    offset = 0; // Reset offset to zero to start from the beginning
    searchSneaker(true);
  });

  showMoreBtn.addEventListener("click", () => {
    offset += limit;
    searchSneaker(false); // Do not clear previous results
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchMostPopularSneakers();

  function fetchMostPopularSneakers() {
    fetch('/api/most-popular')
      .then(response => response.json())
      .then(sneakers => {
        const container = document.getElementById('sneaker-mostpopular1');
        container.innerHTML = ''; // Clear existing content
        sneakers.map(sneaker => {
          container.appendChild(createSneakerCard(sneaker));
        });
      })
      .catch(error => console.error('Error fetching most popular sneakers:', error));
  }

  function createSneakerCard(sneaker) {
    const frameImg = document.createElement('div');
    frameImg.className = 'frameimg';

    const circle = document.createElement('div');
    circle.className = 'circle';
    const heartIcon = document.createElement('i');
    heartIcon.className = 'fa fa-heart';
    circle.appendChild(heartIcon);

    heartIcon.addEventListener('click', (event) => {
      const sneaker = {
        shoeName: 'Sneaker Name',
        brand: 'Brand Name',
        releaseDate: 'Release Date',
        description: 'Description',
        colorway: 'Colorway',
        make: 'Make',
        retailPrice: 'Retail Price',
        styleID: 'Style ID',
        thumbnail: 'Thumbnail URL'
      };
    
      fetch('/add-to-wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sneaker)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Sneaker added to wishlist!');
        } else {
          alert('Failed to add sneaker to wishlist.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding sneaker to wishlist.');
      });
    });
    





    const image = document.createElement('img');
    image.src = sneaker.thumbnail;
    image.alt = sneaker.styleID;
    image.addEventListener('click', () => {
      showPopUp(sneaker);
    });

    const link = document.createElement('a');
    link.href = sneaker.resellLinks.goat;
    link.target = '_blank';
    link.textContent = sneaker.shoeName;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showPopUp(sneaker);
    });

    frameImg.appendChild(circle);
    frameImg.appendChild(image);
    frameImg.appendChild(link);

    return frameImg;
  }

  function showPopUp(sneaker) {
    // Tambahkan pengecekan untuk menghindari error
    if (!sneaker.lowestResellPrice || !sneaker.resellLinks) {
      console.log(sneaker);
      console.error('Error: Missing resell prices or links');
      return; // Hentikan eksekusi jika data tidak lengkap
    }

    const popUp = document.createElement('div');
    popUp.className = 'pop-up';
    popUp.innerHTML = `
    <div class="pop-up-content">
    <span class="close-button">&times;</span>
    <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}" style="max-width: 90%; margin-bottom: 20px;"/>
    <h3>${sneaker.shoeName || ' -'}</h3>
    <p>ID: ${sneaker.styleID || ' -'}</p>
    <p>Brand: ${sneaker.brand || ' -'}</p>
    <p>Release Date: ${sneaker.releaseDate || ' -'}</p>
    <p>Colorway: ${sneaker.colorway || ' -'}</p>
    <p>Description: ${sneaker.description || ' -'}</p>
    <p>Retail Price: $${sneaker.retailPrice || ' -'}</p>
    <div class="resell-links">
        <a href="${sneaker.resellLinks?.stockX || '/not-found'}" target="_blank">StockX</a> | 
        <a href="${sneaker.resellLinks?.goat || '/not-found'}" target="_blank">Goat</a> | 
        <a href="${sneaker.resellLinks?.flightClub || '/not-found'}" target="_blank">Flight Club</a>
    </div>
  </div>
`;

    // Event to close the pop-up
    popUp.querySelector('.close-button').addEventListener('click', () => {
      document.body.removeChild(popUp);
    });

    // Append pop-up to the body
    document.body.appendChild(popUp);
  }
});

document.querySelectorAll('.fa-heart').forEach(heartIcon => {

});


// display mostpopular 2
// document.addEventListener("DOMContentLoaded", () => {
//   fetchMostPopularSneakers();

//   function fetchMostPopularSneakers() {
//     fetch('/api/most-popular')
//       .then(response => response.json())
//       .then(sneakers => {
//         const container = document.getElementById('sneaker-mostpopular2');
//         container.innerHTML = ''; // Clear existing content
//         sneakers.map(sneaker => {
//           container.appendChild(createSneakerCard(sneaker));
//         });
//       })
//       .catch(error => console.error('Error fetching most popular sneakers:', error));
//   }

//   function createSneakerCard(sneaker) {
//     const frameImg = document.createElement('div');
//     frameImg.className = 'frameimg';

//     const circle = document.createElement('div');
//     circle.className = 'circle';
//     const heartIcon = document.createElement('i');
//     heartIcon.className = 'fa fa-heart';
//     circle.appendChild(heartIcon);

//     const image = document.createElement('img');
//     image.src = sneaker.thumbnail;
//     image.alt = sneaker.styleID;
//     image.addEventListener('click', () => {
//       showPopUp(sneaker);
//     });

//     const link = document.createElement('a');
//     link.href = sneaker.resellLinks.goat;
//     link.target = '_blank';
//     link.textContent = sneaker.shoeName;
//     link.addEventListener('click', (event) => {
//       event.preventDefault();
//       showPopUp(sneaker);
//     });


//     frameImg.appendChild(circle);
//     frameImg.appendChild(image);
//     frameImg.appendChild(link);

//     return frameImg;
//   }

//   function showPopUp(sneaker) {
//     // Tambahkan pengecekan untuk menghindari error
//     if (!sneaker.lowestResellPrice || !sneaker.resellLinks) {
//       console.log(sneaker);
//       console.error('Error: Missing resell prices or links');
//       return; // Hentikan eksekusi jika data tidak lengkap
//     }

//     const popUp = document.createElement('div');
//     popUp.className = 'pop-up';
//     popUp.innerHTML = `
//     <div class="pop-up-content">
//       <span class="close-button">&times;</span>
//       <img src="${sneaker.thumbnail}" alt="${sneaker.styleID}" style="max-width: 90%; margin-bottom: 20px;"/>
//       <h3>${sneaker.shoeName||' -'}</h3>
//       <p>ID: ${sneaker.styleID||' -'}</p>
//       <p>Brand: ${sneaker.brand||' -'}</p>
//       <p>Release Date: ${sneaker.releaseDate||' -'}</p>
//       <p>Colorway: ${sneaker.colorway||' -'}</p>
//       <p>Description: ${sneaker.description||' -'}</p>
//       <p>Retail Price: $${sneaker.retailPrice||' -'}</p>
//       <div class="resell-links">
//           <a href="${sneaker.resellLinks?.stockX || '/not-found'}" target="_blank">StockX</a> |
//           <a href="${sneaker.resellLinks?.goat || '/not-found'}" target="_blank">Goat</a> |
//           <a href="${sneaker.resellLinks?.flightClub || '/not-found'}" target="_blank">Flight Club</a>
//       </div>
//     </div>
//   `;

//     // Event to close the pop-up
//     popUp.querySelector('.close-button').addEventListener('click', () => {
//       document.body.removeChild(popUp);
//     });

//     // Append pop-up to the body
//     document.body.appendChild(popUp);
//   }
// });







