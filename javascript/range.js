// 1. GLOBAL letIABLE
// Store all car data here
let allCars = [];

// 2. FETCH FUNCTION
// Fetch data from cars.json file
function fetchCars() {
  fetch("cars.json")
    .then(function (response) {
      // Convert response to JSON
      return response.json();
    })
    .then(function (data) {
      // Save data globally
      allCars = data;
      // Display all cars initially
      displayCars(allCars);
    });
   
}

// 3. DISPLAY FUNCTION
// Generate and display car cards in the grid
function displayCars(cars) {
  let grid = document.getElementById("carGrid");
  // Clear previous content
  grid.innerHTML = "";

  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];

    // Format price with commas
    let formattedPrice = "$ " + car.price.toLocaleString();

    grid.innerHTML += `
      <div class="card">
        <div class="card-img">
          <span class="badge">${car.category}</span>
          <img src="${car.image}" alt="${car.model}">
        </div>

        <div class="card-content">
          <div class="top-row">
            <div class="brand">${car.brand.toUpperCase()}</div>
            <div class="tagline">${car.tagline || "Exclusive Fleet"}</div>
          </div>

          <h2 class="model model-title">${car.model}</h2>

          <div class="specs">
            <div class="spec"><i class="fas fa-microchip"></i> <span>${car.specs.engine}</span></div>
            <div class="spec"><i class="fas fa-bolt"></i> <span>${car.specs.horsepower}</span></div>
            <div class="spec"><i class="fas fa-tachometer-alt"></i> <span>${car.range}</span></div>
          </div>

          <div class="bottom">
            <div>
              <div class="price-text">ACQUISITION COST</div>
              <div class="price">${car.price}</div>
            </div>
            <a href="subpage.html?id=${car.id}" style="text-decoration: none;">
              <button class="btn">View Details</button>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

// 4. CATEGORY FILTER
// Filter cars by selected category
function filterByCategory(categoryName, btn) {
  // Remove active class from all buttons
  let allButtons = document.querySelectorAll(".list");
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("active");
  }

  // Add active class to clicked button
  if (btn) {
    btn.classList.add("active");
  }

  let filteredList = [];

  if (categoryName === "All") {
    filteredList = allCars; // Show all cars
  } else {
    for (let j = 0; j < allCars.length; j++) {
      if (allCars[j].category === categoryName) {
        filteredList.push(allCars[j]);
      }
    }
  }

  displayCars(filteredList);
  // Close sidebar
  closeDrawer();
}

// 5. SEARCH FUNCTION
// Filter cars while typing
document.getElementById("mainSearch").onkeyup = function () {
  let userInput = this.value.toLowerCase();
  let result = [];

  for (let i = 0; i < allCars.length; i++) {
    let name = (allCars[i].brand + " " + allCars[i].model).toLowerCase();

    if (name.indexOf(userInput) > -1) {
      result.push(allCars[i]);
    }
  }

  displayCars(result);
};

// 6. DRAWER TOGGLE
// Open and close sidebar drawer
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("openDrawer");
const closeBtn = document.getElementById("closeDrawer");

openBtn.addEventListener("click", () => {
  drawer.classList.add("active");
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  drawer.classList.remove("active");
  overlay.classList.remove("active");
});

// 7. SIDEBAR DROPDOWN
// Toggle dropdown menu inside sidebar
const toggles = document.querySelectorAll(".toggle");

toggles.forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    const parentLi = this.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".menu li").forEach(function (li) {
      if (li !== parentLi) {
        li.classList.remove("active");
      }
    });

    // Toggle current dropdown
    parentLi.classList.toggle("active");
  });
});

// 8. MODEL FILTER
// Filter cars by specific model
function filterBy(modelName) {
  let filteredList = [];

  for (let i = 0; i < allCars.length; i++) {
    if (allCars[i].model.toLowerCase() === modelName.toLowerCase()) {
      filteredList.push(allCars[i]);
    }
  }

  displayCars(filteredList);
  closeDrawer();
}

// Load cars when page opens
window.onload = fetchCars;
