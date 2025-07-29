const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");
const shareBtn = document.getElementById("shareQuote");
const toggleTheme = document.getElementById("toggleTheme");

// 🎵 Sound feedback
const newQuoteSound = new Audio("https://cdn.jsdelivr.net/gh/napthedev/assets/sounds/pop.mp3");

// 🌍 Fetch from API
async function fetchQuote() {
  try {
    quoteText.textContent = "Loading...";
    quoteAuthor.textContent = "";

    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();

    const quote = data[0];
    quoteText.textContent = `"${quote.q}"`;
    quoteAuthor.textContent = `— ${quote.a}`;

    newQuoteSound.play();
  } catch (e) {
    quoteText.textContent = "Something went wrong. Try again.";
    quoteAuthor.textContent = "😢";
  }
}

// 📋 Copy quote
function copyQuote() {
  const fullQuote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(fullQuote).then(() => {
    copyBtn.textContent = "✅ Copied!";
    navigator.vibrate?.(100);
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
}

// 📤 Share quote
function shareQuote() {
  const fullQuote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  if (navigator.share) {
    navigator.share({ text: fullQuote });
  } else {
    alert("Sharing not supported on this browser.");
  }
}

// 🌓 Theme toggle + memory
function applyTheme(saved = false) {
  const isDark = saved ? localStorage.getItem("theme") === "dark" : !document.body.classList.contains("dark");
  document.body.classList.toggle("dark", isDark);
  toggleTheme.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// 🧠 Restore theme on load
function restoreTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// 🔄 Event listeners
newQuoteBtn.onclick = fetchQuote;
copyBtn.onclick = copyQuote;
shareBtn.onclick = shareQuote;
toggleTheme.onclick = () => applyTheme(false);

// 🌟 Init
fetchQuote();
restoreTheme();

// 🎆 particles.js config
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
