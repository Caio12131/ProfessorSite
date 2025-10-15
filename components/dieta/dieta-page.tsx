"use client"
import DietSimpleView from "../dietSimple"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import { getUserProfile } from "@/app/api/database"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import DietaEmpty from "./dieta-empty"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function DietaPage() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        try {
          // Buscar dados do perfil do usuário
          const profile = await getUserProfile(currentUser.uid)
          setUserProfile(profile)
        } catch (error) {
          // Erro ao buscar perfil do usuário
        } finally {
          setLoading(false)
        }
      } else {
        // Usuário não autenticado, redirecionar para login
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  // Verificar se o usuário tem dieta
  const hasDieta = userProfile && userProfile.Dieta && userProfile.Dieta.trim() !== ""

  // Verificar se o usuário já tentou gerar uma dieta (ticketusados > 0)
  const hasTicketUsed = userProfile && userProfile.TicketUsados > 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <LoadingSpinner size="large" text="Carregando sua dieta..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="w-full px-2 sm:px-6 py-12 flex-grow">
        <div className="w-full max-w-4xl mx-auto">
          {hasDieta ? (
            <DietSimpleView dietaText={userProfile.Dieta} />
          ) : (
            <DietaEmpty hasTicketUsed={hasTicketUsed && !hasDieta} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
