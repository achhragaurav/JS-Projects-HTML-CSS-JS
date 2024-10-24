const CONFIG = {
  gradient: true,
  animated: true,
  highlight: 2,
  spread: 1,
  primary: "#ffffff",
  secondary: "#606060",
};

// Function to update CSS variables and attributes
const UPDATE = () => {
  document.documentElement.style.setProperty("--highlight", CONFIG.highlight);
  document.documentElement.style.setProperty("--spread", CONFIG.spread);
  document.documentElement.style.setProperty("--primary", CONFIG.primary);
  document.documentElement.style.setProperty("--secondary", CONFIG.secondary);

  document.documentElement.setAttribute("data-gradient", CONFIG.gradient);
  document.documentElement.setAttribute("data-animate", CONFIG.animated);
};

// Event Listeners for each control
document.getElementById("highlight-spread").addEventListener("input", (e) => {
  CONFIG.highlight = e.target.value;
  UPDATE();
});

document.getElementById("highlight-color").addEventListener("input", (e) => {
  CONFIG.primary = e.target.value;
  UPDATE();
});

document.getElementById("use-gradient").addEventListener("change", (e) => {
  CONFIG.gradient = e.target.checked;
  UPDATE();
});

document.getElementById("animate-gradient").addEventListener("change", (e) => {
  CONFIG.animated = e.target.checked;
  UPDATE();
});

document
  .getElementById("highlight-two-spread")
  .addEventListener("input", (e) => {
    CONFIG.spread = e.target.value;
    UPDATE();
  });

document.getElementById("secondary-color").addEventListener("input", (e) => {
  CONFIG.secondary = e.target.value;
  UPDATE();
});

// Initial Update
UPDATE();
