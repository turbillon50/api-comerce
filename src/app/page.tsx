import { LandingNav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BlendShowcase } from "@/components/landing/BlendShowcase";
import { AgentSection } from "@/components/landing/AgentSection";
import { Pricing } from "@/components/landing/Pricing";
import { CTAFooter } from "@/components/landing/CTAFooter";

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <main>
        <Hero />
        <Manifesto />
        <HowItWorks />
        <BlendShowcase />
        <AgentSection />
        <Pricing />
        <CTAFooter />
      </main>
    </>
  );
}
