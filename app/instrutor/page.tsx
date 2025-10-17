"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getAllUsers, updateUserRole } from "@/app/api/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, UserCog, Search, Shield, GraduationCap } from "lucide-react"
import { AddInstructorDialog } from "@/components/instructor/add-instructor-dialog"
interface UserData {
  id: string
  email: string
  Numero?: string
  role?: "instructor" | "student"
  lastLogin?: string
  Tickets?: number
}

export default function InstructorDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [updatingRole, setUpdatingRole] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "instructor")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("[v0] Fetching all users as instructor:", user?.email)
        console.log("[v0] Current user role:", user?.role)

        const allUsers = await getAllUsers()

        console.log("[v0] Successfully fetched users:", allUsers.length)
        setUsers(allUsers)
        setFilteredUsers(allUsers)
      } catch (error) {
        console.error("[v0] Error fetching users:", error)
        alert("Erro ao carregar usuários. Verifique as regras do Firebase e se você está logado como instrutor.")
      } finally {
        setLoadingUsers(false)
      }
    }

    if (user?.role === "instructor") {
      fetchUsers()
    }
  }, [user])

  useEffect(() => {
    const filtered = users.filter(
      (u) => u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.includes(searchTerm),
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const handleRoleChange = async (userId: string, newRole: "instructor" | "student") => {
    setUpdatingRole(userId)
    try {
      await updateUserRole(userId, newRole)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
      setFilteredUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    } catch (error) {
      console.error("Error updating role:", error)
      alert("Erro ao atualizar role do usuário")
    } finally {
      setUpdatingRole(null)
    }
  }

  const handleInstructorAdded = async () => {
    setLoadingUsers(true)
    try {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
      setFilteredUsers(allUsers)
    } catch (error) {
      console.error("Error refreshing users:", error)
    } finally {
      setLoadingUsers(false)
    }
  }

  if (isLoading || loadingUsers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "instructor") {
    return null
  }

  const instructorCount = users.filter((u) => u.role === "instructor").length
  const studentCount = users.filter((u) => u.role === "student" || !u.role).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-black" />
                <h1 className="text-3xl font-bold text-gray-900">Painel do Instrutor</h1>
              </div>
              <p className="text-gray-600">Gerencie usuários e promova instrutores</p>
            </div>
            <AddInstructorDialog onInstructorAdded={handleInstructorAdded} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Instrutores</CardTitle>
              <GraduationCap className="h-4 w-4 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{instructorCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunos</CardTitle>
              <UserCog className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Usuários</CardTitle>
            <CardDescription>Visualize todos os usuários e gerencie suas permissões</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por email ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhum usuário encontrado</p>
              ) : (
                filteredUsers.map((userData) => (
                  <div
                    key={userData.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-white font-semibold">
                          {userData.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{userData.email}</p>
                          <p className="text-sm text-gray-500">ID: {userData.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant={userData.role === "instructor" ? "default" : "secondary"}>
                        {userData.role === "instructor" ? "Instrutor" : "Aluno"}
                      </Badge>

                      {userData.role === "instructor" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoleChange(userData.id, "student")}
                          disabled={updatingRole === userData.id}
                        >
                          {updatingRole === userData.id ? "Atualizando..." : "Remover Instrutor"}
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleRoleChange(userData.id, "instructor")}
                          disabled={updatingRole === userData.id}
                          className="bg-black hover:bg-gray-800"
                        >
                          {updatingRole === userData.id ? "Atualizando..." : "Promover a Instrutor"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
