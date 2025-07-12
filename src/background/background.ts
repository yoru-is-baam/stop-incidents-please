import type { ToggleProtectionsMessage } from "../types/popup";

// Listen for tab updates (new page loads, reloads)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If the tab is a valid web page, send a message to the content script
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.startsWith("http")
  ) {
    // Read the extension state from chrome.storage
    chrome.storage.local.get("isOn", (result: { isOn?: boolean }) => {
      if (result.isOn) {
        // Send a message to the tab's content script
        chrome.tabs.sendMessage(tabId, {
          enable: true,
        } as ToggleProtectionsMessage);
      }
    });
  }
});
