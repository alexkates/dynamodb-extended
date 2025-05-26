import { Storage } from "@plasmohq/storage";

export type ActiveTab = "recent" | "favorites";
export const ACTIVE_TAB_KEY = "dynamodb-extended-active-tab";

let storageInstance: Storage | null = null;

function getInstance() {
  if (!storageInstance) storageInstance = new Storage();

  return storageInstance;
}

export async function getActiveTab(): Promise<ActiveTab> {
  const storage = getInstance();
  const activeTab = await storage.get<ActiveTab>(ACTIVE_TAB_KEY);

  return activeTab || "recent"; // Default to "recent" if no preference is stored
}

export async function setActiveTab(tab: ActiveTab): Promise<void> {
  const storage = getInstance();
  await storage.set(ACTIVE_TAB_KEY, tab);
}
