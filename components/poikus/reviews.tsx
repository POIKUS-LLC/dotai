/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import React from "react"
import { ImageProps } from "next/image"
import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  Variants,
} from "framer-motion"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, ButtonProps } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import PKSImage from "./PKSImage"

// -------------------- Type Definitions -------------------- //

/**
 * Context type for the ReviewCard component
 */
type ReviewCardContextType = {
  rating?: number
  maxRating?: number
  isWithinFooter?: boolean
}

/**
 * Configuration for ReviewSection animations
 */
interface ReviewSectionAnimationConfig {
  container?: Variants
  header?: Variants
  description?: Variants
  content?: Variants
  disabled?: boolean
  viewport?: {
    once?: boolean
    margin?: string
  }
  staggerDelay?: number
  initialDelay?: number
}

/**
 * Configuration for ReviewSectionReviews animations
 */
interface ReviewSectionReviewsAnimationConfig {
  container?: Variants
  item?: Variants
  disabled?: boolean
  viewport?: {
    once?: boolean
    margin?: string
  }
  staggerDelay?: number
  initialDelay?: number
}

type ReviewSectionReviewsContextType = {
  isWithinReviewSectionReviews: boolean
}

type ReviewSectionContextType = {
  hasFooter: boolean
}
// -------------------- Contexts -------------------- //

export const ReviewCardContext = React.createContext<
  ReviewCardContextType | undefined
>(undefined)

export const ReviewSectionContext = React.createContext<
  ReviewSectionContextType | undefined
>(undefined)

const ReviewSectionReviewsContext = React.createContext<
  ReviewSectionReviewsContextType | undefined
>(undefined)

// -------------------- Hooks -------------------- //

/**
 * Hook to access ReviewCard context
 */
export function useReviewCard() {
  const context = React.useContext(ReviewCardContext)
  if (context === undefined) {
    throw new Error("Review Card components must be used within a ReviewCard")
  }
  return context
}

/**
 * Hook to access ReviewSection context
 */
export function useReviewSection() {
  const context = React.useContext(ReviewSectionContext)
  if (context === undefined) {
    const error = new Error(
      "Review Section components must be used within a ReviewSection"
    )
    console.error(error)
    throw error
  }
  return context
}

/**
 * Hook to access ReviewSectionReviews context
 */
export function useReviewSectionReviews() {
  const context = React.useContext(ReviewSectionReviewsContext)
  if (context === undefined) {
    throw new Error("ReviewCard must be used within a ReviewSectionReviews")
  }
  return context
}

// -------------------- Default Configurations -------------------- //

export const defaultReviewSectionAnimationConfig: ReviewSectionAnimationConfig =
  {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          staggerChildren: 0.2,
          delayChildren: 0.1,
        },
      },
    },
    header: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    },
    description: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    },
    content: {
      initial: {},
      animate: {
        transition: {
          delayChildren: 0.4,
          staggerChildren: 0.1,
        },
      },
    },
    viewport: {
      once: true,
      margin: "-100px",
    },
    disabled: false,
    staggerDelay: 0.2,
    initialDelay: 0.3,
  }

const defaultAnimationConfig: ReviewSectionReviewsAnimationConfig = {
  container: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    initial: {
      opacity: 0,
      y: 20,
      x: -20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  },
  viewport: {
    once: true,
    margin: "-100px",
  },
  disabled: false,
  staggerDelay: 0.2,
  initialDelay: 0.3,
}

// -------------------- Motion Components -------------------- //

const MotionSection = motion.section as ForwardRefComponent<
  HTMLElement,
  HTMLMotionProps<"section">
>

const MotionDiv = motion.div as ForwardRefComponent<
  HTMLDivElement,
  HTMLMotionProps<"div">
>

// -------------------- Components -------------------- //

/**
 * A card component for displaying reviews with rating, description, and author information
 */
const PKSReviewCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    rating?: number
    maxRating?: number
  }
