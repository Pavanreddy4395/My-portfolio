import { Card } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    { name: "MongoDB Certified Developer Associate - C100 DEV", date: "NOV 2024" },
    { name: "Red Hat Certified System Administrator (RHCSA)", date: "Apr 2025" },
    { name: "Automation Anywhere Advanced RPA Professional", date: "Sept 2025" },
    { name: "Certified Ethical Hacker (CEH)", date: "Nov 2025" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert) => (
        <Card key={cert.name} className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="flex gap-4">
            <div className="pt-0.5 text-primary">
              <BadgeCheck className="h-5 w-5" aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-lg">{cert.name}</p>
              <p className="text-sm text-muted-foreground">{cert.date}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
