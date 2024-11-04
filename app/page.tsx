"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"

import type { AIFolder } from "@/types/ai-folder"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIFolderCard } from "@/components/poikus/ai-folder-card"

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

  // Update URL when filters change
  const updateUrlParams = (platforms: string[], languages: string[]) => {
    const params = new URLSearchParams(searchParams.toString())

    // Clear existing params
    params.delete("noPlatform")
    params.delete("noLanguages")
    params.delete("platforms")
    params.delete("languages")

    // Add noPlatform flag if no platforms selected
    if (platforms.length === 0) {
      params.set("noPlatform", "true")
    } else if (platforms.length < uniquePlatforms.length) {
      // Only add selected platforms if not all are selected
      params.set("platforms", platforms.join(","))
    }

    // Add noLanguages flag if no languages selected
    if (languages.length === 0) {
      params.set("noLanguages", "true")
    } else if (languages.length < uniqueLanguages.length) {
      // Only add selected languages if not all are selected
      params.set("languages", languages.join(","))
    }

    // Update URL
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname
    router.push(newUrl, { scroll: false })
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

  const handlePlatformToggle = (platform: string) => {
    const newSelected = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform]

    setSelectedPlatforms(newSelected)
    updateUrlParams(newSelected, selectedLanguages)
  }

  const handleLanguageToggle = (language: string) => {
    const newSelected = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language]

    setSelectedLanguages(newSelected)
    updateUrlParams(selectedPlatforms, newSelected)
  }

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

  // Filter folders based on selected platforms OR languages
  const filteredFolders = folders.filter((folder) => {
    // If nothing is selected, show no results
    if (selectedPlatforms.length === 0 && selectedLanguages.length === 0) {
      return false
    }

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

  return (
    <div className="flex items-center h-full justify-center">
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <main className="container mt-[80px] flex flex-col items-start px-8">
          {/* Hero section */}
          <section className="flex flex-col items-start justify-center gap-[18px] sm:gap-6 mb-16">
            <Badge>Free, Powerful, and Customizable</Badge>

            <LazyMotion features={domAnimation}>
              <m.div
                animate="kick"
                className="flex flex-col gap-6"
                exit="auto"
                initial="auto"
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                variants={{
                  auto: { width: "auto" },
                  kick: { width: "auto" },
                }}
              >
                <AnimatePresence mode="wait">
                  <m.div
                    animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                    className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]"
                    initial={{
                      filter: "blur(16px)",
                      opacity: 0,
                      x: 15 + 1 * 2,
                    }}
                    transition={{
                      bounce: 0,
                      delay: 0.01 * 10,
                      duration: 0.8 + 0.1 * 8,
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
                      x: 15 + 1 * 3,
                    }}
                    transition={{
                      bounce: 0,
                      delay: 0.01 * 30,
                      duration: 0.8 + 0.1 * 9,
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
                      x: 15 + 1 * 4,
                    }}
                    transition={{
                      bounce: 0,
                      delay: 0.01 * 50,
                      duration: 0.8 + 0.1 * 10,
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

          {/* Filter AI Folders */}
          <section className="w-full mt-8 flex flex-row justify-between gap-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {uniquePlatforms.map((platform) => (
                    <Button
                      key={platform}
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
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueLanguages.map((language) => (
                    <Button
                      key={language}
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
                  ))}
                </div>
              </div>
            </div>
            {(selectedPlatforms.length < uniquePlatforms.length ||
              selectedLanguages.length < uniqueLanguages.length) && (
              <Button variant="destructive" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}
          </section>

          {/* AI Folders Grid */}
          <section className="w-full mt-10">
            <h2 className="text-2xl font-bold mb-6">Available .ai Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <LazyMotion features={domAnimation}>
                <AnimatePresence mode="wait">
                  {filteredFolders.length > 0 ? (
                    filteredFolders.map((folder, index) => (
                      <m.div
                        key={folder.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AIFolderCard
                          folder={folder}
                          onPreviewClick={handlePreviewClick}
                        />
                      </m.div>
                    ))
                  ) : (
                    <div className="col-span-2 flex items-center justify-center h-[250px]">
                      <p className="text-muted-foreground">
                        No folders match the selected filters
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </LazyMotion>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
