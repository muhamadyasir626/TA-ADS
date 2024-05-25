document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");
    const sneakerContainer = document.getElementById("sneaker-mostpopular1"); // Pastikan ini adalah ID dari elemen di HTML Anda yang akan menampilkan sneakers

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', fetchAndDisplaySneakers);
    });

    async function fetchAndDisplaySneakers() {
        const selectedBrands = Array.from(checkboxes)
                                    .filter(checkbox => checkbox.checked)
                                    .map(checkbox => checkbox.value);

        const query = selectedBrands.map(brand => `brand=${encodeURIComponent(brand)}`).join('&');

        try {
            const response = await fetch(`/api/sneakers?${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const sneakers = await response.json();
            updateDOMWithSneakers(sneakers);
        } catch (error) {
            console.error('Failed to fetch sneakers:', error);
        }
    }

    function updateDOMWithSneakers(sneakers) {
        sneakerContainer.innerHTML = ''; // Clear existing content

        sneakers.forEach(sneaker => {
            const sneakerDiv = document.createElement('div');
            sneakerDiv.className = 'frameimg'; // Keep the class for CSS styling
            sneakerDiv.innerHTML = `
                <img src="${sneaker.image}" alt="${sneaker.name}">
                <p>${sneaker.name}</p>
            `;
            sneakerContainer.appendChild(sneakerDiv);
        });
    }
});
