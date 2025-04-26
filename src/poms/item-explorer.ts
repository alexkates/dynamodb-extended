import { sleep } from "src/utils";

export async function waitForRunButton(maxAttempts = 30, intervalMs = 500) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const button = document.querySelector('button[data-testid="run-filter"]');
    if (button) return button as HTMLButtonElement;

    await sleep(intervalMs);
    attempts++;
  }
}
