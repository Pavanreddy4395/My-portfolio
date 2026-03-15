import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, ChefHat, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  SiCanva,
  SiFlask,
  SiLinux,
  SiMongodb,
  SiOpenjdk,
  SiPython,
  SiWireshark,
} from "react-icons/si";

type TechIcon = React.ComponentType<{ className?: string }>;

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const profileName = "Bareddy Pavan Kumar Reddy";
  const profileInitials = "PK";
  const email = "brkreddy2005@gmail.com";
  const githubUrl = "https://github.com/Pavanreddy4395";
  const linkedinUrl = "https://www.linkedin.com/in/bareddy-pavan-kumar-reddy-29b0a8357/";

  const headingLine1 = useMemo(() => "Advancing Cyber", []);
  const headingLine2 = useMemo(() => "Security", []);
  const fullHeading = useMemo(() => `${headingLine1} ${headingLine2}`, [headingLine1, headingLine2]);
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) { 
      setTypedLine1(headingLine1);
      setTypedLine2(headingLine2);
      setIsTypingDone(true);
      return;
    }

    const activeTimeoutIds = new Set<number>();
    let cancelled = false;

    const schedule = (fn: () => void, delayMs: number) => {
      let timeoutId = 0;
      timeoutId = window.setTimeout(() => {
        activeTimeoutIds.delete(timeoutId);
        if (!cancelled) fn();
      }, delayMs);
      activeTimeoutIds.add(timeoutId);
    };

    const typeText = (
      text: string,
      setText: (value: string) => void,
      options: { delayMs?: number; speedMs?: number } = {}
    ) => {
      const { delayMs = 0, speedMs = 45 } = options;
      let i = 0;
      const tick = () => {
        i += 1;
        setText(text.slice(0, i));
        if (i < text.length) schedule(tick, speedMs);
      };
      schedule(tick, delayMs);
    };

    const initialDelayMs = 10;
    const line1SpeedMs = 200;
    const betweenLinesPauseMs = 120;
    const line2SpeedMs = 35;
    const loopPauseMs = 1200;

    const startCycle = () => {
      setTypedLine1("");
      setTypedLine2("");
      setIsTypingDone(false);

      typeText(headingLine1, setTypedLine1, { delayMs: initialDelayMs, speedMs: line1SpeedMs });
      typeText(headingLine2, setTypedLine2, {
        delayMs: initialDelayMs + headingLine1.length * line1SpeedMs + betweenLinesPauseMs,
        speedMs: line2SpeedMs,
      });

      const doneDelay =
        initialDelayMs +
        headingLine1.length * line1SpeedMs +
        betweenLinesPauseMs +
        headingLine2.length * line2SpeedMs +
        150;

      schedule(() => setIsTypingDone(true), doneDelay);
      schedule(startCycle, doneDelay + loopPauseMs);
    };

    startCycle();

    return () => {
      cancelled = true;
      activeTimeoutIds.forEach((id) => window.clearTimeout(id));
      activeTimeoutIds.clear();
    };
  }, [headingLine1, headingLine2]);

  const technologies = useMemo(
    () =>
      [
        { label: "Java", Icon: SiOpenjdk as TechIcon },
        { label: "Python", Icon: SiPython as TechIcon },
        { label: "Flask", Icon: SiFlask as TechIcon },
        { label: "MongoDB", Icon: SiMongodb as TechIcon },
        { label: "Wireshark", Icon: SiWireshark as TechIcon },
        { label: "CyberChef", Icon: ChefHat as TechIcon },
        { label: "Canva", Icon: SiCanva as TechIcon },
        { label: "Linux (CLI & Bash)", Icon: SiLinux as TechIcon },
      ] as const,
    []
  );

  return (
    <>
      <Section className="relative flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full grid grid-cols-1 md:grid-cols-[300px,1fr,300px] items-center gap-10">
          <div className="flex flex-col items-center">
            <Avatar className="h-72 w-72 md:h-80 md:w-80">
              <AvatarImage src="/Image1.jpg" alt={profileName} className="object-cover" />
              <AvatarFallback delayMs={0} className="text-2xl font-semibold">
                {profileInitials}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 text-center">
              <div className="text-xs md:text-2xl text-lg font-display font-semibold text-foreground">
                {profileName}
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-muted-foreground">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="transition-colors hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </a>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="transition-colors hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </a>

                <a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  title={email}
                  className="transition-colors hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto text-center">
            {/* <h2 className="text-sm md:text-base font-medium text-primary/60 tracking-widest uppercase">
              Welcome
            </h2> */}

            <h1
              className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary tracking-tight leading-[1.1]"
              aria-label={fullHeading}
            >
              <span className="sr-only">{fullHeading}</span>
              {/*
                Layout-stability: reserve space for the full heading so the content below
                (buttons/paragraph) never shifts while the typing animation loops.
              */}
              <span className="invisible block" aria-hidden="true">
                {headingLine1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 animate-gradient">
                  {headingLine2}
                </span>
              </span>

              <span className="absolute inset-0" aria-hidden="true">
                {typedLine1}
                {!isTypingDone && typedLine1.length < headingLine1.length ? (
                  <span className="inline-block ml-1 align-[-0.15em] h-px w-[0.6em] bg-primary animate-pulse" />
                ) : null}
                {typedLine1.length >= headingLine1.length ? " " : null}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 animate-gradient">
                  {typedLine2}
                </span>
                {!isTypingDone && typedLine1.length >= headingLine1.length ? (
                  <span className="inline-block ml-1 align-[-0.15em] h-px w-[0.6em] bg-primary animate-pulse" />
                ) : null}
              </span>
            </h1>

            <div className="h-px w-24 bg-border mx-auto my-8" />

            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
             Aspiring Purple Team Security Analyst
Bridging red and blue team methodologies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300"
                onClick={() => onNavigate("projects")}
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium border-2 hover:bg-secondary/50 transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1fRO9SFb_IicoTptrloQhD4lHWYKplrFF/view?usp=sharing",
                    "_blank"
                  )
                }
              >
                <FileText className="mr-2 w-4 h-4" />
                Resume
              </Button>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>

        {/* Decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 blur-[100px] rounded-full -z-10 pointer-events-none" />
      </Section>

      <Section className="pt-4 md:pt-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
          Technologies &amp; Tools I Work With
        </h2>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {technologies.map(({ label, Icon }) => (
            <Card
              key={label}
              className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" aria-hidden />
              </div>
              <div className="text-sm sm:text-base text-center text-foreground">{label}</div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
