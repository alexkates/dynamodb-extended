import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
};
function PageTitle({ title = "DynamoDB Extended", subtitle }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-semibold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default PageTitle;
