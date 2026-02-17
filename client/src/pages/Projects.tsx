import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Projects() {
  const projects = [
    {
      title: "Online Auction Platform",
      description: "A secure, real-time bidding system allowing users to list items and place bids. Features automated auction timers and bid tracking.",
      tags: ["Java", "Spring Boot", "React", "WebSocket"],
      links: { demo: "#", github: "#" },
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=1000&auto=format&fit=crop" // Abstract tech/auction image
    },
    {
      title: "Voting Application",
      description: "Secure electronic voting system with real-time result visualization and robust authentication to ensure one-person-one-vote integrity.",
      tags: ["React", "Node.js", "MongoDB", "JWT"],
      links: { demo: "#", github: "#" },
      image: "https://images.unsplash.com/photo-1540910419868-474947ce5dd8?q=80&w=1000&auto=format&fit=crop" // Abstract voting/community image
    },
    {
      title: "Bookstore Application",
      description: "E-commerce platform for books with inventory management, cart functionality, and admin dashboard for stock control.",
      tags: ["Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
      links: { demo: "#", github: "#" },
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop" // Library/books image
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
              <div className="aspect-video w-full overflow-hidden relative">
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
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
                <Button variant="default" size="sm" className="rounded-full px-4 gap-2">
                  View Demo <ExternalLink className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full px-4 gap-2">
                  Code <Github className="w-3 h-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* "Coming Soon" placeholder card to balance the grid if odd number, or just as a CTA */}
          <Card className="flex flex-col items-center justify-center p-8 border-dashed border-2 border-border/60 bg-transparent min-h-[300px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <ArrowRight className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold">More in the works</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                I'm always building something new. Check back soon for more updates.
              </p>
              <Button variant="outline" onClick={() => window.open('https://github.com', '_blank')}>
                Visit GitHub Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
