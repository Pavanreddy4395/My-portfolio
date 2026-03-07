import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Projects() {
  const projects = [
    {
      title: "E-Auction",
      description:
        "Built a scalable E-Auction platform using Spring Boot and MongoDB, featuring JWT authentication, role-based access control, and real-time bidding with WebSockets. Contributed as a Backend Developer responsible for API development and system integration.",
      tags: ["Java", "Spring Boot", "MongoDB", "JWT", "WebSockets"],
      links: { github: "https://github.com/Pavanreddy4395" },
    },
    {
      title: "MedMaxDel",
      description:
        "Developed MedMaxDel, a medicine ordering platform with recurring orders for chronic care patients, automated reminders, prescription uploads, and order tracking features, contributing primarily in a frontend development role.",
      tags: ["React", "JavaScript", "UI", "Product Work"],
      links: { github: "https://github.com/Pavanreddy4395" },
    }
  ];

  return (
    <Section>
      <div className="space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of my recent work, ranging from full-stack web applications to complex system architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-border/40 hover:border-border hover:shadow-xl hover:shadow-black/5 transition-all duration-500 bg-card"
            >
              <CardHeader className="space-y-2 pt-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
              
              <CardFooter className="flex gap-4 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-4 gap-2"
                  onClick={() => window.open(project.links.github, "_blank")}
                >
                  GitHub <Github className="w-3 h-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div>
          {/* <Button variant="outline" onClick={() => window.open("https://github.com/Pavanreddy4395", "_blank")}>
            Visit GitHub Profile
          </Button> */}
        </div>
      </div>
    </Section>
  );
}
