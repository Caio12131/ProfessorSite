"use client"
import { useLocalStorageState } from "@/hooks/useLocalStorageState"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MedidasFormProps {
  fieldErrors?: { [key: string]: string }
  variant?: "medidas-page"
  hideFields?: string[]
}

interface MedidasData {
  peso: string
  altura: string
  idade: string
  sexo: string
  objetivo: string
  calorias: string
  horarios: string
}

export default function MedidasForm({ fieldErrors, variant, hideFields = [] }: MedidasFormProps) {
  const isMobile = useIsMobile()
  const objetivoSelectRef = useRef<HTMLSelectElement>(null)
  const caloriasSelectRef = useRef<HTMLSelectElement>(null)
  const horariosSelectRef = useRef<HTMLSelectElement>(null)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showErrors, setShowErrors] = useState(false)

  const [showNativeSelect, setShowNativeSelect] = useState({
    objetivo: false,
    calorias: false,
    horarios: false,
  })

  const preventZoomStyle = {
    fontSize: "16px",
    touchAction: "manipulation",
  }

  const [form, setForm] = useLocalStorageState<MedidasData>("medidasFormData", {
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    objetivo: "",
    calorias: "",
    horarios: "",
  })

  const { peso, altura, idade, sexo, objetivo, calorias, horarios } = form

  const filledCount = Object.values(form).filter((v) => v !== "").length
  const percent = Math.round((filledCount / 7) * 100)

  const placeholder = "text-gray-800"
  const selected = "text-gray-800"

  const opcoesCaloricas = [
    { value: "1200", label: "1200 kcal" },
    { value: "1500", label: "1500 kcal" },
    { value: "1800", label: "1800 kcal" },
    { value: "2000", label: "2000 kcal" },
    { value: "2200", label: "2200 kcal" },
    { value: "2500", label: "2500 kcal" },
    { value: "2800", label: "2800 kcal" },
    { value: "3000", label: "3000 kcal" },
  ]

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!peso.trim()) newErrors.peso = "Peso é obrigatório"
    if (!altura.trim()) newErrors.altura = "Altura é obrigatória"
    if (!idade.trim()) newErrors.idade = "Idade é obrigatória"
    if (!sexo) newErrors.sexo = "Gênero é obrigatório"
    if (!objetivo) newErrors.objetivo = "Objetivo é obrigatório"
    if (!calorias) newErrors.calorias = "Calorias são obrigatórias"
    if (!horarios) newErrors.horarios = "Horários são obrigatórios"

    setErrors(newErrors)
    setShowErrors(Object.keys(newErrors).length > 0)

    // Focus no primeiro campo com erro
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.getElementById(`medidas-${firstErrorField}`)
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    const handleValidation = () => {
      validateForm()
    }

    window.addEventListener("validateMedidas", handleValidation)
    return () => window.removeEventListener("validateMedidas", handleValidation)
  }, [form])

  const isFormComplete = () => {
    return Object.values(form).every((value) => value !== "")
  }

  useEffect(() => {
    localStorage.setItem("medidasFormCompleto", isFormComplete() ? "true" : "false")
  }, [form])

  const renderProgressBar = () => (
    <div className="flex items-center justify-between w-full">
      <div className="text-sm font-medium text-gray-600">Progresso</div>
      <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${percent}%`, backgroundColor: "#010201ff" }}
        />
      </div>
      <div className="text-sm font-medium text-gray-600">{percent}%</div>
    </div>
  )

  const update = (field: keyof MedidasData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field] && value.trim()) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const getFieldClasses = (fieldName: string, baseClasses: string) => {
    const hasError = showErrors && errors[fieldName]
    return hasError ? `${baseClasses} border-red-300 ring-1 ring-red-300 bg-red-50` : baseClasses
  }

  return (
    <div id="medidas-section" className="space-y-6 bg-white rounded-xl shadow p-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-lg">📏</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Medidas Corporais</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">Preencha para calcular sua dieta personalizada</p>

        <div className="mb-6">{renderProgressBar()}</div>


        <div className="grid grid-cols-4 gap-3 mb-4">
          {!hideFields.includes("peso") && (
            <div>
              <Input
                id="medidas-peso"
                type="number"
                placeholder="Peso (kg)"
                value={peso}
                onChange={(e) => update("peso", e.target.value)}
                className={getFieldClasses("peso", "border-gray-300 rounded-lg h-12 transition-all duration-200")}
              />
            </div>
          )}

          {!hideFields.includes("altura") && (
            <div>
              <Input
                id="medidas-altura"
                type="number"
                placeholder="Altura (cm)"
                value={altura}
                onChange={(e) => update("altura", e.target.value)}
                className={getFieldClasses("altura", "border-gray-300 rounded-lg h-12 transition-all duration-200")}
              />
            </div>
          )}

          {!hideFields.includes("idade") && (
            <div>
              <Input
                id="medidas-idade"
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => update("idade", e.target.value)}
                className={getFieldClasses("idade", "border-gray-300 rounded-lg h-12 transition-all duration-200")}
              />
            </div>
          )}

          {!hideFields.includes("sexo") && (
            <div>
              <select
                id="medidas-sexo"
                value={sexo}
                onChange={(e) => update("sexo", e.target.value)}
                className={getFieldClasses(
                  "sexo",
                  "border-gray-300 w-full h-12 rounded-lg px-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none",
                )}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="" disabled className="text-gray-400">
                  Gênero
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {!hideFields.includes("objetivo") && (
            <div>
              <select
                id="medidas-objetivo"
                value={objetivo}
                onChange={(e) => update("objetivo", e.target.value)}
                className={getFieldClasses(
                  "objetivo",
                  "border-gray-300 w-full h-12 rounded-lg px-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none",
                )}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="" disabled>
                  Objetivo
                </option>
                <option value="emagrecimento">Emagrecimento</option>
                <option value="definicao-muscular">Definição Muscular</option>
                <option value="ganho-de-massa">Ganho de Massa</option>
                <option value="emagrecer-ganho-massa">Emagrecer + Massa</option>
                <option value="definicao-ganho-massa">Definição + Massa</option>
              </select>
            </div>
          )}

          {!hideFields.includes("calorias") && (
            <div>
              <select
                id="medidas-calorias"
                value={calorias}
                onChange={(e) => update("calorias", e.target.value)}
                className={getFieldClasses(
                  "calorias",
                  "border-gray-300 w-full h-12 rounded-lg px-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none",
                )}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="" disabled>
                  Calorias diárias 🔥
                </option>
                <option value="Não">Não sei dizer</option>
                <option value="1200">1200 kcal</option>
                <option value="1500">1500 kcal</option>
                <option value="1800">1800 kcal</option>
                <option value="2000">2000 kcal</option>
                <option value="2200">2200 kcal</option>
                <option value="2500">2500 kcal</option>
                <option value="2800">2800 kcal</option>
                <option value="3000">3000 kcal</option>
              </select>
            </div>
          )}

          {!hideFields.includes("horarios") && (
            <div>
              <select
                id="medidas-horarios"
                value={horarios}
                onChange={(e) => update("horarios", e.target.value)}
                className={getFieldClasses(
                  "horarios",
                  "border-gray-300 w-full h-12 rounded-lg px-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none",
                )}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="" disabled>
                  Horários para Refeição
                </option>
                <option value="05:30, 08:30, 12:00, 15:00, 19:00">05:30, 08:30, 12:00, 15:00, 19:00</option>
                <option value="06:00, 09:00, 12:00, 15:00, 19:00">06:00, 09:00, 12:00, 15:00, 19:00</option>
                <option value="06:30, 09:30, 13:00, 16:00, 20:00">06:30, 09:30, 13:00, 16:00, 20:00</option>
                <option value="07:00, 10:00, 12:30, 15:30, 19:30">07:00, 10:00, 12:30, 15:30, 19:30</option>
                <option value="07:30, 10:30, 12:00, 15:00, 19:00">07:30, 10:30, 12:00, 15:00, 19:00</option>
                <option value="08:00, 11:00, 13:30, 16:30, 20:30">08:00, 11:00, 13:30, 16:30, 20:30</option>
                <option value="09:00, 11:00, 13:00, 16:00, 21:00">09:00, 11:00, 13:00, 16:00, 21:00</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
