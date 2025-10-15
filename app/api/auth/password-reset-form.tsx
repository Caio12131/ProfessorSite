"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Mail, ArrowLeft, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"

export default function PasswordResetForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (error) {
      setError("Não foi possível enviar o email de recuperação. Verifique se o email está correto.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto border-0 rounded-3xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pt-12 pb-8 flex flex-col items-center space-y-3 bg-white/50">
          <h1 className="text-3xl font-semibold text-slate-800 text-balance">Recuperar Senha</h1>
          <p className="text-slate-500 text-center text-pretty leading-relaxed">
            Enviaremos um link para redefinir sua senha
          </p>
        </CardHeader>

        <CardContent className="px-8 pt-2 pb-8 bg-white/50">
          {error && (
            <div className="p-4 mb-6 text-sm bg-red-50/80 border border-red-100 text-red-600 rounded-2xl flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 text-sm bg-emerald-50/80 border border-emerald-100 text-emerald-700 rounded-2xl flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">Email de recuperação enviado. Verifique sua caixa de entrada.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 text-base border-slate-200 focus:border-slate-400 focus:ring-slate-400/20 rounded-2xl bg-white/70 placeholder:text-slate-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-slate-800 hover:bg-slate-700 text-white font-medium text-base mt-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-white" />
                  <span>Enviando...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <RefreshCw className="h-5 w-5" />
                  <span>Recuperar Senha</span>
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="px-8 py-8 bg-white/30 border-t border-slate-100/50 flex justify-center">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
