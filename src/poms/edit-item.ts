export function getJsonViewButton() {
  return document.querySelector<HTMLButtonElement>('button[data-testid="JSON_VIEW_MODE"]:not([disabled])');
}

export function getViewDynamoDBJsonCheckbox() {
  return document.querySelector<HTMLInputElement>('section[data-testid="ItemEditorContainer"] input[type="checkbox"]');
}

export function getItemEditorResizeDiv() {
  return document.querySelector<HTMLDivElement>('section[data-testid="ItemEditorContainer"] div[class*="resizable-box"]');
}
