import type { Query } from "src/types/query";
import { Storage } from "@plasmohq/storage";

export const QUERY_KEY = "dynamodb-extended-query-history";

let storageInstance: Storage | null = null;

function getInstance() {
  if (!storageInstance) storageInstance = new Storage();

  return storageInstance;
}

export async function saveQuery({ url }: { url: string }) {
  const queries = await getQueries();

  const newQuery: Query = {
    url,
    createdAt: Date.now(),
  };

  queries.unshift(newQuery);

  console.log("About to save queries", queries);
  const storage = getInstance();
  await storage.set(QUERY_KEY, queries);
}

export async function getQueries() {
  const storage = getInstance();
  const queries = await storage.get<Query[]>(QUERY_KEY);
  console.log("Queries from storage", queries);

  return queries || []; // Provide default empty array if no data exists
}
