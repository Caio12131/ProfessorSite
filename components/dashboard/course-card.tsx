import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Star, Play } from "lucide-react"
import type { Course } from "../../lib/mock-data"

interface CourseCardProps {
  course: Course
  progress?: number
  enrolled?: boolean
}

export function CourseCard({ course, progress, enrolled = false }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=400"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight line-clamp-2">{course.title}</CardTitle>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons} aulas</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{course.rating}</span>
          <span className="text-sm text-muted-foreground">({course.students} avaliações)</span>
        </div>

        {enrolled && progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {enrolled ? (
          <Link href={`/course/${course.id}/video/1-1`} className="w-full">
            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Continuar Assistindo
            </Button>
          </Link>
        ) : (
          <Button className="w-full bg-transparent" variant="outline">
            Ver Detalhes
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
