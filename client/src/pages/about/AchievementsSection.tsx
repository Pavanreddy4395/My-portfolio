import { Card } from "@/components/ui/card";

export default function AchievementsSection() {
  const achievements = [
    {
      title: "IET Scholarship Round 2 Qualifier (Jul 2024)",
      description: "Recognized for engineering excellence and academic merit.",
    },
    {
      title: "Technical Head – Entrepreneurship Development Cell (Jul 2025)",
      description: "Led technical initiatives, innovation programs, and student-driven tech projects.",
    },
    {
      title: "Academic Collaboration Lead – Eureka in Association with IIT Bombay (Aug 2025)",
      description: "Coordinated and contributed to industry-academic learning initiatives.",
    },
    {
      title: "Design Patent Holder – Smart Neck Posture Innovation (Aug 2025)",
      description: "Designed and developed an innovative smart posture correction solution.",
    },
    {
      title: "Technology Workshop Lead – MongoDB & NVIDIA (Sept 2025)",
      description:
        "Conducted hands-on technical workshops on databases and AI computing technologies.",
    },
    {
      title: "Top 10 Achiever – Red Hat National Hackathon (Sept 2025)",
      description: "Secured a top 10 position in a competitive national-level hackathon.",
    },
    {
      title: "Lead Organizer – Robotic Process Automation Hackathon (Oct 2025)",
      description: "Organized and managed an RPA-focused innovation challenge.",
    },
    {
      title: "Technical Head & Promotions Lead – LoveForAI AI Summit (Feb 2026)",
      description:
        "Led technical planning and promotional strategy for a large-scale AI summit.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((item) => (
        <Card key={item.title} className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="flex gap-4">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1">
              <p className="font-semibold text-sm sm:text-base">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
