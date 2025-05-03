import type { Option, OptionKey } from "src/types/option";
import { Storage } from "@plasmohq/storage";

export const OPTION_KEY = "dynamodb-extended-options";

let storageInstance: Storage | null = null;

function getInstance() {
  if (!storageInstance) storageInstance = new Storage();

  return storageInstance;
}

export async function saveOption(option: Option) {
  const options = await getOptions();

  const optionExists = options.some((o) => o.key === option.key);
  if (optionExists) return;

  options.unshift(option);

  const storage = getInstance();
  await storage.set(OPTION_KEY, options);
}

export async function getOptions() {
  const storage = getInstance();
  const options = await storage.get<Option[]>(OPTION_KEY);

  return options || []; // Provide default empty array if no data exists
}

export async function updateOption(option: Option) {
  const options = await getOptions();

  const newOptions = options.map((o) => (o.key === option.key ? { ...o, ...option } : o));

  const storage = getInstance();
  await storage.set(OPTION_KEY, newOptions);
}
