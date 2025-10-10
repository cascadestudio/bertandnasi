'use client'

import { useRef } from 'react'

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-[var(--color-green)] text-black overflow-hidden py-3">
      <div 
        ref={marqueeRef}
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animation: 'marquee 30s linear infinite',
        }}
      >
        <div className="flex items-center gap-8 px-4">
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
        </div>
        <div className="flex items-center gap-8 px-4">
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
          <span className="text-lg md:text-xl font-medium tracking-wide">
            THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
          </span>
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
  )
}

