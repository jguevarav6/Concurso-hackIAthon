type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const align =
    role === "user"
      ? "ml-auto bg-ink text-white"
      : "mr-auto bg-slate-100 text-slate-800";

  return (
    <div className={`max-w-[90%] rounded-lg px-3 py-2 text-sm leading-6 sm:max-w-[80%] ${align}`}>
      {content}
    </div>
  );
}
