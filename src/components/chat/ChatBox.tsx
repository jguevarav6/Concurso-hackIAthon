import type { FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { ExamplePrompts } from "@/components/chat/ExamplePrompts";
import { MessageBubble } from "@/components/chat/MessageBubble";
import type { ChatMessage } from "@/lib/mock/demoData";

type ChatBoxProps = {
  inputValue: string;
  isLoading: boolean;
  messages: ChatMessage[];
  onInputChange: (value: string) => void;
  onPromptSelect: (prompt: string) => void;
  onSubmit: (message: string) => void;
};

export function ChatBox({
  inputValue,
  isLoading,
  messages,
  onInputChange,
  onPromptSelect,
  onSubmit
}: ChatBoxProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Agente de cobertura</h2>
          <p className="mt-1 text-sm text-slate-600">
            Consulta administrativa con pacientes demo.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          MVP
        </span>
      </div>
      <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-lg bg-slate-50 p-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}
        {isLoading ? (
          <div className="mr-auto inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
            <Loader2 className="size-4 animate-spin text-clinical" />
            Analizando sintomas y cobertura...
          </div>
        ) : null}
      </div>
      <ExamplePrompts onSelect={onPromptSelect} />
      <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="min-h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-clinical focus:ring-2 focus:ring-clinical/20"
          placeholder="Ej. Tengo dolor fuerte en el pecho"
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
        />
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={isLoading || inputValue.trim().length < 5}
          type="submit"
        >
          <Send className="size-4" />
          Enviar
        </button>
      </form>
    </section>
  );
}
