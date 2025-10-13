"use client";

export default function Marquee() {
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
                className="text-base font-bold tracking-wider uppercase"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
              </span>
            ))}
        </div>
        <div className="flex items-center gap-12 pr-12">
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-base font-bold tracking-wider uppercase"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
              </span>
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
