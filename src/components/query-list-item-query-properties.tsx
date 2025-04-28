import { AlignStartVerticalIcon, EqualIcon, HashIcon, KeyRoundIcon } from "lucide-react";
import type { ParsedDynamoDbUrl } from "src/types/parsed-dynamodb-url";
import type { Query } from "src/types/query";
import { SKComparator } from "src/types/sk-comparator";
import { parseDynamoDbConsoleUrl } from "src/utils/url";

type Props = {
  query: Query;
};

export default function QueryListItemQueryProperties({ query }: Props) {
  if (!query) return null;

  const parsed = parseDynamoDbConsoleUrl(query.url);
  if (!parsed) return null;

  if (parsed.operation.toLowerCase() !== "query") return null;

  return (
    <>
      {parsed.pk && (
        <div className="flex items-center gap-1">
          <KeyRoundIcon className="h-4 w-4" />
          <span className="text-sm">{parsed.pk}</span>
        </div>
      )}

      {parsed.sk && getSortKeyComponent(parsed.skComparator, parsed.sk, parsed.skValue2)}
    </>
  );
}

function getSortKeyComponent(comparator: SKComparator, sk?: string, skValue2?: string) {
  if (!sk) return null;

  if (!comparator) {
    return (
      <div className="flex items-center gap-1">
        <HashIcon className="h-4 w-4" />
        <span className="text-sm truncate max-w-sm">equals {sk}</span>
      </div>
    );
  }

  if (comparator === SKComparator.BEGINS_WITH) {
    return (
      <div className="flex items-center gap-1">
        <HashIcon className="h-4 w-4" />
        <span className="text-sm">begins with {sk}</span>
      </div>
    );
  }
}
