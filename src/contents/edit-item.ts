import type { PlasmoCSConfig } from "plasmo";

import { waitForItemEditorResizeDiv, waitForJsonViewButton, waitForViewDynamoDBJsonButton } from "src/poms/edit-item";
import { getOption } from "src/db/option";
import { OptionKey } from "src/types/option";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

initialize();

async function initialize() {
  const jsonViewButton = await waitForJsonViewButton();
  const unmarshalledJsonOption = await getOption(OptionKey.UNMARSHALLED_JSON);
  if (!!unmarshalledJsonOption?.value) {
    jsonViewButton?.click();

    const viewDynamoDBJsonButton = await waitForViewDynamoDBJsonButton();
    viewDynamoDBJsonButton?.click();

    // This is done only when umarshalled JSON is enabled because it is the JSON editor that we are changing the default height of.
    const itemEditorResizeDiv = await waitForItemEditorResizeDiv();
    const itemEditorHeightOption = await getOption(OptionKey.ITEM_EDITOR_HEIGHT);
    if (itemEditorHeightOption?.value && itemEditorResizeDiv) {
      const itemEditorHeight = itemEditorHeightOption.value as string;
      itemEditorResizeDiv.style.height = itemEditorHeight;
    }
  }
}
