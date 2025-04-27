export type ParsedDynamoDbUrl = {
  operation: string;
  table: string;
  pk?: string;
  sk?: string;
  skComparator?: string;
  skValue2?: string;
  index?: string;
  select?: string;
  selectAttribute?: string | string[];
  sorting?: string;
};
