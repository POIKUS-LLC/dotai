import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        md: "12px",
      },
      colors: {
        "rainbow-border": "rainbow-border 6s linear infinite",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        review: {
          DEFAULT: "hsl(var(--review-background))",
          foreground: "hsl(var(--review-foreground))",
          border: "hsl(var(--review-border))",
          muted: "hsl(var(--review-muted))",
          "muted-foreground": "hsl(var(--review-muted-foreground))",
          rating: {
            active: "hsl(var(--review-rating-active))",
            inactive: "hsl(var(--review-rating-inactive))",
          },
        },
        pricing: {
          DEFAULT: "hsl(var(--pricing-background))",
          foreground: "hsl(var(--pricing-foreground))",
          border: "hsl(var(--pricing-border))",
          muted: "hsl(var(--pricing-muted))",
          "muted-foreground": "hsl(var(--pricing-muted-foreground))",
          "feature-active": "hsl(var(--pricing-feature-active))",
          "feature-inactive": "hsl(var(--pricing-feature-inactive))",
          "highlight-feature-active":
            "hsl(var(--pricing-highlight-feature-active))",
          "highlight-feature-inactive":
            "hsl(var(--pricing-highlight-feature-inactive))",
          "highlight-background": "hsl(var(--pricing-highlight-background))",
          "highlight-foreground": "hsl(var(--pricing-highlight-foreground))",
          "highlight-border": "hsl(var(--pricing-highlight-border))",
          "highlight-button-background":
            "hsl(var(--pricing-highlight-button-background))",
          "highlight-button-foreground":
            "hsl(var(--pricing-highlight-button-foreground))",
          "highlight-button-hover":
            "hsl(var(--pricing-highlight-button-hover))",
          "highlight-badge-background":
            "hsl(var(--pricing-highlight-badge-background))",
          "highlight-badge-foreground":
            "hsl(var(--pricing-highlight-badge-foreground))",
        },
        navbar: {
          background: "hsl(var(--navbar-background))",
          foreground: "hsl(var(--navbar-foreground))",
          muted: "hsl(var(--navbar-muted))",
          "muted-foreground": "hsl(var(--navbar-muted-foreground))",
          accent: "hsl(var(--navbar-accent))",
          "accent-foreground": "hsl(var(--navbar-accent-foreground))",
          border: "hsl(var(--navbar-border))",
          "glass-background": "hsla(var(--navbar-glass-background))",
          "glass-border": "hsla(var(--navbar-glass-border))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "rainbow-border": {
          "0%, 100%": {
            "border-image":
              "linear-gradient(to right top, #6366f1, #8b5cf6, #d946ef) 1",
          },
          "25%": {
            "border-image":
              "linear-gradient(to right top, #d946ef, #6366f1, #8b5cf6) 1",
          },
          "50%": {
            "border-image":
              "linear-gradient(to right top, #8b5cf6, #d946ef, #6366f1) 1",
          },
          "75%": {
            "border-image":
              "linear-gradient(to right top, #6366f1, #d946ef, #8b5cf6) 1",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rainbow-border": "rainbow-border 6s linear infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      utilities: {
        ".backface-visibility-hidden": {
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden",
        },
        ".perspective-1000": {
          perspective: "1000px",
          "-webkit-perspective": "1000px",
        },
        ".transform-gpu": {
          transform: "translate3d(0,0,0)",
          "-webkit-transform": "translate3d(0,0,0)",
        },
        ".translate-z-0": {
          transform: "translateZ(0)",
          "-webkit-transform": "translateZ(0)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
