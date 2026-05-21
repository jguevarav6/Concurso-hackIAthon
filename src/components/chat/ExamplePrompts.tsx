import { examplePrompts } from "@/lib/mock/demoData";

type ExamplePromptsProps = {
  onSelect: (prompt: string) => void;
};

export function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {examplePrompts.map((prompt) => (
        <button
          key={prompt}
          className="min-h-9 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-clinical hover:text-clinical focus:outline-none focus:ring-2 focus:ring-clinical/20"
          onClick={() => onSelect(prompt)}
          type="button"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
