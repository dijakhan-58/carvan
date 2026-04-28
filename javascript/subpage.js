// 1. Function to get the ID from the URL
const getProductId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

// 2. Fetch and Render the Data using .then()
function loadCarDetails() {
  const carId = getProductId();

  // Fetch the data
  fetch("cars.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((cars) => {
      // Find the specific car
      const car = cars.find((c) => c.id == carId);

      if (car) {
        const container = document.getElementById("car-details-content");

        // Set the HTML structure with AOS attributes
        container.innerHTML = `
          <div class="visual-pane" data-aos="fade-right" data-aos-duration="1200">
              <div class="main-image-wrapper">
                  <img src="${car.image}" alt="${car.model}" class="hero-img">
                  <div class="floating-specs">
                      <div class="stat-glass" data-aos="fade-up" data-aos-delay="400">
                          <span class="label">Top Speed</span>
                          <span class="value">${car.topSpeed || "N/A"}</span>
                      </div>
                      <div class="stat-glass" data-aos="fade-up" data-aos-delay="600">
                          <span class="label">0-60mph</span>
                          <span class="value">${car.acceleration || "N/A"}</span>
                      </div>
                  </div>
              </div>
          </div>

          <div class="detail-pane" data-aos="fade-left" data-aos-duration="1200">
              <header class="detail-header">
                  <span class="brand-tag" data-aos="fade-down" data-aos-delay="200">${car.brand}</span>
                  <h1 class="model-name">${car.model} <span>${car.tagline}</span></h1>
                  <div class="price-accent">${car.price}</div>
              </header>

              <div class="spec-summary" data-aos="fade-up" data-aos-delay="300">
                  <p>${car.description || "No description available for this model."}</p>
              </div>

              <div class="tech-grid">
                  <div class="tech-item" data-aos="zoom-in" data-aos-delay="400">
                      <label>Exterior</label>
                      <p>${car.exterior || "Standard"}</p>
                  </div>
                  <div class="tech-item" data-aos="zoom-in" data-aos-delay="500">
                      <label>Interior</label>
                      <p>${car.interior || "Standard"}</p>
                  </div>
                  <div class="tech-item" data-aos="zoom-in" data-aos-delay="600">
                      <label>Engine</label>
                      <p>${car.specs.engine}</p>
                  </div>
              </div>

              <h4 class="sub-heading" data-aos="fade-up">Key Features</h4>
              <div class="feature-row">
                  ${car.features
                    .map(
                      (feat, index) => `
                      <div class="feat-box" data-aos="fade-up" data-aos-delay="${200 + index * 50}">
                          <i class="fas fa-check-circle"></i>
                          <span>${feat}</span>
                      </div>
                  `,
                    )
                    .join("")}
              </div>

              <div class="action-footer" data-aos="fade-up">
                  <button class="btn-maroon">GET E-PRICE</button>
                  <button class="btn-outline">CHECK AVAILABILITY</button>
                  <button class="btn-outline">SCHEDULE TEST DRIVE</button>
              </div>
          </div>
        `;

        document.title = `${car.brand} ${car.model} | Showcase`;

        // Refresh AOS so it detects the new HTML elements
        AOS.init();
        AOS.refresh();
      } else {
        document.getElementById("car-details-content").innerHTML =
          "<h1>Car not found.</h1>";
      }
    });
}

// Call the function
loadCarDetails();
