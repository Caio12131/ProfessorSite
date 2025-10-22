"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, BookOpen, Clock, Star, MessageSquare, Send } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getCourseById, addComment, getVideoComments } from "@/app/api/course-database"
import { toast } from "@/components/ui/use-toast"

// Função para extrair ID do vídeo do Google Drive
function extractGoogleDriveId(url: string): string | null {
  if (!url) return null

  // Formato: https://drive.google.com/file/d/FILE_ID/view
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return match[1]
  }

  // Se já for apenas o ID
  if (url.length > 20 && !url.includes("/")) {
    return url
  }

  return null
}

export default function CourseVideoPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading } = useAuth()

  const courseId = params.courseId as string
  const videoId = params.videoId as string

  const [course, setCourse] = useState<any>(null)
  const [loadingCourse, setLoadingCourse] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [sendingComment, setSendingComment] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (courseId) {
      fetchCourse()
      fetchComments()
    }
  }, [courseId])

  const fetchCourse = async () => {
    try {
      setLoadingCourse(true)
      const courseData = await getCourseById(courseId)
      setCourse(courseData)
    } catch (error) {
      console.error("Error fetching course:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar o curso.",
        variant: "destructive",
      })
    } finally {
      setLoadingCourse(false)
    }
  }

  const fetchComments = async () => {
    try {
      const commentsData = await getVideoComments(courseId, videoId)
      setComments(commentsData)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleSendComment = async () => {
    if (!newComment.trim() || !user) return

    try {
      setSendingComment(true)
      await addComment(user.id, user.name, user.email, courseId, videoId, newComment)
      setNewComment("")
      await fetchComments()
      toast({
        title: "Comentário enviado!",
        description: "Seu comentário foi publicado com sucesso.",
      })
    } catch (error) {
      console.error("Error sending comment:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar o comentário.",
        variant: "destructive",
      })
    } finally {
      setSendingComment(false)
    }
  }

  if (isLoading || loadingCourse || !user || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Carregando curso...</p>
        </div>
      </div>
    )
  }

  const googleDriveId = extractGoogleDriveId(course.googleDriveVideoUrl || "")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Coluna principal - Vídeo */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                {googleDriveId ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={`https://drive.google.com/file/d/${googleDriveId}/preview`}
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center p-8">
                      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum vídeo disponível para este curso ainda.</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        O instrutor ainda não adicionou o link do vídeo.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                  <Badge>{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.category}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Instrutor</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.instructorName}</p>
                      <p className="text-sm text-muted-foreground">{course.instructorEmail}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção de Comentários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comentários ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Adicionar comentário */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendComment} disabled={!newComment.trim() || sendingComment} size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      {sendingComment ? "Enviando..." : "Enviar"}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Lista de comentários */}
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum comentário ainda. Seja o primeiro a comentar!
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{comment.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{comment.userName}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Informações do curso */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categoria</p>
                  <p className="text-base">{course.category}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nível</p>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duração</p>
                  <p className="text-base">{course.duration}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alunos Matriculados</p>
                  <p className="text-base">{course.students} alunos</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avaliação</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-base font-medium">{course.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {googleDriveId && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use os controles do player para pausar, avançar ou retroceder o vídeo. Seu progresso será salvo
                    automaticamente.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
