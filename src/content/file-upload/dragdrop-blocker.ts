// --- Prevent file drag-and-drop anywhere on the page ---
function preventFileDrop(event: Event) {
  if (
    event instanceof DragEvent &&
    event.dataTransfer &&
    Array.from(event.dataTransfer.types).includes("Files")
  ) {
    event.preventDefault();
    event.stopPropagation();
    alert("File drag-and-drop is disabled on this page.");
  }
}

export function addGlobalDragDropBlockers() {
  ["dragover", "drop"].forEach((eventName) => {
    window.addEventListener(eventName, preventFileDrop, true);
    document.addEventListener(eventName, preventFileDrop, true);
    document.body?.addEventListener(eventName, preventFileDrop, true);
  });
}

export function removeGlobalDragDropBlockers() {
  ["dragover", "drop"].forEach((eventName) => {
    window.removeEventListener(eventName, preventFileDrop, true);
    document.removeEventListener(eventName, preventFileDrop, true);
    document.body?.removeEventListener(eventName, preventFileDrop, true);
  });
}
