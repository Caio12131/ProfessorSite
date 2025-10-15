"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import LoginForm from "@/app/api/auth/login-form"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Só mostra loading se ainda não verificamos a autenticação
    if (!authChecked) {
      setLoading(true)
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se o usuário já estiver autenticado, redireciona para a página homem
        router.push("/home")
      } else {
        // Se não estiver autenticado, mostra o formulário de login
        setLoading(false)
        setAuthChecked(true)
      }
    })

    return () => unsubscribe()
  }, [router, authChecked])

  // Só mostra loading se ainda não verificamos a autenticação
  if (loading && !authChecked) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <LoadingSpinner size="medium" text="Verificando autenticação..." />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}
