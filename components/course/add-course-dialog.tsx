"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllUsers } from "@/app/api/database"
import { createCourse } from "@/app/api/course-database"

export function AddCourseDialog({ onCourseCreated }: { onCourseCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState<"Iniciante" | "Intermediário" | "Avançado" | "">("")
  const [instructorId, setInstructorId] = useState("")

  const [instructors, setInstructors] = useState<any[]>([])

  // Buscar instrutores já cadastrados
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const users = await getAllUsers()
        const instructorList = users.filter((u: any) => u.role === "instructor")
        setInstructors(instructorList)
      } catch (error) {
        console.error("Erro ao carregar instrutores:", error)
      }
    }
    fetchInstructors()
  }, [])

  const handleAddCourse = async () => {
    if (!title || !description || !price || !duration || !category || !level || !instructorId) {
      alert("Preencha todos os campos obrigatórios.")
      return
    }

    const instructor = instructors.find((i) => i.id === instructorId)
    if (!instructor) {
      alert("Instrutor inválido.")
      return
    }

    setLoading(true)
    try {
      await createCourse({
        title,
        description,
        price: Number(price),
        duration,
        category,
        level,
        instructorId: instructor.id,
        instructorName: instructor.name,
        instructorEmail: instructor.email,
        thumbnail: "",
        students: 0,
        rating: 0,
        published: true,
      })

      alert("Curso criado com sucesso!")
      setOpen(false)
      onCourseCreated()

      // Resetar formulário
      setTitle("")
      setDescription("")
      setPrice("")
      setDuration("")
      setCategory("")
      setLevel("")
      setInstructorId("")
    } catch (error) {
      console.error("Erro ao criar curso:", error)
      alert("Erro ao criar curso. Verifique o console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-gray-800">Adicionar Curso</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Curso</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Programação para Iniciantes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Digite uma breve descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              placeholder="Ex: Desenvolvimento Web"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="duration">Duração</Label>
            <Input
              id="duration"
              placeholder="Ex: 10h"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label>Nível</Label>
            <Select value={level} onValueChange={(val) => setLevel(val as any)} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Iniciante">Iniciante</SelectItem>
                <SelectItem value="Intermediário">Intermediário</SelectItem>
                <SelectItem value="Avançado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Instrutor</Label>
            <Select value={instructorId} onValueChange={setInstructorId} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um instrutor" />
              </SelectTrigger>
              <SelectContent>
                {instructors.map((instructor) => (
                  <SelectItem key={instructor.id} value={instructor.id}>
                    {instructor.name} — {instructor.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              placeholder="Ex: 199"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleAddCourse} disabled={loading} className="bg-black hover:bg-gray-800">
            {loading ? "Adicionando..." : "Adicionar Curso"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
