/**
 * Minimize Browser Tracker - Background Service Worker
 *
 * Tracks tab activity (full URLs) and sends events to the local
 * FastAPI backend at http://127.0.0.1:8742/api/browser-activity/events
 */

const API_BASE = "http://127.0.0.1:8742/api/browser-activity";

let currentTab = null; // { url, domain, title, startedAt }
let trackingEnabled = true;

// --- Helpers ---

function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function isTrackableUrl(url) {
  if (!url) return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

async function sendEvent(tabData) {
  if (!tabData || !tabData.url) return;

  const payload = {
    url: tabData.url,
    domain: tabData.domain,
    page_title: tabData.title || null,
    started_at: tabData.startedAt,
    ended_at: new Date().toISOString(),
  };

  try {
    await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Backend not running - silently ignore.
    // Events are fire-and-forget; if the backend is down we just lose this event.
  }
}

function startTracking(tab) {
  if (!tab || !tab.url || !isTrackableUrl(tab.url)) {
    currentTab = null;
    return;
  }

  currentTab = {
    url: tab.url,
    domain: extractDomain(tab.url),
    title: tab.title || "",
    startedAt: new Date().toISOString(),
  };
}

// --- Event Listeners ---

// User switched to a different tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (!trackingEnabled) return;

  // Close previous tab event
  if (currentTab) {
    await sendEvent(currentTab);
  }

  // Get the newly active tab info
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    startTracking(tab);
  } catch {
    currentTab = null;
  }
});

// Page finished loading (URL changed within the same tab)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!trackingEnabled) return;
  if (changeInfo.status !== "complete") return;

  // Only care about the currently active tab
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!activeTab || activeTab.id !== tabId) return;

  // If the URL actually changed, close old event and start new
  if (currentTab && currentTab.url !== tab.url) {
    await sendEvent(currentTab);
    startTracking(tab);
  } else if (!currentTab) {
    startTracking(tab);
  }
});

// Browser window focus changed (user might have left Chrome entirely)
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (!trackingEnabled) return;

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // Chrome lost focus - close current event
    if (currentTab) {
      await sendEvent(currentTab);
      currentTab = null;
    }
  } else {
    // Chrome regained focus - start tracking active tab
    try {
      const [activeTab] = await chrome.tabs.query({
        active: true,
        windowId: windowId,
      });
      if (activeTab) {
        startTracking(activeTab);
      }
    } catch {
      // Ignore errors
    }
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getStatus") {
    sendResponse({
      tracking: trackingEnabled,
      currentTab: currentTab
        ? { url: currentTab.url, domain: currentTab.domain }
        : null,
    });
  } else if (message.type === "toggleTracking") {
    trackingEnabled = !trackingEnabled;
    if (!trackingEnabled && currentTab) {
      sendEvent(currentTab);
      currentTab = null;
    }
    sendResponse({ tracking: trackingEnabled });
  }
  return true;
});
