import { NextRequest, NextResponse } from "next/server"

import { getCachedData, setCachedData } from "@/lib/cache"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    // Check cache first
    const cacheKey = `github-tree:${url}`
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      console.log({
        cachedData,
        poikus: "Cache hit",
      })
      return NextResponse.json(cachedData)
    }

    // Extract owner and repo from GitHub URL
    const urlParts = url.replace("https://github.com/", "").split("/")
    const owner = urlParts[0]
    const repo = urlParts[1]

    // GitHub API endpoint
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: 500 }
      )
    }

    const data = await response.json()
    const fileMap: Record<string, string> = {}

    // Convert the tree to a Record<Path, URL> format
    data.tree.forEach((item: any) => {
      // Only include files (type: "blob"), skip directories
      if (item.type === "blob") {
        fileMap[item.path] = item.url
      }
    })

    // Cache the result
    setCachedData(cacheKey, fileMap)

    return NextResponse.json(fileMap)
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    )
  }
}
