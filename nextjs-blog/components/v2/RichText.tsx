import type { ReactNode } from "react";

export default function RichText({
  text,
  strongColor = "#881111",
}: {
  text: string;
  strongColor?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index): ReactNode => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={`${part}-${index}`}
              className="font-bold"
              style={{ color: strongColor }}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}
