import "src/main.css";
import { useStorage } from "@plasmohq/storage/hook";
import { OPTION_KEY, updateOption } from "src/db/option";
import type { Option } from "src/types/option";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "src/components/ui/card";
import { Switch } from "src/components/ui/switch";
import { Label } from "src/components/ui/label";

function Index() {
  const [options, setOptions] = useStorage<Option[]>(OPTION_KEY);

  async function onOptionChanged(option: Option) {
    // Create a new option object with the toggled value
    const updatedOption = {
      ...option,
      value: !option.value,
    };

    // Update in database
    await updateOption(updatedOption);

    // Update local state to reflect the change immediately
    if (options) {
      const newOptions = options.map((opt) => (opt.key === updatedOption.key ? updatedOption : opt));
      setOptions(newOptions);
    }
  }

  return (
    <div className="container flex flex-col py-2 gap-2">
      <h1 className="text-3xl font-semibold">DynamoDB Extended Options</h1>
      {options?.map((option) => (
        <Card key={option.key}>
          <CardHeader>
            <CardTitle>{option.name}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id={option.key} checked={!!option.value} onCheckedChange={() => onOptionChanged(option)} />
              <Label htmlFor={option.key}>{option.value ? "Enabled" : "Disabled"}</Label>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Index;
