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

  const existingOption = options.find((o) => o.key === option.key);
  if (existingOption) {
    // If the option already exists, update its name and description, allowing me to change them while keeping the user's value.
    existingOption.name = option.name;
    existingOption.description = option.description;
    await updateOption(existingOption);
    return;
  }

  options.unshift(option);

  const storage = getInstance();
  await storage.set(OPTION_KEY, options);
}

export async function getOptions() {
  const storage = getInstance();
  const options = await storage.get<Option[]>(OPTION_KEY);

  return options || [];
}

export async function getOption(key: OptionKey) {
  const options = await getOptions();

  return options.find((o) => o.key === key);
}

export async function updateOption(option: Option) {
  const options = await getOptions();

  const newOptions = options.map((o) => (o.key === option.key ? { ...o, ...option } : o));

  const storage = getInstance();
  await storage.set(OPTION_KEY, newOptions);
}
