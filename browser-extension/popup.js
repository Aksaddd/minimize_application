/**
 * Minimize Browser Tracker - Popup Script
 */

const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const currentUrl = document.getElementById("currentUrl");
const currentDomain = document.getElementById("currentDomain");
const toggleBtn = document.getElementById("toggleBtn");

function updateUI(status) {
  if (status.tracking) {
    statusDot.classList.remove("off");
    statusText.textContent = "Active";
    toggleBtn.textContent = "Pause Tracking";
    toggleBtn.classList.add("active");
  } else {
    statusDot.classList.add("off");
    statusText.textContent = "Paused";
    toggleBtn.textContent = "Resume Tracking";
    toggleBtn.classList.remove("active");
  }

  if (status.currentTab) {
    currentUrl.textContent = status.currentTab.url;
    currentUrl.classList.remove("muted");
    currentDomain.textContent = status.currentTab.domain;
    currentDomain.classList.remove("muted");
  } else {
    currentUrl.textContent = "Not tracking";
    currentUrl.classList.add("muted");
    currentDomain.textContent = "-";
    currentDomain.classList.add("muted");
  }
}

// Get initial status
chrome.runtime.sendMessage({ type: "getStatus" }, (response) => {
  if (response) {
    updateUI(response);
  }
});

// Toggle tracking
toggleBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "toggleTracking" }, (response) => {
    if (response) {
      updateUI(response);
    }
  });
});
