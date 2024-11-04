"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"

import type { AIFolder } from "@/types/ai-folder"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIFolderCard } from "@/components/poikus/ai-folder-card"

// Add these variants outside the component for reuse
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
    },
  },
}

export default function Component() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [folders, setFolders] = useState<AIFolder[]>([])
  const [loading, setLoading] = useState(true)
  const [uniquePlatforms, setUniquePlatforms] = useState<string[]>([])
  const [uniqueLanguages, setUniqueLanguages] = useState<string[]>([])

  // Initialize selected states from URL or all items
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  // Memoize filtered results
  const filteredFolders = useMemo(() => {
    // If nothing is selected, return empty array immediately
    if (selectedPlatforms.length === 0 && selectedLanguages.length === 0) {
      return []
    }

    return folders.filter((folder) => {
      // If platforms are selected, check platform match
      if (selectedPlatforms.length > 0) {
        return folder.platform.some((p) => selectedPlatforms.includes(p))
      }

      // If languages are selected, check language match
      if (selectedLanguages.length > 0) {
        return folder.language?.some((l) => selectedLanguages.includes(l))
      }

      return false
    })
  }, [folders, selectedPlatforms, selectedLanguages])

  // Debounce URL updates to prevent too many history entries
  const debouncedUpdateUrl = useCallback(
    debounce((platforms: string[], languages: string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      // Clear existing params
      params.delete("noPlatform")
      params.delete("noLanguages")
      params.delete("platforms")
      params.delete("languages")

      // Add only necessary params
      if (platforms.length === 0) {
        params.set("noPlatform", "true")
      } else if (platforms.length < uniquePlatforms.length) {
        params.set("platforms", platforms.join(","))
      }

      if (languages.length === 0) {
        params.set("noLanguages", "true")
      } else if (languages.length < uniqueLanguages.length) {
        params.set("languages", languages.join(","))
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname
      router.push(newUrl, { scroll: false })
    }, 300),
    [
      pathname,
      router,
      searchParams,
      uniquePlatforms.length,
      uniqueLanguages.length,
    ]
  )

  const handlePlatformToggle = useCallback(
    (platform: string) => {
      setSelectedPlatforms((prev) => {
        const newSelected = prev.includes(platform)
          ? prev.filter((p) => p !== platform)
          : [...prev, platform]

        debouncedUpdateUrl(newSelected, selectedLanguages)
        return newSelected
      })
    },
    [selectedLanguages, debouncedUpdateUrl]
  )

  const handleLanguageToggle = useCallback(
    (language: string) => {
      setSelectedLanguages((prev) => {
        const newSelected = prev.includes(language)
          ? prev.filter((l) => l !== language)
          : [...prev, language]

        debouncedUpdateUrl(selectedPlatforms, newSelected)
        return newSelected
      })
    },
    [selectedPlatforms, debouncedUpdateUrl]
  )

  const handleClearFilters = () => {
    setSelectedPlatforms(uniquePlatforms)
    setSelectedLanguages(uniqueLanguages)
    router.push(pathname, { scroll: false })
  }

  const fetchFolders = async () => {
    try {
      const response = await fetch("/api/ai-folders")
      const data = await response.json()
      setFolders(data)
    } catch (error) {
      console.error("Error fetching folders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePreviewClick = (folderId: string) => {
    router.push(
      `/preview?url=${folders.find((f) => f.id === folderId)?.previewUrl}`
    )
  }

  useEffect(() => {
    fetchFolders()
  }, [])

  useEffect(() => {
    if (folders.length > 0) {
      // Get unique values
      const platforms = Array.from(
        new Set(folders.flatMap((folder) => folder.platform))
      )
      const languages = Array.from(
        new Set(folders.flatMap((folder) => folder.language || []))
      )

      setUniquePlatforms(platforms)
      setUniqueLanguages(languages)

      // Check URL params for filter flags and selected items
      const noPlatform = searchParams.get("noPlatform") === "true"
      const noLanguages = searchParams.get("noLanguages") === "true"
      const selectedPlatformsParam =
        searchParams.get("platforms")?.split(",") || []
      const selectedLanguagesParam =
        searchParams.get("languages")?.split(",") || []

      // Set initial selected values
      if (noPlatform) {
        setSelectedPlatforms([])
      } else if (selectedPlatformsParam.length > 0) {
        setSelectedPlatforms(selectedPlatformsParam)
      } else {
        setSelectedPlatforms(platforms)
      }

      if (noLanguages) {
        setSelectedLanguages([])
      } else if (selectedLanguagesParam.length > 0) {
        setSelectedLanguages(selectedLanguagesParam)
      } else {
        setSelectedLanguages(languages)
      }
    }
  }, [folders, searchParams])

  return (
    <div className="flex flex-col h-full justify-center">
      {/* Hero Section */}
      <section className="flex flex-col items-start justify-center gap-[18px] sm:gap-6 mb-16">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge>Free, Powerful, and Customizable</Badge>
        </m.div>

        <LazyMotion features={domAnimation}>
          <m.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <m.div
                animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]"
                initial={{
                  filter: "blur(16px)",
                  opacity: 0,
                  x: 15,
                }}
                transition={{
                  bounce: 0,
                  delay: 0.1,
                  duration: 0.8,
                  type: "spring",
                }}
              >
                <div className="bg-gradient-to-r from-foreground/100 to-foreground/40 bg-clip-text text-transparent">
                  Elevate Your Coding with <br />
                  .ai folders
                </div>
              </m.div>

              <m.div
                animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]"
                initial={{
                  filter: "blur(16px)",
                  opacity: 0,
                  x: 15,
                }}
                transition={{
                  bounce: 0,
                  delay: 0.2,
                  duration: 0.8,
                  type: "spring",
                }}
              >
                Discover how customized AI configurations transform your
                development experience.
              </m.div>

              <m.div
                animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
                initial={{
                  filter: "blur(16px)",
                  opacity: 0,
                  x: 15,
                }}
                transition={{
                  bounce: 0,
                  delay: 0.3,
                  duration: 0.8,
                  type: "spring",
                }}
              >
                <Button
                  className="rounded-full"
                  onClick={() => {
                    router.push("/how-to")
                  }}
                >
                  How to use .ai folders
                </Button>
              </m.div>
            </AnimatePresence>
          </m.div>
        </LazyMotion>
      </section>

      {/* Filter Section */}
      <LazyMotion features={domAnimation}>
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full mt-8 flex flex-row justify-between gap-4"
        >
          <div className="space-y-4">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {uniquePlatforms.map((platform, index) => (
                  <m.div
                    key={platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <Button
                      variant={
                        selectedPlatforms.includes(platform)
                          ? "default"
                          : "secondary"
                      }
                      className={cn(
                        "rounded-full",
                        selectedPlatforms.includes(platform)
                          ? "bg-primary hover:bg-primary/90"
                          : "hover:bg-secondary/80"
                      )}
                      onClick={() => handlePlatformToggle(platform)}
                    >
                      {platform}
                    </Button>
                  </m.div>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-lg font-bold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueLanguages.map((language, index) => (
                  <m.div
                    key={language}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <Button
                      variant={
                        selectedLanguages.includes(language)
                          ? "default"
                          : "secondary"
                      }
                      className={cn(
                        "rounded-full",
                        selectedLanguages.includes(language)
                          ? "bg-primary hover:bg-primary/90"
                          : "hover:bg-secondary/80"
                      )}
                      onClick={() => handleLanguageToggle(language)}
                    >
                      {language}
                    </Button>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>

          {(selectedPlatforms.length < uniquePlatforms.length ||
            selectedLanguages.length < uniqueLanguages.length) && (
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <Button variant="destructive" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </m.div>
          )}
        </m.section>

        {/* AI Folders Grid Section */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="w-full mt-10"
        >
          <m.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-2xl font-bold mb-6"
          >
            Available .ai Folders
          </m.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {filteredFolders.length > 0 ? (
                filteredFolders.map((folder, index) => (
                  <m.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                    layout
                  >
                    <AIFolderCard
                      folder={folder}
                      onPreviewClick={handlePreviewClick}
                    />
                  </m.div>
                ))
              ) : (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="col-span-2 flex items-center justify-center h-[250px]"
                >
                  <p className="text-muted-foreground">
                    No folders match the selected filters
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.section>
      </LazyMotion>
    </div>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