>(({ className, rating, maxRating = 5, children, ...props }, ref) => {
  useReviewSectionReviews() // Ensure ReviewCard is within ReviewSectionReviews

  const value = React.useMemo(
    () => ({
      rating,
      maxRating,
      isWithinFooter: false,
    }),
    [rating, maxRating]
  )

  return (
    <ReviewCardContext.Provider value={value}>
      <div
        ref={ref}
        className={cn(
          "flex flex-col text-lg font-semibold rounded-lg border",
          "bg-review text-review-foreground border-review-border shadow-sm",
          "gap-2 px-6 pt-6 pb-4",
          className
        )}
        role="article"
        aria-label="Review"
        {...props}
      >
        {children}
      </div>
    </ReviewCardContext.Provider>
  )
})
PKSReviewCard.displayName = "PKSReviewCard"

/**
 * Header component for the ReviewCard
 */
const PKSReviewCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { rating } = useReviewCard() // Get rating from context

  return (
    <div
      ref={ref}
      className={cn("flex justify-between items-start", className)}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {rating !== undefined && (
        <PKSReviewCardRating className="px-0 py-0 ml-4 flex-shrink-0" />
      )}
    </div>
  )
})
PKSReviewCardHeader.displayName = "PKSReviewCardHeader"

/**
 * Title component for the ReviewCard
 */
const PKSReviewCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h3">
>(({ className, ...props }, ref) => {
  useReviewCard() // Will throw if used outside ReviewCard

  return (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
})
PKSReviewCardTitle.displayName = "PKSReviewCardTitle"

/**
 * Description component for the ReviewCard
 */
const PKSReviewCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => {
  useReviewCard() // Will throw if used outside ReviewCard

  return (
    <p
      ref={ref}
      className={cn(
        "text-sm font-normal text-review-muted-foreground py-2",
        className
      )}
      {...props}
    />
  )
})
PKSReviewCardDescription.displayName = "PKSReviewCardDescription"

/**
 * Rating component for the ReviewCard
 */
const PKSReviewCardRating = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { rating = 0, maxRating = 5 } = useReviewCard()

  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-1", className)}
      role="group"
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      {...props}
    >
      {Array.from({ length: maxRating }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: i * 0.1,
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-hidden="true" // Hide from screen readers since we have descriptive text
        >
          <Star
            className={cn(
              "h-4 w-4 transition-colors duration-200",
              i < rating
                ? "fill-review-rating-active text-review-rating-active"
                : "fill-review-rating-inactive text-review-rating-inactive"
            )}
          />
        </motion.div>
      ))}
      <span className="sr-only">
        Rated {rating} out of {maxRating} stars
      </span>
    </div>
  )
})
PKSReviewCardRating.displayName = "PKSReviewCardRating"

/**
 * Content component for the ReviewCard
 */
const PKSReviewCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-2", className)} {...props} />
))
PKSReviewCardContent.displayName = "PKSReviewCardContent"

/**
 * Footer component for the ReviewCard
 */
const PKSReviewCardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  useReviewCard() // Ensure within ReviewCard

  return (
    <ReviewCardContext.Provider
      value={{
        ...useReviewCard(),
        isWithinFooter: true,
      }}
    >
      <div ref={ref} className={cn("mt-auto", className)} {...props}>
        {children}
      </div>
    </ReviewCardContext.Provider>
  )
})
PKSReviewCardFooter.displayName = "PKSReviewCardFooter"

/**
 * Footer Actions component for the ReviewCard
 */
const PKSReviewCardFooterActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { isWithinFooter } = useReviewCard()

  if (!isWithinFooter) {
    throw new Error(
      "ReviewCardFooterActions must be used within ReviewCardFooter"
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end space-x-2 flex-wrap",
        className
      )}
      {...props}
    />
  )
})
PKSReviewCardFooterActions.displayName = "PKSReviewCardFooterActions"

/**
 * Author component for the ReviewCard
 */
const PKSReviewCardAuthor = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    name: string
    title?: string
    company?: string
    avatar?: string
    companyUrl?: string
    companyLogo?: ImageProps & {
      src: string
      alt: string
      containerClassName?: string
      width: number
      height: number
      containerStyle?: React.CSSProperties
    }
    containerClassNames?: {
      avatar?: {
        container?: string
        image?: string
        fallback?: string
      }
      author?: string
      companyLogo?: string
    }
  }
