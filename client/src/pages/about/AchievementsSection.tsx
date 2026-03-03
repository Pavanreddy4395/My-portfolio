import { Card } from "@/components/ui/card";

export default function AchievementsSection() {
  const achievementLines = [
    "Patented Innovation: Smart Neck Posture Analysis",
    "Developed a smart sensor system to monitor and improve neck posture.",
    "Helps reduce strain and promotes better ergonomic health.",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievementLines.map((line) => (
        <Card key={line} className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="flex gap-4">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{line}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
