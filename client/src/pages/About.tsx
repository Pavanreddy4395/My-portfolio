import { Section } from "@/components/Section";
import { lazy, Suspense } from "react";

const EducationSection = lazy(() => import("@/pages/about/EducationSection"));
const SkillsSection = lazy(() => import("@/pages/about/SkillsSection"));
const InternshipSection = lazy(() => import("@/pages/about/InternshipSection"));
const AchievementsSection = lazy(() => import("@/pages/about/AchievementsSection"));
const CertificationsSection = lazy(() => import("@/pages/about/CertificationsSection"));

export default function About() {
  const sections = [
    { id: "education" as const, label: "Education", Component: EducationSection },
    { id: "skills" as const, label: "Technical Skills", Component: SkillsSection },
    { id: "internships" as const, label: "Internships", Component: InternshipSection },
    { id: "certifications" as const, label: "Certifications", Component: CertificationsSection },
    { id: "achievements" as const, label: "Achievements & Leadership", Component: AchievementsSection },
  ];

  return (
    <Section>
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-display font-bold">About Me</h2>
                <div className="h-1 w-20 bg-primary/10 rounded-full" />
              </div>
            </div>
          </div>

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
        </div>

        <div className="space-y-10">
          {sections.map(({ id, label, Component }) => (
            <div key={id} id={id} className="scroll-mt-24">
              <div className="space-y-10">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-center">{label}</h3>
                <Suspense fallback={<div className="h-[40vh] w-full" />}>
                  <Component />
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
