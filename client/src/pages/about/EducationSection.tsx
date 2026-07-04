import { Card } from "@/components/ui/card";
import { educationEntries } from "@/pages/about/aboutData";

export default function EducationSection() {
  return (
    <div className="space-y-8">
      {educationEntries.map((entry) => (
        <Card
          key={entry.title}
          className="rounded-xl p-8 border border-border/40 bg-card/50 backdrop-blur-sm"
        >
          <div className="flex justify-between items-start flex-col md:flex-row gap-6">
            <div className="space-y-1">
              <h4 className="text-2xl font-semibold">{entry.title}</h4>
              <p className="text-primary">{entry.subtitle}</p>
              <p className="text-muted-foreground">{entry.org}</p>
            </div>

            <div className="md:text-right space-y-1">
              <p className="text-muted-foreground">{entry.period}</p>
              <p className="text-primary font-semibold">{entry.scoreLabel}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}