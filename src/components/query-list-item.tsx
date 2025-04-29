import type { Query } from "src/types/query";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { DatabaseIcon, EqualIcon, HashIcon, KeyRoundIcon, PlayIcon, SortDescIcon, SquareFunctionIcon, StarIcon, TablePropertiesIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { parseDynamoDbConsoleUrl } from "src/utils/url";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteQuery, updateQuery } from "src/db/query";
import { useState } from "react";
import { Input } from "./ui/input";
import { SKComparator } from "src/types/sk-comparator";
import QueryListItemProperties from "./query-list-item-properties";

type Props = {
  query: Query;
};

export default function QueryListItem({ query }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(query.name);

  async function onRunClicked(query: Query) {
    await updateCurrentTabUrlAndForceReload(query.url);
  }

  async function onDeleteClicked(query: Query) {
    await deleteQuery(query);
  }

  async function saveQueryName() {
    await updateQuery({
      ...query,
      name: nameValue,
    });
    setIsEditing(false);
  }

  async function onFavoriteClicked(query: Query) {
    await updateQuery({
      ...query,
      favorite: !query.favorite,
    });
  }

  const parsed = parseDynamoDbConsoleUrl(query.url);

  return (
    <Card key={query.url}>
      <CardHeader>
        <div className="flex items-center justify-between">
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
              <div className="font-medium text-base cursor-pointer hover:underline transition-all" onClick={() => setIsEditing(true)}>
                {query.name}
              </div>
            )}
            <div className="text-muted-foreground text-xs lowercase">{new Date(query.createdAt).toLocaleString()}</div>
          </div>
          <StarIcon className="" fill={query.favorite ? "black" : "none"} onClick={async () => await onFavoriteClicked(query)} />
        </div>
      </CardHeader>

      <CardContent className="">
        {parsed && (
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
        )}
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-1 w-full justify-end">
          <Button variant="default" size="icon" onClick={() => onRunClicked(query)}>
            <PlayIcon className="h-4 w-4" />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>This action cannot be undone. This will permanently delete the query.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={async () => await onDeleteClicked(query)}>
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
