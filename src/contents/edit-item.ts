import type { PlasmoCSConfig } from "plasmo";

import { getItemEditorResizeDiv, getJsonViewButton, getViewDynamoDBJsonCheckbox } from "src/poms/edit-item";
import { OptionKey } from "src/types/option";
import { Storage } from "@plasmohq/storage";

export const config: PlasmoCSConfig = {
  matches: ["https://*.console.aws.amazon.com/dynamodbv2/*"],
  all_frames: true,
};

const storage = new Storage();
new MutationObserver(async () => {
  const unmarshalledJsonOption = await storage.get(OptionKey.UNMARSHALLED_JSON);
  const itemEditorHeightOption = await storage.get(OptionKey.ITEM_EDITOR_HEIGHT);
  if (!unmarshalledJsonOption) return;

  const jsonViewButton = getJsonViewButton();
  if (jsonViewButton?.ariaPressed === "false") jsonViewButton?.click();

  const viewDynamoDBJsonButton = getViewDynamoDBJsonCheckbox();
  if (viewDynamoDBJsonButton?.checked) viewDynamoDBJsonButton.click();

  const itemEditorResizeDiv = getItemEditorResizeDiv();
  itemEditorResizeDiv?.setAttribute("style", `height: ${itemEditorHeightOption};`);
}).observe(document.body, {
  childList: true,
});
