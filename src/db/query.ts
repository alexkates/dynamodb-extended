import type { Query } from "src/types/query";
import { Storage } from "@plasmohq/storage";

export const QUERY_KEY = "dynamodb-extended-query-history";

let storageInstance: Storage | null = null;

function getInstance() {
  if (!storageInstance) storageInstance = new Storage();

  return storageInstance;
}

export async function saveQuery(url: string) {
  const queries = await getQueries();

  // Filter out the existing query if it exists
  const existingQuery = queries.find((query) => query.url === url);
  const filteredQueries = queries.filter((query) => query.url !== url);

  // Create new query or update existing one
  const newQuery: Query = existingQuery
    ? {
        ...existingQuery,
        createdAt: Date.now(), // Update timestamp to move it to the top
      }
    : {
        url,
        createdAt: Date.now(),
        name: "A DynamoDB Query",
        favorite: false,
      };

  // Add to the beginning of the array
  filteredQueries.unshift(newQuery);

  const storage = getInstance();
  await storage.set(QUERY_KEY, filteredQueries);
}

async function getQueries() {
  const storage = getInstance();
  const queries = await storage.get<Query[]>(QUERY_KEY);

  return queries || []; // Provide default empty array if no data exists
}

export async function deleteQuery(query: Query) {
  const queries = await getQueries();

  const newQueries = queries.filter((q) => q.url !== query.url);

  const storage = getInstance();
  await storage.set(QUERY_KEY, newQueries);
}

export async function updateQuery(query: Query) {
  const queries = await getQueries();

  const newQueries = queries.map((q) => (q.url === query.url ? { ...q, ...query } : q));

  const storage = getInstance();
  await storage.set(QUERY_KEY, newQueries);
}
