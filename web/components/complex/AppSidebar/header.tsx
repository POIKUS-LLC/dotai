"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const AppSidebarHeader = () => {
  const [imageSize, setImageSize] = useState(64);

  const getImageSizeBasedOnDevice = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 16; // Smaller size for mobile devices
      if (window.innerWidth < 1024) return 40; // Medium size for tablets
    }
    return 40; // Default/larger size for desktops
  };

  useEffect(() => {
    const handleResize = () => {
      setImageSize(getImageSizeBasedOnDevice());
    };

    // Set initial size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className={cn(open && "h-20")}>
        <SidebarMenuButton asChild className="h-full hover:bg-transparent">
          <a href="/">
            <Image
              src={siteConfig.companyLogo}
              alt={siteConfig.companyName}
              width={imageSize}
              height={imageSize}
              className={cn("transition-all duration-300", "dark:hidden block")}
            />
            <Image
              src={siteConfig.companyLogoDark}
              alt={siteConfig.companyName}
              width={imageSize}
              height={imageSize}
              className={cn("transition-all duration-300", "hidden dark:block")}
            />
            <span>{siteConfig.companyName}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppSidebarHeader;

AppSidebarHeader.displayName = "AppSidebarHeader";
