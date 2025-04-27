import type { Query } from "src/types/query";
import { Card, CardFooter, CardHeader } from "./card";
import { PlayIcon } from "lucide-react";
import { Button } from "./button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { parseDynamoDbConsoleUrl } from "src/utils/url";

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
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <div className="font-medium text-xl">{query.name ?? "A DynamoDB Query"}</div>
              <div className="text-muted-foreground">{new Date(query.createdAt).toLocaleString()}</div>
            </div>
            <Button variant="default" size="icon" onClick={() => onRunClicked(query)}>
              <PlayIcon className="h-4 w-4" />
            </Button>
          </div>

          {parsed && (
            <div className="mt-2 space-y-1">
              {parsed.operation && (
                <div>
                  <span className="font-semibold">Operation:</span> {parsed.operation}
                </div>
              )}
              {parsed.table && (
                <div>
                  <span className="font-semibold">Table:</span> {parsed.table}
                </div>
              )}
              {parsed.index && (
                <div>
                  <span className="font-semibold">Index:</span> {parsed.index}
                </div>
              )}
              {parsed.pk && (
                <div>
                  <span className="font-semibold">PK:</span> {parsed.pk}
                </div>
              )}
              {parsed.sk && (
                <div>
                  <span className="font-semibold">SK:</span> {parsed.sk}
                </div>
              )}
              {parsed.skValue2 && (
                <div>
                  <span className="font-semibold">SK Value 2:</span> {parsed.skValue2}
                </div>
              )}
              {parsed.skComparator && (
                <div>
                  <span className="font-semibold">SK Comparator:</span> {parsed.skComparator}
                </div>
              )}
              {parsed.sorting && (
                <div>
                  <span className="font-semibold">Sorting:</span> {parsed.sorting}
                </div>
              )}
              {parsed.selectAttribute && (
                <div>
                  <span className="font-semibold">Select Attributes:</span> {Array.isArray(parsed.selectAttribute) ? parsed.selectAttribute.join(", ") : parsed.selectAttribute}
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
