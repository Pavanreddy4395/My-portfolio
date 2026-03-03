import { Card } from "@/components/ui/card";

export default function EducationSection() {
  return (
    <div className="space-y-8">
      <Card className="rounded-xl p-8 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-start flex-col md:flex-row gap-6">
          <div className="space-y-1">
            <h4 className="text-2xl font-semibold">Bachelor of Technology</h4>
            <p className="text-primary">Computer Science and Engineering</p>
            <p className="text-muted-foreground">KL University, Hyderabad</p>
          </div>

          <div className="md:text-right space-y-1">
            <p className="text-muted-foreground">2023 – Present</p>
            <p className="text-primary font-semibold">CGPA: 9.52</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-xl p-8 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-start flex-col md:flex-row gap-6">
          <div className="space-y-1">
            <h4 className="text-2xl font-semibold">Intermediate Education</h4>
            <p className="text-primary">Telangana Board</p>
            <p className="text-muted-foreground">Sri Chaitanya Junior College</p>
          </div>

          <div className="md:text-right space-y-1">
            <p className="text-muted-foreground">2021 – 2023</p>
            <p className="text-primary font-semibold">Score: 932/1000</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-xl p-8 border border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-start flex-col md:flex-row gap-6">
          <div className="space-y-1">
            <h4 className="text-2xl font-semibold">10th Grade</h4>
            <p className="text-primary">Telangana Board of Secondary Education</p>
            <p className="text-muted-foreground">Sri Chaitanya School, Hyderabad</p>
          </div>

          <div className="md:text-right space-y-1">
            <p className="text-muted-foreground">2011 – 2021</p>
          </div>
        </div>
      </Card>
    </div>
  );
}