"use client"

import { useEffect, useState } from "react"
import { ChevronRight, File, Folder } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileTreeProps {
  onSelect: (path: string) => void
  selectedFile: string | null
  fileStructure: Record<string, any>
}

interface TreeNodeProps {
  name: string
  content: any
  path: string
  onSelect: (path: string) => void
  selectedFile: string | null
  level?: number
}

function sortTreeItems(a: [string, any], b: [string, any]): number {
  const aIsFile = typeof a[1] === "string"
  const bIsFile = typeof b[1] === "string"

  // If one is a folder and one is a file, folder comes first
  if (aIsFile !== bIsFile) {
    return aIsFile ? 1 : -1
  }

  // If both are the same type, sort alphabetically
  return a[0].localeCompare(b[0])
}

function TreeNode({
  name,
  content,
  path,
  onSelect,
  selectedFile,
  level = 0,
}: TreeNodeProps) {
  const shouldBeInitiallyOpen = selectedFile?.startsWith(path + "/" + name)
  const [isOpen, setIsOpen] = useState(level < 1 || shouldBeInitiallyOpen)
  const isFile = typeof content === "string"
  const fullPath = `${path}/${name}`

  useEffect(() => {
    if (shouldBeInitiallyOpen) {
      setIsOpen(true)
    }
  }, [selectedFile, shouldBeInitiallyOpen])

  return (
    <div>
      <button
        onClick={() => {
          if (isFile) {
            onSelect(fullPath)
          } else {
            setIsOpen(!isOpen)
          }
        }}
        className={cn(
          "flex items-center w-full hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-sm text-sm",
          selectedFile === fullPath && "bg-accent text-accent-foreground",
          "transition-colors"
        )}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
      >
        {!isFile && (
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              isOpen && "rotate-90"
            )}
          />
        )}
        {isFile ? (
          <File className="h-4 w-4 shrink-0 text-muted-foreground mr-2" />
        ) : (
          <Folder className="h-4 w-4 shrink-0 text-muted-foreground mr-2" />
        )}
        <span className="truncate">{name}</span>
      </button>
      {!isFile && isOpen && (
        <div>
          {Object.entries(content)
            .sort(sortTreeItems)
            .map(([childName, childContent]) => (
              <TreeNode
                key={childName}
                name={childName}
                content={childContent}
                path={fullPath}
                onSelect={onSelect}
                selectedFile={selectedFile}
                level={level + 1}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({
  onSelect,
  selectedFile,
  fileStructure = {},
}: FileTreeProps) {
  if (!fileStructure || typeof fileStructure !== "object") {
    return (
      <div className="h-full flex flex-col">
        <h2 className="font-semibold mb-4">Explorer</h2>
        <div className="flex items-center justify-center text-muted-foreground h-full">
          <p>No files to display</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-semibold mb-4">Explorer</h2>
      <ScrollArea className="flex-1 -mx-4">
        <div className="px-4">
          {Object.entries(fileStructure)
            .sort(sortTreeItems)
            .map(([name, content]) => (
              <TreeNode
                key={name}
                name={name}
                content={content}
                path=""
                onSelect={onSelect}
                selectedFile={selectedFile}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  )
}
