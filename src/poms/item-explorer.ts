import { waitForElement } from "src/utils/dom";

export async function waitForRunButton() {
  return waitForElement<HTMLButtonElement>('button[data-testid="run-filter"]');
}
