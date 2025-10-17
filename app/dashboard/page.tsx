"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { CourseCard } from "@/components/dashboard/course-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { CourseTable } from "@/components/admin/course-tabel"
import { StudentProgressTable } from "@/components/admin/studant-table-progress"
import { AddCourseDialog } from "@/components/admin/add-course-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Award, TrendingUp, Users, GraduationCap, Video, DollarSign } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getAllCourses } from "../api/course-database"
import { getAllUsers } from "@/app/api/database"
import { getCourseProgress, getVideosByCourseId } from "@/lib/mock-data"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState<any[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [enrolledCourses] = useState<any[]>([])
  const [availableCourses, setAvailableCourses] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [loadingStudents, setLoadingStudents] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      fetchCourses()
      if (user.role === "instructor") {
        fetchStudents()
      }
    }
  }, [user])

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true)
      const fetchedCourses = await getAllCourses()
      setCourses(fetchedCourses)
      setAvailableCourses(fetchedCourses)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoadingCourses(false)
    }
  }

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true)
      const allUsers = await getAllUsers()
      const studentsList = allUsers.filter((u: any) => u.role === "student")
      const formattedStudents = studentsList.map((student: any) => ({
        id: student.id,
        name: student.name || "Sem nome",
        email: student.email,
        avatar: student.avatar || "/placeholder-user.jpg",
        coursesEnrolled: 0,
        averageProgress: 0,
        lastActive: "Recente",
        status: "active" as const,
      }))
      setStudents(formattedStudents)
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoadingStudents(false)
    }
  }

  const handleCourseCreated = () => {
    fetchCourses()
  }

  if (isLoading || !user) {
    return null
  }

  const totalCourses = enrolledCourses.length
  const totalProgress = enrolledCourses.reduce((acc, course) => {
    return acc + getCourseProgress(user.id, course.id)
  }, 0)
  const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0

  const totalLessons = enrolledCourses.reduce((acc, course) => {
    return acc + (course.lessons || 0)
  }, 0)

  const completedLessons = enrolledCourses.reduce((acc, course) => {
    const videos = getVideosByCourseId(course.id)
    const progress = getCourseProgress(user.id, course.id)
    return acc + Math.round((videos.length * progress) / 100)
  }, 0)

  const totalHours = enrolledCourses.reduce((acc, course) => {
    const hours = Number.parseInt(course.duration) || 0
    return acc + hours
  }, 0)

  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.status === "active").length
  const totalRevenue = courses.reduce((acc, course) => acc + (course.price || 0) * (course.students || 0), 0)
  const totalVideos = courses.reduce((acc, course) => acc + (course.lessons || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">
              {user.role === "instructor"
                ? "Gerencie cursos, alunos e acompanhe o desempenho da plataforma"
                : "Bem-vindo de volta ao seu painel de aprendizado"}
            </p>
          </div>

          {user.role === "student" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Cursos Matriculados"
                  value={totalCourses}
                  description="Cursos ativos"
                  icon={BookOpen}
                />
                <StatsCard
                  title="Progresso Médio"
                  value={`${averageProgress}%`}
                  description="Média de conclusão"
                  icon={TrendingUp}
                  trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                  title="Aulas Concluídas"
                  value={`${completedLessons}/${totalLessons}`}
                  description="Total de aulas"
                  icon={Award}
                />
                <StatsCard
                  title="Horas de Conteúdo"
                  value={`${totalHours}h`}
                  description="Tempo total disponível"
                  icon={Clock}
                />
              </div>

              <Tabs defaultValue="enrolled" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="enrolled">Meus Cursos</TabsTrigger>
                  <TabsTrigger value="available">Explorar Cursos</TabsTrigger>
                </TabsList>

                <TabsContent value="enrolled" className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Continue Aprendendo</h2>
                    {enrolledCourses.length === 0 ? (
                      <p className="text-muted-foreground">Você ainda não está matriculado em nenhum curso.</p>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {enrolledCourses.map((course) => (
                          <CourseCard
                            key={course.id}
                            course={course}
                            progress={getCourseProgress(user.id, course.id)}
                            enrolled
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="available" className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Cursos Disponíveis</h2>
                    {loadingCourses ? (
                      <p className="text-muted-foreground">Carregando cursos...</p>
                    ) : availableCourses.length === 0 ? (
                      <p className="text-muted-foreground">Nenhum curso disponível no momento.</p>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {availableCourses.map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}

          {user.role === "instructor" && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Total de Alunos"
                  value={totalStudents}
                  description={`${activeStudents} ativos`}
                  icon={Users}
                  trend={{ value: 8, isPositive: true }}
                />
                <StatsCard
                  title="Cursos Publicados"
                  value={courses.length}
                  description="Cursos disponíveis"
                  icon={GraduationCap}
                />
                <StatsCard title="Total de Vídeos" value={totalVideos} description="Aulas publicadas" icon={Video} />
                <StatsCard
                  title="Receita Total"
                  value={`R$ ${(totalRevenue / 1000).toFixed(1)}k`}
                  description="Vendas acumuladas"
                  icon={DollarSign}
                  trend={{ value: 15, isPositive: true }}
                />
              </div>

              <Tabs defaultValue="courses" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="courses">Gerenciar Cursos</TabsTrigger>
                  <TabsTrigger value="students">Progresso dos Alunos</TabsTrigger>
                  <TabsTrigger value="analytics">Análises</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold">Cursos</h2>
                      <p className="text-muted-foreground">Gerencie todos os cursos da plataforma</p>
                    </div>
                    <AddCourseDialog onCourseCreated={handleCourseCreated} />
                  </div>
                  {loadingCourses ? (
                    <p className="text-muted-foreground">Carregando cursos...</p>
                  ) : (
                    <CourseTable
                      courses={courses}
                      onEdit={(course) => console.log("[v0] Edit course:", course)}
                      onDelete={(id) => console.log("[v0] Delete course:", id)}
                      onView={(id) => router.push(`/course/${id}/video/1-1`)}
                    />
                  )}
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Progresso dos Alunos</h2>
                    <p className="text-muted-foreground mb-4">Acompanhe o desempenho de todos os alunos</p>
                  </div>
                  {loadingStudents ? (
                    <p className="text-muted-foreground">Carregando alunos...</p>
                  ) : students.length === 0 ? (
                    <p className="text-muted-foreground">Nenhum aluno cadastrado ainda.</p>
                  ) : (
                    <StudentProgressTable students={students} />
                  )}
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Análises e Relatórios</CardTitle>
                      <CardDescription>Visualize métricas detalhadas sobre o desempenho da plataforma</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Taxa de Conclusão</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">68%</div>
                            <p className="text-sm text-muted-foreground mt-1">Média de conclusão dos cursos</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Satisfação</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">4.8/5.0</div>
                            <p className="text-sm text-muted-foreground mt-1">Avaliação média dos cursos</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Tempo Médio</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">2.5h</div>
                            <p className="text-sm text-muted-foreground mt-1">Por semana por aluno</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Retenção</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">85%</div>
                            <p className="text-sm text-muted-foreground mt-1">Alunos ativos mensalmente</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
