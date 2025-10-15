"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Mail,
  Phone,
  Ruler,
  Weight,
  Activity,
  Pencil,
  MessageCircle,
  Target,
  Plus,
  Flame,
  User,
  Trophy,
} from "lucide-react"
import { classifyIMC } from "@/lib/health-calculations"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useUserAvatar } from "@/hooks/useUserAvatar"
import { useProgress } from "@/hooks/progress"

interface PerfilInfoProps {
  userProfile: any
  email: string
  userId: string
}

export default function PerfilInfo({ userProfile, email, userId }: PerfilInfoProps) {
  const { Numero, Peso, IMC, Altura, lastLogin, DiaPagamento } = userProfile

  // Tratar PromptB de forma segura
  const objetivoJson = React.useMemo(() => {
    if (!userProfile?.PromptB) return null

    try {
      // Se já é um objeto, retornar diretamente
      if (typeof userProfile.PromptB === "object" && userProfile.PromptB !== null) {
        return userProfile.PromptB
      }

      // Se é string, verificar se parece ser JSON válido antes de fazer parse
      if (typeof userProfile.PromptB === "string") {
        const trimmed = userProfile.PromptB.trim()

        // Verificar se a string parece ser JSON válido
        if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
          try {
            return JSON.parse(trimmed)
          } catch (parseError) {
            console.error("Erro ao fazer parse do JSON:", parseError)
            return null
          }
        } else {
          // Não parece ser JSON válido
          console.warn("PromptB não parece ser JSON válido:", userProfile.PromptB)
          return null
        }
      }

      return null
    } catch (error) {
      console.error("Erro ao processar PromptB:", error)
      return null
    }
  }, [userProfile?.PromptB])

  const objetivo =
    objetivoJson && typeof objetivoJson === "object" && objetivoJson.dadosPessoais
      ? objetivoJson.dadosPessoais.tipoObjetivo || null
      : null
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"perfil" | "conquistas">("perfil")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Avatar
  const { avatarUrl, isUploading, uploadAvatar } = useUserAvatar(userId || null)

  const { dailyStreak } = useProgress([], userProfile)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Formatar data do último login
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (error) {
      return "Data desconhecida"
    }
  }

  // Traduzir objetivo
  const translateObjetivo = (objetivo: string) => {
    if (!objetivo || typeof objetivo !== "string") {
      return "Não definido"
    }

    const objetivos: Record<string, string> = {
      emagrecimento: "Emagrecimento",
      "definicao-muscular": "Definição Muscular",
      "ganho-de-massa": "Ganho de Massa",
      "definicao-ganho-massa": "Definição + Massa",
      "emagrecer-ganho-massa": "Emagrecer + Massa",
      perder_peso: "Perder peso",
      manter_peso: "Manter peso",
      ganhar_peso: "Ganhar peso",
      ganhar_massa: "Ganhar massa muscular",
    }
    return objetivos[objetivo] || objetivo
  }

  // Obter classificação do IMC
  const imcClass = IMC && !isNaN(IMC) ? classifyIMC(IMC) : null

  if (!mounted) return null

  // Obter valores do streak dos dados
  const streakAtual = Number.parseInt(dailyStreak.streakAtual) || 0
  const streakMaximo = Number.parseInt(dailyStreak.streakMaximo) || 0

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-md mx-auto space-y-4">
        {/* Tabs */}
        <div className="bg-white rounded-xl p-1 shadow-2xl border border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("perfil")}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === "perfil"
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </div>
            </button>
          </div>
        </div>

        {activeTab === "perfil" && (
          <>
            {/* Profile Section */}
            <div className="bg-white rounded-xl p-4 shadow-2xl border border-gray-200">
              {/* Profile Image */}
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shadow-inner">
                    {isUploading ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    ) : avatarUrl ? (
                      <img
                        src={avatarUrl || "/placeholder.svg"}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : !DiaPagamento ? (
                      <User className="w-8 h-8 text-gray-400" />
                    ) : (
                      <Plus className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  {DiaPagamento && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 hover:bg-gray-800 transition-colors"
                      title={isUploading ? "Carregando..." : "Editar foto"}
                    >
                      {isUploading ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Pencil className="w-3 h-3 text-white" />
                      )}
                    </button>
                  )}
                  {DiaPagamento && (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={async (e) => {
                        if (!e || !e.target || isUploading) return

                        const file = e.target.files?.[0]
                        if (!file) return

                        if (file.size > 4 * 1024 * 1024) {
                          toast.error("Imagem muito grande. Máximo 4MB.")
                          return
                        }

                        try {
                          const url = await uploadAvatar(file)
                          if (url) toast.success("Foto atualizada!")
                        } catch (err) {
                          console.error("Erro ao fazer upload da foto:", err)
                          toast.error("Falha ao enviar a foto.")
                        } finally {
                          if (e.currentTarget) {
                            e.currentTarget.value = ""
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="text-center mb-3 flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-700 text-sm">{email}</span>
              </div>

              {/* Last Login */}
              {lastLogin && (
                <div className="text-center">
                  <p className="text-gray-500 text-xs">Último acesso: {formatDate(lastLogin)}</p>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xl">
              <div className="p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Weight Card */}
                  {Peso && (
                    <div className="group hover:bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md">
                      <div className="flex items-center justify-start mb-2">
                        <Weight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                        <span className="text-xl sm:text-2xl font-light text-gray-900 ml-2">{Peso}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Peso (kg)</p>
                    </div>
                  )}

                  {/* Height Card */}
                  {Altura && (
                    <div className="group hover:bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md">
                      <div className="flex items-center justify-start mb-2">
                        <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                        <span className="text-xl sm:text-2xl font-light text-gray-900 ml-2">{Altura}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Altura (cm)</p>
                    </div>
                  )}
                  {/* IMC Card */}
                  {IMC && (
                    <div className="group hover:bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md">
                      <div className="flex items-center justify-start mb-2">
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                        <span className="text-xl sm:text-2xl font-light text-gray-900 ml-2">{IMC}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">IMC</p>
                      {imcClass && (
                        <div className="mt-1">
                          <div
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              "border transition-colors duration-200 shadow-sm",
                              {
                                "bg-yellow-50 text-yellow-700 border-yellow-200": imcClass === "Abaixo do peso",
                                "bg-green-50 text-green-700 border-green-200": imcClass === "Peso normal",
                                "bg-orange-50 text-orange-700 border-orange-200": imcClass === "Sobrepeso",
                                "bg-red-50 text-red-700 border-red-200": imcClass.includes("Obesidade"),
                              },
                            )}
                          >
                            {imcClass}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Objective Card */}
                  {objetivo && (
                    <div className="group hover:bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md">
                      <div className="flex items-center justify-start mb-2">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                        <span className="text-xs sm:text-sm font-medium text-gray-900 text-start leading-tight ml-2">
                          {translateObjetivo(objetivo)}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Objetivo</p>
                    </div>
                  )}

                  {/* Phone Card */}
                  {Numero && (
                    <div className="group hover:bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-200 col-span-2 border-t border-gray-200 border border-gray-100 hover:border-gray-200 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-700 transition-colors flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Telefone</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{Numero}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

  

            {/* Contact Section */}
            <div className="bg-white rounded-xl p-4 shadow-2xl border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3 shadow-inner">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm font-semibold">Fale Conosco</h3>
                  <p className="text-gray-600 text-xs">Estamos aqui para ajudar</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Precisa de ajuda ou tem alguma dúvida? Entre em contato com nossa equipe de suporte pelo WhatsApp.
              </p>

              <a
                href="https://wa.me/5524993288136"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Falar no WhatsApp
              </a>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
