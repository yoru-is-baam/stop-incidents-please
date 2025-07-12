// --- Prevent file selection via file input elements ---
function preventFileInput(event: Event) {
  if (
    event.target instanceof HTMLInputElement &&
    event.target.type === "file"
  ) {
    event.preventDefault();
    event.stopPropagation();
    alert("File selection is disabled on this page.");
  }
}

let fileInputObserver: MutationObserver | null = null;

export function blockAllFileInputs() {
  // Attach to existing file inputs
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("click", preventFileInput, true);
    input.addEventListener("change", preventFileInput, true);
  });

  // Observe for dynamically added file inputs
  fileInputObserver = new MutationObserver(() => {
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.addEventListener("click", preventFileInput, true);
      input.addEventListener("change", preventFileInput, true);
    });
  });

  fileInputObserver.observe(document.body, { childList: true, subtree: true });
}

export function unblockAllFileInputs() {
  // Remove listeners from all current file inputs
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.removeEventListener("click", preventFileInput, true);
    input.removeEventListener("change", preventFileInput, true);
  });

  // Disconnect the observer if it's active
  fileInputObserver?.disconnect();
  fileInputObserver = null;
}
