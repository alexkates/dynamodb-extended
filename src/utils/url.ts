import type { ParsedDynamoDbUrl } from "src/types/parsed-dynamodb-url";

export function parseDynamoDbConsoleUrl(url: string): ParsedDynamoDbUrl | null {
  const result = {} as ParsedDynamoDbUrl;

  try {
    const parsedUrl = new URL(url);
    const hash = parsedUrl.hash;

    if (!hash.includes("?")) return null;

    const [, queryString] = hash.slice(1).split("?");
    const searchParams = new URLSearchParams(queryString);

    for (const [key, value] of searchParams.entries()) {
      if (key === "maximize") continue;

      if (key === "selectAttribute") {
        if (result.selectAttribute) {
          result.selectAttribute = Array.isArray(result.selectAttribute) ? [...result.selectAttribute, value] : [result.selectAttribute, value];
        } else result.selectAttribute = value;
        continue;
      }

      if (
        key in result ||
        key === "pk" ||
        key === "sk" ||
        key === "skComparator" ||
        key === "skValue2" ||
        key === "index" ||
        key === "select" ||
        key === "sorting" ||
        key === "operation" ||
        key === "table"
      )
        (result as any)[key] = value;
    }
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }

  return result;
}
