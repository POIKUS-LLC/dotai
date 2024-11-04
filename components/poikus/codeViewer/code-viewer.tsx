"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Download, Maximize2, Minimize2 } from "lucide-react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { CodePanel } from "./code-panel"
import { FileTree } from "./file-tree"

interface CodeViewerProps {
  initialFiles: Record<string, string>
  repoUrl: string
}

export function CodeViewer({ initialFiles = {}, repoUrl }: CodeViewerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  // Initialize selected file from URL on component mount
  useEffect(() => {
    const fileFromUrl = searchParams.get("selectedFile")
    if (fileFromUrl) {
      // Remove the leading slash if present
      const normalizedPath = fileFromUrl.startsWith("/")
        ? fileFromUrl.slice(1)
        : fileFromUrl
      // Only set if the file exists in our initialFiles
      if (initialFiles[normalizedPath]) {
        setSelectedFile("/" + normalizedPath)
      }
    }
  }, [searchParams, initialFiles])

  // Update URL when file is selected
  const handleFileSelect = (file: string | null) => {
    setSelectedFile(file)
    if (file) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("selectedFile", file)
      router.push(`?${params.toString()}`)
    } else {
      router.push(window.location.pathname)
    }
  }

  // Create file tree structure from flat file paths
  const createFileTree = (files: Record<string, string>) => {
    const tree: Record<string, any> = {}

    Object.keys(files).forEach((path) => {
      const parts = path.split("/")
      let current = tree

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = files[path] // Store the blob URL as value
        } else {
          current[part] = current[part] || {}
          current = current[part]
        }
      })
    })

    return tree
  }

  const fileTree = createFileTree(initialFiles)

  const downloadFilesFromGithub = async () => {
    // try {
    //   // Get the first file URL to extract the repository information
    //   const [, owner, repo] = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    //   // Create the zip download URL
    //   const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`
    //   // Create a temporary anchor element to trigger download
    //   const link = document.createElement("a")
    //   link.href = zipUrl
    //   link.download = `${repo}.zip`
    //   document.body.appendChild(link)
    //   link.click()
    //   document.body.removeChild(link)
    // } catch (error) {
    //   console.error("Error downloading repository:", error)
    // }
  }

  const goToRepository = () => {
    try {
      window.open(repoUrl, "_blank")
    } catch (error) {
      console.error("Error opening repository:", error)
    }
  }

  const SelectedFileBreadcrumb = () => {
    return (
      <Breadcrumb className="justify-self-start">
        <BreadcrumbList>
          {selectedFile?.split("/").map((part, index, array) => (
            <>
              <BreadcrumbItem key={part}>
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    const path = array.slice(0, index + 1).join("/")
                    handleFileSelect(path)
                  }}
                >
                  {part}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== array.length - 1 && (
                <BreadcrumbSeparator key={`separator-${index}`} />
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  return (
    <div className="w-full h-full flex flex-col fixed inset-0 z-50">
      <div className="h-full relative">
        <PanelGroup
          direction="horizontal"
          className={cn(
            "h-full rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
            ""
          )}
        >
          <Panel defaultSize={20} minSize={15} className="overflow-auto">
            <div className="h-full p-4 border-r">
              <FileTree
                onSelect={handleFileSelect}
                selectedFile={selectedFile}
                fileStructure={fileTree}
              />
            </div>
          </Panel>
          <PanelResizeHandle className="w-1.5 bg-border hover:bg-primary/20 transition-colors" />
          <Panel minSize={30} className="overflow-auto h-screen">
            <div className="w-full flex flex-row justify-between items-center py-4 gap-6 pr-4">
              <SelectedFileBreadcrumb />
              <div className="flex-1 flex justify-end gap-6">
                <Button
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => {
                    goToRepository()
                  }}
                >
                  Go To Repository
                </Button>
                <Button
                  className="rounded-full"
                  onClick={() => {
                    console.log("Downloading files from GitHub")
                    downloadFilesFromGithub()
                  }}
                >
                  Download
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <Separator className="h-[4px]" />
            <CodePanel filePath={selectedFile} files={initialFiles} />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}
