export type Option = {
  key: OptionKey;
  value: string | boolean;
};

export enum OptionKey {
  UNMARSHALLED_JSON = "dynamodb-extended-unmarshalled-json",
  ITEM_EDITOR_HEIGHT = "dynamodb-extended-item-editor-height",
  THEME = "dynamodb-extended-theme",
}
