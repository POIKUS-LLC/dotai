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
import type { NavItem } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import AppNavigationBar from "@/components/complex/AppNavigationBar"
import {
  Navbar,
  NavbarNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/poikus/navbar"
import { NavigationContent } from "@/components/poikus/navigation"
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

export default function DemoPage() {
  return (
    <div className="min-h-[200vh]">
      <AppNavigationBar />
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
