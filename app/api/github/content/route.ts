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
    const cacheKey = `github-content:${url}`
    const cachedContent = getCachedData(cacheKey)
    if (cachedContent) {
      console.log({
        cachedContent,
        poikus: "Cache hit",
      })
      return NextResponse.json({ content: cachedContent })
    }

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
        // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch file content")
    }

    const content = await response.text()

    // Cache the content
    setCachedData(cacheKey, content)

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching file content:", error)
    return NextResponse.json(
      { error: "Failed to fetch file content" },
      { status: 500 }
    )
  }
}
