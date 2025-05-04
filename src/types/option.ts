export type Option = {
  key: OptionKey;
  name: string;
  description: string;
  value: string | boolean;
};

export enum OptionKey {
  UNMARSHALLED_JSON = "UNMARSHALLED_JSON",
  ITEM_EDITOR_HEIGHT = "ITEM_EDITOR_HEIGHT",
}
