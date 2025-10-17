"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { createInstructorAccount } from "@/app/api/database"
import { useAuth } from "@/context/auth-context"

export function AddInstructorDialog({ onInstructorAdded }: { onInstructorAdded: () => void }) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.currentPassword) {
      setError("Todos os campos são obrigatórios")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    if (!user?.email) {
      setError("Erro: usuário não autenticado")
      return
    }

    setLoading(true)

    try {
      await createInstructorAccount(
        formData.email,
        formData.password,
        formData.name,
        formData.phone,
        user.email,
        formData.currentPassword,
      )

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        currentPassword: "",
      })

      setOpen(false)
      onInstructorAdded()

      alert("Instrutor cadastrado com sucesso!")
    } catch (error: any) {
      console.error("Error creating instructor:", error)

      if (error.code === "auth/email-already-in-use") {
        setError("Este email já está em uso")
      } else if (error.code === "auth/invalid-email") {
        setError("Email inválido")
      } else if (error.code === "auth/weak-password") {
        setError("Senha muito fraca")
      } else if (error.code === "auth/wrong-password") {
        setError("Senha atual incorreta")
      } else {
        setError("Erro ao criar instrutor. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-gray-800">
          <UserPlus className="mr-2 h-4 w-4" />
          Cadastrar Novo Instrutor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Instrutor</DialogTitle>
            <DialogDescription>
              Crie uma nova conta de instrutor com email e senha. O instrutor poderá fazer login com essas credenciais.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="instrutor@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="border-t pt-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword" className="text-red-600">
                  Sua Senha Atual (para confirmar)
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Digite sua senha atual"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500">
                  Por segurança, precisamos confirmar sua identidade antes de criar um novo instrutor.
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-black hover:bg-gray-800">
              {loading ? "Cadastrando..." : "Cadastrar Instrutor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
