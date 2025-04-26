import type { Query } from "src/types/query";

export default function QueryList({ queries }: { queries?: Query[] | undefined }) {
  if (!queries || queries.length === 0) {
    return (
      <div className="flex justify-center items-center p-4 text-gray-500">
        No queries available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {queries.map((query) => (
        <div
          key={query.url}
          className="flex items-center justify-between p-2 border-b border-gray-200"
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{query.url}</span>
            <span className="text-xs text-gray-500">
              {new Date(query.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
