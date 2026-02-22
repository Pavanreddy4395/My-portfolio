import { Card } from "@/components/ui/card";

export default function InternshipSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-display font-semibold">Internship</h3>
      <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-semibold text-lg">Future Interns</h4>
            <p className="text-sm text-muted-foreground">Oct – Nov 2025 • Hyderabad, Telangana</p>
          </div>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>
              Monitored network activity and analyzed system logs to identify anomalies, supporting proactive threat detection.
            </li>
            <li>
              Assisted in basic network configuration, troubleshooting, and maintaining secure access under guidance of senior engineers.
            </li>
            <li>Contributed to creating awareness material and guidelines for secure user practices.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
