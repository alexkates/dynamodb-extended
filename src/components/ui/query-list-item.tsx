import type { Query } from "src/types/query";
import { Card, CardFooter, CardHeader } from "./card";
import { PlayIcon } from "lucide-react";
import { Button } from "./button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";

type Props = {
  query: Query;
};

export default function QueryListItem({ query }: Props) {
  async function onRunClicked(query: Query) {
    await updateCurrentTabUrlAndForceReload(query.url);
  }

  return (
    <Card key={query.url}>
      <CardHeader>
        <div className="flex flex-col">
          <span className="font-medium">{query.name ?? "Query from"}</span>
          <span className="">{new Date(query.createdAt).toLocaleString()}</span>
        </div>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full justify-end">
          <Button variant="default" size="icon" onClick={() => onRunClicked(query)}>
            <PlayIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
