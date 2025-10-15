"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoadingDietaPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dietas")
    }, 15000) // 15 segundos

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-6"></div>
      <h1 className="text-xl font-semibold">Estamos montando sua dieta...</h1>
      <p className="text-gray-400 mt-2 text-sm">Isso pode levar alguns segundos</p>
    </div>
  )
}
