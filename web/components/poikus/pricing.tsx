"use client"

import * as React from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// -------------------- Type Definitions -------------------- //

type PricingCardContextType = {
  isHighlighted?: boolean
  isPopular?: boolean
  isWithinFooter?: boolean
}

type PricingFeature = {
  text: string
  included?: boolean
  tooltip?: string
}

type PricingCardProps = {
  title: string
  description?: string
  price: string | number
  period?: string
  currency?: string
  features?: PricingFeature[]
  badge?: string
  isHighlighted?: boolean
  isPopular?: boolean
  action?: {
    text: string
    href?: string
    onClick?: () => void
  }
}

type PricingSectionContextType = {
  hasFooter: boolean
}

// -------------------- Contexts -------------------- //

const PricingCardContext = React.createContext<
  PricingCardContextType | undefined
>(undefined)

const PricingSectionContext = React.createContext<
  PricingSectionContextType | undefined
>(undefined)

// -------------------- Hooks -------------------- //

function usePricingCard() {
  const context = React.useContext(PricingCardContext)
  if (context === undefined) {
    throw new Error("Pricing Card components must be used within a PricingCard")
  }
  return context
}

function usePricingSection() {
  const context = React.useContext(PricingSectionContext)
  if (context === undefined) {
    throw new Error(
      "Pricing Section components must be used within a PricingSection"
    )
  }
  return context
}

// -------------------- Variants -------------------- //

const pricingCardVariants = cva(
  "relative flex flex-col rounded-xl border shadow transition-colors justify-between",
  {
    variants: {
      variant: {
        default:
          "border-pricing-border bg-pricing-background text-pricing-foreground",
        highlighted:
          "border-pricing-highlight-border bg-pricing-highlight-background text-pricing-highlight-foreground",
      },
      size: {
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const pricingCardBadgeVariants = cva(
  "absolute right-6 top-6 inline-flex -translate-y-1/2 items-center rounded-full px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-pricing-highlight-background text-pricing-highlight-foreground",
        highlighted:
          "bg-pricing-highlight-badge-background text-pricing-highlight-badge-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// -------------------- Components -------------------- //

const PKSPricingCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    VariantProps<typeof pricingCardVariants> & {
      isHighlighted?: boolean
      isPopular?: boolean
    }
>(
  (
    {
      className,
      variant,
      size,
      isHighlighted = false,
      isPopular = false,
      children,
      ...props
    },
    ref
  ) => {
    const value = React.useMemo(
      () => ({
        isHighlighted,
        isPopular,
        isWithinFooter: false,
      }),
      [isHighlighted, isPopular]
    )

    return (
      <PricingCardContext.Provider value={value}>
        <div
          ref={ref}
          className={cn(
            pricingCardVariants({
              variant: isHighlighted ? "highlighted" : "default",
              size,
              className,
            }),
            "relative"
          )}
          {...props}
        >
          {isHighlighted && (
            <div className="absolute -left-[60px] -top-6 hidden md:block  ">
              <Image
                src="/images/call-out.png"
                alt="Most popular plan"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          )}
          {children}
        </div>
      </PricingCardContext.Provider>
    )
  }
)
PKSPricingCard.displayName = "PKSPricingCard"

const PKSPricingCardBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof pricingCardBadgeVariants>
>(({ className, variant, children, ...props }, ref) => {
  const { isHighlighted } = usePricingCard()
  console.log(
    isHighlighted,
    pricingCardBadgeVariants({
      variant: isHighlighted ? "highlighted" : "default",
      className,
    })
  )
  return (
    <div
      ref={ref}
      className={cn(
        pricingCardBadgeVariants({
          variant: isHighlighted ? "highlighted" : "default",
          className,
        })
      )}
      {...props}
    >
      {children}
    </div>
  )
})
PKSPricingCardBadge.displayName = "PKSPricingCardBadge"

const PKSPricingCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-3xl flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
})
PKSPricingCardHeader.displayName = "PKSPricingCardHeader"

const PKSPricingCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h3">
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
})
PKSPricingCardTitle.displayName = "PKSPricingCardTitle"

const PKSPricingCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-base text-pricing-muted-foreground", className)}
      {...props}
    />
  )
})
PKSPricingCardDescription.displayName = "PKSPricingCardDescription"

const PKSPricingCardPrice = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    price: string | number
    period?: string
    currency?: string
  }
>(({ className, price, period, currency = "$", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-baseline gap-1", className)}
      {...props}
    >
      <span className="text-3xl font-bold">{currency}</span>
      <span className="text-5xl font-bold tracking-tight">{price}</span>
      {period && (
        <span className="text-sm font-medium text-pricing-muted-foreground">
          /{period}
        </span>
      )}
    </div>
  )
})
PKSPricingCardPrice.displayName = "PKSPricingCardPrice"

const PKSPricingCardFeaturesHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mb-4 text-sm font-medium", className)}
      {...props}
    >
      {children}
    </div>
  )
})
PKSPricingCardFeaturesHeader.displayName = "PKSPricingCardFeaturesHeader"

