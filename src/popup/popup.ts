// FIXME: There's a bug where the first click on input[type='file'] still opens the file explorer, but this only occurs on the following website: https://smallpdf.com/pdf-to-word#r=convert-to-word
import type { ChromeTab, ToggleProtectionsMessage } from "../types/popup";

const btn = document.getElementById("toggle-btn");

if (!btn) {
  console.error('Button with id "toggle-btn" not found');
} else {
  // Load initial state from chrome.storage
  chrome.storage.local.get("isOn", (result: { isOn?: boolean }) => {
    const isOn = !!result.isOn;
    toggleExtension(isOn);
  });

  btn.addEventListener("click", () => {
    // Get the current state from button class
    const isOn = !btn.classList.contains("on");

    // Save new state
    chrome.storage.local.set({ isOn });

    toggleExtension(isOn);
    sendToggleState(isOn);
  });
}

function toggleExtension(isOn: boolean) {
  btn!.classList.toggle("on", isOn);
  btn!.classList.toggle("off", !isOn);
  btn!.textContent = isOn ? "ON" : "OFF";
}

function sendToggleState(isOn: boolean) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs: ChromeTab[]) => {
      if (tabs[0]?.id !== undefined) {
        const message: ToggleProtectionsMessage = { enable: isOn };
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    }
  );
}
