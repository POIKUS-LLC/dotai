import { cn } from "@/lib/utils";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface ImageProps extends Omit<NextImageProps, "height" | "width"> {
    containerClassName?: string;
    width?: number;
    height?: number;
    containerStyle?: React.CSSProperties;
}

const PKSImage = ({
    src,
    alt,
    className,
    containerClassName,
    width = 0,
    height = 0,
    containerStyle,
    ...props
}: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className={cn(
                "relative overflow-hidden flex items-center justify-center",
                containerClassName
            )}
            style={{
                maxWidth: width || "100%",
                maxHeight: height || "100%",
                ...containerStyle
            }}
        >
            {isLoading && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            )}
            <NextImage
                {...props}
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={cn(
                    "max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                onLoadingComplete={() => setIsLoading(false)}
                quality={90}
                priority={false}
                loading="lazy"
            />
        </div>
    );
}

export default PKSImage;
