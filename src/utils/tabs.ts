export function updateCurrentTabUrlAndForceReload(newUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError);
        return;
      }

      if (!tabs || tabs.length === 0 || !tabs[0].id) {
        console.error("No active tab found");
        reject(new Error("No active tab found"));
        return;
      }

      const tabId = tabs[0].id;
      const handleTabUpdated = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
        if (updatedTabId === tabId && changeInfo.status === "loading") {
          // Once the tab starts loading, we can force a reload just to be sure
          chrome.tabs.reload(tabId);
          // Clean up the listener so it doesn't hang around
          chrome.tabs.onUpdated.removeListener(handleTabUpdated);
          resolve();
        }
      };

      chrome.tabs.onUpdated.addListener(handleTabUpdated);

      chrome.tabs.update(tabId, { url: newUrl }, (tab) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          chrome.tabs.onUpdated.removeListener(handleTabUpdated);
          reject(chrome.runtime.lastError);
        }
      });
    });
  });
}
