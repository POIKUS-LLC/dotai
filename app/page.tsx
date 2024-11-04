"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"

import type { AIFolder } from "@/types/ai-folder"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIFolderCard } from "@/components/poikus/ai-folder-card"

export default function Component() {
  const router = useRouter()
  const [folders, setFolders] = useState<AIFolder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFolders()
  }, [])

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

          {/* AI Folders Grid */}
          <section className="w-full mt-8">
            <h2 className="text-2xl font-bold mb-6">Available .ai Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LazyMotion features={domAnimation}>
                <AnimatePresence mode="wait">
                  {folders.map((folder, index) => (
                    <m.div
                      key={folder.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AIFolderCard
                        folder={folder}
                        onPreviewClick={handlePreviewClick}
                      />
                    </m.div>
                  ))}
                </AnimatePresence>
              </LazyMotion>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