>(
  (
    {
      name,
      title,
      company,
      avatar,
      companyUrl,
      companyLogo,
      containerClassNames,
      className,
      ...props
    },
    ref
  ) => {
    useReviewCard()
    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex items-center justify-between gap-4 min-h-[60px] flex-wrap",
          className
        )}
        {...props}
      >
        {/* Author info */}
        <div
          className={cn(
            "flex items-center gap-4",
            containerClassNames?.avatar?.container
          )}
        >
          <Avatar className={containerClassNames?.avatar?.image}>
            <AvatarImage
              src={avatar}
              alt={`Profile picture of ${name}`}
              className={containerClassNames?.avatar?.image}
            />
            <AvatarFallback
              className={containerClassNames?.avatar?.fallback}
              aria-label={`${name}'s initials`}
            >
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn("space-y-1", containerClassNames?.author)}
            role="group"
            aria-label="Author information"
          >
            <p className="text-base font-bold leading-none">{name}</p>
            {(title || company) && (
              <p className="text-sm font-normal text-muted-foreground">
                {title}
                {title && company && " · "}
                {company}
              </p>
            )}
          </div>
        </div>

        {/* Company logo */}
        {companyLogo && companyUrl && (
          <Button
            variant="ghost"
            onClick={() => window.open(companyUrl, "_blank")}
            aria-label={`Visit ${company}'s website`}
          >
            <PKSImage {...companyLogo} alt={`${company} logo`} />
          </Button>
        )}
      </div>
    )
  }
)
PKSReviewCardAuthor.displayName = "PKSReviewCardAuthor"

/**
 * Footer Action component for the ReviewCard
 */
const PKSReviewCardFooterAction = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button> & {
    startingContent?: React.ReactNode
    children?: React.ReactNode
    endingContent?: React.ReactNode
    variant?: ButtonProps["variant"]
  }
>(
  (
    { className, startingContent, endingContent, variant, children, ...props },
    ref
  ) => {
    useReviewCard()

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn("justify-self-end", className)}
        {...props}
      >
        {startingContent}
        {children}
        {endingContent}
      </Button>
    )
  }
)
PKSReviewCardFooterAction.displayName = "PKSReviewCardFooterAction"

// -------------------- Review Section Components -------------------- //

/**
 * Container component for organizing and displaying multiple reviews
 */
interface ReviewSectionProps extends Omit<HTMLMotionProps<"section">, "ref"> {
  animation?: ReviewSectionAnimationConfig
}

const ReviewSection = React.forwardRef<HTMLElement, ReviewSectionProps>(
  ({ className, animation, children, ...props }, ref) => {
    const hasFooter = React.Children.toArray(
      children as React.ReactNode[]
    ).some(
      (child) =>
        React.isValidElement(child) && child.type === ReviewSectionFooter
    )

    const value = React.useMemo(
      () => ({
        hasFooter,
      }),
      [hasFooter]
    )

    const config = React.useMemo(
      () => ({
        ...defaultReviewSectionAnimationConfig,
        ...animation,
        container: {
          ...defaultReviewSectionAnimationConfig.container,
          ...animation?.container,
        },
        header: {
          ...defaultReviewSectionAnimationConfig.header,
          ...animation?.header,
        },
        description: {
          ...defaultReviewSectionAnimationConfig.description,
          ...animation?.description,
        },
        content: {
          ...defaultReviewSectionAnimationConfig.content,
          ...animation?.content,
        },
        viewport: {
          ...defaultReviewSectionAnimationConfig.viewport,
          ...animation?.viewport,
        },
      }),
      [animation]
    )

    const Wrapper = config.disabled ? "section" : MotionSection

    return (
      <ReviewSectionContext.Provider value={value}>
        <Wrapper
          ref={ref}
          className={cn("w-full py-12 md:py-16 lg:py-20", className)}
          role="region"
          aria-label="Customer Reviews"
          {...(!config.disabled && {
            initial: "initial",
            whileInView: "animate",
            viewport: config.viewport,
            variants: config.container,
          })}
          {...(props as any)}
        >
          {children}
        </Wrapper>
      </ReviewSectionContext.Provider>
    )
  }
)
ReviewSection.displayName = "ReviewSection"

/**
 * Header component for the ReviewSection
 */
