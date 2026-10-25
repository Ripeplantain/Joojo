"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useEffect, useRef, useState } from "react";

// Joojo, the digital-twin chat widget. The `jj-` class names are styled in
// app/globals.css; the markup and behaviour live here.

const defaultSuggestions = [
  "What does Emmanuel do at Hubtel?",
  "Tell me about the Lenders Portal.",
  "What is Emmanuel strongest at?",
];

const OPEN_EVENT = "joojo:open";

/** Lets a page open the widget from its own markup, without lifting its state. */
export function openJoojo() {
  document.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

let chatToken: { token: string; expiresAt: number } | null = null;

async function chatHeaders() {
  if (!chatToken || chatToken.expiresAt - Date.now() < 30_000) {
    const response = await fetch("/api/chat");
    if (!response.ok) throw new Error("Could not start a chat session.");
    chatToken = await response.json();
  }
  return { "x-chat-token": chatToken!.token };
}

function IconClose() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M2.5 8h10M8.5 3.5L13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStop() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <rect x="4.5" y="4.5" width="7" height="7" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconTwin() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M12 3v3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4" y="6" width="16" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 11.5v1.5M14.5 11.5v1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 10.5v3M22 10.5v3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Joojo({
  suggestions = defaultSuggestions,
  tagline = "Ask about Emmanuel's work",
}: {
  suggestions?: string[];
  tagline?: string;
}) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat", headers: chatHeaders }),
  });
  const isBusy = status === "submitted" || status === "streaming";

  const ask = (question: string) => {
    if (!question.trim() || isBusy) return;
    setIsOpen(true);
    sendMessage({ text: question.trim() });
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
  };

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const open = () => setIsOpen(true);
    document.addEventListener(OPEN_EVENT, open);
    return () => document.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <aside className={`jj ${isOpen ? "jj-open" : ""}`} aria-label="Chat with Joojo">
      {isOpen && (
        <div className="jj-panel" id="joojo-panel">
          <header className="jj-head">
            <span className="jj-badge" aria-hidden="true"><IconTwin /></span>
            <span className="jj-head-text">
              <strong>Joojo</strong>
              <span>Emmanuel&apos;s digital twin</span>
            </span>
            <button className="jj-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <IconClose />
            </button>
          </header>

          <div className="jj-log" aria-live="polite" ref={messagesRef}>
            <div className="jj-msg jj-from-twin">
              <span className="jj-who">Joojo</span>
              <p>Ask me anything about Emmanuel&apos;s career, projects or technical focus. I answer from his verified profile.</p>
            </div>
            {messages.map((message) => (
              <div className={`jj-msg ${message.role === "user" ? "jj-from-you" : "jj-from-twin"}`} key={message.id}>
                <span className="jj-who">{message.role === "user" ? "You" : "Joojo"}</span>
                <p>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? <span key={`${message.id}-${index}`}>{part.text}</span> : null,
                  )}
                </p>
              </div>
            ))}
            {status === "submitted" && (
              <p className="jj-wait"><span /><span /><span /> thinking</p>
            )}
            {error && <p className="jj-error">Joojo could not respond right now. Try again in a moment.</p>}
          </div>

          {messages.length === 0 && (
            <div className="jj-suggest" aria-label="Suggested questions">
              {suggestions.map((question) => (
                <button key={question} type="button" onClick={() => ask(question)} disabled={isBusy}>
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="jj-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              aria-label="Ask Joojo about Emmanuel"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isBusy}
              placeholder="Ask about a project, a stack, a decision…"
            />
            {isBusy ? (
              <button className="jj-send jj-stop" type="button" onClick={stop} aria-label="Stop response">
                <IconStop />
              </button>
            ) : (
              <button className="jj-send" type="submit" disabled={!input.trim()} aria-label="Send question">
                <IconSend />
              </button>
            )}
          </form>
        </div>
      )}

      <button
        className="jj-trigger"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-controls="joojo-panel"
        aria-expanded={isOpen}
      >
        <span className="jj-trigger-icon" aria-hidden="true"><IconTwin /></span>
        <span className="jj-trigger-text">
          <strong>Ask Joojo</strong>
          <span>{tagline}</span>
        </span>
      </button>
    </aside>
  );
}
