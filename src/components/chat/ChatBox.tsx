import { ExamplePrompts } from "@/components/chat/ExamplePrompts";
import { MessageBubble } from "@/components/chat/MessageBubble";

export function ChatBox() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="space-y-3">
        <MessageBubble role="assistant" content="Describe tus sintomas para estimar cobertura y copago." />
      </div>
      <ExamplePrompts />
      <form className="mt-4 flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2"
          placeholder="Ej. Tengo dolor fuerte en el pecho"
        />
        <button className="rounded-md bg-ink px-4 py-2 text-white" type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}
