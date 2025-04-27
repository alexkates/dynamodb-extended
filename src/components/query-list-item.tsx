import type { Query } from "src/types/query";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { parseDynamoDbConsoleUrl } from "src/utils/url";
import { Label } from "./ui/label";
import LabeledText from "./labeled-text";

type Props = {
  query: Query;
};

export default function QueryListItem({ query }: Props) {
  async function onRunClicked(query: Query) {
    await updateCurrentTabUrlAndForceReload(query.url);
  }

  const parsed = parseDynamoDbConsoleUrl(query.url);

  return (
    <Card key={query.url}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <LabeledText text={query.name ?? "A DynamoDB Query"} label={new Date(query.createdAt).toLocaleString()} />
          <Button variant="default" size="icon" onClick={() => onRunClicked(query)}>
            <PlayIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {parsed && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LabeledText text={parsed.operation} label="Operation" />
            <LabeledText text={parsed.table} label="Table" />
            <LabeledText text={parsed.index} label="Index" />
            <LabeledText text={parsed.pk} label="PK" />
            <LabeledText text={parsed.sk} label="SK" />
            <LabeledText text={parsed.skValue2} label="SK Value 2" />
            <LabeledText text={parsed.skComparator} label="SK Comparator" />
            <LabeledText text={parsed.sorting} label="Sorting" />
            <LabeledText text={Array.isArray(parsed.selectAttribute) ? parsed.selectAttribute.join(", ") : parsed.selectAttribute} label="Select Attributes" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
