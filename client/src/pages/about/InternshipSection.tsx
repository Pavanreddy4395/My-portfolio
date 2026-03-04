import { Card } from "@/components/ui/card";

export default function InternshipSection() {
  return (
    <div className="space-y-8">
      <Card className="rounded-xl p-8 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex justify-between items-start flex-col md:flex-row gap-6">
            <div className="space-y-1">
              <h4 className="text-2xl font-semibold">Future Interns</h4>
            </div>

            <div className="md:text-right space-y-1">
              <p className="text-muted-foreground">Oct – Nov 2025</p>
              <p className="text-muted-foreground">Hyderabad, Telangana</p>
            </div>
          </div>

          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2 leading-relaxed">
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
