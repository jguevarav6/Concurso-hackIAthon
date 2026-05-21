import { ChatBox } from "@/components/chat/ChatBox";
import { PatientSelector } from "@/components/chat/PatientSelector";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TechnicalSummary } from "@/components/landing/TechnicalSummary";
import { AgentTrace } from "@/components/results/AgentTrace";
import { CoveragePanel } from "@/components/results/CoveragePanel";
import { HospitalRanking } from "@/components/results/HospitalRanking";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Hero />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        <div className="space-y-4">
          <PatientSelector />
          <ChatBox />
        </div>
        <aside className="space-y-4">
          <CoveragePanel />
          <HospitalRanking />
          <AgentTrace />
        </aside>
      </section>
      <HowItWorks />
      <TechnicalSummary />
    </main>
  );
}
