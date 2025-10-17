"use client";

import { fetchMarqueeForPage } from "@/sanity/lib/queries";
import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  pageName?: string;
  sticky?: boolean;
}

export default function Marquee({ pageName, sticky = true }: MarqueeProps) {
  const [marqueeText, setMarqueeText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animationDuration, setAnimationDuration] = useState<number>(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchText = async () => {
      setIsLoading(true);
      const text = await fetchMarqueeForPage(pageName);
      setMarqueeText(text || "THE CONTEMPORARY PERFORMANCE DUO");
      setIsLoading(false);
    };
    fetchText();
  }, [pageName]);

  useEffect(() => {
    if (marqueeText && contentRef.current && containerRef.current) {
      // Calculate the width of a single text item
      const singleItemWidth = contentRef.current.scrollWidth / 20; // 20 is the number of repetitions

      // Calculate animation duration based on desired speed (pixels per second)
      const desiredSpeed = 2; // pixels per second - adjust this to control speed
      const totalWidth = singleItemWidth;
      const duration = totalWidth / desiredSpeed;

      setAnimationDuration(duration);
    }
  }, [marqueeText]);

  // Don't render anything while loading to avoid the glitch
  if (isLoading) {
    return (
      <div className="bg-[var(--color-green)] text-white overflow-hidden h-8 flex items-center">
        <div className="flex whitespace-nowrap">
          <div className="flex items-center gap-3">
            {/* Empty content while loading */}
          </div>
        </div>
      </div>
    );
  }

  const displayText = marqueeText || "THE CONTEMPORARY PERFORMANCE DUO";

  return (
    <div
      className={`bg-[var(--color-green)] text-white overflow-hidden h-8 flex items-center ${sticky && "sticky top-[64px] z-50"}`}
    >
      <div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${animationDuration}s linear infinite`,
        }}
      >
        <div ref={contentRef} className="flex items-center gap-3">
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-base font-mono font-bold tracking-wider uppercase"
              >
                {displayText + " ↓↓↓↓↓"}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
