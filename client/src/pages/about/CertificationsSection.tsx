import { Card } from "@/components/ui/card";

export default function CertificationsSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-display font-semibold">Certifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Certified Ethical Hacker (CEH)</h4>
            <p className="text-sm text-muted-foreground">Nov 2025</p>
            <p className="text-sm text-muted-foreground">
              Credentialed in ethical hacking techniques including penetration testing, vulnerability assessment, footprinting, and network security.
            </p>
          </div>
        </Card>
        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Red Hat Certified System Administrator (RHCSA)</h4>
            <p className="text-sm text-muted-foreground">Apr 2024</p>
            <p className="text-sm text-muted-foreground">
              Validated Linux system administration skills: user management, storage configuration, security, and shell scripting.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
