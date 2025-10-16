"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ThumbsUp, Send } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import type { Comment } from "@/lib/mock-data"

interface CommentsSectionProps {
  videoId: string
  comments: Comment[]
}

export function CommentsSection({ videoId, comments: initialComments }: CommentsSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    const comment: Comment = {
      id: `c${Date.now()}`,
      videoId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || "/placeholder-user.jpg",
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLike = (commentId: string) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `há ${diffMins} minutos`
    if (diffHours < 24) return `há ${diffHours} horas`
    return `há ${diffDays} dias`
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{comments.length} Comentários</h3>

      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Adicione um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.userName}</span>
                  <span className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm leading-relaxed">{comment.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(comment.id)}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {comment.likes > 0 && <span>{comment.likes}</span>}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
