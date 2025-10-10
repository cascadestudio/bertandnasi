'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/calendar', label: 'Calendar' },
    { href: '/shows', label: 'Shows' },
    { href: '/videos', label: 'Videos' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black text-white">
      <div className="w-full px-6 md:px-12 lg:px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            BERT&NASI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: 'var(--font-nav)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wide hover:text-[var(--color-green)] transition-colors ${
                  pathname === link.href ? 'text-[var(--color-green)]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Selector */}
            <button className="text-sm uppercase tracking-wide hover:text-[var(--color-green)] transition-colors">
              Fr
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-4 ml-4 border-l border-white/20 pl-4">
              <a
                href="https://instagram.com/bertandnasi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-green)] transition-colors"
                aria-label="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@bertandnasi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-green)] transition-colors"
                aria-label="YouTube"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-nav)' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm uppercase tracking-wide hover:text-[var(--color-green)] transition-colors ${
                    pathname === link.href ? 'text-[var(--color-green)]' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="text-sm uppercase tracking-wide hover:text-[var(--color-green)] transition-colors text-left">
                Fr
              </button>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://instagram.com/bertandnasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-green)] transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@bertandnasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-green)] transition-colors"
                  aria-label="YouTube"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

