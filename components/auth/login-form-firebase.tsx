"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import { updateUserLastLogin } from "@/app/api/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AlertCircle, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirect") || "/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      await updateUserLastLogin(userCredential.user.uid)
      router.push(redirect)
    } catch (error) {
      setError("Falha no login. Verifique seu email e senha.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-2xl shadow-black/5 relative z-10 transform transition-all duration-300 hover:shadow-3xl hover:shadow-black/10">
        <CardHeader className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] animate-pulse" />
          <div className="flex items-center space-x-3 relative z-10">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text">
              Faça o seu login
            </h1>
          </div>
          <p className="text-gray-300 text-sm mt-2 relative z-10">Entre na sua conta para continuar</p>
        </CardHeader>

        <CardContent className="p-8">
          {error && (
            <div className="p-4 mb-6 text-sm bg-gradient-to-r from-red-50 to-red-50/50 text-red-700 border border-red-200/50 rounded-xl flex items-start shadow-sm">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-red-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-800 text-sm font-semibold mb-3 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-600" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-800 text-sm font-semibold mb-3 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-gray-600" />
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                placeholder="••••••••"
                required
              />
              <div className="mt-3 text-right">
                <Link
                  href="/recuperar-senha"
                  className="text-sm text-gray-500 hover:text-black underline decoration-dotted underline-offset-4 transition-colors duration-200 font-medium"
                >
                  esqueci minha senha
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 mt-8"
              disabled={loading}
            >
              <span>{loading ? "Entrando..." : "Entrar"}</span>
              {!loading && <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="p-8 pt-0 text-center">
          <div className="w-full p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Link
              href="/signup"
              className="text-gray-600 hover:text-black underline decoration-dotted underline-offset-4 text-sm font-medium transition-colors duration-200"
            >
              ainda não tenho uma conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
