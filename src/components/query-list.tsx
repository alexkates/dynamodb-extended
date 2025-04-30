import { useState } from "react";
import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { sortQueries } from "src/utils/sort";
import type { SortOption } from "src/types/sort-option";
import QuerySortDropdown from "./query-sort-dropdown";

interface Props {
  queries: Query[] | undefined;
}

export default function QueryList({ queries }: Props) {
  const [sortOption, setSortOption] = useState<SortOption>("favorites");

  if (!queries || queries.length === 0) {
    function onGetStartedClicked() {
      updateCurrentTabUrlAndForceReload("https://console.aws.amazon.com/dynamodbv2/home");
    }

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Card>
          <CardHeader>
            <CardTitle>DynamoDB Extended</CardTitle>
            <CardDescription>A Chrome extension to enhance your DynamoDB Console experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>To get started, simply open your DynamoDB Console and run queries as you normally would. Your query history will appear here automatically.</p>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="lg" onClick={onGetStartedClicked}>
              Start Querying
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const sortedQueries = sortQueries(queries, sortOption);

  return (
    <div className="flex flex-col gap-2">
      <QuerySortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      <div className="flex flex-col gap-2">
        {sortedQueries.map((query) => (
          <QueryListItem key={query.url} query={query} />
        ))}
      </div>
    </div>
  );
}
