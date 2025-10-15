"use client"

import type React from "react"
import { Check } from "lucide-react"
import { useState } from "react"

export interface FoodOption {
  id: string
  nome: string
  emoji: string
  foodId: number | number[]
  selected?: boolean
  descricao?: string
  originalId?: string
  category?: string // ✅ ADICIONADO: Campo category para compatibilidade
}

export interface CategorySection {
  id: string
  title: string
  description: string
  options: FoodOption[]
  multiSelect?: boolean
  selectedItems?: FoodOption[]
  allowSkip?: boolean
  skipText?: string
}

export interface InlineFoodOptionsProps {
  sections: CategorySection[]
  onSelectItem?: (sectionId: string, item: FoodOption) => void
  onSkipSection?: (sectionId: string) => void
  className?: string
  showHeaders?: boolean
  gridCols?: number
  compact?: boolean
  variant?: "medidas-page"
}

export function InlineFoodOptions({
  sections,
  onSelectItem,
  onSkipSection,
  className,
  showHeaders = true,
  gridCols = 1,
  compact = false,
  variant,
}: InlineFoodOptionsProps) {
  const [processing, setProcessing] = useState<Record<string, boolean>>({})

  // Verificar se um item está selecionado
  const isItemSelected = (section: CategorySection, item: FoodOption): boolean => {
    if (!section.selectedItems) return false

    if (section.multiSelect) {
      return section.selectedItems.some((selected) => selected.id === item.id)
    } else {
      return section.selectedItems.length > 0 && section.selectedItems[0].id === item.id
    }
  }

  // Handler para clique
  const handleItemClick = (
    section: CategorySection,
    item: FoodOption,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (processing[section.id]) return

    setProcessing((prev) => ({ ...prev, [section.id]: true }))

    event.preventDefault()
    event.stopPropagation()

    onSelectItem?.(section.id, item)

    // Permitir novo clique após um pequeno delay
    setTimeout(() => {
      setProcessing((prev) => ({ ...prev, [section.id]: false }))
    }, 200)
  }

  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        return "grid-cols-2"
      case 3:
        return "grid-cols-3" // 3 colunas sempre
      case 4:
        return "grid-cols-4"
      default:
        return "grid-cols-1"
    }
  }

  return (
    <div className={`${variant === "medidas-page" ? "space-y-6" : "space-y-4"} ${className || ""}`}>
      {sections.map((section) => (
        <div key={section.id} className="w-full">
          {/* Título da seção quando showHeaders é true */}
          {showHeaders && section.title && (
            <div className={`mb-4 ${variant === "medidas-page" ? "pb-3 border-b border-gray-200" : "mb-3"}`}>
              <h3
                className={`text-sm font-medium ${
                  variant === "medidas-page" ? "text-gray-600 text-left" : "text-gray-700"
                }`}
              >
                {section.title}
              </h3>
            </div>
          )}

          {/* Opções da seção */}
          <div className={`grid gap-3 ${getGridClass()}`}>
            {/* Lista de opções */}
            {section.options.map((option) => {
              const isSelected = isItemSelected(section, option)

              return (
                <div
                  key={option.id}
                  onClick={(e) => handleItemClick(section, option, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleItemClick(section, option, e)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? "Selecionado" : "Selecionar"} ${
                    option.nome
                  }${option.descricao ? ": " + option.descricao : ""}`}
                  className={`relative flex ${variant === "medidas-page" ? "flex-col" : "flex-col sm:flex-row"} items-center justify-center ${variant === "medidas-page" ? "p-1.5" : "p-3"} border-2 ${variant === "medidas-page" ? "rounded-2xl" : "rounded-lg"} cursor-pointer ${variant === "medidas-page" ? "transition-all" : "transition-colors"} duration-200 ${variant === "medidas-page" ? "min-h-[80px]" : "min-h-[48px]"} touch-manipulation focus:outline-none select-none ${
                    isSelected
                      ? "bg-gray-800 border-gray-400"
                      : `bg-white ${variant === "medidas-page" ? "border-gray-200 hover:border-gray-300" : "border-slate-200 hover:bg-gray-50"}`
                  }`}
                >
                  {/* Ícone/Emoji */}
                  <div
                    className={`flex items-center justify-center ${variant === "medidas-page" ? "mb-1" : "mb-1 sm:mb-0 sm:mr-3"} flex-shrink-0`}
                  >
                    <span className="text-base">{option.emoji}</span>
                  </div>

                  {/* Texto */}
                  <div
                    className={`${variant === "medidas-page" ? "text-center" : "text-center sm:text-left"} flex flex-col justify-center ${variant === "medidas-page" ? "flex-1" : "min-w-0"}`}
                  >
                    <h3
                      className={`${variant === "medidas-page" ? "text-xs leading-tight font-medium whitespace-pre-line" : "font-medium text-xs leading-tight"} ${isSelected ? "text-white" : "text-slate-500"}`}
                    >
                      {option.nome}
                    </h3>
                    {option.descricao && (
                      <p className={`text-xs leading-tight mt-0.5 ${isSelected ? "text-green-100" : "text-slate-500"}`}>
                        {option.descricao}
                      </p>
                    )}
                  </div>

                  {/* Check mark */}
                  {isSelected && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                      <Check className="text-white w-4 h-4" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Botão de skip */}
          {section.allowSkip && onSkipSection && (
            <div className="mt-3">
              <button
                onClick={() => onSkipSection(section.id)}
                className={`w-full py-2 px-4 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200 border border-gray-200 ${
                  variant === "medidas-page" ? "rounded-xl" : "rounded-lg"
                }`}
              >
                {section.skipText || "Pular esta seção"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
