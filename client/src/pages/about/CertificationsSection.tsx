import { Card } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

export default function CertificationsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-4">
          <div className="pt-0.5 text-primary">
            <BadgeCheck className="h-5 w-5" aria-hidden />
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-semibold text-lg">Certified Ethical Hacker (CEH)</p>
              <p className="text-sm text-muted-foreground">Nov 2025</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Credentialed in ethical hacking techniques including penetration testing, vulnerability assessment, footprinting, and network security.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-4">
          <div className="pt-0.5 text-primary">
            <BadgeCheck className="h-5 w-5" aria-hidden />
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-semibold text-lg">Red Hat Certified System Administrator (RHCSA)</p>
              <p className="text-sm text-muted-foreground">Apr 2024</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Validated Linux system administration skills: user management, storage configuration, security, and shell scripting.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
