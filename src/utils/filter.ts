import type { Query } from "src/types/query";

export function filterQueryByFavorite(query: Query) {
  return !!query.favorite;
}
