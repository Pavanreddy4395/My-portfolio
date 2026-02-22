import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
        <div className="p-3 bg-background rounded-full shadow-sm">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Education</h3>
          <p className="text-sm text-muted-foreground">B.Tech in CSE • Hyderabad, Telangana</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">KL University, Hyderabad</h4>
            <p className="text-sm text-muted-foreground">May 2023 – Present • Cumulative GPA: 9.52/10.0 (current)</p>
            <p className="text-sm text-muted-foreground">
              Relevant Coursework: Machine Learning, Data Structures & Algorithms, DBMS, Python Full Stack Development
            </p>
          </div>
        </Card>
        <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Sri Chaitanya Junior College</h4>
            <p className="text-sm text-muted-foreground">Apr 2021 – Apr 2023 • Cumulative GPA: 932/1000</p>
            <p className="text-sm text-muted-foreground">Relevant Coursework: Linear Algebra, Calculus, Probability</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
