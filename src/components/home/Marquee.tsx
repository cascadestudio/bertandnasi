"use client";

import { fetchMarqueeForPage } from "@/sanity/lib/queries";
import { useEffect, useRef, useState } from "react";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

interface MarqueeProps {
  pageName?: string;
  customText?: string;
  sticky?: boolean;
  hidden?: boolean;
}

export default function Marquee({
  pageName,
  customText,
  sticky = true,
  hidden = false,
}: MarqueeProps) {
  const [marqueeText, setMarqueeText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animationDuration, setAnimationDuration] = useState<number>(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobileMenuOpen } = useMobileMenu();

  useEffect(() => {
    const fetchText = async () => {
      setIsLoading(true);
      // If customText is provided, use it directly
      if (customText) {
        setMarqueeText(customText);
      } else {
        const text = await fetchMarqueeForPage(pageName);
        setMarqueeText(text || "The contemporary performance duo");
      }
      setIsLoading(false);
    };
    fetchText();
  }, [pageName, customText]);

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

  // Don't render anything while loading or when hidden
  if (isLoading || hidden) {
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

  // Hide completely when mobile menu is open on mobile devices
  if (isMobileMenuOpen) {
    return (
      <div className="hidden lg:block">
        <div
          className={`bg-[var(--color-green)] text-white overflow-hidden h-8 flex items-center ${sticky && "sticky top-[52px] z-50"}`}
        >
          <div className="flex whitespace-nowrap">
            <div className="flex items-center gap-3">
              {/* Empty content when mobile menu is open */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayText = marqueeText || "The contemporary performance duo";

  return (
    <div
      className={`bg-[var(--color-green)] text-white overflow-hidden h-8 flex items-center ${sticky && "sticky top-[52px] z-50"}`}
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
