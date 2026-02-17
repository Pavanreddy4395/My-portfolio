import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <Section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-sm md:text-base font-medium text-primary/60 tracking-widest uppercase">
          Welcome
        </h2>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary tracking-tight leading-[1.1]">
          Building digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 animate-gradient">
            experiences
          </span>
        </h1>
        
        <div className="h-px w-24 bg-border mx-auto my-8" />
        
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Full Stack Developer specializing in Java & React. 
          Creating clean, efficient, and user-centric solutions.
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
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <FileText className="mr-2 w-4 h-4" />
            Resume
          </Button>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </Section>
  );
}
