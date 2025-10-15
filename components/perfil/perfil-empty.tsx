"use client"

import { useRouter } from "next/navigation"
import { ClipboardList, ArrowRight } from "lucide-react"

export default function PerfilEmpty() {
  const router = useRouter()

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
        <p className="text-sm text-gray-600 mt-1">Informações pessoais e métricas de saúde</p>
      </div>

      <div className="p-8 flex flex-col items-center justify-center text-center bg-white">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <ClipboardList className="h-8 w-8 text-gray-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Dados não encontrados</h2>

        <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
          Você ainda não preencheu suas informações corporais. Complete o formulário na página inicial para visualizar
          suas métricas e solicitar sua dieta personalizada.
        </p>

        <button
          onClick={() => router.push("/home")}
          className="flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <span>Ir para página inicial</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
