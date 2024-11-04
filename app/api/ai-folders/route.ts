import { NextResponse } from "next/server"

import type { AIFolder } from "@/types/ai-folder"

// This is mock data - in a real app, this would come from a database
const aiFolders: AIFolder[] = [
  {
    id: "1",
    title: "iOS from POIKUS",
    description:
      "A comprehensive iOS implementation of the .AI specification, providing a robust foundation for AI-powered mobile applications. Includes Swift utilities, AI model integration helpers, and standardized interfaces for machine learning features.",
    platform: ["Mobile", "iOS"],
    language: ["Swift"],
    lastUpdated: "2024-11-04",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-ios",
    isFeatured: true,
  },
]

export async function GET() {
  return NextResponse.json(aiFolders)
}
