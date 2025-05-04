"use client";

import { Button } from "src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { ChevronDown, PlayIcon, SaveIcon, StarIcon, Trash } from "lucide-react";
import type { Query } from "src/types/query";
import { useState } from "react";
import { deleteQuery, updateQuery } from "src/db/query";
import { updateCurrentTabUrlAndForceReload } from "src/utils/tabs";
import { cn } from "src/utils";

type Props = {
  query: Query;
};

export function QueryListItemButtonGroup({ query }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    setShowDeleteDialog(false);
  }

  return (
    <div className="flex">
      <Button size="sm" onClick={() => onRunClicked(query)} className="rounded-r-none border-r-0">
        <PlayIcon className="mr-2 h-4 w-4" />
        Run
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="default" className="rounded-l-none px-2">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onFavoriteClicked(query)}>
            <StarIcon className={cn("mr-2 h-4 w-4", query.favorite ? "fill-black" : "fill-none")} />
            {!query.favorite ? "Add to favorites" : "Remove from favorites"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive focus:text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDeleteConfirmClicked(query)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
