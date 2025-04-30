import "src/main.css";
import { useStorage } from "@plasmohq/storage/hook";
import type { Query } from "src/types/query";
import { QUERY_KEY } from "src/db/query";
import QueryList from "src/components/query-list";

function Index() {
  const [queries] = useStorage<Query[]>(QUERY_KEY);

  return (
    <div className="container py-2">
      <QueryList queries={queries} />
    </div>
  );
}

export default Index;
