"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { VideoPlayer } from "@/components/video/video-player"
import { CommentsSection } from "@/components/video/comment-section"
import { CourseSidebar } from "@/components/course/course-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  getCourseById,
  getVideoById,
  getVideosByCourseId,
  getCommentsByVideoId,
  getProgress,
  saveProgress,
  getCourseProgress,
  type Progress as ProgressType,
} from "@/lib/mock-data"

export default function VideoPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params.courseId as string
  const videoId = params.videoId as string

  const [progress, setProgress] = useState<ProgressType[]>([])
  const [currentProgress, setCurrentProgress] = useState(0)

  const course = getCourseById(courseId)
  const video = getVideoById(videoId)
  const videos = getVideosByCourseId(courseId)
  const comments = getCommentsByVideoId(videoId)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    const userProgress = getProgress(user.id, courseId)
    setProgress(userProgress)
  }, [user, courseId, router])

  const handleProgress = (currentTime: number, duration: number) => {
    if (!user) return

    const watchedPercent = (currentTime / duration) * 100
    const completed = watchedPercent >= 90

    const progressData: ProgressType = {
      userId: user.id,
      courseId,
      videoId,
      completed,
      watchedSeconds: currentTime,
      totalSeconds: duration,
      lastWatched: new Date().toISOString(),
    }

    saveProgress(progressData)
    setProgress(getProgress(user.id, courseId))
  }

  const handleVideoSelect = (newVideoId: string) => {
    router.push(`/course/${courseId}/video/${newVideoId}`)
  }

  const courseProgress = user ? getCourseProgress(user.id, courseId) : 0

  if (!course || !video) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Curso ou vídeo não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer videoUrl={video.videoUrl} onProgress={handleProgress} />

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{video.title}</CardTitle>
                    <CardDescription>{course.title}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    {courseProgress}% concluído
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{video.description}</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso do curso</span>
                    <span className="font-medium">{courseProgress}%</span>
                  </div>
                  <Progress value={courseProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <CommentsSection videoId={videoId} comments={comments} />
          </div>

          <div className="lg:col-span-1">
            <CourseSidebar
              videos={videos}
              currentVideoId={videoId}
              progress={progress}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
