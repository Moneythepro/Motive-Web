const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");
const shareBtn = document.getElementById("shareQuote");
const toggleTheme = document.getElementById("toggleTheme");
const toggleIcon = toggleTheme.querySelector("i");

// 🎵 Sound feedback
const newQuoteSound = new Audio("https://cdn.jsdelivr.net/gh/napthedev/assets/sounds/pop.mp3");

// 🌍 Fetch from Quotable API with full error handling
async function fetchQuote() {
  quoteText.innerHTML = `<span class="loading-icon">⏳</span> Loading...`;
  quoteAuthor.textContent = "";

  try {
    const res = await fetch("https://api.quotable.io/random", { cache: "no-store" });
    if (!res.ok) throw new Error(`API returned ${res.status}`);

    const data = await res.json();
    if (!data.content || !data.author) throw new Error("Invalid quote data");

    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;

    newQuoteSound.play().catch(() => {
      console.warn("Sound failed to play. Possibly blocked by browser.");
    });

  } catch (e) {
    console.error("Fetch error:", e.message || e);
    quoteText.textContent = `"Be yourself; everyone else is already taken."`;
    quoteAuthor.textContent = "— Oscar Wilde";
  }
}

// 📋 Copy quote with visual feedback
function copyQuote() {
  const fullQuote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(fullQuote).then(() => {
    copyBtn.innerHTML = `<i class="fas fa-check icon"></i> Copied!`;
    navigator.vibrate?.(100);
    setTimeout(() => {
      copyBtn.innerHTML = `<i class="fas fa-copy icon"></i> Copy`;
    }, 1500);
  });
}

// 📤 Share quote via native share or fallback
function shareQuote() {
  const fullQuote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  if (navigator.share) {
    navigator.share({ text: fullQuote }).catch(() => {
      alert("Sharing was canceled or failed.");
    });
  } else {
    alert("Sharing not supported on this browser.");
  }
}

// 🌓 Toggle theme & persist
function applyTheme(saved = false) {
  const currentIsDark = document.body.classList.contains("dark");
  const newIsDark = saved ? localStorage.getItem("theme") === "dark" : !currentIsDark;

  document.body.classList.toggle("dark", newIsDark);
  if (toggleIcon) {
    toggleIcon.className = newIsDark ? "fas fa-sun" : "fas fa-moon";
  }
  localStorage.setItem("theme", newIsDark ? "dark" : "light");
}

// 🧠 Restore theme from memory
function restoreTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");

  if (toggleIcon) {
    toggleIcon.className = document.body.classList.contains("dark") ? "fas fa-sun" : "fas fa-moon";
  }
}

// 🔘 Button actions
newQuoteBtn.onclick = fetchQuote;
copyBtn.onclick = copyQuote;
shareBtn.onclick = shareQuote;
toggleTheme.onclick = () => applyTheme(false);

// 🚀 Initial load
fetchQuote();
restoreTheme();

// 🎆 particles.js animated background
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 60 },
      color: { value: "#60a5fa" },
      shape: { type: "circle" },
      opacity: { value: 0.4 },
      size: { value: 4, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#60a5fa",
        opacity: 0.2,
        width: 1,
      },
      move: { enable: true, speed: 2 },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
      },
    },
    retina_detect: true,
  });
} else {
  console.warn("particles.js not loaded.");
}
