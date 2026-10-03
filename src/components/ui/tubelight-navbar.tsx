"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navOffset, setNavOffset] = useState(0)

  const { scrollY } = useScroll()

  // Track scroll position to move navbar and update active tab dynamically
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)

    // Dynamic scroll physics: subtle vertical parallax as user scrolls down
    if (latest < 400) {
      setNavOffset(latest * 0.05) // Smooth subtle float downward
    } else {
      setNavOffset(20)
    }

    // Scrollspy: detect which section is currently centered in viewport
    const viewportMiddle = latest + window.innerHeight * 0.35

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (item.url.startsWith("#")) {
        const id = item.url.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (viewportMiddle >= top && viewportMiddle < top + height) {
            setActiveTab(item.name)
            return
          }
        }
      }
    }

    // If near the top, reset to first item
    if (latest < 300 && items[0]) {
      setActiveTab(items[0].name)
    }
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleItemClick = (e: React.MouseEvent, item: NavItem) => {
    setActiveTab(item.name)
    if (item.url.startsWith("#")) {
      e.preventDefault()
      const id = item.url.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <motion.div
      animate={{
        y: isMobile ? 0 : navOffset,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
      }}
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-4 transition-transform duration-200",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1 sm:gap-2 border backdrop-blur-xl py-1.5 px-2 rounded-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 border-[rgba(20,20,40,0.14)] shadow-[0_14px_40px_rgba(20,20,60,0.12)] scale-[1.02]"
            : "bg-white/85 border-[rgba(20,20,40,0.08)] shadow-[0_8px_30px_rgba(20,20,50,0.08)]",
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => handleItemClick(e, item)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition-colors flex items-center gap-2",
                "text-[#68697A] hover:text-[#17172A]",
                isActive && "text-[#635BFF]",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#635BFF]/8 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#635BFF] rounded-t-full shadow-[0_0_12px_rgba(99,91,255,0.8)]">
                    <div className="absolute w-12 h-6 bg-[#635BFF]/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#635BFF]/35 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#635BFF]/40 rounded-full blur-xs top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
