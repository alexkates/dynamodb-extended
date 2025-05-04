import "src/main.css";
import { useStorage } from "@plasmohq/storage/hook";
import { OPTION_KEY, updateOption } from "src/db/option";
import type { Option } from "src/types/option";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Switch } from "src/components/ui/switch";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { Skeleton } from "src/components/ui/skeleton";

function Index() {
  const [options] = useStorage<Option[]>(OPTION_KEY);

  async function onOptionChanged(option?: Option) {
    if (!option) return;

    await updateOption(option);
  }

  const unmarshalledJsonOption = options?.find((option) => option.key === "UNMARSHALLED_JSON");
  const itemEditorHeightOption = options?.find((option) => option.key === "ITEM_EDITOR_HEIGHT");

  if (!unmarshalledJsonOption || !itemEditorHeightOption) {
    return (
      <div className="container flex flex-col py-8 gap-4">
        <h1 className="text-3xl font-semibold">DynamoDB Extended Options</h1>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-1/2" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full" />
            </CardDescription>
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
            <CardDescription>
              <Skeleton className="h-4 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex flex-col py-8 gap-4">
      <h1 className="text-3xl font-semibold">DynamoDB Extended Options</h1>
      <Card>
        <CardHeader>
          <CardTitle>{unmarshalledJsonOption?.name}</CardTitle>
          <CardDescription>{unmarshalledJsonOption?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id={unmarshalledJsonOption?.key} checked={!!unmarshalledJsonOption?.value} onCheckedChange={(e) => onOptionChanged({ ...unmarshalledJsonOption, value: e })} />
            <Label htmlFor={unmarshalledJsonOption?.key}>{unmarshalledJsonOption?.value ? "Enabled" : "Disabled"}</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{itemEditorHeightOption?.name}</CardTitle>
          <CardDescription>{itemEditorHeightOption?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            id={itemEditorHeightOption?.key}
            className="max-w-xs"
            type="text"
            value={itemEditorHeightOption?.value as string}
            onChange={(e) => onOptionChanged({ ...itemEditorHeightOption, value: e.target.value })}
            placeholder="e.g. 800px"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;
