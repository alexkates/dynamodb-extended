import { useState } from "react";
import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { sortQueries } from "src/utils/sort";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface Props {
  queries: Query[] | undefined;
}

export default function QueryList({ queries }: Props) {
  const [activeTab, setActiveTab] = useState<"recent" | "favorites">("recent");

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

  const recentQueries = sortQueries(queries, "date");
  const favoriteQueries = queries.filter((query) => query.favorite);

  return (
    <div className="flex flex-col gap-2">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "recent" | "favorites")}>
        <TabsList className="w-full">
          <TabsTrigger value="recent" className="flex-1">
            Recent
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex-1">
            Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <div className="flex flex-col gap-2">
            {recentQueries.map((query) => (
              <QueryListItem key={query.url} query={query} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="favorites">
          <div className="flex flex-col gap-2">
            {favoriteQueries.map((query) => (
              <QueryListItem key={query.url} query={query} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
