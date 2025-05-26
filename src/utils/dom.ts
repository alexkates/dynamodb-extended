import { sleep } from "src/utils";

export async function waitForElement<T extends Element>(selector: string, maxAttempts = 30, intervalMs = 500): Promise<T | null> {
  // Try to get the element immediately first
  const element = document.querySelector(selector);
  if (element) return element as T;

  // If not found, return a promise that resolves when the element appears
  return new Promise((resolve) => {
    let attempts = 0;
    const observer = new MutationObserver(async (mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        resolve(element as T);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        obs.disconnect();
        resolve(null);
      }
    });

    // Start observing the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Also set a backup timer approach
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        observer.disconnect();
        resolve(element as T);
      }

      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        observer.disconnect();
        resolve(null);
      }
    }, intervalMs);
  });
}

export function observeElementAppearance<T extends Element>(selector: string, callback: (element: T) => void): () => void {
  let processingCallback = false;
  let lastProcessedElement: Element | null = null;

  // Check if element already exists
  const existingElement = document.querySelector(selector);
  if (existingElement) {
    lastProcessedElement = existingElement;
    callback(existingElement as T);
  }

  // Set up observer for future appearances
  const observer = new MutationObserver((mutations, obs) => {
    // Skip if we're currently processing a callback to prevent loops
    if (processingCallback) return;

    const element = document.querySelector(selector);
    if (element && element !== lastProcessedElement) {
      processingCallback = true;
      lastProcessedElement = element;

      // Use setTimeout to further break potential recursion
      setTimeout(() => {
        callback(element as T);
        processingCallback = false;
      }, 50);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  // Return a function to stop observing
  return () => observer.disconnect();
}

// Helper function to debounce function calls
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number | undefined;

  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = undefined;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}
