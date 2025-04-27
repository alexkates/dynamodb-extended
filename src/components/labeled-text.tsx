export default function LabeledText({ label, text }: { label?: string; text?: string }) {
  if (!text || !label) return null;

  return (
    <div className="flex flex-col">
      <div className="font-medium text-sm">{text}</div>
      <div className="text-muted-foreground text-xs lowercase">{label}</div>
    </div>
  );
}
