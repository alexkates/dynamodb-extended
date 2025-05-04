import { saveOption } from "src/db/option";
import { OptionKey, type Option } from "src/types/option";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  const defaultOptions: Option[] = [
    {
      key: OptionKey.UNMARSHALLED_JSON,
      value: false,
      name: "Unmarshalled JSON",
      description: "Changes the default DynamoDB Edit Item screen to unmarshalled JSON.",
    },
    {
      key: OptionKey.ITEM_EDITOR_HEIGHT,
      value: "800px",
      name: "Item Editor Height",
      description: "Changes the default height of the Item Editor screen.",
    },
  ];

  defaultOptions.forEach(async (option) => {
    await saveOption(option);
    console.log("Saved option:", option);
  });
});
