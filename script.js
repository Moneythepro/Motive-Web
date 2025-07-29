const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "F. D. Roosevelt" },
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");
const shareBtn = document.getElementById("shareQuote");
const toggleTheme = document.getElementById("toggleTheme");

function getRandomQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `"${random.text}"`;
  quoteAuthor.textContent = `— ${random.author}`;
}

function copyQuote() {
  const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(quote).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
}

function shareQuote() {
  const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  if (navigator.share) {
    navigator.share({ text: quote }).catch(console.error);
  } else {
    alert("Sharing not supported on this browser.");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

newQuoteBtn.onclick = getRandomQuote;
copyBtn.onclick = copyQuote;
shareBtn.onclick = shareQuote;
toggleTheme.onclick = toggleDarkMode;

// Initial load
getRandomQuote();
