import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "w-full max-w-4xl mx-auto px-6 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700", 
        className
      )}
    >
      {children}
    </section>
  );
}
