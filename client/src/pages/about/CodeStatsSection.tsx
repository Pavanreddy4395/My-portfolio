import { Card } from "@/components/ui/card";

export default function CodeStatsSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-display font-semibold">Code Stats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">CodeChef</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Highest rating: 1405 (2★)</li>
              <li>Current: 1405</li>
              <li>250+ problems solved across various difficulty levels</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">GitHub</h4>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://github.com/Pavanreddy4395"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                github.com/Pavanreddy4395
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
