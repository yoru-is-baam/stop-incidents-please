let newMessageDialogObserver: MutationObserver | null = null;
// Prevent alerting the same email twice
const alertedEmails = new Set<string>();
let debounceTimer: number | null = null;

export function blockSendExternalEmails() {
  if (newMessageDialogObserver) {
    newMessageDialogObserver.disconnect();
  }

  newMessageDialogObserver = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(() => {
      const toField = document.querySelector(
        '[name="to"]'
      ) as HTMLInputElement | null;
      if (!toField) return;

      const chips = toField.querySelectorAll(
        "div[draggable='true'] div[role='option']"
      ) as NodeListOf<HTMLDivElement>;

      chips.forEach((chip) => {
        const email = chip.innerText.trim();
        if (!email.includes("lycorp.co.jp") && !alertedEmails.has(email)) {
          console.warn("Blocked external email:", email);

          chip.remove();
          alertedEmails.add(email);

          alert(
            "External email addresses are blocked. Please use your company email."
          );
        }
      });
    }, 100); // Debounce to avoid multiple alerts in quick succession
  });

  newMessageDialogObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

export function unblockSendExternalEmails() {
  if (newMessageDialogObserver) {
    newMessageDialogObserver.disconnect();
    newMessageDialogObserver = null;
  }

  alertedEmails.clear();

  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
}
