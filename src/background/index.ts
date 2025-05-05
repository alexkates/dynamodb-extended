import { OptionKey } from "src/types/option";
import { Storage } from "@plasmohq/storage";

initialize();

async function initialize() {
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  await setDefaultOptionsIfNotSet();
}

async function setDefaultOptionsIfNotSet() {
  const storage = new Storage();

  const unmarshalledJsonOption = await storage.get(OptionKey.UNMARSHALLED_JSON);
  if (unmarshalledJsonOption === undefined) await storage.set(OptionKey.UNMARSHALLED_JSON, false);

  const itemEditorHeightOption = await storage.get(OptionKey.ITEM_EDITOR_HEIGHT);
  if (itemEditorHeightOption === undefined) await storage.set(OptionKey.ITEM_EDITOR_HEIGHT, "70vh");

  const themeOption = await storage.get(OptionKey.THEME);
  if (themeOption === undefined) await storage.set(OptionKey.THEME, "system");
}
