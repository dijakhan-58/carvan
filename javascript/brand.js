// ============================================================
//  CARVAN — brand.js  (mobile-aware update)
// ============================================================

const models = {
  Camry: {
    brand: "Toyota", origin: "JAPAN // 1937", color: "#eb0a1e",
    speed: "240", power: "301", legacy: "SEDAN",
    desc: "Toyota Camry Sedan",
    image: "assets/images/car category/sedans/toyota.camr.png",
  },
  "Land Cruiser": {
    brand: "Toyota", origin: "JAPAN // 1937", color: "#eb0a1e",
    speed: "210", power: "409", legacy: "4X4",
    desc: "Toyota Land Cruiser 4x4",
    image: "assets/images/car category/jeeps/toyota.land cruiser.png",
  },
  "C-Class": {
    brand: "Mercedes", origin: "GERMANY // 1926", color: "#adb5bd",
    speed: "250", power: "255", legacy: "SEDAN",
    desc: "Mercedes C-Class",
    image: "assets/images/car category/sedans/mercedes-banz.c-class.png",
  },
  "G-Class": {
    brand: "Mercedes", origin: "GERMANY // 1926", color: "#adb5bd",
    speed: "220", power: "577", legacy: "4X4",
    desc: "Mercedes G-Class",
    image: "assets/images/car category/jeeps/mercedes-banz.g-class.png",
  },
  "3 Series": {
    brand: "BMW", origin: "GERMANY // 1916", color: "#2d5da1",
    speed: "250", power: "255", legacy: "SEDAN",
    desc: "BMW 3 Series",
    image: "assets/images/car category/sedans/bmw.3series.png",
  },
  M4: {
    brand: "BMW", origin: "GERMANY // 1916", color: "#2d5da1",
    speed: "290", power: "503", legacy: "SPORT",
    desc: "BMW M4 Sports",
    image: "assets/images/car category/sports car/bmw m4.png",
  },
  "911": {
    brand: "Porsche", origin: "GERMANY // 1931", color: "#ffcc00",
    speed: "308", power: "640", legacy: "SPORT",
    desc: "Porsche 911",
    image: "assets/images/car category/sports car/porsche.911.png",
  },
  Cayenne: {
    brand: "Porsche", origin: "GERMANY // 1931", color: "#ffcc00",
    speed: "286", power: "468", legacy: "SUV",
    desc: "Porsche Cayenne",
    image: "assets/images/car category/suvs/porsche cayenne.png",
  },
  "296 GTB": {
    brand: "Ferrari", origin: "ITALY // 1947", color: "#ff2800",
    speed: "330", power: "818", legacy: "SPORT",
    desc: "Ferrari 296 GTB",
    image: "assets/images/car category/sports car/ferrari 296 gtb.png",
  },
  "250 GTO": {
    brand: "Ferrari", origin: "ITALY // 1947", color: "#ff2800",
    speed: "280", power: "296", legacy: "VINTAGE",
    desc: "Ferrari 250 GTO",
    image: "assets/images/car category/vintage cars/ferrari.250 gto.png",
  },
};

// ── Model switcher ──────────────────────────────────────────
function changeModel(modelName) {
  const data = models[modelName];
  if (!data) return;

  $(".main-stage").fadeOut(200, function () {
    $("#brandName").text(data.brand.toUpperCase());
    $("#brandNameBg").text(data.brand.toUpperCase());
    $("#brandOrigin").text(data.origin);
    $("#brandDesc").text(data.desc);
    $("#statSpeed").text(data.speed + " KM/H");
    $("#statPower").text(data.power + " HP");
    $("#statLegacy").text(data.legacy);
    if (data.image) $("#brandImg").attr("src", data.image);
    $(this).fadeIn(200, function () { AOS.refresh(); });
  });

  // Close mobile drawer after selection
  closeBrandDrawer();
}

// ── Brand logo bar click ────────────────────────────────────
function updateBrand(brandName) {
  // highlight active logo card
  $(".brand-logo-card").removeClass("active");
  $(`.brand-logo-card[onclick="updateBrand('${brandName}')"]`).addClass("active");

  // pick first model of that brand
  const firstModel = Object.keys(models).find(k => models[k].brand === brandName);
  if (firstModel) changeModel(firstModel);
}

// ── Sidebar accordion ───────────────────────────────────────
$(document).on("click", ".brand-parent", function () {
  $(this).next(".sub-menu").slideToggle(200);
});

// ── Mobile drawer ───────────────────────────────────────────
function openBrandDrawer() {
  $("#brandPicker").addClass("open");
  $("#brandPickerOverlay").addClass("show");
  $("#brandToggleBtn").html('<i class="fa-solid fa-xmark"></i> CLOSE');
}

function closeBrandDrawer() {
  $("#brandPicker").removeClass("open");
  $("#brandPickerOverlay").removeClass("show");
  $("#brandToggleBtn").html('<i class="fa-solid fa-sliders"></i> BRANDS');
}

function toggleBrandDrawer() {
  if ($("#brandPicker").hasClass("open")) {
    closeBrandDrawer();
  } else {
    openBrandDrawer();
  }
}

// ── Inject mobile elements on DOM ready ────────────────────
$(function () {
  // Add IDs needed by JS
  $(".brand-picker").attr("id", "brandPicker");

  // Inject overlay
  if (!$("#brandPickerOverlay").length) {
    $("body").append('<div class="brand-picker-overlay" id="brandPickerOverlay" onclick="closeBrandDrawer()"></div>');
  }

  // Inject floating toggle button
  if (!$("#brandToggleBtn").length) {
    $("body").append(
      '<button class="brand-picker-toggle" id="brandToggleBtn" onclick="toggleBrandDrawer()">' +
      '<i class="fa-solid fa-sliders"></i> BRANDS</button>'
    );
  }
});