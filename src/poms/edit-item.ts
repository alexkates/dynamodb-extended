import { waitForElement } from "src/utils/dom";

export async function waitForJsonViewButton() {
  return waitForElement<HTMLButtonElement>('button[data-testid="JSON_VIEW_MODE"]:not([disabled])');
}

export async function waitForViewDynamoDBJsonButton() {
  return waitForElement<HTMLButtonElement>('section[data-testid="ItemEditorContainer"] input[type="checkbox"]');
}
