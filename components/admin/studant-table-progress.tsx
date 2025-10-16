"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface StudentProgress {
  id: string
  name: string
  email: string
  avatar?: string
  coursesEnrolled: number
  averageProgress: number
  lastActive: string
  status: "active" | "inactive"
}

interface StudentProgressTableProps {
  students: StudentProgress[]
}

export function StudentProgressTable({ students }: StudentProgressTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Cursos</TableHead>
            <TableHead>Progresso Médio</TableHead>
            <TableHead>Última Atividade</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{student.email}</TableCell>
              <TableCell className="text-right">{student.coursesEnrolled}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={student.averageProgress} className="h-2 w-24" />
                  <span className="text-sm font-medium">{student.averageProgress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{student.lastActive}</TableCell>
              <TableCell>
                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                  {student.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
