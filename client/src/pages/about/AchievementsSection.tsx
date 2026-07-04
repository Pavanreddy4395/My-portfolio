import { Card } from "@/components/ui/card";
import { achievements } from "@/pages/about/aboutData";

export default function AchievementsSection() {
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
