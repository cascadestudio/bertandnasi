import { fetchMarquee } from "@/sanity/lib/queries";

export default async function Marquee() {
  const marqueeData = await fetchMarquee();
  const marqueeText =
    marqueeData?.text || "THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓";
  return (
    <div className="bg-[var(--color-green)] text-white overflow-hidden h-8 flex items-center">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 35s linear infinite",
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
                {marqueeText}
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
                {marqueeText}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
