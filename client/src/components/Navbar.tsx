import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div 
          className="font-display font-bold text-2xl tracking-tight cursor-pointer select-none"
          onClick={() => onNavigate("home")}
        >
          Portfolio.
        </div>
        
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Button
                onClick={() => onNavigate(item.id)}
                aria-current={currentPage === item.id ? "page" : undefined}
                variant={currentPage === item.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  currentPage === item.id
                    ? "shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
