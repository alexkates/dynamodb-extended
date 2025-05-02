import { useState } from "react";
import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { filterQueryByFavorite } from "src/utils/filter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props {
  queries: Query[];
}

export default function QueryList({ queries }: Props) {
  const [activeTab, setActiveTab] = useState<"recent" | "favorites">("recent");
  const favoriteQueries = queries.filter(filterQueryByFavorite);

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
          {queries.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Recent Queries</CardTitle>
                <CardDescription>You haven't made any queries yet.</CardDescription>
              </CardHeader>
              <CardContent>To get started, run a query from DynamoDB. Your run queries will begin appearing here.</CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-2">
              {queries.map((query) => (
                <QueryListItem key={query.url} query={query} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="favorites">
          {favoriteQueries.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Favorites</CardTitle>
                <CardDescription>You haven't favorited any queries yet.</CardDescription>
              </CardHeader>
              <CardContent>To favorite a query, click the star icon on the query card.</CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-2">
              {favoriteQueries.map((query) => (
                <QueryListItem key={query.url} query={query} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
