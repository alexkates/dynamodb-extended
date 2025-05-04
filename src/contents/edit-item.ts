import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";
import { waitForJsonViewButton, waitForViewDynamoDBJsonButton } from "src/poms/edit-item";
import { getOption, getOptions } from "src/db/option";
import { OptionKey } from "src/types/option";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

initialize();

async function initialize() {
  const jsonViewButton = await waitForJsonViewButton();
  const option = await getOption(OptionKey.UNMARSHALLED_JSON);

  if (!!option?.value) {
    jsonViewButton?.click();

    const viewDynamoDBJsonButton = await waitForViewDynamoDBJsonButton();
    viewDynamoDBJsonButton?.click();
  }
}

async function onRunClicked() {
  await sendToBackground({ name: "query-executed" });
}
