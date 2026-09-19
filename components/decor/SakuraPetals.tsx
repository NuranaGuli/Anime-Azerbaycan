interface Petal {
  left: number; 
  size: number;
  duration: number; 
  delay: number; 
  opacity: number;
  hue: "soft" | "sakura" | "deep";
}

const PETALS: Petal[] = [
  { left: 4, size: 10, duration: 12, delay: 0, opacity: 0.82, hue: "sakura" },
  { left: 14, size: 7, duration: 9, delay: 1.5, opacity: 0.78, hue: "soft" },
  { left: 24, size: 12, duration: 14, delay: 3, opacity: 0.86, hue: "deep" },
  { left: 36, size: 8, duration: 10, delay: 0.8, opacity: 0.8, hue: "sakura" },
  { left: 48, size: 11, duration: 13, delay: 2.4, opacity: 0.84, hue: "soft" },
  { left: 58, size: 9, duration: 11, delay: 4, opacity: 0.78, hue: "sakura" },
  { left: 68, size: 13, duration: 15, delay: 1, opacity: 0.88, hue: "deep" },
  { left: 78, size: 8, duration: 9.5, delay: 3.6, opacity: 0.8, hue: "soft" },
  { left: 88, size: 10, duration: 12.5, delay: 2, opacity: 0.84, hue: "sakura" },
  { left: 94, size: 7, duration: 10.5, delay: 0.4, opacity: 0.82, hue: "deep" },
];

const HUE_COLOR: Record<Petal["hue"], { from: string; to: string; edge: string }> = {
  soft: { from: "#ffd1dc", to: "#ff8faf", edge: "#ff6f9d" },
  sakura: { from: "#ffb7ca", to: "#ff6f9d", edge: "#f05282" },
  deep: { from: "#ff8fb1", to: "#ff477e", edge: "#d92f68" },
};

export function SakuraPetals({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-petal-fall rounded-[75%_25%_70%_35%] border"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.72,
            background: `linear-gradient(135deg, ${HUE_COLOR[p.hue].from} 0%, ${HUE_COLOR[p.hue].to} 70%)`,
            borderColor: HUE_COLOR[p.hue].edge,
            boxShadow: `0 0 ${Math.max(8, p.size)}px ${HUE_COLOR[p.hue].edge}55`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
