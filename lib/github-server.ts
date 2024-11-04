import { cache } from "react"

import { GitHubFile } from "./github"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

interface RepoCache {
  files: GitHubFile[]
  timestamp: number
  fileTree: Record<string, any>
}

// In-memory cache
const repoCache = new Map<string, RepoCache>()
const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes

export const fetchGitHubRepoServer = cache(async (url: string) => {
  const urlParts = url.replace("https://github.com/", "").split("/")
  const owner = urlParts[0]
  const repo = urlParts[1]
  const cacheKey = `${owner}/${repo}`

  // Check cache
  const cached = repoCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`
  }

  try {
    // First, try to get the default branch
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    )

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`)
    }

    const repoData = await repoResponse.json()
    const defaultBranch = repoData.default_branch

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      { headers, cache: "no-store" }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    const files: GitHubFile[] = []

    // Fetch all files in parallel with a limit
    const filePromises = data.tree
      .filter((item: any) => item.type === "blob")
      .map(async (item: any) => {
        try {
          const contentResponse = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${item.path}`,
            { headers, cache: "no-store" }
          )

          if (!contentResponse.ok) return null

          const content = await contentResponse.text()
          return {
            name: item.path.split("/").pop() || "",
            path: item.path,
            type: "file" as const,
            content,
          }
        } catch (error) {
          console.error(`Error fetching ${item.path}:`, error)
          return null
        }
      })

    const directories = data.tree
      .filter((item: any) => item.type === "tree")
      .map((item: any) => ({
        name: item.path.split("/").pop() || "",
        path: item.path,
        type: "dir" as const,
      }))

    const fileResults = await Promise.all(filePromises)
    const validFiles = fileResults.filter((f): f is GitHubFile => f !== null)

    const allFiles = [...validFiles, ...directories]
    const fileTree = buildFileTree(allFiles)

    // Update cache
    const cacheEntry = {
      files: allFiles,
      timestamp: Date.now(),
      fileTree,
    }
    repoCache.set(cacheKey, cacheEntry)

    return cacheEntry
  } catch (error) {
    console.error("Error fetching repository:", error)
    throw error
  }
})

function buildFileTree(files: GitHubFile[]) {
  const tree: Record<string, any> = {}

  files.forEach((file) => {
    const parts = file.path.split("/")
    let current = tree

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = "file"
      } else {
        current[part] = current[part] || {}
        current = current[part]
      }
    })
  })

  return tree
}
