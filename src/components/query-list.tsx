import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";

interface Props {
  queries: Query[] | undefined;
}

export default function QueryList({ queries }: Props) {
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
            <Button variant="default" size="lg" onClick={() => onGetStartedClicked()}>
              Start Querying
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      {queries.map((query) => (
        <QueryListItem key={query.url} query={query} />
      ))}
    </div>
  );
}
