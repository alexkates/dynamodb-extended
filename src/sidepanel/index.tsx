import "src/main.css";
import { useStorage } from "@plasmohq/storage/hook";
import type { Query } from "src/types/query";
import { QUERY_KEY } from "src/db/query";
import QueryList from "src/components/query-list";
import { sortQueryByDate } from "src/utils/sort";

function Index() {
  const [queries] = useStorage<Query[]>(QUERY_KEY);

  queries?.sort(sortQueryByDate);

  return (
    <div className="container flex flex-col py-2 gap-2">
      <h1 className="text-3xl font-semibold">DynamoDB Extended</h1>
      <QueryList queries={queries} />
    </div>
  );
}

export default Index;
