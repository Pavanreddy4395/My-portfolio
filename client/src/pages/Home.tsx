import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const profileName = "Bareddy Pavan Kumar Reddy";
  const profileInitials = "PK";
  const email = "brkreddy2005@gmail.com";
  const githubUrl = "https://github.com/Pavanreddy4395";
  const linkedinUrl = "https://linkedin.com";

  return (
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
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary tracking-tight leading-[1.1]">
            Advancing Cyber <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 animate-gradient">
              Security
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
              onClick={() => window.open("https://drive.google.com/file/d/1FGrmTTZdRtGSatptx5CUwHa5NCbUBM8e/view?usp=sharing", "_blank")}
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
  );
}
