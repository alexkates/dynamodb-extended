import type { SKComparator } from "./sk-comparator";

export type ParsedDynamoDbUrl = {
  operation: string;
  table: string;
  pk?: string;
  sk?: string;
  skComparator?: SKComparator;
  skValue2?: string;
  index?: string;
};
