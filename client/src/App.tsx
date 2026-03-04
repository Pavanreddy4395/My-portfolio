import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { PageFlipTransition } from "@/components/PageFlipTransition";
import { RocketBackground } from "@/components/RocketBackground";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import CodeStats from "@/pages/CodeStats";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");

  // This function renders the active page component based on state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "about":
        return <About />;
      case "code-stats":
        return <CodeStats />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent font-sans text-foreground selection:bg-primary/10">
      <RocketBackground />

      <div className="relative z-10">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

        <main className="relative">
          <PageFlipTransition currentPage={currentPage}>{renderPage()}</PageFlipTransition>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Portfolio />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
