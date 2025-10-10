'use client'

export default function Marquee() {
  return (
    <div className="bg-[var(--color-green)] text-black overflow-hidden py-4">
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 35s linear infinite',
        }}
      >
        <div className="flex items-center gap-12 pr-12">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-base md:text-lg font-medium tracking-wider uppercase">
              THE CONTEMPORARY PERFORMANCE DUO ↓↓↓↓↓
            </span>
          ))}
        </div>
        <div className="flex items-center gap-12 pr-12">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-base md:text-lg font-medium tracking-wider uppercase">
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
  )
}

