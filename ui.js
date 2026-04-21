//////////////////////////////////////////////////////
// 🌍 UI CONTROLLER (RENDER SYSTEM)
//////////////////////////////////////////////////////

// ---------------- LOADER ----------------
function showLoader() {
  return `
    <div class="loader">
      🌍 Loading Virtual Travel Experience...
    </div>
  `;
}

//////////////////////////////////////////////////////
// 🌍 RENDER COUNTRY PAGE UI
//////////////////////////////////////////////////////

function renderCountry(data) {
  return `
    <div class="country-container">

      <h1 class="fade-in">🌍 ${data.name}</h1>

      <img 
        src="${data.image}" 
        class="country-img zoom-in" 
        id="mainImg"
      >

      <!-- STORY CARD -->
      <div class="card slide-up">
        <h2>📖 Story</h2>
        <p>${data.desc}</p>
      </div>

      <!-- FACTS CARD -->
      <div class="card slide-up">
        <h2>📌 Key Facts</h2>
        <ul>
          ${data.facts.map(f => `<li>✨ ${f}</li>`).join("")}
        </ul>
      </div>

      <!-- AUDIO -->
      <div class="card">
        <h2>🎧 Ambient Sound</h2>
        <audio controls autoplay loop>
          <source src="${data.audio}">
        </audio>
      </div>

      <!-- 🌍 360 PANORAMA -->
      <div class="panorama" id="panorama">
        <div class="panorama-inner"></div>
      </div>

    </div>
  `;
}

//////////////////////////////////////////////////////
// 🎬 PAGE ANIMATIONS
//////////////////////////////////////////////////////

function fadeInPage() {
  document.body.style.opacity = 0;

  setTimeout(() => {
    document.body.style.transition = "0.6s ease";
    document.body.style.opacity = 1;
  }, 100);
}

//////////////////////////////////////////////////////
// 🌟 IMAGE + PANORAMA EFFECT
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
// 🔔 TOAST NOTIFICATION SYSTEM
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
// 🌐 UI HELPERS
//////////////////////////////////////////////////////

function createCard(title, content) {
  return `
    <div class="card">
      <h2>${title}</h2>
      <p>${content}</p>
    </div>
  `;
}

//////////////////////////////////////////////////////
// 🎨 BUTTON CREATOR (REUSABLE)
//////////////////////////////////////////////////////

function createButton(text, onclick) {
  return `
    <button onclick="${onclick}">
      ${text}
    </button>
  `;
}

//////////////////////////////////////////////////////
// 🌙 OPTIONAL UI STATE HELPERS
//////////////////////////////////////////////////////

function setLoadingState(elementId) {
  document.getElementById(elementId).innerHTML = showLoader();
}

function clearElement(id) {
  document.getElementById(id).innerHTML = "";
}