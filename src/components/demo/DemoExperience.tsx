"use client";

import { useState } from "react";
import { ChatBox } from "@/components/chat/ChatBox";
import { PatientSelector } from "@/components/chat/PatientSelector";
import { AgentTrace } from "@/components/results/AgentTrace";
import { CoveragePanel } from "@/components/results/CoveragePanel";
import { HospitalRanking } from "@/components/results/HospitalRanking";
import {
  buildCompletedTrace,
  demoPatients,
  emptyTrace,
  initialMessages,
  type ChatMessage
} from "@/lib/mock/demoData";
import type { AgentResponse } from "@/types/agent";

export function DemoExperience() {
  const [selectedPatientId, setSelectedPatientId] = useState(demoPatients[2].id);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [response, setResponse] = useState<AgentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedPatient =
    demoPatients.find((patient) => patient.id === selectedPatientId) ?? demoPatients[0];

  async function sendPatientMessage(message: string) {
    const trimmed = message.trim();
    if (trimmed.length < 5) return;

    setIsLoading(true);
    setInputValue("");
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", content: trimmed },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: selectedPatient.id, message: trimmed }),
      });
      const data: AgentResponse = await res.json();
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: "assistant", content: data.reply },
      ]);
      setResponse(data);
    } catch {
      setMessages((current) => [
        ...current,
        { id: `error-${Date.now()}`, role: "assistant", content: "Error al procesar la solicitud. Intenta de nuevo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="demo"
      className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-6 lg:py-8"
    >
      <div className="min-w-0 space-y-5">
        <PatientSelector
          patients={demoPatients}
          selectedPatientId={selectedPatientId}
          onChange={setSelectedPatientId}
        />
        <ChatBox
          inputValue={inputValue}
          isLoading={isLoading}
          messages={messages}
          onInputChange={setInputValue}
          onPromptSelect={sendPatientMessage}
          onSubmit={sendPatientMessage}
        />
      </div>

      <aside className="min-w-0 space-y-5 lg:sticky lg:top-6 lg:self-start">
        <CoveragePanel coverage={response?.coverage ?? null} specialty={response?.specialty ?? null} />
        <HospitalRanking
          ranking={response?.hospitalRanking ?? []}
          recommendedHospital={response?.recommendedHospital ?? null}
        />
        <AgentTrace steps={response ? buildCompletedTrace(response) : emptyTrace} />
      </aside>
    </section>
  );
}
