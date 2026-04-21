//////////////////////////////////////////////////////
// 🌍 VIRTUAL TRAVEL ENGINE (MAIN CONTROLLER)
//////////////////////////////////////////////////////

// ---------------- OPEN COUNTRY ----------------
function openCountry(country) {
  localStorage.setItem("selectedCountry", country);
  window.location.href = "country.html";
}

//////////////////////////////////////////////////////
// 🔍 SEARCH SYSTEM
//////////////////////////////////////////////////////

function setupSearch() {
  const searchInput = document.getElementById("search");
  const resultsBox = document.getElementById("results");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const results = Object.keys(countries).filter(key =>
      countries[key].name.toLowerCase().includes(value)
    );

    resultsBox.innerHTML = results.length
      ? results.map(r =>
          `<p onclick="openCountry('${r}')">
            🌍 ${countries[r].name}
          </p>`
        ).join("")
      : `<p>No results found</p>`;
  });
}

//////////////////////////////////////////////////////
// 🌙 DARK / LIGHT MODE
//////////////////////////////////////////////////////

function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.body.classList.add("light");
  }
}

//////////////////////////////////////////////////////
// 🎬 PAGE TRANSITIONS
//////////////////////////////////////////////////////

function fadeInPage() {
  document.body.style.opacity = 0;

  setTimeout(() => {
    document.body.style.transition = "0.6s ease";
    document.body.style.opacity = 1;
  }, 100);
}

//////////////////////////////////////////////////////
// 🌍 COUNTRY LOADER (COUNTRY PAGE ENGINE)
//////////////////////////////////////////////////////

function loadCountryPage() {
  const key = localStorage.getItem("selectedCountry");

  if (!key || !countries[key]) {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <h2>⚠ No Country Selected</h2>
        <p>Please go back and select a country.</p>
        <button onclick="goBack()">Go Back</button>
      </div>
    `;
    return;
  }

  const data = countries[key];

  document.getElementById("app").innerHTML = showLoader();

  setTimeout(() => {
    document.getElementById("app").innerHTML = renderCountry(data);

    fadeInPage();
    startPanoramaEffect();
    setupCountryFeatures(data);
    setup360(data.image);

    showToast("🌍 Welcome to " + data.name);

  }, 1000);
}

//////////////////////////////////////////////////////
// 🎧 COUNTRY FEATURES
//////////////////////////////////////////////////////

function setupCountryFeatures(data) {

  // Audio autoplay
  const audio = document.querySelector("audio");
  if (audio) {
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "r") {
      showToast("🔄 Reloading...");
      location.reload();
    }

    if (e.key === "b") {
      goBack();
    }
  });

  // Image hover effect
  const img = document.getElementById("mainImg");

  if (img) {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05) rotateY(5deg)";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotateY(0deg)";
    });
  }
}

//////////////////////////////////////////////////////
// 🌍 360° PANORAMA SYSTEM
//////////////////////////////////////////////////////

function setup360(image) {
  const pano = document.querySelector(".panorama-inner");

  if (!pano) return;

  pano.style.backgroundImage = `url(${image})`;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const container = document.getElementById("panorama");

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let moveX = e.clientX - startX;
    currentX += moveX * 0.5;

    pano.style.transform = `translateX(${currentX}px)`;

    startX = e.clientX;
  });

  // Touch support
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", () => {
    isDragging = false;
  });

  container.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    let moveX = e.touches[0].clientX - startX;
    currentX += moveX * 0.5;

    pano.style.transform = `translateX(${currentX}px)`;

    startX = e.touches[0].clientX;
  });
}

//////////////////////////////////////////////////////
// 🎬 UI ANIMATIONS
//////////////////////////////////////////////////////

function startPanoramaEffect() {
  let angle = 0;

  setInterval(() => {
    const img = document.getElementById("mainImg");

    if (img) {
      img.style.transform = `rotateY(${angle}deg) scale(1.02)`;
      angle += 0.3;
    }
  }, 30);
}

//////////////////////////////////////////////////////
// 🔔 TOAST NOTIFICATIONS
//////////////////////////////////////////////////////

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

//////////////////////////////////////////////////////
// 🔄 NAVIGATION
//////////////////////////////////////////////////////

function goBack() {
  window.location.href = "index.html";
}

//////////////////////////////////////////////////////
// 🚀 INIT APP
//////////////////////////////////////////////////////

window.onload = function () {
  loadTheme();
  setupSearch();

  if (document.getElementById("app")) {
    loadCountryPage();
  }
};