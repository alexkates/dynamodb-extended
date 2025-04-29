import type { ParsedDynamoDbUrl } from "src/types/parsed-dynamodb-url";

export function parseDynamoDbConsoleUrl(url: string): ParsedDynamoDbUrl | null {
  const result = {} as ParsedDynamoDbUrl;

  try {
    const parsedUrl = new URL(url);
    const hash = parsedUrl.hash;

    if (!hash.includes("?")) return null;

    const queryString = extractQueryString(hash);
    const searchParams = new URLSearchParams(queryString);

    processSearchParams(searchParams, result);
    applyDefaultsAndSpecialCases(result);

    return result;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

function extractQueryString(hash: string): string {
  const [, queryString] = hash.slice(1).split("?");
  return queryString;
}

function processSearchParams(searchParams: URLSearchParams, result: ParsedDynamoDbUrl): void {
  const validKeys = ["pk", "sk", "skComparator", "skValue2", "index", "operation", "table"];

  for (const [key, value] of searchParams.entries()) {
    if (key in result || validKeys.includes(key)) (result as any)[key] = value;
  }
}

function applyDefaultsAndSpecialCases(result: ParsedDynamoDbUrl): void {
  if (!result.operation) result.operation = "SCAN";

  if (result.operation === "SCAN") {
    result.pk = undefined;
    result.sk = undefined;
    result.skComparator = undefined;
    result.skValue2 = undefined;
  }
}
