import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type AnimatedUnderlineHeadingProps = {
  text: string;
  level?: HeadingLevel;
  className?: string;
  underlineHeight?: number; // svg height in px
  strokeWidth?: number;
  ease?: string; // CSS timing function
  durationMs?: number;
};

const AnimatedUnderlineHeading = ({
  text,
  level = "h2",
  className,
  underlineHeight = 28,
  strokeWidth = 1.25,
  ease = "cubic-bezier(0.25, 0.8, 0.25, 1)",
  durationMs = 1400,
}: AnimatedUnderlineHeadingProps) => {
  const Tag = useMemo(() => level, [level]) as any;
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState(0);

  // Build a smooth organic underline path based on container width
  const buildPath = (w: number) => {
    const h = underlineHeight;
    const y = Math.max(1, Math.floor(h * 0.6));
    const amp = Math.max(6, Math.min(16, Math.floor(w * 0.03))); // amplitude based on width
    const seg = w / 3; // three segments
    return `M0 ${y} C ${seg * 0.35} ${y - amp}, ${seg * 0.65} ${y + amp}, ${seg} ${y} C ${seg * 1.35} ${y - amp}, ${seg * 1.65} ${y + amp}, ${seg * 2} ${y} C ${seg * 2.35} ${y - amp}, ${seg * 2.65} ${y + amp}, ${w} ${y}`;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setWidth(el.clientWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svgPath = pathRef.current;
    const el = containerRef.current;
    if (!svgPath || !el || width <= 0) return;

    // Set the path d based on current width
    svgPath.setAttribute("d", buildPath(width));

    // Prepare stroke-draw
    const total = svgPath.getTotalLength();
    svgPath.style.strokeDasharray = `${total}`;
    svgPath.style.strokeDashoffset = `${total}`;
    svgPath.style.transition = `stroke-dashoffset ${durationMs}ms ${ease}`;

    // Observe and trigger when entering viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              svgPath.style.strokeDashoffset = "0";
            });
          } else {
            // reset when out for replays on scroll up
            svgPath.style.strokeDashoffset = `${total}`;
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [width, ease, durationMs]);

  return (
    <Tag className={cn("relative inline-block", className)}>
      <div ref={containerRef} className="relative inline-block">
        <span className="relative z-10">{text}</span>
        <svg
          className="absolute left-0 right-0 -bottom-2 w-full"
          width={width}
          height={underlineHeight}
          viewBox={`0 0 ${Math.max(width, 1)} ${underlineHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d=""
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </Tag>
  );
};

export default AnimatedUnderlineHeading;
