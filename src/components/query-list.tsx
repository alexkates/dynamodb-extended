import { useState } from "react";
import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CalendarIcon, ChevronDown, StarIcon } from "lucide-react";

interface Props {
  queries: Query[] | undefined;
}

type SortOption = "favorites" | "date";

// Function to sort queries based on the selected sort option
const sortQueries = (queries: Query[], sortOption: SortOption): Query[] => {
  return [...queries].sort((a, b) => {
    switch (sortOption) {
      case "favorites":
        // First sort by favorite status (favorites first)
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;
        // Then sort by createdAt date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      case "date":
        // Sort by createdAt date only (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      default:
        return 0;
    }
  });
};

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

  const sortOptions = [
    {
      value: "favorites",
      label: (
        <div className="flex items-center gap-1">
          <StarIcon className="h-4 w-4" />
          <span className="text-sm">Favorites</span>
        </div>
      ),
    },
    {
      value: "date",
      label: (
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          <span className="text-sm">Date</span>
        </div>
      ),
    },
  ];

  const selectedOption = sortOptions.find((option) => option.value === sortOption);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {selectedOption?.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => setSortOption(option.value as SortOption)}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2 py-2">
        {sortedQueries.map((query) => (
          <QueryListItem key={query.url} query={query} />
        ))}
      </div>
    </div>
  );
}
