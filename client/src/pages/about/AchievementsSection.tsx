import { Card } from "@/components/ui/card";

export default function AchievementsSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-display font-semibold">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Patented Innovation: Smart Neck Posture Analysis</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Developed a smart sensor system to monitor and improve neck posture.</li>
              <li>Helps reduce strain and promotes better ergonomic health.</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