const PKSPricingCardFeatures = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul"> & {
    features: PricingFeature[]
    useDivider?: boolean
    header?: React.ReactNode
  }
>(({ className, features, useDivider = true, header, ...props }, ref) => {
  const { isHighlighted } = usePricingCard()

  return (
    <>
      {useDivider && <Separator className="my-6" />}
      {header && header}
      <ul ref={ref} className={cn("space-y-2 text-sm", className)} {...props}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check
              className={cn(
                "h-4 w-4",
                isHighlighted
                  ? feature.included
                    ? "text-pricing-highlight-feature-active"
                    : "text-pricing-highlight-feature-inactive"
                  : feature.included
                    ? "text-pricing-feature-active"
                    : "text-pricing-feature-inactive"
              )}
            />
            <span
              className={cn(
                feature.included
                  ? ""
                  : "text-pricing-muted-foreground line-through"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
})
PKSPricingCardFeatures.displayName = "PKSPricingCardFeatures"

const PKSPricingCardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const cardContext = usePricingCard()

  return (
    <PricingCardContext.Provider
      value={{
        ...cardContext,
        isWithinFooter: true,
      }}
    >
      <div ref={ref} className={cn("mt-6", className)} {...props}>
        {children}
      </div>
    </PricingCardContext.Provider>
  )
})
PKSPricingCardFooter.displayName = "PKSPricingCardFooter"

const PKSPricingCardAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    href?: string
  }
>(({ className, href, children, ...props }, ref) => {
  const { isHighlighted, isWithinFooter } = usePricingCard()

  if (!isWithinFooter) {
    throw new Error("PricingCardAction must be used within PricingCardFooter")
  }

  const buttonProps = {
    ref,
    className: cn(
      "w-full",
      isHighlighted &&
        "bg-pricing-highlight-button-background text-pricing-highlight-button-foreground hover:bg-pricing-highlight-button-hover",
      className
    ),
    variant: isHighlighted ? ("outline" as const) : ("default" as const),
    ...props,
  }

  if (href) {
    return (
      <Button asChild {...buttonProps}>
        <a href={href}>{children}</a>
      </Button>
    )
  }

  return <Button {...buttonProps}>{children}</Button>
})
PKSPricingCardAction.displayName = "PKSPricingCardAction"

// -------------------- Section Components -------------------- //

const PKSPricingSection = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"section">
>(({ className, children, ...props }, ref) => {
  const hasFooter = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) && child.type === PKSPricingSectionFooter
  )

  const value = React.useMemo(
    () => ({
      hasFooter,
    }),
    [hasFooter]
  )

  return (
    <PricingSectionContext.Provider value={value}>
      <section
        ref={ref}
        className={cn(
          "w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12",
          className
        )}
        {...props}
      >
        {children}
      </section>
    </PricingSectionContext.Provider>
  )
})
PKSPricingSection.displayName = "PKSPricingSection"

const PKSPricingSectionHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    useDivider?: boolean
  }
>(({ className, useDivider, children, ...props }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className={cn("text-center space-y-2", className)}
        {...props}
      >
        {children}
      </div>
      {useDivider && <Separator className="mt-8" />}
    </>
  )
})
PKSPricingSectionHeader.displayName = "PKSPricingSectionHeader"

const PKSPricingSectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p"> & {
    useDivider?: boolean
  }
>(({ className, useDivider, ...props }, ref) => {
  return (
    <>
      <p
        ref={ref}
        className={cn(
          "text-center text-muted-foreground mt-2 text-lg",
          className
        )}
        {...props}
      />
      {useDivider && <Separator className="mt-8" />}
    </>
  )
})
PKSPricingSectionDescription.displayName = "PKSPricingSectionDescription"

const PKSPricingSectionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto mt-8 grid max-w-md grid-cols-1 gap-8 md:max-w-4xl md:grid-cols-2 xl:max-w-none lg:grid-cols-3",
        className
      )}
      {...props}
    />
  )
})
PKSPricingSectionContent.displayName = "PKSPricingSectionContent"

const PKSPricingSectionFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    useDivider?: boolean
  }
>(({ className, useDivider, ...props }, ref) => {
  return (
    <>
      <div ref={ref} className={cn("text-center mt-8", className)} {...props} />
      {useDivider && <Separator className="mt-8" />}
    </>
  )
})
PKSPricingSectionFooter.displayName = "PKSPricingSectionFooter"

// -------------------- Exports -------------------- //

export {
  PKSPricingCard,
  PKSPricingCardBadge,
  PKSPricingCardHeader,
  PKSPricingCardTitle,
  PKSPricingCardDescription,
  PKSPricingCardPrice,
  PKSPricingCardFeaturesHeader,
  PKSPricingCardFeatures,
  PKSPricingCardFooter,
  PKSPricingCardAction,
  PKSPricingSection,
  PKSPricingSectionHeader,
  PKSPricingSectionDescription,
  PKSPricingSectionContent,
  PKSPricingSectionFooter,
  type PricingCardProps,
  type PricingFeature,
  type PricingCardContextType,
  type PricingSectionContextType,
}
