"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/api/firebase"
import { getUserProfile } from "@/app/api/database"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PerfilInfo from "./perfil-info"
import PerfilEmpty from "./perfil-empty"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function Perfil() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        try {
          // Buscar dados do perfil do usuário
          const profile = await getUserProfile(currentUser.uid)
          setUserProfile(profile)
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error)
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

  // Verificar se o usuário tem dados de medidas
  const hasMeasurements = userProfile?.Peso ? true : false

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <LoadingSpinner size="large" text="Carregando seu perfil..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          {hasMeasurements === true ? (
            <PerfilInfo userProfile={userProfile} email={user?.email} userId={user?.uid} />
          ) : (
            <PerfilEmpty />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
