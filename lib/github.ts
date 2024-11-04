export interface GitHubFile {
  name: string
  path: string
  type: "file" | "dir"
  content?: string
}

export async function fetchGitHubRepo(url: string): Promise<GitHubFile[]> {
  // Convert github.com URL to raw.githubusercontent.com
  const urlParts = url.replace("https://github.com/", "").split("/")
  const owner = urlParts[0]
  const repo = urlParts[1]
  const branch = "main" // or 'master' depending on the repository

  const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    const files: GitHubFile[] = []

    for (const item of data.tree) {
      if (item.type === "blob") {
        // This is a file
        try {
          const contentResponse = await fetch(`${rawBaseUrl}/${item.path}`)
          if (!contentResponse.ok) {
            continue
          }
          const content = await contentResponse.text()

          files.push({
            name: item.path.split("/").pop() || "",
            path: item.path,
            type: "file",
            content,
          })
        } catch (error) {
          console.error(`Error fetching content for ${item.path}:`, error)
        }
      } else if (item.type === "tree") {
        // This is a directory
        files.push({
          name: item.path.split("/").pop() || "",
          path: item.path,
          type: "dir",
        })
      }
    }

    return files
  } catch (error) {
    console.error("Error fetching repository:", error)
    return []
  }
}

export function buildFileTree(files: GitHubFile[]) {
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
