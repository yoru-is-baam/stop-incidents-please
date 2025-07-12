import type { ToggleProtectionsMessage } from "../types/popup";
import {
  addGlobalDragDropBlockers,
  removeGlobalDragDropBlockers,
} from "./file-upload/dragdrop-blocker";
import {
  blockAllFileInputs,
  unblockAllFileInputs,
} from "./file-upload/fileinput-blocker";

// Listen for messages from popup or background scripts
chrome.runtime.onMessage.addListener(
  (message: ToggleProtectionsMessage, _, __) => {
    console.log("Content script is received message:", message);

    if (message.enable) {
      addGlobalDragDropBlockers();
      blockAllFileInputs();
    } else {
      removeGlobalDragDropBlockers();
      unblockAllFileInputs();
    }
  }
);
