"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Video, Progress } from "../../lib/mock-data"

interface CourseSidebarProps {
  videos: Video[]
  currentVideoId: string
  progress: Progress[]
  onVideoSelect: (videoId: string) => void
}

export function CourseSidebar({ videos, currentVideoId, progress, onVideoSelect }: CourseSidebarProps) {
  const isCompleted = (videoId: string) => {
    return progress.some((p) => p.videoId === videoId && p.completed)
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Conteúdo do Curso</h3>
      <div className="space-y-2">
        {videos.map((video) => {
          const completed = isCompleted(video.id)
          const isCurrent = video.id === currentVideoId

          return (
            <Button
              key={video.id}
              variant={isCurrent ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-3 h-auto py-3 px-3", isCurrent && "bg-primary/10")}
              onClick={() => onVideoSelect(video.id)}
            >
              <div className="flex-shrink-0">
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : isCurrent ? (
                  <Play className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm leading-tight">{video.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{video.duration}</div>
              </div>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
