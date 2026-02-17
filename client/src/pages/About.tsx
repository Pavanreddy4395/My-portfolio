import { Section } from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code2, Database, Layout, Server, Cpu, GraduationCap } from "lucide-react";

export default function About() {
  const skills = [
    { category: "Frontend", items: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"], icon: Layout },
    { category: "Backend", items: ["Java", "Spring Boot", "Node.js", "Express"], icon: Server },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL"], icon: Database },
    { category: "Security", items: ["JWT", "BCrypt", "OAuth2"], icon: Code2 },
  ];

  return (
    <Section>
      <div className="space-y-16">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold">About Me</h2>
          <div className="h-1 w-20 bg-primary/10 rounded-full" />
          
          <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
            <p>
              I am a passionate Computer Science Engineering student with a deep interest in building scalable web applications. 
              My journey began with Java, where I learned the fundamentals of object-oriented programming, and evolved into 
              full-stack development where I now craft seamless end-to-end experiences.
            </p>
            <p>
              I believe that great software is not just about code—it's about solving real problems with elegant solutions.
              When I'm not coding, I'm exploring new technologies, contributing to open source, or refining my design sensibilities.
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
            <div className="p-3 bg-background rounded-full shadow-sm">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Education</h3>
              <p className="text-sm text-muted-foreground">B.Tech in Computer Science & Engineering</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-display font-semibold">Technical Arsenal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup, idx) => (
              <Card key={idx} className="p-6 border border-border/40 hover:border-border hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/5 rounded-lg">
                    <skillGroup.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg">{skillGroup.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-3 py-1 text-sm font-normal bg-secondary/50 hover:bg-secondary border-transparent"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
