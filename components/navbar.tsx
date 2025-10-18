"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { siteContent } from "@/lib/content"
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
      <nav className={`fixed top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-sm ${scrolled ? "shadow-sm" : "shadow-none"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link href="#home" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); smoothScrollToHash("#home") }}>
            <h1 className="text-lg md:text-xl font-playfair font-bold text-teal hover:text-ink transition-colors">
              {siteContent.couple.name}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteContent.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeId === item.href.replace(/^#/, "") ? "page" : undefined}
                className={`transition-colors font-lora text-sm font-medium ${activeId === item.href.replace(/^#/, "") ? "text-teal" : "text-ink hover:text-teal"}`}
                onClick={(e) => { e.preventDefault(); smoothScrollToHash(item.href) }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal hover:text-ink focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              {menuOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.75 12a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15A.75.75 0 0 1 3.75 12Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-cream/98 backdrop-blur-sm transition-transform duration-300 ease-out ${
          menuOpen ? "translate-y-0" : "-translate-y-[120%]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <ul className="space-y-6">
            {siteContent.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-2xl font-semibold tracking-tight text-ink hover:text-teal transition-colors"
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothScrollToHash(item.href) }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {socialItems && socialItems.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm uppercase tracking-wide text-teal/80 mb-3">Socials</h3>
              <div className="flex items-center gap-4 flex-wrap">
                {socialItems.map((s: any, i: number) => (
                  <a key={s.label + i} href={s.link} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-teal text-base font-medium">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
