"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { siteContent } from "@/lib/content"
import { motion, AnimatePresence } from "motion/react"
// Removed StaggeredMenu for reliability on mobile; using a simple built-in panel

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>("")

  const menuItems = siteContent.navigation.map((item) => ({
    label: item.label,
    ariaLabel: `Navigate to ${item.label}`,
    link: item.href,
  }))

  const socialItems = siteContent.couple.social || []

  const sectionIds = useMemo(
    () => siteContent.navigation.map((n) => n.href).filter((h) => h.startsWith("#")).map((h) => h.slice(1)),
    []
  )

  const getOffsetTop = useCallback((element: HTMLElement) => {
    const navOffset = 64 // matches h-16 spacer
    const rect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return rect.top + scrollTop - navOffset
  }, [])

  const smoothScrollToHash = useCallback((hash: string) => {
    if (!hash || !hash.startsWith("#")) return
    const id = hash.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const top = getOffsetTop(target)
    if (prefersReducedMotion) {
      window.scrollTo(0, top)
    } else {
      window.scrollTo({ top, behavior: "smooth" })
    }
    // Update URL without default jump
    history.pushState(null, "", `#${id}`)
  }, [getOffsetTop])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Find nearest anchor
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href") || ""
      if (!href.startsWith("#")) return
      e.preventDefault()
      // close menu if open (and close the StaggeredMenu panel if link came from it)
      if (menuOpen) {
        setMenuOpen(false)
        const scope = anchor.closest(".sm-scope") as HTMLElement | null
        if (scope) {
          const toggle = scope.querySelector<HTMLButtonElement>(".sm-toggle")
          toggle?.click()
        }
      }
      smoothScrollToHash(href)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [menuOpen, smoothScrollToHash])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [menuOpen])

  // Add scroll shadow and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (sectionIds.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersection ratio
        let best: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry
        }
        const current = entries.find((e) => e.isIntersecting) || best
        if (current && current.target instanceof HTMLElement) {
          setActiveId(current.target.id)
        }
      },
      {
        // account for fixed navbar height
        rootMargin: "-64px 0px 0px 0px",
        threshold: [0.25, 0.5, 0.75, 1],
      }
    )
    const elements: HTMLElement[] = []
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        elements.push(el)
        observer.observe(el)
      }
    }
    return () => {
      for (const el of elements) observer.unobserve(el)
      observer.disconnect()
    }
  }, [sectionIds])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-none"}`} style={{ backgroundColor: '#5f674f' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-4 -left-4 w-8 h-8 rounded-full opacity-20"
            style={{ backgroundColor: '#ca8e90' }}
            animate={{
              x: [0, 20, 0],
              y: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2 right-8 w-6 h-6 rounded-full opacity-15"
            style={{ backgroundColor: '#d9aeb8' }}
            animate={{
              x: [0, -15, 0],
              y: [0, -8, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-2 left-1/4 w-4 h-4 rounded-full opacity-25"
            style={{ backgroundColor: '#ead1d5' }}
            animate={{
              x: [0, 12, 0],
              y: [0, -6, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full opacity-20"
            style={{ backgroundColor: '#c5cac4' }}
            animate={{
              x: [0, -10, 0],
              y: [0, 8, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link href="#home" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); smoothScrollToHash("#home") }}>
            <motion.h1 
              className="text-lg md:text-xl font-playfair font-bold text-white hover:text-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {siteContent.couple.name}
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteContent.navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  aria-current={activeId === item.href.replace(/^#/, "") ? "page" : undefined}
                  className={`relative transition-all duration-300 font-lora text-sm font-medium px-3 py-2 rounded-lg ${
                    activeId === item.href.replace(/^#/, "") 
                      ? "text-white" 
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={(e) => { e.preventDefault(); smoothScrollToHash(item.href) }}
                >
                  {activeId === item.href.replace(/^#/, "") && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: '#ca8e90' }}
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.75 12a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15A.75.75 0 0 1 3.75 12Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-16 z-50 backdrop-blur-sm overflow-y-auto"
            style={{ backgroundColor: '#5f674f', maxHeight: 'calc(100vh - 4rem)' }}
          >
            {/* Animated Background Elements for Mobile Menu */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-8 right-8 w-12 h-12 rounded-full opacity-10"
                style={{ backgroundColor: '#d9aeb8' }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-20 left-8 w-8 h-8 rounded-full opacity-15"
                style={{ backgroundColor: '#ead1d5' }}
                animate={{
                  x: [0, -20, 0],
                  y: [0, -15, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-6 pb-8">
              <motion.ul 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {siteContent.navigation.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-lg font-medium tracking-wide text-white hover:text-gray-200 transition-colors py-2"
                      onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothScrollToHash(item.href) }}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {socialItems && socialItems.length > 0 && (
                <motion.div 
                  className="mt-8 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-sm uppercase tracking-wide text-gray-300 mb-4">Follow Us</h3>
                  <div className="flex items-center gap-6 flex-wrap">
                    {socialItems.map((s: any, i: number) => {
                      // Get icon based on social platform
                      const getSocialIcon = (label: string) => {
                        const platform = label.toLowerCase()
                        if (platform.includes('facebook') || platform.includes('fb')) {
                          return (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          )
                        }
                        if (platform.includes('instagram') || platform.includes('ig')) {
                          return (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                            </svg>
                          )
                        }
                        if (platform.includes('twitter') || platform.includes('x')) {
                          return (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          )
                        }
                        if (platform.includes('youtube')) {
                          return (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          )
                        }
                        if (platform.includes('tiktok')) {
                          return (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                          )
                        }
                        // Default icon for other platforms
                        return (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        )
                      }

                      return (
                        <motion.a 
                          key={s.label + i} 
                          href={s.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="group-hover:scale-110 transition-transform duration-200">
                            {getSocialIcon(s.label)}
                          </span>
                          <span className="text-sm font-medium">{s.label}</span>
                        </motion.a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
