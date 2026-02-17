## Packages
framer-motion | Essential for the 3D page flip animations and smooth transitions
lucide-react | Beautiful icons for the UI
wouter | Lightweight routing (already in base, but confirming usage)
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility for merging Tailwind classes safely

## Notes
- The "page flip" effect will be implemented using Framer Motion's `AnimatePresence` and 3D transforms.
- Navigation will handle internal state to trigger animations before switching content.
- Images will be sourced from Unsplash for placeholders if needed, but mostly relying on typography and layout.
