import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";

import { waitForRunButton } from "src/poms/item-explorer";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

initialize().then(() => {
  console.log("Item Explorer content script loaded");
});

async function initialize() {
  try {
    const runButton = await waitForRunButton();

    runButton.addEventListener("click", async () => {
      const response = await sendToBackground({
        name: "query-executed",
      });

      console.log("Response from background script:", response);
    });
  } catch (error) {
    console.error("Failed to find run button:", error);
  }
}
