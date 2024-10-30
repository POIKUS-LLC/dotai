"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type HTMLMotionProps,
} from "framer-motion"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// -------------------- Type Definitions -------------------- //

type NavbarContextType = {
  isCompact: boolean
  isScrollingUp: boolean
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

type NavbarItemProps = {
  icon?: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
}

interface NavbarItemElement extends React.ReactElement {
  props: {
    className?: string
    children?: React.ReactNode
  }
}

// -------------------- Contexts -------------------- //

const NavbarContext = React.createContext<NavbarContextType | undefined>(
  undefined
)

// -------------------- Hooks -------------------- //

function useNavbar() {
  const context = React.useContext(NavbarContext)
  if (context === undefined) {
    throw new Error("Navbar components must be used within a Navbar")
  }
  return context
}

// -------------------- Variants -------------------- //

const navbarVariants = cva(
  "fixed z-50 flex items-center transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "top-0 left-0 right-0 bg-navbar-background border-b border-navbar-border w-full",
        glass:
          "top-4 left-0 right-0 mx-auto w-fit bg-navbar-glass-background backdrop-blur-md border border-navbar-glass-border shadow-lg rounded-full",
      },
      size: {
        default: "h-16 px-4",
        compact: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const navbarItemVariants = cva(
  "relative flex items-center justify-center transition-all duration-300 rounded-full",
  {
    variants: {
      variant: {
        default:
          "text-navbar-foreground hover:bg-navbar-accent hover:text-navbar-accent-foreground px-4 py-2",
        compact: "text-navbar-muted hover:text-navbar-foreground px-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// -------------------- Components -------------------- //

const PKSNavbar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    threshold?: number
  }
>(({ className, threshold = 100, children, ...props }, ref) => {
  const [isCompact, setIsCompact] = React.useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsCompact(latest > threshold)
  })

  const value = React.useMemo(
    () => ({
      isCompact,
      isScrollingUp: true,
      isMobileMenuOpen,
      setMobileMenuOpen,
    }),
    [isCompact, isMobileMenuOpen]
  )

  return (
    <NavbarContext.Provider value={value}>
      <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <motion.div
          ref={ref}
          className={cn(
            navbarVariants({
              variant: isCompact ? "glass" : "default",
              size: isCompact ? "compact" : "default",
              className,
            })
          )}
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          {...(props as HTMLMotionProps<"div">)}
        >
          <div
            className={cn(
              "flex items-center justify-between lg:justify-start",
              isCompact ? "w-fit" : "w-full container mx-auto"
            )}
          >
            {children}
          </div>
        </motion.div>

        <SheetContent
          side="left"
          className="w-full max-w-[400px] p-0 bg-navbar-background border-navbar-border text-navbar-foreground"
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-navbar-border px-6 py-4">
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement(child) &&
                  child.type === PKSNavbarBrand
                ) {
                  return child
                }
                return null
              })}
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="flex flex-col gap-1 px-2 text-navbar-foreground">
                {React.Children.map(children, (child) => {
                  if (
                    React.isValidElement(child) &&
                    child.type === PKSNavbarContent
                  ) {
                    const content = child.props.children as NavbarItemElement
                    if (
                      React.isValidElement(content) &&
                      content.type === PKSNavbarItems
                    ) {
                      const items = content.props.children
                      return (
                        <div className="flex flex-col gap-1">
                          {React.Children.map(items, (item) => {
                            if (React.isValidElement(item)) {
                              return React.cloneElement(
                                item as NavbarItemElement,
                                {
                                  className:
                                    "w-full justify-start text-base py-3 px-4 hover:bg-accent/10",
                                }
                              )
                            }
                            return item
                          })}
                        </div>
                      )
                    }
                  }
                  return null
                })}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </NavbarContext.Provider>
  )
})
PKSNavbar.displayName = "PKSNavbar"

const PKSNavbarBrand = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center mr-4", className)}
      {...props}
    />
  )
})
PKSNavbarBrand.displayName = "PKSNavbarBrand"

const PKSNavbarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { isCompact } = useNavbar()

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          !isCompact && "flex-1",
          "hidden md:flex",
          className
        )}
        {...props}
      />
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
    </>
  )
})
PKSNavbarContent.displayName = "PKSNavbarContent"

const PKSNavbarItems = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
})
PKSNavbarItems.displayName = "PKSNavbarItems"

const PKSNavbarItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & NavbarItemProps
>(({ className, icon, label, href, onClick, ...props }, ref) => {
  const { isCompact, setMobileMenuOpen } = useNavbar()

  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        onClick?.(e)
        setMobileMenuOpen(false)
      }}
      className={cn(
        navbarItemVariants({
          variant: isCompact ? "compact" : "default",
        }),
        className
      )}
      {...props}
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement, {
          className: cn(
            "size-5 mr-3",
            (icon as React.ReactElement).props.className
          ),
        })}
      <span
        className={cn("transition-all duration-300", isCompact && "text-sm")}
      >
        {label}
      </span>
    </a>
  )
})
PKSNavbarItem.displayName = "PKSNavbarItem"

const PKSNavbarSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { isCompact } = useNavbar()

  if (isCompact) return null

  return (
    <div
      ref={ref}
      className={cn(
        "h-6 w-px bg-navbar-border mx-2 hidden lg:block",
        className
      )}
      {...props}
    />
  )
})
PKSNavbarSeparator.displayName = "PKSNavbarSeparator"

const PKSNavbarDropdownItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a">
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "block select-none space-y-1 rounded-sm px-3 py-1.5 text-sm outline-none transition-colors hover:bg-navbar-accent hover:text-navbar-accent-foreground focus:bg-navbar-accent focus:text-navbar-accent-foreground",
      className
    )}
    {...props}
  />
))
PKSNavbarDropdownItem.displayName = "PKSNavbarDropdownItem"

export {
  PKSNavbar,
  PKSNavbarBrand,
  PKSNavbarContent,
  PKSNavbarItems,
  PKSNavbarItem,
  PKSNavbarSeparator,
  PKSNavbarDropdownItem,
  type NavbarContextType,
  type NavbarItemProps,
}
