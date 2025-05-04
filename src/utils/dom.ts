import { sleep } from "src/utils";

/**
 * Generic function to wait for an element to appear in the DOM
 * @param selector CSS selector for the element
 * @param maxAttempts Maximum number of attempts before giving up
 * @param intervalMs Interval between attempts in milliseconds
 * @returns The found element, or null if not found after max attempts
 */

export async function waitForElement<T extends Element>(selector: string, maxAttempts = 30, intervalMs = 500): Promise<T | null> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const element = document.querySelector(selector);
    if (element) return element as T;

    await sleep(intervalMs);
    attempts++;
  }

  return null;
}
