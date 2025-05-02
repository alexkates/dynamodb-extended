import type { Query } from "src/types/query";

export const sortQueryByDate = (queryA: Query, queryB: Query) => {
  return new Date(queryB.createdAt).getTime() - new Date(queryA.createdAt).getTime();
};
