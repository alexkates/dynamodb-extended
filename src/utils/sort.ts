import type { Query } from "src/types/query";
import type { SortOption } from "src/types/sort-option";

export const sortQueries = (queries: Query[], sortOption: SortOption): any[] => {
  return [...queries].sort((a, b) => {
    switch (sortOption) {
      case "favorites":
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      case "date":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      default:
        return 0;
    }
  });
};
