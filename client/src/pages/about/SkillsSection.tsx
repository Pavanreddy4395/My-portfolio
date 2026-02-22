import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-8">
      <h3 className="text-2xl font-display font-semibold">Technical Arsenal</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skillGroup, idx) => (
          <Card
            key={idx}
            className="p-6 border border-border/40 hover:border-border hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/5 rounded-lg">
                <skillGroup.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-lg">{skillGroup.category}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                (() => {
                  const Icon = getSkillIcon(skill);
                  return (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={
                    "group inline-flex items-center gap-2 px-3 py-1 text-sm font-normal " +
                    "bg-secondary/50 hover:bg-secondary border-transparent"
                  }
                >
                  {Icon ? (
                    <Icon
                      className={
                        "h-4 w-4 shrink-0 text-foreground/80 " +
                        "transition-transform duration-200 group-hover:scale-105"
                      }
                      aria-hidden
                    />
                  ) : null}
                  <span>{skill}</span>
                </Badge>
                  );
                })()
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
