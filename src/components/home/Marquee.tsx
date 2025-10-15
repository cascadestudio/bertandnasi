import { fetchMarqueeForPage } from "@/sanity/lib/queries";

interface MarqueeProps {
  pageName?: string;
}

export default async function Marquee({ pageName }: MarqueeProps) {
  const marqueeText = await fetchMarqueeForPage(pageName);
  const displayText = marqueeText || "THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓";
  return (
    <div className="bg-[var(--color-green)] text-white overflow-hidden h-8 flex items-center">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 120s linear infinite",
        }}
      >
        <div className="flex items-center gap-12 pr-12">
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-base font-mono font-bold tracking-wider uppercase"
              >
                {displayText}
              </span>
            ))}
        </div>
        <div className="flex items-center gap-12 pr-12">
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-base font-mono font-bold tracking-wider uppercase"
              >
                {displayText}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
