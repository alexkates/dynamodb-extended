import "src/main.css";
import { useStorage } from "@plasmohq/storage/hook";
import type { Query } from "src/types/query";
import { QUERY_KEY } from "src/db/query";
import QueryList from "src/components/query-list";
import { sortQueryByDate } from "src/utils/sort";
import { Button } from "src/components/ui/button";
import { Settings } from "lucide-react";
import { ThemeProvider } from "src/components/theme-provider";
import PageTitle from "src/components/page-title";

function Index() {
  const [queries] = useStorage<Query[]>(QUERY_KEY);

  queries?.sort(sortQueryByDate);

  function onSettingsClicked() {
    window.open("options.html", "_blank");
  }

  return (
    <ThemeProvider>
      <div className="container flex flex-col py-8 gap-4">
        <div className="flex items-center justify-between">
          <PageTitle subtitle="Queries" />
          <Button variant="ghost" onClick={onSettingsClicked} size={"sm"}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
        <QueryList queries={queries} />
      </div>
    </ThemeProvider>
  );
}

export default Index;