const ReviewSectionHeader = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref"> & {
    useDivider?: boolean
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }
>(({ className, useDivider, headingLevel = "h2", children, ...props }, ref) => {
  useReviewSection()
  const Heading = headingLevel

  return (
    <>
      <MotionDiv
        ref={ref}
        className={cn("text-3xl font-bold text-center space-y-2", className)}
        {...props}
      >
        <Heading>{children as React.ReactNode}</Heading>
      </MotionDiv>
      {useDivider && <Separator className="mt-6" />}
    </>
  )
})
ReviewSectionHeader.displayName = "ReviewSectionHeader"

/**
 * Description component for the ReviewSection
 */
const ReviewSectionDescription = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref"> & { useDivider?: boolean }
>(({ className, useDivider, ...props }, ref) => {
  useReviewSection()
  return (
    <>
      <MotionDiv
        ref={ref}
        className={cn(
          "text-center text-review-muted-foreground mt-2",
          className
        )}
        {...props}
      />
      {useDivider && <Separator className="mt-6" />}
    </>
  )
})
ReviewSectionDescription.displayName = "ReviewSectionDescription"

/**
 * Footer component for the ReviewSection
 */
const ReviewSectionFooter = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref"> & { useDivider?: boolean }
>(({ className, useDivider, ...props }, ref) => {
  useReviewSection()
  return (
    <>
      <MotionDiv
        ref={ref}
        className={cn("text-center mt-6", className)}
        {...props}
      />
      {useDivider && <Separator className="mt-6" />}
    </>
  )
})
ReviewSectionFooter.displayName = "ReviewSectionFooter"

// -------------------- Review Section Reviews Components -------------------- //

/**
 * Grid container for review cards with animation support
 */
interface ReviewSectionReviewsProps extends React.ComponentProps<"div"> {
  animation?: ReviewSectionReviewsAnimationConfig
  useDivider?: boolean
}

const ReviewSectionReviews = React.forwardRef<
  HTMLDivElement,
  ReviewSectionReviewsProps
>(({ className, children, animation, useDivider, ...props }, ref) => {
  const { hasFooter } = useReviewSection()

  const shouldUseDivider = useDivider ?? hasFooter

  const config = React.useMemo(
    () => ({
      ...defaultAnimationConfig,
      ...animation,
      container: {
        ...defaultAnimationConfig.container,
        ...animation?.container,
      },
      item: {
        ...defaultAnimationConfig.item,
        ...animation?.item,
      },
      viewport: {
        ...defaultAnimationConfig.viewport,
        ...animation?.viewport,
      },
    }),
    [animation]
  )

  const Wrapper = config.disabled ? "div" : motion.div
  const ItemWrapper = config.disabled ? "div" : motion.div

  return (
    <ReviewSectionReviewsContext.Provider
      value={{ isWithinReviewSectionReviews: true }}
    >
      <>
        <Wrapper
          ref={ref}
          className={cn("grid gap-4 auto-rows-fr my-5", className)}
          role="list"
          aria-label="Customer reviews"
          {...(!config.disabled && {
            initial: "initial",
            whileInView: "animate",
            viewport: config.viewport,
            variants: config.container,
          })}
          {...(props as any)}
        >
          {React.Children.map(children, (child, index) => (
            <ItemWrapper
              key={index}
              role="listitem"
              {...(!config.disabled && {
                variants: config.item,
                custom: index,
              })}
              className="h-full"
            >
              {React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement, {
                    className: cn(
                      "h-full",
                      (child as React.ReactElement).props.className
                    ),
                  })
                : child}
            </ItemWrapper>
          ))}
        </Wrapper>
        {shouldUseDivider && <Separator className="mt-6" />}
      </>
    </ReviewSectionReviewsContext.Provider>
  )
})
ReviewSectionReviews.displayName = "ReviewSectionReviews"

// -------------------- Exports -------------------- //

export {
  PKSReviewCard,
  PKSReviewCardHeader,
  PKSReviewCardTitle,
  PKSReviewCardDescription,
  PKSReviewCardRating,
  PKSReviewCardContent,
  PKSReviewCardFooter,
  PKSReviewCardFooterActions,
  PKSReviewCardAuthor,
  PKSReviewCardFooterAction,
  ReviewSection,
  ReviewSectionHeader,
  ReviewSectionDescription,
  ReviewSectionFooter,
  ReviewSectionReviews,
  type ReviewSectionContextType,
  type ReviewSectionAnimationConfig,
  type ReviewSectionReviewsContextType,
  type ReviewSectionReviewsAnimationConfig,
}
