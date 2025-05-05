import "src/main.css";
import { useStorage } from "@plasmohq/storage/hook";
import { OptionKey } from "src/types/option";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Switch } from "src/components/ui/switch";
import { Input } from "src/components/ui/input";
import { Skeleton } from "src/components/ui/skeleton";
import { ThemeProvider } from "src/components/theme-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";
import type { Theme } from "src/types/theme";
import PageTitle from "src/components/page-title";

function Index() {
  const [unmarshalledJsonOption, setUnmarshalledJsonOption, { isLoading: isUnmarshalledJsonOptionLoading }] = useStorage<boolean>(OptionKey.UNMARSHALLED_JSON);
  const [itemEditorHeightOption, setItemEditorHeightOption, { isLoading: isItemEditorHeightOptionLoading }] = useStorage<string>(OptionKey.ITEM_EDITOR_HEIGHT);
  const [themeOption, setThemeOption, { isLoading: isThemeOptionLoading }] = useStorage<Theme>(OptionKey.THEME);

  const isLoading = isUnmarshalledJsonOptionLoading || isItemEditorHeightOptionLoading || isThemeOptionLoading;

  const loadingContent = (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-1/2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-1/2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
    </>
  );

  const loadedContent = (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Unmarshalled JSON</CardTitle>
          <CardDescription>Changes the default DynamoDB Edit Item screen to unmarshalled JSON.</CardDescription>
        </CardHeader>
        <CardContent>
          <Switch checked={!!unmarshalledJsonOption} onCheckedChange={setUnmarshalledJsonOption} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Item Editor Height</CardTitle>
          <CardDescription>Changes the default height of the Item Editor screen.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input className="max-w-xs" type="text" value={itemEditorHeightOption as string} onChange={(e) => setItemEditorHeightOption(e.target.value)} placeholder="e.g. 800px" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Changes the default theme of the extension.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue={themeOption} onValueChange={(value) => setThemeOption(value as Theme)} value={themeOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  );

  return (
    <ThemeProvider>
      <div className="container flex flex-col py-8 gap-4">
        <PageTitle subtitle="Options" />
        {isLoading ? loadingContent : loadedContent}
      </div>
    </ThemeProvider>
  );
}

export default Index;
