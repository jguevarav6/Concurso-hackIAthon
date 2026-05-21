const prompts = ["Dolor en el pecho", "Manchas en la piel", "Dolor de rodilla", "Dolor de estomago"];

export function ExamplePrompts() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          className="min-h-9 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-clinical hover:text-clinical focus:outline-none focus:ring-2 focus:ring-clinical/20"
          type="button"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
