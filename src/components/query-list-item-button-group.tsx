"use client";

import { Button } from "src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { ChevronDown, PlayIcon, StarIcon, Trash } from "lucide-react";
import type { Query } from "src/types/query";
import { deleteQuery, updateQuery } from "src/db/query";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";

type Props = {
  query: Query;
};

export function QueryListItemButtonGroup({ query }: Props) {
  async function onRunClicked(query: Query) {
    await updateCurrentTabUrlAndForceReload(query.url);
  }
  async function onFavoriteClicked(query: Query) {
    await updateQuery({
      ...query,
      favorite: !query.favorite,
    });
  }
  async function onDeleteConfirmClicked(query: Query) {
    await deleteQuery(query);
  }

  return (
    <div className="flex">
      <Button size="sm" onClick={() => onRunClicked(query)} className="rounded-r-none border-r-0">
        <PlayIcon className="mr-2 h-4 w-4" />
        Run
      </Button>

      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="default" className="rounded-l-none px-2">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onFavoriteClicked(query)}>
              <StarIcon className="h-4 w-4" />
              {!query.favorite ? "Add to favorites" : "Remove from favorites"}
            </DropdownMenuItem>
            <DialogTrigger className="w-full">
              <DropdownMenuItem>
                <Trash className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button size="sm" variant="destructive" onClick={() => onDeleteConfirmClicked(query)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
