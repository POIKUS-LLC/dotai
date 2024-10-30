"use client"

import React from "react"
import {
  BookOpen,
  Code2,
  FileCode2,
  Gauge,
  Layers,
  LifeBuoy,
  Lightbulb,
  LucideIcon,
  Shield,
  Sparkles,
  Star,
} from "lucide-react"

import siteConfig from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Navbar,
  NavbarNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/poikus/navbar"
import PKSImage from "@/components/poikus/PKSImage"
import {
  PKSPricingSection,
  PKSPricingSectionContent,
  PKSPricingSectionDescription,
  PKSPricingSectionHeader,
} from "@/components/poikus/pricing"
import {
  PKSReviewCard,
  PKSReviewCardAuthor,
  PKSReviewCardDescription,
  PKSReviewCardHeader,
  PKSReviewCardTitle,
  ReviewSection,
  ReviewSectionDescription,
  ReviewSectionHeader,
  ReviewSectionReviews,
} from "@/components/poikus/reviews"

// Navigation link styles
const navigationMenuTriggerStyle = cn(
  [
    "group inline-flex items-center justify-center",
    "rounded-md bg-background/50 px-4 py-2",
    "text-sm font-medium",
    "transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
    "antialiased",
  ].join(" ")
)

// Create advanced navigation items
const NavigationItems = () => (
  <NavigationMenuList className="gap-2">
    {/* Products Dropdown */}
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[600px] grid-cols-2 gap-4 p-4">
          <div className="col-span-2">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/"
              >
                <Sparkles className="h-6 w-6" />
                <div className="mb-2 mt-4 text-lg font-medium">What's New</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Explore our latest features and improvements.
                </p>
              </a>
            </NavigationMenuLink>
          </div>
          <NavigationMenuLink asChild>
            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <div className="text-sm font-medium leading-none">
                  Components
                </div>
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Beautiful and accessible components built with Radix UI and
                Tailwind CSS.
              </p>
            </a>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                <div className="text-sm font-medium leading-none">
                  Performance
                </div>
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Optimized for speed and reliability.
              </p>
            </a>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Resources Dropdown */}
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {resources.map((resource) => (
            <ListItem
              key={resource.title}
              title={resource.title}
              href={resource.href}
              icon={resource.icon}
            >
              {resource.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Pricing Link */}
    <NavigationMenuItem>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle}
        href="#pricing"
      >
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
)

// Resource items data
const resources = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Learn how to integrate our tools with your app.",
    icon: FileCode2,
  },
  {
    title: "API Reference",
    href: "/api",
    description: "Detailed API documentation with examples.",
    icon: Code2,
  },
  {
    title: "Guides",
    href: "/guides",
    description: "Step-by-step guides to get started quickly.",
    icon: BookOpen,
  },
  {
    title: "Examples",
    href: "/examples",
    description: "Check out our collection of example projects.",
    icon: Lightbulb,
  },
  {
    title: "Support",
    href: "/support",
    description: "Get help from our support team.",
    icon: LifeBuoy,
  },
  {
    title: "Enterprise",
    href: "/enterprise",
    description: "Learn about our enterprise solutions.",
    icon: Shield,
  },
]

// ListItem component for resources
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    icon: LucideIcon
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function DemoPage() {
  return (
    <div className="min-h-[200vh]">
      <Navbar
        brand={<PKSImage src={siteConfig.companyLogo} alt="Logo" />}
        navigationItems={
          <NavbarNavigationMenu>
            <NavigationItems />
          </NavbarNavigationMenu>
        }
        actions={
          <>
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </>
        }
      />
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 pt-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Demo Inc.
          </span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Experience the future of web development with our cutting-edge
          components and intuitive design system.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="h-12 px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8">
            Learn More
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto grid gap-8 py-24 md:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Feature {i + 1}</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        ))}
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-slate-50 py-24">
        <ReviewSection>
          <ReviewSectionHeader>What Our Users Say</ReviewSectionHeader>
          <ReviewSectionDescription>
            Don't just take our word for it - hear from our satisfied customers
          </ReviewSectionDescription>
          <ReviewSectionReviews className="container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PKSReviewCard key={i} rating={5}>
                <PKSReviewCardHeader>
                  <PKSReviewCardTitle>Amazing Product!</PKSReviewCardTitle>
                </PKSReviewCardHeader>
                <PKSReviewCardDescription>
                  This is exactly what our team has been looking for. The
                  components are well designed and easy to use.
                </PKSReviewCardDescription>
                <PKSReviewCardAuthor
                  name={`User ${i + 1}`}
                  title="Software Engineer"
                  company="Tech Corp"
                  avatar="https://github.com/shadcn.png"
                />
              </PKSReviewCard>
            ))}
          </ReviewSectionReviews>
        </ReviewSection>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <PKSPricingSection>
          <PKSPricingSectionHeader>
            <h2 className="text-3xl font-bold tracking-tight">
              Simple, transparent pricing
            </h2>
          </PKSPricingSectionHeader>
          <PKSPricingSectionDescription>
            Choose the perfect plan for your needs. All plans include a 14-day
            free trial.
          </PKSPricingSectionDescription>
          <PKSPricingSectionContent>
            {/* Import your pricing cards from the pricing demo */}
          </PKSPricingSectionContent>
        </PKSPricingSection>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto flex flex-col items-center gap-8 text-center">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Join thousands of satisfied customers who are already using our
            platform. Start your free trial today.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-primary"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-primary-foreground"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Demo Inc.</h3>
            <p className="text-sm text-muted-foreground">
              Building the future of web development, one component at a time.
            </p>
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold">Links {i + 1}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {Array.from({ length: 4 }).map((_, j) => (
                  <li key={j}>
                    <a href="#" className="hover:text-foreground">
                      Link {j + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
