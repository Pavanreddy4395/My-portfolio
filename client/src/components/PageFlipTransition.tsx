import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageFlipTransitionProps {
  children: ReactNode;
  currentPage: string;
}

export function PageFlipTransition({ children, currentPage }: PageFlipTransitionProps) {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden perspective-1000">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          initial={{ 
            rotateY: -90, 
            opacity: 0, 
            transformOrigin: "left center",
            x: "100%"
          }}
          animate={{ 
            rotateY: 0, 
            opacity: 1, 
            x: "0%",
            transition: { 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1], // Custom elegant ease
              type: "tween" 
            }
          }}
          exit={{ 
            rotateY: 90, 
            opacity: 0, 
            transformOrigin: "right center",
            x: "-100%",
            transition: { 
              duration: 0.6, 
              ease: "easeInOut" 
            }
          }}
          className="w-full h-full absolute top-0 left-0 bg-background backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Subtle paper texture/shadow overlay during transition */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
          />
          
          <div className="w-full h-full overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
