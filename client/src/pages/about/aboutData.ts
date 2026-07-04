export type EducationEntry = {
  title: string;
  subtitle: string;
  org: string;
  location?: string;
  period: string;
  scoreLabel: string;
};

export const educationEntries: EducationEntry[] = [
  {
    title: "Bachelor of Technology",
    subtitle: "Computer Science and Engineering",
    org: "KL University, Hyderabad",
    period: "2023 – Present",
    scoreLabel: "CGPA: 9.6",
  },
  {
    title: "Intermediate Education",
    subtitle: "Telangana Board",
    org: "Sri Chaitanya Junior College",
    period: "2021 – 2023",
    scoreLabel: "Score: 932/1000",
  },
  {
    title: "10th Grade",
    subtitle: "Telangana Board of Secondary Education",
    org: "Sri Chaitanya School, Hyderabad",
    period: "2011 – 2021",
    scoreLabel: "CGPA: 10",
  },
];

export type SkillGroup = {
  category: "Programming" | "Frameworks" | "Tools";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Programming", items: ["C", "Python", "Java", "JavaScript"] },
  { category: "Frameworks", items: ["Flask", "Spring Boot"] },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Bash Scripting", "Wireshark", "Nmap", "Basic Networking"],
  },
];

export type InternshipEntry = {
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

export const internships: InternshipEntry[] = [
  {
    company: "Future Interns",
    period: "Oct – Nov 2025",
    location: "Hyderabad, Telangana",
    bullets: [
      "Monitored network activity and analyzed system logs to identify anomalies, supporting proactive threat detection.",
      "Assisted in basic network configuration, troubleshooting, and maintaining secure access under guidance of senior engineers.",
      "Contributed to creating awareness material and guidelines for secure user practices.",
    ],
  },
];

export type CertificationEntry = {
  name: string;
  date: string;
};

export const certifications: CertificationEntry[] = [
  { name: "MongoDB Certified Developer Associate - C100 DEV", date: "NOV 2024" },
  { name: "Red Hat Certified System Administrator (RHCSA)", date: "Apr 2025" },
  { name: "Automation Anywhere Advanced RPA Professional", date: "Sept 2025" },
  { name: "Certified Ethical Hacker (CEH)", date: "Nov 2025" },
  { name: "AWS Certified Cloud Practitioner", date: "May 2026" },
];

export type AchievementEntry = {
  title: string;
  description: string;
};

export const achievements: AchievementEntry[] = [
  {
    title: "IET Scholarship Round 2 Qualifier (Jul 2024)",
    description: "Recognized for engineering excellence and academic merit.",
  },
  {
    title: "Technical Head – Entrepreneurship Development Cell (Jul 2025)",
    description: "Led technical initiatives, innovation programs, and student-driven tech projects.",
  },
  {
    title: "Academic Collaboration Lead – Eureka in Association with IIT Bombay (Aug 2025)",
    description: "Coordinated and contributed to industry-academic learning initiatives.",
  },
  {
    title: "Design Patent Holder – Smart Neck Posture Innovation (Aug 2025)",
    description: "Designed and developed an innovative smart posture correction solution.",
  },
  {
    title: "Technology Workshop Lead – MongoDB & NVIDIA (Sept 2025)",
    description: "Conducted hands-on technical workshops on databases and AI computing technologies.",
  },
  {
    title: "Top 10 Achiever – Red Hat National Hackathon (Sept 2025)",
    description: "Secured a top 10 position in a competitive national-level hackathon.",
  },
  {
    title: "Lead Organizer – Robotic Process Automation Hackathon (Oct 2025)",
    description: "Organized and managed an RPA-focused innovation challenge.",
  },
  {
    title: "Technical Head & Promotions Lead – LoveForAI AI Summit (Feb 2026)",
    description: "Led technical planning and promotional strategy for a large-scale AI summit.",
  },
];
