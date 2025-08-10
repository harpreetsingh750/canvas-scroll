import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type LiquidDividerProps = {
  className?: string;
};

const LiquidDivider = ({ className }: LiquidDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("active");
          } else {
            el.classList.remove("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "liquid-divider smooth-reveal",
        "mx-auto w-full",
        className
      )}
      aria-hidden="true"
    />
  );
};

export default LiquidDivider;
