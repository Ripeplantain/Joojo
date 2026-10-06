"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useEffect, useRef, useState } from "react";

const suggestedQuestions = [
  "What does Emmanuel do at Hubtel?",
  "Tell me about the Lenders Portal.",
  "What is Emmanuel strongest at?",
];

export default function DigitalTwin() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
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
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  return (
    <aside className={`chatbot ${isOpen ? "is-open" : ""}`} aria-label="Chat with Joojo">
      {isOpen && (
        <div className="chatbot-panel" id="emmanuel-chatbot-panel">
          <div className="twin-chat-header">
            <div><span className="twin-avatar">JJ</span><div><strong>Joojo</strong><span>Emmanuel&apos;s AI career guide / online</span></div></div>
            <button className="chatbot-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">x</button>
          </div>
          <div className="twin-messages" aria-live="polite" ref={messagesRef}>
            <div className="twin-message twin-assistant">
              <span className="message-label">Joojo</span>
              <p>Hi, I&apos;m Joojo, Emmanuel&apos;s digital twin. Ask me about his career, projects, strengths, or technical focus.</p>
            </div>
            {messages.map((message) => (
              <div className={`twin-message ${message.role === "user" ? "twin-user" : "twin-assistant"}`} key={message.id}>
                <span className="message-label">{message.role === "user" ? "You" : "Joojo"}</span>
                <p>{message.parts.map((part, index) => part.type === "text" ? <span key={`${message.id}-${index}`}>{part.text}</span> : null)}</p>
              </div>
            ))}
            {status === "submitted" && <div className="twin-thinking"><span /><span /><span /> thinking</div>}
            {error && <div className="twin-error">Joojo could not respond right now. Please try again.</div>}
          </div>
          {messages.length === 0 && (
            <div className="chatbot-prompts" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => <button key={question} type="button" onClick={() => ask(question)} disabled={isBusy}>{question}</button>)}
            </div>
          )}
          <form className="twin-form" onSubmit={handleSubmit}>
            <input aria-label="Ask Joojo" value={input} onChange={(event) => setInput(event.target.value)} disabled={isBusy} placeholder="Ask Joojo about Emmanuel..." />
            {isBusy ? <button className="twin-submit twin-stop" type="button" onClick={stop} aria-label="Stop response">Stop</button> : <button className="twin-submit" type="submit" disabled={!input.trim()} aria-label="Send question">-&gt;</button>}
          </form>
        </div>
      )}

      <div className="chatbot-launch">
        <button
          className="chatbot-trigger"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-controls="emmanuel-chatbot-panel"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Joojo chat" : "Open Joojo chat"}
        >
          <span className="chatbot-hover-copy">hi want to know more about emmanuel</span>
          <span className="chatbot-pulse" aria-hidden="true" />
          <span className="chatbot-glyph" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" aria-label="Robot assistant">
              <path className="robot-antenna" d="M24 7v5" />
              <circle className="robot-light" cx="24" cy="5" r="2" />
              <rect className="robot-shell" x="8" y="12" width="32" height="25" rx="8" />
              <circle className="robot-eye" cx="18" cy="24" r="2.5" />
              <circle className="robot-eye" cx="30" cy="24" r="2.5" />
              <path className="robot-mouth" d="M18 30c3 2 9 2 12 0" />
              <path className="robot-ear" d="M8 22H5v7h3M40 22h3v7h-3" />
            </svg>
          </span>
        </button>
        <span className="chatbot-splash-copy" aria-hidden="true">Meet Joojo <span>Ask about Emmanuel&apos;s work</span></span>
        <button className="chatbot-label" type="button" onClick={() => setIsOpen(true)} aria-controls="emmanuel-chatbot-panel">
          Chat with Joojo
        </button>
      </div>
    </aside>
  );
}
