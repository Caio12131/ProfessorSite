"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import RegisterForm from "@/app/api/auth/register-form"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function RegisterPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário já estiver autenticado, redireciona para a página home
        router.push("/home")
      } else {
        // Se não estiver autenticado, mostra o formulário de registro
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <LoadingSpinner size="medium" text="Verificando autenticação..." />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  )
}
