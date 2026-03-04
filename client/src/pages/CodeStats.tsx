import { Section } from "@/components/Section";
import { Suspense, lazy } from "react";

const CodeStatsSection = lazy(() => import("@/pages/about/CodeStatsSection"));

export default function CodeStats() {
  return (
    <Section className="max-w-none py-0 overflow-x-hidden">
      <div className="space-y-6">
        <div className="space-y-3 pt-2">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center">Coding &amp; CTF</h2>
          <div className="h-1 w-20 bg-primary/10 rounded-full mx-auto" />
        </div>

        <Suspense fallback={<div className="h-[40vh] w-full" />}>
          <CodeStatsSection />
        </Suspense>
      </div>
    </Section>
  );
}
