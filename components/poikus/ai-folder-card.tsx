import React from "react"

import type { AIFolder } from "@/types/ai-folder"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card"

interface AIFolderCardProps {
  folder: AIFolder
  onPreviewClick: (folderId: string) => void
}

export function AIFolderCard({ folder, onPreviewClick }: AIFolderCardProps) {
  return (
    <div className="relative group rounded-2xl hover:scale-105 transition-all duration-300 mb-2 w-full">
      <Card className="relative rounded-2xl bg-card flex flex-col">
        <CardHeader className="flex-none">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold line-clamp-1">
              {folder.title}
            </h3>
            <div className="relative shrink-0">
              <p className="text-xs font-semibold text-white px-2 py-1 rounded-md z-99">
                NEW
              </p>
              {folder.isFeatured && (
                <div className="opacity-25 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl group-hover:opacity-65 transition duration-1000 group-hover:duration-200 animate-gradient-xy blur-sm" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {folder.platform?.map((platform) => (
              <Badge className="bg-purple-500 text-white" key={platform}>
                {platform}
              </Badge>
            ))}
            {folder.language?.map((language) => (
              <Badge key={language}>{language}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardBody className="flex-1 overflow-hidden">
          <p className="text-muted-foreground ">{folder.description}</p>
        </CardBody>
        <CardFooter className="flex-none flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date(folder.lastUpdated).toLocaleDateString()}
          </span>
          <Button
            onClick={() => onPreviewClick(folder.id)}
            className="bg-indigo-500 text-white font-semibold"
          >
            Preview
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
