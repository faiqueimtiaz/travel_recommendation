document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("topSearch");
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.getElementById("results");

    // Load data from local JSON file
    fetch("https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json")
        .then(res => res.json())
        .then(data => {
            // When search button clicked
            searchBtn.addEventListener("click", () => {
                displayResults(data, searchInput, resultsContainer, searchBtn);
            });
            searchInput.addEventListener("keyup", () => {
                displayResults(data, searchInput, resultsContainer, searchBtn);
            });
        })
        .catch(err => {
            console.error("Error loading data:", err);
            resultsContainer.innerHTML = `<p>Failed to load data.</p>`;
        });
});



function displayResults(data, searchInput, resultsContainer, searchBtn) {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }

    const matches = [];

    // Search in countries -> cities
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            if (
                city.name.toLowerCase().includes(query) ||
                city.description.toLowerCase().includes(query)
            ) {
                matches.push({
                    type: "City",
                    name: city.name,
                    image: city.imageUrl,
                    description: city.description,
                });
            }
        });
    });

    // Search in temples
    data.temples.forEach(temple => {
        if (
            temple.name.toLowerCase().includes(query) ||
            temple.description.toLowerCase().includes(query)
        ) {
            matches.push({
                type: "Temple",
                name: temple.name,
                image: temple.imageUrl,
                description: temple.description,
            });
        }
    });

    // Search in beaches
    data.beaches.forEach(beach => {
        if (
            beach.name.toLowerCase().includes(query) ||
            beach.description.toLowerCase().includes(query)
        ) {
            matches.push({
                type: "Beach",
                name: beach.name,
                image: beach.imageUrl,
                description: beach.description,
            });
        }
    });

    // Show results
    if (matches.length > 0) {
        matches.forEach(item => {
            const card = document.createElement("div");
            card.className = "result-card";
            card.innerHTML = `
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXo3xlrCq-EDrU-GDPowfLiKDeAUrGHSgCew&s" alt="${item.name}" />
              <div>
                <h3>${item.name}</h3>
                <p><strong>Type:</strong> ${item.type}</p>
                <p>${item.description}</p>
              </div>
            `;
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
    }
}