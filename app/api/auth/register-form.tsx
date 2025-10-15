"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import { createUserProfile } from "@/app/api/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AlertCircle, Mail, Phone, Lock, UserPlus, ArrowRight, Shield } from "lucide-react"
import { phoneMask } from "@/lib/utils"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(phoneMask(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (email !== confirmEmail) {
      setError("Os emails não coincidem.")
      return
    }

    if (!acceptTerms) {
      setError("Você precisa aceitar os termos e condições para continuar.")
      return
    }

    if (password.length < 6) {
      setError("Sua senha precisa ter pelo menos 6 caracteres.")
      return
    }

    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await createUserProfile(userCredential.user.uid, email, phone)
      router.push("/home")
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Este email já está em uso.")
      } else {
        setError("Erro ao criar conta. Por favor, tente novamente.")
      }
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-2xl shadow-black/5 relative z-10 transform transition-all duration-300 hover:shadow-3xl hover:shadow-black/10">
        <CardHeader className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] animate-pulse" />
          <div className="flex items-center space-x-3 relative z-10">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <UserPlus className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text">Criar uma conta</h1>
          </div>
          <p className="text-gray-300 text-sm mt-2 relative z-10">Junte-se a nós e comece sua jornada</p>
        </CardHeader>

        <CardContent className="p-8">
          {error && (
            <div className="p-4 mb-6 text-sm bg-gradient-to-r from-red-50 to-red-50/50 text-red-700 border border-red-200/50 rounded-xl flex items-start shadow-sm">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-red-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full h-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-800 text-sm font-semibold mb-3 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-600" />
                Confirmar email
              </label>
              <Input
                id="confirmEmail"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full h-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                placeholder="confirme seu email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-800 text-sm font-semibold mb-3 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-600" />
                Telefone
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center z-10">
                  <span className="text-lg mr-2">🇧🇷</span>
                  <span className="text-sm text-gray-500 font-medium">+55</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full h-12 pl-20 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                  placeholder="(11) 99999-9999"
                />
              </div>
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
                className="w-full h-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                placeholder="mínimo 6 caracteres"
                required
              />
            </div>

            <div className="flex items-start mt-6 p-5 bg-gradient-to-r from-gray-50/80 to-gray-50/50 rounded-xl border border-gray-200/50 backdrop-blur-sm">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 border-2 border-gray-300 rounded-lg bg-white focus:ring-black text-black transition-all duration-200"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-4 text-sm text-gray-700 leading-relaxed">
                <Shield className="h-4 w-4 inline mr-1 text-gray-500" />
                Eu aceito os{" "}
                <a
                  href="/termos"
                  className="text-black hover:text-gray-700 underline decoration-dotted underline-offset-2 font-semibold transition-colors duration-200"
                >
                  Termos e Condições
                </a>{" "}
                e a{" "}
                <a
                  href="/termos"
                  className="text-black hover:text-gray-700 underline decoration-dotted underline-offset-2 font-semibold transition-colors duration-200"
                >
                  Política de Privacidade
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 mt-8"
              disabled={loading}
            >
              <span>{loading ? "Criando conta..." : "Criar conta"}</span>
              {!loading && <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="p-8 pt-0 text-center">
          <div className="w-full p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <Link
              href="/"
              className="text-gray-600 hover:text-black underline decoration-dotted underline-offset-4 text-sm font-medium transition-colors duration-200"
            >
              já tenho uma conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
