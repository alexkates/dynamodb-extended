import type { PlasmoCSConfig } from "plasmo";

import { debounce, observeElementAppearance, waitForElement } from "src/utils/dom";
import { waitForItemEditorResizeDiv, waitForJsonViewButton, waitForViewDynamoDBJsonButton } from "src/poms/edit-item";
import { OptionKey } from "src/types/option";
import { Storage } from "@plasmohq/storage";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

// Track initialization state
let isInitializing = false;

// Initialize once on script load
initialize();

// Also set up persistent observers for navigation changes
setupPersistentObservers();

async function initialize() {
  // Prevent concurrent initializations
  if (isInitializing) return;
  isInitializing = true;

  try {
    const storage = new Storage();
    const jsonViewButton = await waitForJsonViewButton();
    const unmarshalledJsonOption = await storage.get(OptionKey.UNMARSHALLED_JSON);

    if (!!unmarshalledJsonOption && jsonViewButton) {
      jsonViewButton.click();

      const viewDynamoDBJsonButton = await waitForViewDynamoDBJsonButton();
      if (viewDynamoDBJsonButton) {
        viewDynamoDBJsonButton.click();

        // This is done only when umarshalled JSON is enabled because it is the JSON editor that we are changing the default height of.
        const itemEditorResizeDiv = await waitForItemEditorResizeDiv();
        const itemEditorHeightOption = await storage.get(OptionKey.ITEM_EDITOR_HEIGHT);
        if (itemEditorHeightOption && itemEditorResizeDiv) itemEditorResizeDiv.style.height = itemEditorHeightOption;
      }
    }
  } finally {
    // Allow future initializations after a short delay
    setTimeout(() => {
      isInitializing = false;
    }, 500);
  }
}

function setupPersistentObservers() {
  // Track the last URL to avoid repeated processing
  let lastUrl = location.href;
  let lastProcessedElementTime = 0;

  // Debounced initialize function to prevent rapid successive calls
  const debouncedInitialize = debounce(() => {
    initialize();
  }, 300);

  // Watch for URL changes that might indicate navigation
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      // Re-initialize when navigation is detected
      debouncedInitialize();
    }
  }).observe(document, { subtree: true, childList: true });

  // Set up observers for key elements that might appear after client-side navigation
  observeElementAppearance<HTMLButtonElement>('button[data-testid="JSON_VIEW_MODE"]:not([disabled])', (element) => {
    // Limit how frequently we can respond to this element appearing
    const now = Date.now();
    if (now - lastProcessedElementTime > 1000) {
      lastProcessedElementTime = now;
      debouncedInitialize();
    }
  });
}
