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
} from "lucide-react"

// Type definitions
export type NavItem = {
  title: string
  href?: string
  description?: string
  icon?: LucideIcon
  items?: NavItem[]
}

export type NavigationConfig = {
  mainNav: NavItem[]
  sideNav?: NavItem[]
}

export type NavigationLayout = {
  [key: string]: {
    type: "featured" | "grid" | "list"
    width?: string
    columns?: number
    featured?: boolean
  }
}

const navigationLayout: NavigationLayout = {
  Products: {
    type: "grid",
    width: "600px",
    columns: 2,
    featured: true,
  },
  Resources: {
    type: "grid",
    width: "500px",
    columns: 2,
    featured: false,
  },
  // Add more layouts as needed
}

const navigationConfig: NavigationConfig = {
  mainNav: [
    {
      title: "Products",
      items: [
        {
          title: "What's New",
          href: "/whats-new",
          description: "Explore our latest features and improvements.",
          icon: Sparkles,
        },
        {
          title: "Components",
          href: "/components",
          description:
            "Beautiful and accessible components built with Radix UI and Tailwind CSS.",
          icon: Layers,
        },
        {
          title: "Performance",
          href: "/performance",
          description: "Optimized for speed and reliability.",
          icon: Gauge,
        },
      ],
    },
    {
      title: "Resources",
      items: [
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
      ],
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
  ],
}

const siteConfig = {
  companyName: "POIKUS",
  companyLogo: "/images/logo.png",
  companyLogoDark: "/images/logo-dark.png",
  navigation: navigationConfig,
  navigationLayout,
}

export default siteConfig
