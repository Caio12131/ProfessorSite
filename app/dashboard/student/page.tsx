"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Star, TrendingUp, Award, User, ShoppingCart, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getAllCourses, getUserEnrolledCourses, enrollUserInCourse } from "@/app/api/course-database"

export default function StudentDashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (!isLoading && user && user.role === "instructor") {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      fetchCourses()
    }
  }, [user])

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true)
      const courses = await getAllCourses()
      setAllCourses(courses)

      if (user) {
        const enrolled = await getUserEnrolledCourses(user.id)
        const enrolledCourseIds = Object.keys(enrolled)
        const enrolledCoursesData = courses.filter((course: any) => enrolledCourseIds.includes(course.id))
        setEnrolledCourses(enrolledCoursesData)
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoadingCourses(false)
    }
  }

  const handleEnrollCourse = async (courseId: string) => {
    if (!user) return

    try {
      setEnrollingCourseId(courseId)
      await enrollUserInCourse(user.id, courseId)
      await fetchCourses()
    } catch (error) {
      console.error("Error enrolling in course:", error)
    } finally {
      setEnrollingCourseId(null)
    }
  }

  const handleViewCourse = (courseId: string) => {
    router.push(`/course/${courseId}/video/1-1`)
  }

  if (isLoading || !user) {
    return null
  }

  const totalEnrolled = enrolledCourses.length
  const totalHours = enrolledCourses.reduce((acc, course) => acc + (Number.parseInt(course.duration) || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">Bem-vindo ao seu painel de aprendizado</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cursos Matriculados</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrolled}</div>
                <p className="text-xs text-muted-foreground">Cursos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Horas de Conteúdo</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalHours}h</div>
                <p className="text-xs text-muted-foreground">Tempo disponível</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground">Média de conclusão</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificados</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Cursos concluídos</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="my-courses" className="space-y-6">
            <TabsList>
              <TabsTrigger value="my-courses">Meus Cursos</TabsTrigger>
              <TabsTrigger value="available">Cursos Disponíveis</TabsTrigger>
              <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
            </TabsList>

            <TabsContent value="my-courses" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Continue Aprendendo</h2>
                {loadingCourses ? (
                  <p className="text-muted-foreground">Carregando cursos...</p>
                ) : enrolledCourses.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">
                        Você ainda não está matriculado em nenhum curso.
                      </p>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Explore os cursos disponíveis e comece sua jornada de aprendizado!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                          {course.thumbnail && (
                            <img
                              src={course.thumbnail || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <Badge className="absolute top-2 right-2">{course.level}</Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progresso</span>
                              <span className="font-medium">0%</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => handleViewCourse(course.id)}>
                            Continuar Curso
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Explore Novos Cursos</h2>
                {loadingCourses ? (
                  <p className="text-muted-foreground">Carregando cursos...</p>
                ) : allCourses.length === 0 ? (
                  <p className="text-muted-foreground">Nenhum curso disponível no momento.</p>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allCourses.map((course) => {
                      const isEnrolled = enrolledCourses.some((ec) => ec.id === course.id)

                      return (
                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                            {course.thumbnail && (
                              <img
                                src={course.thumbnail || "/placeholder.svg"}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <Badge className="absolute top-2 right-2">{course.level}</Badge>
                            {isEnrolled && (
                              <Badge className="absolute top-2 left-2 bg-green-500">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Matriculado
                              </Badge>
                            )}
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-2xl font-bold">
                                {course.price === 0 ? "Grátis" : `R$ ${course.price}`}
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}h</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{course.students} alunos</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            {isEnrolled ? (
                              <Button className="w-full" onClick={() => handleViewCourse(course.id)}>
                                Acessar Curso
                              </Button>
                            ) : (
                              <Button
                                className="w-full"
                                onClick={() => handleEnrollCourse(course.id)}
                                disabled={enrollingCourseId === course.id}
                              >
                                {enrollingCourseId === course.id ? (
                                  "Matriculando..."
                                ) : (
                                  <>
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Adquirir Curso
                                  </>
                                )}
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Meu Perfil</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>Seus dados cadastrados</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nome</label>
                        <p className="text-lg">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tipo de Conta</label>
                        <Badge variant="secondary" className="mt-1">
                          Aluno
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Estatísticas de Aprendizado</CardTitle>
                      <CardDescription>Seu progresso geral</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cursos Matriculados</span>
                        <span className="text-2xl font-bold">{totalEnrolled}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cursos Concluídos</span>
                        <span className="text-2xl font-bold">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Certificados</span>
                        <span className="text-2xl font-bold">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Horas de Estudo</span>
                        <span className="text-2xl font-bold">{totalHours}h</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Meus Cursos Adquiridos</CardTitle>
                      <CardDescription>Todos os cursos que você possui acesso</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {enrolledCourses.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Você ainda não adquiriu nenhum curso
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {enrolledCourses.map((course) => (
                            <div
                              key={course.id}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                              onClick={() => handleViewCourse(course.id)}
                            >
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground">{course.instructorName}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Acessar
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
