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
      title: "Homepage",
      href: "/",
    },
    {
      title: "How to",
      href: "/how-to",
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
