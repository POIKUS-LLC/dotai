import * as React from "react"
import { ChevronDown, LucideIcon } from "lucide-react"

import type { NavItem } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"

// -------------------- Type Definitions -------------------- //

export type NavigationLayoutType = "featured" | "grid" | "list"

export type NavigationLayoutConfig = {
  type: NavigationLayoutType
  width?: string
  columns?: number
  featured?: boolean
}

export type NavigationItemProps = {
  item: NavItem
  layoutConfig?: NavigationLayoutConfig
}

// -------------------- Components -------------------- //

// Featured Item Component
const FeaturedItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { item: NavItem }
>(({ className, item, ...props }, ref) => {
  const Icon = item.icon

  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "flex h-full w-full select-none flex-col justify-end",
          "rounded-md bg-gradient-to-b from-muted/50 to-muted p-6",
          "no-underline outline-none focus:shadow-md",
          className
        )}
        {...props}
      >
        {Icon && (
          <div className="h-6 w-6">
            {React.createElement(Icon, { className: "h-6 w-6" })}
          </div>
        )}
        <div className="mb-2 mt-4 text-lg font-medium">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-tight text-muted-foreground">
            {item.description}
          </p>
        )}
      </a>
    </NavigationMenuLink>
  )
})
FeaturedItem.displayName = "FeaturedItem"

// List Item Component
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { item: NavItem }
>(({ className, item, ...props }, ref) => {
  const Icon = item.icon

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3",
            "leading-none no-underline outline-none",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            "w-full h-full",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <div className="text-sm font-medium leading-none">{item.title}</div>
          </div>
          {item.description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {item.description}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Mobile Navigation Item Component
const MobileNavItem = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const Icon = item.icon

  if (!item.items) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start h-10 px-4"
        asChild
      >
        <a href={item.href} className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="text-sm">{item.title}</span>
        </a>
      </Button>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between h-10 px-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <span className="text-sm">{item.title}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 space-y-1">
        {item.items.map((subItem) => (
          <Button
            key={subItem.title}
            variant="ghost"
            className="w-full justify-start h-9 px-4"
            asChild
          >
            <a href={subItem.href} className="flex items-center gap-2">
              {subItem.icon && <subItem.icon className="h-4 w-4" />}
              <span className="text-sm">{subItem.title}</span>
            </a>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

// Navigation Content Component
export const NavigationContent = React.forwardRef<
  HTMLDivElement,
  NavigationItemProps & { isMobile?: boolean }
>(({ item, layoutConfig = { type: "grid", columns: 2 }, isMobile }, ref) => {
  // Return mobile view
  if (isMobile) {
    return <MobileNavItem item={item} />
  }

  if (!item.items) return null

  // Desktop view remains the same
  const { type, width = "600px", columns = 2, featured = true } = layoutConfig
  const items = featured ? item.items.slice(1) : item.items
  const featuredItem = featured ? item.items[0] : null

  const gridColumnsClass =
    {
      1: "grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    }[columns] || "md:grid-cols-2"

  const gridClassName = cn(
    "grid gap-3 p-4",
    type === "grid" && [
      "grid-cols-1",
      gridColumnsClass,
      "min-w-[280px] md:min-w-[600px]",
      "w-full",
      "max-w-[800px]",
    ],
    width && [
      `w-[${width}]`,
      `md:w-[${parseInt(width) + 200}px]`,
      `lg:w-[${parseInt(width) + 100}px]`,
    ]
  )

  return (
    <div className="w-full p-1">
      <div ref={ref}>
        {featured && featuredItem && (
          <div className={cn("col-span-full mb-2 p-3")}>
            <FeaturedItem item={featuredItem} href={featuredItem.href} />
          </div>
        )}
        <ul className={cn("gap-3 list-none", gridClassName)}>
          {items.map((subItem) => (
            <ListItem key={subItem.title} href={subItem.href} item={subItem} />
          ))}
        </ul>
      </div>
    </div>
  )
})
NavigationContent.displayName = "NavigationContent"

export { FeaturedItem, ListItem }
