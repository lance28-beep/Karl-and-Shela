"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { siteContent } from "@/lib/content"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import StaggeredMenu from "./staggered-menu"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>("")
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Enhanced scroll tracking with Framer Motion
  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98])
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98])
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 16])

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
      smoothScrollToHash(href)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [smoothScrollToHash])

  // Add scroll shadow and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse tracking for enhanced animations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
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
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          backgroundColor: '#49513C',
          opacity: navbarOpacity,
          scale: navbarScale,
          backdropFilter: `blur(${navbarBlur}px)`,
          WebkitBackdropFilter: `blur(${navbarBlur}px)`
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.8
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 154, 163, 0.3) 0%, transparent 50%)`
          }}
          animate={{ 
            opacity: isHovered ? 0.3 : 0.1 
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Enhanced Background Elements with Mouse Following */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.25 : 0.1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="absolute w-12 h-12 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #FF9AA3, #FFF9E0)',
              left: mousePosition.x * 0.1,
              top: mousePosition.y * 0.1
            }}
            animate={{ 
              scale: isHovered ? 1.5 : 1,
              rotate: isHovered ? 360 : 0
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="absolute w-8 h-8 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #FFF9E0, #FF9AA3)',
              right: mousePosition.x * 0.05,
              top: mousePosition.y * 0.05
            }}
            animate={{ 
              scale: isHovered ? 1.3 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div 
            className="absolute w-6 h-6 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #FF9AA3, #49513C)',
              left: mousePosition.x * 0.08,
              bottom: mousePosition.y * 0.08
            }}
            animate={{ 
              scale: isHovered ? 1.4 : 1,
              x: isHovered ? 8 : 0
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Enhanced Shadow with Color */}
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            boxShadow: scrolled 
              ? "0 25px 50px -12px rgba(255, 154, 163, 0.3)" 
              : "0 10px 25px -5px rgba(255, 154, 163, 0.2)"
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Animated Border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, #FF9AA3, #FFF9E0, #FF9AA3)',
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Enhanced Brand with Glow Effect */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 20px rgba(255, 249, 224, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link 
              href="#home" 
              className="flex-shrink-0 z-10 relative" 
              onClick={(e) => { e.preventDefault(); smoothScrollToHash("#home") }}
            >
              <motion.h1 
                className="text-xl md:text-2xl font-bold tracking-wide whitespace-nowrap flex-shrink-0"
                style={{ color: '#FFF9E0' }}
                animate={{
                  textShadow: isHovered 
                    ? "0 0 20px rgba(255, 249, 224, 0.8), 0 0 40px rgba(255, 154, 163, 0.3)" 
                    : "0 0 10px rgba(255, 249, 224, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                Karl & Shela
              </motion.h1>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation with Staggered Animation */}
          <div className="hidden md:flex items-center gap-1 z-10 relative">
            {siteContent.navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.3, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  rotateY: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  aria-current={activeId === item.href.replace(/^#/, "") ? "page" : undefined}
                  className={`relative text-sm font-medium px-4 py-2 rounded-xl tracking-wide transition-all duration-300 ${
                    activeId === item.href.replace(/^#/, "") 
                      ? "shadow-lg" 
                      : ""
                  }`}
                  style={{
                    color: activeId === item.href.replace(/^#/, "") ? '#FFF9E0' : '#FFF9E0',
                    backgroundColor: activeId === item.href.replace(/^#/, "") ? 'rgba(255, 154, 163, 0.3)' : 'transparent'
                  }}
                  onClick={(e) => { e.preventDefault(); smoothScrollToHash(item.href) }}
                >
                  <motion.span
                    whileHover={{
                      textShadow: "0 0 15px rgba(255, 154, 163, 0.6)"
                    }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Enhanced Active Indicator */}
                  {activeId === item.href.replace(/^#/, "") && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#FF9AA3' }}
                      layoutId="activeIndicator"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    />
                  )}

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(45deg, rgba(255, 154, 163, 0.1), rgba(255, 249, 224, 0.1))',
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Spacer - StaggeredMenu will handle mobile */}
          <div className="md:hidden" />
        </div>
      </motion.nav>

      {/* Enhanced StaggeredMenu for Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#FFF9E0"
          openMenuButtonColor="#49513C"
          changeMenuColorOnOpen={true}
          colors={['#49513C', '#FF9AA3', '#FFF9E0']}
          accentColor="#FF9AA3"
          isFixed={true}
          logoUrl="/favicon_io/favicon-32x32.png"
          onMenuOpen={() => console.log('StaggeredMenu opened')}
          onMenuClose={() => console.log('StaggeredMenu closed')}
        />
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
