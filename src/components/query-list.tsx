import { useState, useEffect } from "react";
import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { filterQueryByFavorite } from "src/utils/filter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getActiveTab, setActiveTab, type ActiveTab } from "src/db/active-tab";

interface Props {
  queries?: Query[];
}

export default function QueryList({ queries }: Props) {
  const [activeTab, setActiveTabState] = useState<ActiveTab>("recent");
  const favoriteQueries = queries?.filter(filterQueryByFavorite);

  // Load the active tab from storage on component mount
  useEffect(() => {
    const loadActiveTab = async () => {
      try {
        const savedTab = await getActiveTab();
        setActiveTabState(savedTab);
      } catch (error) {
        console.error("Failed to load active tab from storage:", error);
      }
    };

    loadActiveTab();
  }, []);

  // Save the active tab to storage when it changes
  const handleTabChange = async (value: string) => {
    const newTab = value as ActiveTab;
    setActiveTabState(newTab);
    try {
      await setActiveTab(newTab);
    } catch (error) {
      console.error("Failed to save active tab to storage:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="recent" className="flex-1">
            Recent
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex-1">
            Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          {!queries?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Recent Queries</CardTitle>
                <CardDescription>You haven't made any queries yet.</CardDescription>
              </CardHeader>
              <CardContent>To get started, run a query from DynamoDB. Your run queries will begin appearing here.</CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-2">{queries?.map((query) => <QueryListItem key={query.url} query={query} />)}</div>
          )}
        </TabsContent>
        <TabsContent value="favorites">
          {!favoriteQueries?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Favorites</CardTitle>
                <CardDescription>You haven't favorited any queries yet.</CardDescription>
              </CardHeader>
              <CardContent>To favorite a query, click the star icon on the query card.</CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-2">{favoriteQueries?.map((query) => <QueryListItem key={query.url} query={query} />)}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
