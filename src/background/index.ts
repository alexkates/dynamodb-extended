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
  ];

  defaultOptions.forEach(async (option) => {
    await saveOption(option);
  });
});
