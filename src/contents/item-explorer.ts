import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";

import { waitForRunButton } from "src/poms/item-explorer";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

initialize().then(() => {
  console.log("Item Explorer content script loaded");
});

async function initialize() {
  const runButton = await waitForRunButton();

  runButton?.addEventListener("click", async () => {
    const response = await sendToBackground({
      name: "query-executed",
    });
  });
}
