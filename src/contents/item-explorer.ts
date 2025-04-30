import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";

import { waitForRunButton } from "src/poms/item-explorer";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

initialize();

async function initialize() {
  const runButton = await waitForRunButton();

  runButton?.addEventListener("click", onRunClicked);
}

async function onRunClicked() {
  await sendToBackground({ name: "query-executed" });
}
