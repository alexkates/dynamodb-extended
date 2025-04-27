import type { Query } from "src/types/query";
import QueryListItem from "./query-list-item";

interface Props {
  queries: Query[] | undefined;
}

// TODO: I don't know why, but the type of queries is not right.
export default function QueryList({ queries }: Props) {
  if (!queries || queries.length === 0) {
    return <div className="flex justify-center items-center p-4">No queries available</div>;
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      {queries.map((query) => (
        <QueryListItem key={query.url} query={query} />
      ))}
    </div>
  );
}
