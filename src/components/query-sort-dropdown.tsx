import { CalendarIcon, ChevronDown, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import type { SortOption } from "src/types/sort-option";

type Props = {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
};

export default function QuerySortDropdown({ sortOption, onSortChange }: Props) {
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
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            {selectedOption?.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => onSortChange(option.value as SortOption)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
