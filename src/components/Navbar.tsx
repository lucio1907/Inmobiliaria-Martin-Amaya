'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useScroll } from '@/hooks/useScroll'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { handleScrollToSection } = useScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'Inicio', isScroll: true },
    { href: '/#propiedades', label: 'Propiedades', isScroll: true },
    { href: '/#servicios', label: 'Servicios', isScroll: true },
    { href: '/#nosotros', label: 'Nosotros', isScroll: true },
    { href: '/#contacto', label: 'Contacto', isScroll: true },
  ]

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isScroll: boolean) => {
    setIsMobileMenuOpen(false)
    if (isScroll) {
      handleScrollToSection(e, href)
    }
  }

  return (
    <>
      <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-custom h-20 md:h-24 flex items-center justify-between">
          <Link
            href="/"
            onClick={(e) => onNavClick(e, '/', true)}
            className="flex items-center gap-2 sm:gap-4 group z-[60]"
          >
            <div className="relative pb-1 transition-all duration-500 group-hover:scale-105">
              <Logo />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => link.isScroll ? onNavClick(e, link.href, true) : null}
                className={`relative text-sm font-bold transition-colors tracking-wide uppercase group py-2 ${link.label === 'Contacto' ? 'text-slate-200 hover:text-white' : 'text-slate-400 hover:text-accent'
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full ${link.label === 'Contacto' ? 'bg-white/80' : 'bg-accent/80 shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                  }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl lg:hidden flex items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-6 text-center p-6 w-full max-h-[85vh] overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href, link.isScroll)}
                    className="block text-xl sm:text-2xl font-black text-slate-300 hover:text-accent transition-colors tracking-widest uppercase w-full py-4 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
