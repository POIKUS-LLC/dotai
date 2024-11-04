"use client"

import { useEffect, useMemo, useState } from "react"
import { cpp } from "@codemirror/lang-cpp"
import { css } from "@codemirror/lang-css"
import { html } from "@codemirror/lang-html"
import { java } from "@codemirror/lang-java"
import { javascript } from "@codemirror/lang-javascript"
import { json } from "@codemirror/lang-json"
import { markdown } from "@codemirror/lang-markdown"
import { php } from "@codemirror/lang-php"
import { python } from "@codemirror/lang-python"
import { rust } from "@codemirror/lang-rust"
import { sql } from "@codemirror/lang-sql"
import { xml } from "@codemirror/lang-xml"
import CodeMirror from "@uiw/react-codemirror"
import { FileText } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"

interface CodePanelProps {
  filePath: string | null
  files: Record<string, string>
}

// Move cache to a separate utility file
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

type CacheEntry = {
  content: string
  timestamp: number
}

const contentCache = new Map<string, CacheEntry>()

function getCachedContent(key: string): string | null {
  const entry = contentCache.get(key)
  if (!entry) return null

  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION
  if (isExpired) {
    contentCache.delete(key)
    return null
  }

  return entry.content
}

function setCachedContent(key: string, content: string) {
  contentCache.set(key, {
    content,
    timestamp: Date.now(),
  })
}

export function CodePanel({ filePath, files }: CodePanelProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extensions = useMemo(() => {
    if (!filePath) return [javascript()]
    return [getLanguageExtension(filePath)]
  }, [filePath])

  useEffect(() => {
    async function fetchAndHighlight() {
      const normalizedPath = filePath?.startsWith("/")
        ? filePath.slice(1)
        : filePath

      if (!filePath || !normalizedPath || !files[normalizedPath]) {
        setHighlightedCode("")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const fileUrl = files[normalizedPath]
        const cacheKey = `file-content:${fileUrl}`

        // Try to get content from cache
        const cachedContent = getCachedContent(cacheKey)
        if (cachedContent) {
          setHighlightedCode(cachedContent)
          setIsLoading(false)
          return
        }

        // Fetch if not in cache
        const response = await fetch(
          `/api/github/content?url=${encodeURIComponent(fileUrl)}`
        )
        const data = await response.json()

        if (!response.ok) throw new Error(data.error)

        const content = data.content
        // Store in cache
        setCachedContent(cacheKey, content)
        setHighlightedCode(content)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load file content"
        )
        console.error("Error fetching file content:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndHighlight()
  }, [filePath, files])

  if (!filePath) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <FileText className="h-10 w-10 mx-auto mb-4" />
          <p>Select a file to view its contents</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-screen">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="font-mono text-sm text-muted-foreground">
            {filePath}
          </h2>
        </div>
        <CodeMirror
          value={highlightedCode}
          extensions={extensions}
          theme="dark"
          readOnly
          height="100%"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </ScrollArea>
  )
}

function getLanguageExtension(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || ""

  switch (ext) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      return javascript()
    case "json":
      return json()
    case "css":
    case "scss":
    case "less":
      return css()
    case "html":
    case "htm":
      return html()
    case "md":
    case "markdown":
      return markdown()
    case "py":
      return python()
    case "sql":
      return sql()
    case "xml":
      return xml()
    case "rs":
      return rust()
    case "cpp":
    case "c":
    case "h":
    case "hpp":
      return cpp()
    case "java":
      return java()
    case "php":
      return php()
    default:
      return javascript() // fallback to javascript
  }
}
