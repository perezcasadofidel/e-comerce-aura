import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export function useCountUp(target: number, duration = 1.5, inView = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

export function useSectionInView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay } }),
};

export function SizeButton({ size, selected, onClick }: { size: string; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        borderColor: selected ? "#4A5D4E" : hovered ? "#C67C4E" : "#E5DFD9",
        background: selected ? "#4A5D4E" : hovered ? "rgba(198,124,78,0.10)" : "rgba(0,0,0,0)",
        color: selected ? "#ffffff" : "#2C2A28",
      }}
      transition={{ duration: 0.2 }}
      className="w-11 h-11 rounded-full border text-sm font-medium cursor-pointer"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {size}
    </motion.button>
  );
}

export function ImpactCounter({ num, prefix = "", suffix = "", label, sub }: { num: number; prefix?: string; suffix?: string; label: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(num, 1.5, inView);
  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.span
        className="text-3xl md:text-4xl mb-3"
        style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF" }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </motion.span>
      <motion.div
        className="h-px w-16 mb-4"
        style={{ background: "rgba(255,255,255,0.3)", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
      <span className="text-base font-medium" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.9)" }}>{label}</span>
      <span className="text-sm mt-1" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)" }}>{sub}</span>
    </div>
  );
}

export function Breadcrumbs({ items, light = false }: { items: { label: string; to?: string }[]; light?: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 mb-10">
      {items.map((b, i, arr) => (
        <span key={b.label} className="flex items-center gap-2">
          <span
            className="text-sm"
            style={{
              fontFamily: "Inter, sans-serif",
              color: i === arr.length - 1 ? (light ? "#FFFFFF" : "#2C2A28") : light ? "rgba(255,255,255,0.65)" : "#7A736E",
              cursor: b.to ? "pointer" : "default",
              transition: "color 0.25s ease",
            }}
            onClick={() => b.to && navigate(b.to)}
          >
            {b.label}
          </span>
          {i < arr.length - 1 && <ChevronRight size={12} strokeWidth={1.5} style={{ color: light ? "rgba(255,255,255,0.4)" : "#7A736E" }} />}
        </span>
      ))}
    </div>
  );
}