import { Card } from "@/components/ui/card";
import { internships } from "@/pages/about/aboutData";

export default function InternshipSection() {
  return (
    <div className="space-y-8">
      {internships.map((internship) => (
        <Card
          key={internship.company}
          className="rounded-xl p-8 border border-border/40 bg-card/50 backdrop-blur-sm"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-col md:flex-row gap-6">
              <div className="space-y-1">
                <h4 className="text-2xl font-semibold">{internship.company}</h4>
              </div>

              <div className="md:text-right space-y-1">
                <p className="text-muted-foreground">{internship.period}</p>
                <p className="text-muted-foreground">{internship.location}</p>
              </div>
            </div>

            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2 leading-relaxed">
              {internship.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}
