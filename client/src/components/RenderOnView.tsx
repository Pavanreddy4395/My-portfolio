import { ReactNode, useEffect, useRef, useState } from "react";

interface RenderOnViewProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
  placeholderClassName?: string;
  once?: boolean;
}

export function RenderOnView({
  children,
  rootMargin = "200px 0px",
  threshold = 0,
  placeholderClassName = "min-h-[120px] w-full",
  once = true,
}: RenderOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isVisible && once) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else if (!once) setIsVisible(false);
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, once, rootMargin, threshold]);

  return (
    <div ref={ref} className={isVisible ? undefined : placeholderClassName}>
      {isVisible ? children : null}
    </div>
  );
}
