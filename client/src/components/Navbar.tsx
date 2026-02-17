import { cn } from "@/lib/utils";

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
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="font-display font-bold text-2xl tracking-tight cursor-pointer select-none"
          onClick={() => onNavigate("home")}
        >
          Portfolio.
        </div>
        
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300 hover:text-primary py-2",
                  currentPage === item.id 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
