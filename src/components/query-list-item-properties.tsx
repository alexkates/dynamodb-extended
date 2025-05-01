import { HashIcon, KeyRoundIcon } from "lucide-react";
import type { Query } from "src/types/query";
import { SKComparator } from "src/types/sk-comparator";
import { parseDynamoDbConsoleUrl } from "src/utils/url";

type Props = {
  query: Query;
};

export default function QueryListItemProperties({ query }: Props) {
  const parsed = query ? parseDynamoDbConsoleUrl(query.url) : null;
  const primaryKeyValue = parsed?.pk;
  const sortKeyInfo = getSortKeyInfo(parsed?.skComparator, parsed?.sk, parsed?.skValue2);

  return (
    <>
      {primaryKeyValue && <PropertyItem icon={<KeyRoundIcon className="h-4 w-4" />} value={primaryKeyValue} />}
      {sortKeyInfo && <PropertyItem icon={<HashIcon className="h-4 w-4" />} value={sortKeyInfo} />}
    </>
  );
}

function PropertyItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 flex-shrink-0">{icon}</div>
      <span className="text-sm truncate max-w-sm">{value}</span>
    </div>
  );
}

function getSortKeyInfo(comparator?: SKComparator, sk?: string, skValue2?: string): string | null {
  if (!sk) return null;
  if (!comparator) return `equals ${sk}`;
  if (comparator === SKComparator.BEGINS_WITH) return `begins with ${sk}`;
  return null;
}
