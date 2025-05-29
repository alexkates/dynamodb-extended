import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";
import { getRunButton } from "src/poms/item-explorer";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

new MutationObserver(() => {
  const runButton = getRunButton();
  runButton?.addEventListener("click", onRunClicked);
}).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});

async function onRunClicked() {
  await sendToBackground({ name: "query-executed" });
}
