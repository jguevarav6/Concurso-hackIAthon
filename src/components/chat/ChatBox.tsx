import { ExamplePrompts } from "@/components/chat/ExamplePrompts";
import { MessageBubble } from "@/components/chat/MessageBubble";

export function ChatBox() {
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
      <div className="space-y-3">
        <MessageBubble role="assistant" content="Describe tus sintomas para estimar cobertura y copago." />
      </div>
      <ExamplePrompts />
      <form className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          className="min-h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-clinical focus:ring-2 focus:ring-clinical/20"
          placeholder="Ej. Tengo dolor fuerte en el pecho"
        />
        <button
          className="min-h-11 rounded-md bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
