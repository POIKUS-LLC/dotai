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
  {
    id: "2",
    title: "Android SDK for .AI",
    description:
      "Native Android implementation of the .AI specification with Kotlin-first approach. Features seamless ML model integration, real-time inference support, and comprehensive documentation.",
    platform: ["Mobile", "Android"],
    language: ["Kotlin", "Java"],
    lastUpdated: "2024-10-28",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-android",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Web Framework Components",
    description:
      "A collection of React components implementing .AI specification for web applications. Includes ready-to-use AI-powered UI elements and state management solutions.",
    platform: ["Web"],
    language: ["TypeScript", "JavaScript"],
    lastUpdated: "2024-11-01",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-web",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Python Backend Services",
    description:
      "Comprehensive Python backend implementation for .AI services. Includes FastAPI endpoints, model serving capabilities, and data processing pipelines.",
    platform: ["Backend"],
    language: ["Python"],
    lastUpdated: "2024-10-15",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-python",
    isFeatured: false,
  },
  {
    id: "5",
    title: "Flutter Integration Kit",
    description:
      "Cross-platform Flutter implementation of .AI specification. Enables AI capabilities in Flutter apps with native performance on both iOS and Android.",
    platform: ["Mobile", "Cross-platform"],
    language: ["Dart"],
    lastUpdated: "2024-09-30",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-flutter",
    isFeatured: false,
  },
  {
    id: "6",
    title: "Node.js Server Framework",
    description:
      "Server-side implementation of .AI specification using Node.js. Provides Express middleware, API handlers, and WebSocket support for real-time AI features.",
    platform: ["Backend"],
    language: ["TypeScript", "JavaScript"],
    lastUpdated: "2024-10-20",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-node",
    isFeatured: false,
  },
  {
    id: "7",
    title: "Unity Game Integration",
    description:
      "Unity package for implementing .AI specification in games. Includes components for AI-driven NPCs, procedural generation, and game behavior systems.",
    platform: ["Gaming"],
    language: ["C#"],
    lastUpdated: "2024-09-15",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-unity",
    isFeatured: false,
  },
  {
    id: "8",
    title: "Vue.js Components Library",
    description:
      "Vue.js implementation of .AI specification with composable components. Perfect for building AI-powered web applications with Vue ecosystem.",
    platform: ["Web"],
    language: ["TypeScript", "JavaScript"],
    lastUpdated: "2024-10-10",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-vue",
    isFeatured: false,
  },
  {
    id: "9",
    title: "Go Backend Framework",
    description:
      "High-performance Go implementation of .AI specification. Features concurrent processing, efficient memory management, and scalable architecture.",
    platform: ["Backend"],
    language: ["Go"],
    lastUpdated: "2024-09-25",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-go",
    isFeatured: false,
  },
  {
    id: "10",
    title: "Ruby on Rails Integration",
    description:
      "Ruby on Rails gems and utilities implementing .AI specification. Includes ActiveRecord extensions, API helpers, and background job processors.",
    platform: ["Backend"],
    language: ["Ruby"],
    lastUpdated: "2024-09-20",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-rails",
    isFeatured: false,
  },
  {
    id: "11",
    title: ".NET Core Framework",
    description:
      "Enterprise-grade .NET implementation of .AI specification. Provides robust infrastructure for building AI-powered applications in the Microsoft ecosystem.",
    platform: ["Backend", "Desktop"],
    language: ["C#"],
    lastUpdated: "2024-10-05",
    previewUrl: "https://github.com/POIKUS-LLC/dotai-dotnet",
    isFeatured: false,
  },
]

export async function GET() {
  return NextResponse.json(aiFolders)
}
