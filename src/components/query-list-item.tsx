import type { Query } from "src/types/query";
import { Card, CardHeader, CardContent } from "./ui/card";
import { DatabaseIcon, SquareFunctionIcon, TablePropertiesIcon } from "lucide-react";
import { parseDynamoDbConsoleUrl } from "src/utils/url";
import { updateQuery } from "src/db/query";
import { useState } from "react";
import { Input } from "./ui/input";
import QueryListItemProperties from "./query-list-item-properties";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { QueryListItemButtonGroup } from "./query-list-item-button-group";

type Props = {
  query: Query;
};

export default function QueryListItem({ query }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(query.name);

  async function saveQueryName() {
    await updateQuery({
      ...query,
      name: nameValue,
    });
    setIsEditing(false);
  }

  const parsed = parseDynamoDbConsoleUrl(query.url);

  return (
    <Card key={query.url}>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            {isEditing ? (
              <Input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                className="h-4 focus-visible:mb-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveQueryName();
                  } else if (e.key === "Escape") {
                    setIsEditing(false);
                    setNameValue(query.name);
                  }
                }}
                onBlur={() => {
                  setIsEditing(false);
                  setNameValue(query.name);
                }}
              />
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-medium text-base cursor-pointer hover:underline transition-all" onClick={() => setIsEditing(true)}>
                      {query.name}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Click to edit query name</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <div className="text-muted-foreground text-xs lowercase">{new Date(query.createdAt).toLocaleString()}</div>
          </div>
          <QueryListItemButtonGroup query={query} />
        </div>
      </CardHeader>

      {parsed && (
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <DatabaseIcon className="h-4 w-4" />
              <span className="text-sm truncate max-w-sm">{parsed.table}</span>
            </div>

            <div className="flex items-center gap-1">
              <SquareFunctionIcon className="h-4 w-4" />
              <span className="text-sm lowercase">{parsed.operation}</span>
            </div>

            <div className="flex items-center gap-1">
              <TablePropertiesIcon className="h-4 w-4" />
              <span className="text-sm lowercase truncate max-w-sm">{parsed.index ?? parsed.table}</span>
            </div>

            <QueryListItemProperties query={query} />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
