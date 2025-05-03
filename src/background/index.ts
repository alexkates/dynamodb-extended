import { saveOption } from "src/db/option";
import { OptionKey, type Option } from "src/types/option";

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

// Function to handle DynamoDB URL checking and side panel setup
const setupSidePanelForTab = async (tabId: number, url: string | undefined) => {
  if (!url) return;

  if (/^https:\/\/.*\.console\.aws\.amazon\.com\/dynamodbv2\/.*/.test(url)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html",
      enabled: true,
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
};

// Handle tab updates
chrome.tabs.onUpdated.addListener(async (tabId, _info, tab) => {
  await setupSidePanelForTab(tabId, tab.url);
});

// Handle tab activation (switching between tabs)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  await setupSidePanelForTab(activeInfo.tabId, tab.url);
});

chrome.runtime.onInstalled.addListener(() => {
  const defaultOptions: Option[] = [
    {
      key: OptionKey.UNMARSHALLED_JSON,
      value: "false",
      name: "Unmarshalled JSON",
      description: "Changes the default DynamoDB Edit Item screen to unmarshalled JSON.",
    },
  ];

  defaultOptions.forEach(async (option) => {
    await saveOption(option);
  });
});
