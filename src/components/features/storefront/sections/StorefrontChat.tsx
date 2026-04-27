import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import type { StorefrontChatProps } from "../types";

export const StorefrontChat = ({
  isChatOpen,
  setIsChatOpen,
  chatMessages,
  chatInput,
  setChatInput,
  handleChatSubmit,
}: StorefrontChatProps) => {
  return (
    <>
      {isChatOpen ? (
        <aside className="fixed bottom-20 right-4 z-50 w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-slate-100 p-3">
            <div>
              <p className="font-semibold text-slate-800">Canlı Destek</p>
              <p className="text-xs text-slate-500">Genelde 1-2 dk içinde yanıt</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
              ×
            </Button>
          </header>
          <div className="max-h-72 space-y-2 overflow-y-auto p-3">
            {chatMessages.map((message) => (
              <article key={message.id} className={message.sender === "user" ? "text-right" : "text-left"}>
                <p
                  className={`inline-block rounded-xl px-3 py-2 text-sm ${
                    message.sender === "user" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {message.text}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">{message.meta}</p>
              </article>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2 border-t border-slate-100 p-3">
            <Input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              className="flex-1"
              placeholder="Mesajınızı yazın..."
            />
            <Button type="submit" size="sm">
              Gönder
            </Button>
          </form>
        </aside>
      ) : null}
      <Button
        className="fixed bottom-4 right-4 z-40 rounded-full px-4"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        Destek
      </Button>
    </>
  );
};
