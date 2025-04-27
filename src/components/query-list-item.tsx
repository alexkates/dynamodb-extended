import type { Query } from "src/types/query";
import { Card, CardContent, CardHeader } from "./ui/card";
import { CheckIcon, PlayIcon, Trash2Icon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { parseDynamoDbConsoleUrl } from "src/utils/url";
import LabeledText from "./labeled-text";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteQuery, updateQuery } from "src/db/query";
import { useState } from "react";
import { Input } from "./ui/input";

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

  const parsed = parseDynamoDbConsoleUrl(query.url);

  return (
    <Card key={query.url}>
      <CardHeader>
        <div className="flex justify-between items-center">
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
          <div className="flex items-center gap-1">
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
        </div>
      </CardHeader>

      <CardContent>
        {parsed && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LabeledText text={parsed.operation} label="Operation" />
            <LabeledText text={parsed.table} label="Table" />
            <LabeledText text={parsed.index} label="Index" />
            <LabeledText text={parsed.pk} label="PK" />
            <LabeledText text={parsed.sk} label="SK" />
            <LabeledText text={parsed.skValue2} label="SK Value 2" />
            <LabeledText text={parsed.skComparator} label="SK Comparator" />
            <LabeledText text={parsed.sorting} label="Sorting" />
            <LabeledText text={Array.isArray(parsed.selectAttribute) ? parsed.selectAttribute.join(", ") : parsed.selectAttribute} label="Select Attributes" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
