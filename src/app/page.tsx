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
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8f7] text-ink">
      <div className="border-b border-slate-200/80 bg-white/75 backdrop-blur">
        <Hero />
      </div>

      <section
        id="demo"
        className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-6 lg:py-8"
      >
        <div className="min-w-0 space-y-5">
          <PatientSelector />
          <ChatBox />
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-6 lg:self-start">
          <CoveragePanel />
          <HospitalRanking />
          <AgentTrace />
        </aside>
      </section>

      <div className="border-t border-slate-200/80 bg-white">
        <HowItWorks />
      </div>
      <TechnicalSummary />
    </main>
  );
}
