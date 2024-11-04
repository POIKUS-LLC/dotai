"use client"

import { useEffect, useState } from "react"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import { domAnimation, LazyMotion, m, useAnimation } from "framer-motion"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const fadeAnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export type ImageVariant = "fade" | "loading" | "none"

export interface PKSImageProps
  extends Omit<NextImageProps, "height" | "width"> {
  containerClassName?: string
  width?: number
  height?: number
  containerStyle?: React.CSSProperties
  variant?: ImageVariant
}

export const PKSImage = ({
  src,
  alt,
  className,
  containerClassName,
  width = 0,
  height = 0,
  containerStyle,
  variant = "none",
  ...props
}: PKSImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const animationControls = useAnimation()

  useEffect(() => {
    if (isLoaded && variant === "fade") {
      animationControls.start("visible")
    }
  }, [isLoaded, animationControls, variant])

  const imageElement = (
    <NextImage
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300",
        variant === "loading" && !isLoaded && "opacity-0",
        className
      )}
      onLoadingComplete={() => setIsLoaded(true)}
      quality={90}
      priority={false}
      loading="lazy"
    />
  )

  const containerStyles = {
    maxWidth: width || "100%",
    maxHeight: height || "100%",
    ...containerStyle,
  }

  if (variant === "fade") {
    return (
      <LazyMotion features={domAnimation}>
        <m.div
          animate={animationControls}
          initial="hidden"
          transition={{ duration: 0.5, ease: "easeOut" }}
          variants={fadeAnimationVariants}
          className={containerClassName}
          style={containerStyles}
        >
          {imageElement}
        </m.div>
      </LazyMotion>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        containerClassName
      )}
      style={containerStyles}
    >
      {variant === "loading" && !isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      {imageElement}
    </div>
  )
}

export default PKSImage
