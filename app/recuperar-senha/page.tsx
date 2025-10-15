"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import PasswordResetForm from "@/app/api/auth/password-reset-form"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function PasswordResetPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário já estiver autenticado, redireciona para a página home
        router.push("/home")
      } else {
        // Se não estiver autenticado, mostra o formulário de recuperação de senha
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
        <LoadingSpinner size="medium" text="Verificando autenticação..." />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="w-full max-w-md">
        <PasswordResetForm />
      </div>
    </main>
  )
}

