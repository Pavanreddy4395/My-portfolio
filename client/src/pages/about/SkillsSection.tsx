import { Card } from "@/components/ui/card";
import { Code2, Cpu, Network, Search, Server } from "lucide-react";
import {
  SiC,
  SiFlask,
  SiGit,
  SiGithub,
  SiGnubash,
  SiJavascript,
  SiOpenjdk,
  SiPython,
  SiSpringboot,
  SiWireshark,
} from "react-icons/si";

type SkillIcon = React.ComponentType<{ className?: string }>;

const skillIconMap: Record<string, SkillIcon> = {
  C: SiC,
  Python: SiPython,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  Flask: SiFlask,
  "Spring Boot": SiSpringboot,
  Git: SiGit,
  GitHub: SiGithub,
  "Bash Scripting": SiGnubash,
  Wireshark: SiWireshark,
  Nmap: Search,
  "Basic Networking": Network,
};

function getSkillIcon(skill: string): SkillIcon | null {
  return skillIconMap[skill] ?? null;
}

export default function SkillsSection() {
  const skills = [
    { category: "Programming", items: ["C", "Python", "Java", "JavaScript"], icon: Code2 },
    { category: "Frameworks", items: ["Flask", "Spring Boot"], icon: Server },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Bash Scripting", "Wireshark", "Nmap", "Basic Networking"],
      icon: Cpu,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skillGroup) => (
        <Card
          key={skillGroup.category}
          className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/5">
              <skillGroup.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h4 className="font-semibold text-lg">{skillGroup.category}</h4>
          </div>

          <div className="mt-5 space-y-2">
            {skillGroup.items.map((skill) => {
              const Icon = getSkillIcon(skill);
              return (
                <div key={skill} className="flex items-center gap-3 text-muted-foreground">
                  {Icon ? <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /> : null}
                  <span className="text-sm sm:text-base">{skill}</span>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
