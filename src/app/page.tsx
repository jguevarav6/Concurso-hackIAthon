import { DemoExperience } from "@/components/demo/DemoExperience";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TechnicalSummary } from "@/components/landing/TechnicalSummary";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8f7] text-ink">
      <div className="border-b border-slate-200/80 bg-white/75 backdrop-blur">
        <Hero />
      </div>

      <DemoExperience />

      <div className="border-t border-slate-200/80 bg-white">
        <HowItWorks />
      </div>
      <TechnicalSummary />
    </main>
  );
}
