"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import LoadingSpinner from "@/components/ui/loading-spinner"
import LoginForm from "@/components/auth/login-form-firebase"

export default function LoginPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(redirect)
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router, redirect])

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
        <LoginForm />
      </div>
    </main>
  )
}
