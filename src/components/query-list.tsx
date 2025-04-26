import type { Query } from "src/types/query";
import { Card, CardHeader } from "./ui/card";

// TODO: I don't know why, but the type of queries is not right.
export default function QueryList({ queries }: { queries?: Query[] | undefined }) {
  if (!queries || queries.length === 0) {
    return <div className="flex justify-center items-center p-4 text-gray-500">No queries available</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {queries.map((query) => (
        <Card key={query.url}>
          <CardHeader>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate max-w-sm">{query.name ?? "Query from"}</span>
              <span className="text-xs text-gray-500">{new Date(query.createdAt).toLocaleString()}</span>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
