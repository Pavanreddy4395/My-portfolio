import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lazy, Suspense, useMemo, useRef, useState } from "react";

const EducationSection = lazy(() => import("@/pages/about/EducationSection"));
const SkillsSection = lazy(() => import("@/pages/about/SkillsSection"));
const InternshipSection = lazy(() => import("@/pages/about/InternshipSection"));
const AchievementsSection = lazy(() => import("@/pages/about/AchievementsSection"));
const CertificationsSection = lazy(() => import("@/pages/about/CertificationsSection"));

type AboutSectionId = "internships" | "education" | "skills" | "certifications" | "achievements";

const FULL_BLEED_SECTIONS: AboutSectionId[] = ["education", "certifications", "achievements", "skills"];

export default function About() {
  const sections = useMemo(
    () =>
      [
        { id: "education" as const, label: "Education", Component: EducationSection },
        { id: "skills" as const, label: "Technical Skills", Component: SkillsSection },
        { id: "internships" as const, label: "Internships", Component: InternshipSection },
        { id: "certifications" as const, label: "Certifications", Component: CertificationsSection },
        { id: "achievements" as const, label: "Achievements & Leadership", Component: AchievementsSection },
      ],
    []
  );

  const [activeSection, setActiveSection] = useState<AboutSectionId | null>(null);
  const detailsScrollRef = useRef<HTMLDivElement | null>(null);

  const activeMeta = useMemo(() => {
    if (!activeSection) return null;
    return sections.find((s) => s.id === activeSection) ?? null;
  }, [activeSection, sections]);

  const ActiveComponent = activeMeta?.Component ?? null;

  const renderAsFullBleed = useMemo(() => {
    if (!activeSection) return false;
    return FULL_BLEED_SECTIONS.includes(activeSection);
  }, [activeSection]);

  const openSection = (id: AboutSectionId) => {
    setActiveSection(id);
    // Scroll to the inline details area.
    window.requestAnimationFrame(() => {
      detailsScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <Section>
      <div className="space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold">About Me</h2>
          <div className="h-1 w-20 bg-primary/10 rounded-full" />
          
          <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
            <p>
              I’m a Computer Science Engineering student focused on cybersecurity and practical, hands-on learning.
              I’m especially interested in purple-team work—bridging offensive and defensive approaches with a strong foundation in networking and system fundamentals.
            </p>
            <p>
              Alongside security, I also build full-stack projects with Java and modern web tooling.
              I enjoy turning requirements into clean implementations, documenting what I learn, and steadily improving through problem-solving and certifications.
            </p>
          </div>

          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sections.map((s) => (
                <Button
                  key={s.id}
                  type="button"
                  variant="secondary"
                  onClick={() => openSection(s.id)}
                  className={cn(
                    "rounded-full justify-center",
                    activeSection === s.id && "ring-2 ring-primary/20"
                  )}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div ref={detailsScrollRef} className="scroll-mt-24" />

        {ActiveComponent && activeMeta ? (
          renderAsFullBleed ? (
            <div className="space-y-10">
              <h3 className="text-4xl md:text-5xl font-display font-bold text-center">{activeMeta.label}</h3>
              <Suspense fallback={<div className="h-[40vh] w-full" />}>
                <ActiveComponent />
              </Suspense>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 border-b border-border/50 px-6 py-4">
                <h3 className="text-2xl font-display font-bold">{activeMeta.label}</h3>
              </div>
              <div className="p-6 sm:p-8">
                <Suspense fallback={<div className="h-[40vh] w-full" />}>
                  <ActiveComponent />
                </Suspense>
              </div>
            </div>
          )
        ) : null}
      </div>
    </Section>
  );
}
