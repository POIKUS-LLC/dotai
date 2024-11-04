"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import CodeViewer from "@/components/poikus/codeViewer/code-viewer"

const PreviewPage = () => {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")

  return (
    <Suspense fallback={<CodeViewerSkeleton />}>
      {url ? <CodeViewerPanel url={url} /> : <div>No URL provided</div>}
    </Suspense>
  )
}

const CodeViewerSkeleton = () => {
  return <div className="h-full w-full bg-gray-100 animate-pulse" />
}

const CodeViewerPanel = ({ url }: { url: string }) => {
  const { isLoading, files } = useFetchFiles(url)

  if (isLoading) {
    return <CodeViewerSkeleton />
  }

  return <CodeViewer initialFiles={files} repoUrl={url} />
}

const useFetchFiles = (url: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [files, setFiles] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `/api/github?url=${encodeURIComponent(url)}`
        )
        const files = await response.json()
        setFiles(files)
      } catch (error) {
        console.error("Error fetching files:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [url])

  return { isLoading, files }
}

const PreviewPageWrapper = () => {
  return (
    <Suspense fallback={<CodeViewerSkeleton />}>
      <PreviewPage />
    </Suspense>
  )
}

export default PreviewPageWrapper
