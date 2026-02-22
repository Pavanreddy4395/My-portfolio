import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lazy, Suspense, useMemo, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const EducationSection = lazy(() => import("@/pages/about/EducationSection"));
const SkillsSection = lazy(() => import("@/pages/about/SkillsSection"));
const InternshipSection = lazy(() => import("@/pages/about/InternshipSection"));
const AchievementsSection = lazy(() => import("@/pages/about/AchievementsSection"));
const CodeStatsSection = lazy(() => import("@/pages/about/CodeStatsSection"));
const CertificationsSection = lazy(() => import("@/pages/about/CertificationsSection"));

type AboutSectionId = "internships" | "education" | "code-stats" | "skills" | "certifications" | "achievements";

export default function About() {
  const sections = useMemo(
    () =>
      [
        { id: "education" as const, label: "Education", Component: EducationSection },
        { id: "skills" as const, label: "Skills", Component: SkillsSection },
        { id: "internships" as const, label: "Internships", Component: InternshipSection },
        { id: "code-stats" as const, label: "Code Stats", Component: CodeStatsSection },
        { id: "certifications" as const, label: "Certifications", Component: CertificationsSection },
        { id: "achievements" as const, label: "Achievements", Component: AchievementsSection },
      ],
    []
  );

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<AboutSectionId | null>(null);
  const clearActiveTimeoutRef = useRef<number | null>(null);

  const ActiveComponent = useMemo(() => {
    if (!activeSection) return null;
    return sections.find((s) => s.id === activeSection)?.Component ?? null;
  }, [activeSection, sections]);

  const openSection = (id: AboutSectionId) => {
    if (clearActiveTimeoutRef.current != null) {
      window.clearTimeout(clearActiveTimeoutRef.current);
      clearActiveTimeoutRef.current = null;
    }
    setActiveSection(id);
    setOpen(true);
  };

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // Keep content mounted briefly so the close animation can play.
      clearActiveTimeoutRef.current = window.setTimeout(() => {
        setActiveSection(null);
        clearActiveTimeoutRef.current = null;
      }, 750);
    }
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
                  className="rounded-full justify-center"
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay
              className={cn(
                "fixed inset-0 z-50",
                "bg-black/70 backdrop-blur-sm",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                "duration-700"
              )}
            />

            <DialogPrimitive.Content
              className={cn(
                "fixed inset-0 z-50 p-4 sm:p-6 outline-none",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-6",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-6",
                "duration-700 motion-reduce:animate-none"
              )}
            >
              <div className="relative mx-auto h-full w-full max-w-5xl">
                <DialogPrimitive.Close asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogPrimitive.Close>

                <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm">
                  <div className="h-full overflow-y-auto p-6 sm:p-8">
                    {ActiveComponent ? (
                      <Suspense fallback={<div className="h-[40vh] w-full" />}>
                        <ActiveComponent />
                      </Suspense>
                    ) : null}
                  </div>
                </div>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </Section>
  );
}
