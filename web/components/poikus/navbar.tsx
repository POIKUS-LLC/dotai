"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Menu } from "lucide-react"

import siteConfig from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

import { NavigationContent } from "./navigation"

// -------------------- Type Definitions -------------------- //

type NavbarContextType = {
  isCompact: boolean
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  isScrolled: boolean
}

type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  brand?: React.ReactNode
  navigationItems?: React.ReactNode
  actions?: React.ReactNode
  isCompact?: boolean
  maxWidth?: string
}

// -------------------- Context -------------------- //

const NavbarContext = React.createContext<NavbarContextType | undefined>(
  undefined
)

function useNavbar() {
  const context = React.useContext(NavbarContext)
  if (!context) {
    throw new Error("Navbar components must be used within a Navbar")
  }
  return context
}

// -------------------- Variants -------------------- //

const navbarVariants = cva(
  [
    "w-full transition-all duration-300 ease-in-out",
    "pointer-events-auto",
    "transform-gpu",
    "backface-visibility-hidden",
    "will-change-transform",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "relative z-10",
          "bg-background/80 backdrop-blur-sm border-b border-border/40",
          "translate-y-0",
        ].join(" "),
        compact: [
          "fixed z-50",
          "top-10 left-1/2 -translate-x-1/2",
          "mx-auto max-w-fit min-w-[300px]",
          "bg-background/95 dark:bg-background/75",
          "backdrop-blur-md backdrop-saturate-150",
          "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
          "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          "rounded-full",
          "bg-gradient-to-b from-white/50 to-white/20",
          "dark:from-white/[0.15] dark:to-white/[0.05]",
          "rainbow-border",
          "!opacity-100",
          "transform-gpu",
          "backface-visibility-hidden",
          "perspective-1000",
          "translate-z-0",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const navbarContainerVariants = cva(
  "mx-auto flex items-center justify-between transition-all duration-200 ease-in-out relative",
  {
    variants: {
      variant: {
        default: "h-16 px-8",
        compact: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Add new variant for bottom actions capsule
const bottomActionsVariants = cva(
  [
    "fixed bottom-0 left-0 right-0 z-50",
    "transition-all duration-200 ease-in-out",
    "flex justify-center",
  ].join(" "),
  {
    variants: {
      variant: {
        hidden: "translate-y-full opacity-0",
        visible: [
          "translate-y-[-16px] opacity-100",
          "hover:translate-y-[-18px]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "hidden",
    },
  }
)

// Update the bottom actions div className
const bottomActionClassName = cn(
  "flex items-center gap-2",
  "bg-background/60 dark:bg-background/75",
  "backdrop-blur-md backdrop-saturate-150",
  "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
  "dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
  "bg-gradient-to-b from-white/50 to-white/20",
  "dark:from-white/[0.15] dark:to-white/[0.05]",
  "px-4 py-2",
  "transition-all duration-200",
  "hover:bg-background/70 dark:hover:bg-background/80",
  "hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
  "dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
  "rainbow-border"
)

// Add this near the top with other style definitions
export const navigationMenuTriggerStyle = cn(
  [
    "group inline-flex items-center justify-center",
    "rounded-md text-sm font-medium",
    "transition-colors duration-200",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
    "antialiased",
  ].join(" ")
)

// -------------------- Components -------------------- //

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      brand,
      navigationItems,
      actions,
      isCompact: isCompactProp,
      maxWidth = "max-w-7xl",
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [capsuleWidth, setCapsuleWidth] = React.useState(0)
    const capsuleRef = React.useRef<HTMLDivElement>(null)

    // Define isCompact before using it in effects
    const isCompact = isCompactProp || isScrolled

    // Handle initial mount
    React.useLayoutEffect(() => {
      setMounted(true)
      // Set initial scroll state
      setIsScrolled(window.scrollY > 20)
    }, [])

    // Handle scroll
    React.useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY
        const threshold = 20
        setIsScrolled(scrollY > threshold)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Calculate capsule width and position
    React.useEffect(() => {
      if (capsuleRef.current) {
        const updateCapsuleWidth = () => {
          const width = capsuleRef.current?.offsetWidth || 0
          setCapsuleWidth(width)
        }

        // Initial calculation
        updateCapsuleWidth()

        // Update on window resize
        window.addEventListener("resize", updateCapsuleWidth)
        return () => window.removeEventListener("resize", updateCapsuleWidth)
      }
    }, [isCompact])

    // Calculate left position
    const capsuleStyle = React.useMemo(() => {
      if (typeof window === "undefined") return {}

      const windowWidth = window.innerWidth
      const left = Math.max(0, (windowWidth - capsuleWidth) / 2)

      return {
        position: "fixed" as const,
        visibility: "visible" as const,
        opacity: 1,
        left: `${left}px`,
        transform: "none",
      }
    }, [capsuleWidth])

    const contextValue = React.useMemo(
      () => ({
        isCompact,
        isMobileMenuOpen,
        setMobileMenuOpen,
        isScrolled,
      }),
      [isCompact, isMobileMenuOpen, isScrolled]
    )

    // Return a skeleton version for server-side rendering
    if (!mounted) {
      return (
        <>
          <div className="h-16" />
          <nav className="w-full absolute top-0 left-0 right-0">
            <div
              className={cn(
                navbarContainerVariants({ variant: "default" }),
                maxWidth
              )}
            >
              {/* Logo skeleton */}
              <div className="flex items-center">
                <Skeleton className="h-8 w-32" />{" "}
                {/* Adjust size based on your logo */}
              </div>

              {/* Navigation items skeleton */}
              <div className="hidden md:flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Action buttons skeleton */}
              <div className="hidden md:flex items-center gap-2">
                <Skeleton className="h-9 w-20" /> {/* Sign In button */}
                <Skeleton className="h-9 w-24" /> {/* Get Started button */}
              </div>

              {/* Mobile menu button skeleton */}
              <Skeleton className="h-10 w-10 md:hidden" />
            </div>
          </nav>
        </>
      )
    }

    return (
      <>
        <div className="h-16" />
        <NavbarContext.Provider value={contextValue}>
          <nav
            className={cn(
              navbarVariants({
                variant: "default",
                className,
              }),
              isCompact ? "invisible" : "visible",
              "absolute top-0 left-0 right-0"
            )}
            suppressHydrationWarning
          >
            <div
              className={cn(
                navbarContainerVariants({
                  variant: "default",
                }),
                maxWidth
              )}
            >
              {/* Brand - Fixed left */}
              <div className="absolute left-8">
                <div className="transition-all duration-200">{brand}</div>
              </div>

              {/* Navigation - Always centered */}
              <div className="flex-1 flex justify-center">
                <div className="hidden md:block">{navigationItems}</div>
              </div>

              {/* Actions - Fixed right */}
              <div className="absolute right-8">
                <div className="hidden items-center gap-2 md:flex">
                  {actions}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </div>
            </div>
          </nav>

          {isCompact && (
            <nav
              ref={capsuleRef}
              className={cn(
                navbarVariants({
                  variant: "compact",
                  className,
                }),
                "visible"
              )}
              style={capsuleStyle}
              {...props}
            >
              <div
                className={cn(
                  navbarContainerVariants({
                    variant: "compact",
                  })
                )}
              >
                {/* Brand - Adjusted positioning */}
                <div className="flex items-center justify-center min-w-[32px]">
                  <div className="transition-all duration-200 scale-90">
                    {brand}
                  </div>
                </div>

                {/* Navigation - Always centered */}
                <div className="flex-1 flex justify-center px-4">
                  <div className="hidden md:block">{navigationItems}</div>
                </div>

                {/* Mobile menu button - Adjusted positioning */}
                <div className="flex items-center justify-center min-w-[32px]">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden scale-90"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </div>
              </div>
            </nav>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
              <div className="flex h-16 items-center px-4 border-b">
                {brand}
              </div>
              <ScrollArea className="flex-1">
                <div className="flex flex-col py-2">
                  {siteConfig.navigation.mainNav.map((item) => (
                    <NavigationContent
                      key={item.title}
                      item={item}
                      layoutConfig={siteConfig.navigationLayout[item.title]}
                      isMobile
                    />
                  ))}
                </div>
              </ScrollArea>
              {actions && (
                <div className="border-t p-4">
                  <div className="flex flex-col gap-2">{actions}</div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </NavbarContext.Provider>
        {actions && (
          <div
            className={cn(
              bottomActionsVariants({
                variant: isCompact ? "visible" : "hidden",
              })
            )}
          >
            <div className={bottomActionClassName}>
              <div className="scale-90 transition-transform duration-200">
                {actions}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
)
Navbar.displayName = "Navbar"

// -------------------- Navigation Components -------------------- //

const NavbarNavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenu>,
  React.ComponentPropsWithoutRef<typeof NavigationMenu>
>((props, ref) => {
  const [mounted, setMounted] = React.useState(false)
  const { isCompact } = useNavbar()

  React.useLayoutEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <NavigationMenu
        ref={ref}
        className="transition-all duration-200"
        {...props}
      />
    )
  }

  return (
    <NavigationMenu
      ref={ref}
      className={cn(
        "transition-all duration-200",
        "transform-gpu backface-visibility-hidden perspective-1000 translate-z-0",
        isCompact
          ? [
              "text-[14px]",
              "[&_a]:py-1.5 [&_a]:px-3",
              "[&_button]:py-1.5 [&_button]:px-3",
              "[&_svg]:h-4 [&_svg]:w-4",
            ].join(" ")
          : [
              "text-sm",
              "[&_a]:py-2 [&_a]:px-4",
              "[&_button]:py-2 [&_button]:px-4",
              "[&_svg]:h-5 [&_svg]:w-5",
            ].join(" ")
      )}
      style={{
        transform: "translate3d(0,0,0)",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
      suppressHydrationWarning
      {...props}
    />
  )
})
NavbarNavigationMenu.displayName = "NavbarNavigationMenu"

// Export all components
export {
  Navbar,
  NavbarNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  useNavbar,
}
