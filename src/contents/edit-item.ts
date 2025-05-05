import type { PlasmoCSConfig } from "plasmo";

import { waitForItemEditorResizeDiv, waitForJsonViewButton, waitForViewDynamoDBJsonButton } from "src/poms/edit-item";
import { OptionKey } from "src/types/option";
import { Storage } from "@plasmohq/storage";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

initialize();

async function initialize() {
  const storage = new Storage();
  const jsonViewButton = await waitForJsonViewButton();
  const unmarshalledJsonOption = await storage.get(OptionKey.UNMARSHALLED_JSON);
  if (!!unmarshalledJsonOption) {
    jsonViewButton?.click();

    const viewDynamoDBJsonButton = await waitForViewDynamoDBJsonButton();
    viewDynamoDBJsonButton?.click();

    // This is done only when umarshalled JSON is enabled because it is the JSON editor that we are changing the default height of.
    const itemEditorResizeDiv = await waitForItemEditorResizeDiv();
    const itemEditorHeightOption = await storage.get(OptionKey.ITEM_EDITOR_HEIGHT);
    if (itemEditorHeightOption && itemEditorResizeDiv) itemEditorResizeDiv.style.height = itemEditorHeightOption;
  }
}
