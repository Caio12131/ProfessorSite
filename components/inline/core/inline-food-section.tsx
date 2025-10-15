"use client"

import { useState, useEffect } from "react"
import { InlineFoodOptions, type CategorySection, type FoodOption } from "./inline-food-options"
import type { FoodItem } from "@/utils/food-inline-options"
import {
  saveSimpleSelection,
  saveCategorySelections,
  getLatestSelection,
  getStoredSelections,
  type InlineStorageKeys,
  isValidFoodItem,
} from "@/utils/inline-storage"

export interface InlineFoodSectionProps {
  title: string
  emoji: string
  description: string
  storageKey: InlineStorageKeys
  oldStorageKey?: string
  mealType: "cafe" | "lancheManha" | "almoco" | "lancheTarde" | "janta"
  options: any // Será tipado conforme cada refeição
  className?: string
  compact?: boolean
  noContainer?: boolean
  onSelectionChange?: (data: any) => void
  variant?: "medidas-page"
}

export default function InlineFoodSection({
  title,
  emoji,
  description,
  storageKey,
  mealType,
  options,
  className,
  compact = false,
  noContainer,
  onSelectionChange,
  variant,
}: InlineFoodSectionProps) {
  const [selections, setSelections] = useState<any>(getInitialState())
  const [showError, setShowError] = useState(false)

  // Função para obter estado inicial baseado no tipo de refeição
  function getInitialState() {
    switch (mealType) {
      case "cafe":
      case "lancheTarde":
        return { principais: [], frutas: [], bebidas: [] }
      case "lancheManha":
        return [] // Mudança: agora é um array para permitir múltiplos itens
      case "almoco":
      case "janta":
        return {
          carboidratos: [],
          proteinas: [],
          saladas: [],
        }
      default:
        return {}
    }
  }

  // Função para converter dados das options para FoodOption
  const convertToFoodOptions = (items: FoodItem[]): FoodOption[] => {
    return items.map((item) => ({
      id: item.id, // ✅ CORREÇÃO: Usar ID original do item
      nome: item.nome,
      emoji: item.emoji,
      foodId: item.foodId,
      selected: item.selected,
      descricao: item.descricao || undefined,
      category: item.category,
    }))
  }

  // Carregar seleções salvas do localStorage
  useEffect(() => {
    // Só carregar se as options estiverem disponíveis
    if (options && Object.keys(options).length > 0) {
      loadSavedSelections()
    }
  }, [options]) // Remover storageKey da dependência para evitar recarregamentos

  // Force reload when storage key changes or component mounts
  useEffect(() => {
    const handleStorageChange = () => {
      if (options && Object.keys(options).length > 0) {
        loadSavedSelections()
      }
    }

    // Listen for custom storage events
    window.addEventListener(`storage-${storageKey}`, handleStorageChange)

    return () => {
      window.removeEventListener(`storage-${storageKey}`, handleStorageChange)
    }
  }, [storageKey, options])

  // Forçar carregamento inicial quando o componente monta
  useEffect(() => {
    // Aguardar um tick para garantir que as options estejam disponíveis
    const timeoutId = setTimeout(() => {
      if (options && Object.keys(options).length > 0) {
        loadSavedSelections()
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, []) // Executar apenas uma vez na montagem

  // Listen for validation events
  useEffect(() => {
    const handleValidationRequest = () => {
      const currentCount = getSelectionCount()
      if (currentCount < 3) {
        setShowError(true)
      } else {
        setShowError(false)
      }
    }

    // Create event name based on meal type
    const eventName = `validate${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`
    window.addEventListener(eventName, handleValidationRequest)

    return () => {
      window.removeEventListener(eventName, handleValidationRequest)
    }
  }, [mealType])

  // Hide error when user selects enough items
  useEffect(() => {
    const currentCount = getSelectionCount()
    if (currentCount >= 3 && showError) {
      setShowError(false)
    }
  }, [selections, showError])

  const loadSavedSelections = () => {
    try {
      // Migrar dados antigos se existirem
      // if (oldStorageKey) {
      //   migrateOldFormat(oldStorageKey, storageKey);
      // }

      // Verificar dados no formato antigo também
      if (mealType === "cafe") {
        const oldData = localStorage.getItem("cafeDaManhaSelecoes_options")
        const backendData = localStorage.getItem("itensCafeDaManha")

        // Se há dados no backend mas não no inline, sincronizar
        if (backendData && !getLatestSelection(storageKey)) {
          try {
            const parsedBackendData = JSON.parse(backendData)
            if (Array.isArray(parsedBackendData) && parsedBackendData.length > 0) {
              // Converter dados do backend para o formato inline
              const backendItems = parsedBackendData[0].items || []
              if (backendItems.length > 0) {
                // Criar estrutura inline a partir dos dados do backend
                const inlineData = {
                  id: `sync_${Date.now()}`,
                  timestamp: Date.now(),
                  type: "inline",
                  data: backendItems.map((foodId: number) => ({
                    id: `food_${foodId}`,
                    nome: `Alimento ${foodId}`,
                    emoji: "🍽️",
                    foodId: foodId,
                    category: "principal",
                    selected: true,
                    descricao: "",
                  })),
                }

                localStorage.setItem(storageKey, JSON.stringify([inlineData]))
              }
            }
          } catch (error) {
            console.error("Erro ao sincronizar dados:", error)
          }
        }
      }

      const savedSelection = getLatestSelection(storageKey)

      if (savedSelection) {
        if (mealType === "cafe" || mealType === "lancheTarde") {
          loadCafeSelections(savedSelection)
        } else if (mealType === "lancheManha") {
          loadLancheSelections(savedSelection)
        } else if (mealType === "almoco" || mealType === "janta") {
          loadRefeicaoSelections(savedSelection)
        }
      } else {
        // Nenhuma seleção salva encontrada - resetar para estado inicial
        setSelections(getInitialState())
      }
    } catch (error) {
      console.error("Erro ao carregar seleções:", error)
      // Erro ao carregar seleções - resetar para estado inicial
      setSelections(getInitialState())
    }
  }

  const loadCafeSelections = (savedSelection: any) => {
    const loadedSelections: Record<string, FoodOption[]> = {
      principais: [],
      frutas: [],
      bebidas: [],
    }

    if (savedSelection) {
      // Obter todas as opções disponíveis para fazer o matching correto de IDs
      const availableOptions = [...(options.breakfast || []), ...(options.fruits || []), ...(options.liquids || [])]

      // Formato novo: array único de itens (com categories)
      if (Array.isArray(savedSelection.data)) {
        savedSelection.data.forEach((item: any) => {
          if (isValidFoodItem(item)) {
            // Buscar a opção correspondente nas opções disponíveis
            const matchingOption = availableOptions.find((opt: any) => {
              const idMatch = "id" in item && "id" in opt && opt.id === item.id
              const nomeMatch = opt.nome === item.nome
              const foodIdMatch = opt.foodId === item.foodId

              return idMatch || nomeMatch || foodIdMatch
            })

            if (matchingOption) {
              const option: FoodOption = {
                id: matchingOption.id,
                nome: matchingOption.nome,
                emoji: matchingOption.emoji,
                foodId: matchingOption.foodId,
                selected: true,
                descricao: matchingOption.descricao,
              }

              // Mapear category para as seções corretas
              switch (item.category) {
                case "principal":
                  loadedSelections.principais.push(option)
                  break
                case "fruta":
                  loadedSelections.frutas.push(option)
                  break
                case "bebida":
                  loadedSelections.bebidas.push(option)
                  break
                default:
                  loadedSelections.principais.push(option)
                  break
              }
            }
          }
        })
      }
      // Formato antigo: objeto com categorias (compatibilidade)
      else if (typeof savedSelection.data === "object" && !Array.isArray(savedSelection.data)) {
        const data = savedSelection.data as Record<string, FoodItem>

        // Processar breakfast
        if (data.breakfast && isValidFoodItem(data.breakfast)) {
          const matchingOption = availableOptions.find((opt: any) => {
            const idMatch = "id" in data.breakfast && opt.id === data.breakfast.id
            const nomeMatch = opt.nome === data.breakfast.nome
            const foodIdMatch = opt.foodId === data.breakfast.foodId

            return idMatch || nomeMatch || foodIdMatch
          })

          if (matchingOption) {
            loadedSelections.principais.push({
              id: matchingOption.id,
              nome: matchingOption.nome,
              emoji: matchingOption.emoji,
              foodId: matchingOption.foodId,
              selected: true,
              descricao: matchingOption.descricao,
            })
          }
        }

        // Processar fruit
        if (data.fruit && isValidFoodItem(data.fruit)) {
          const matchingOption = availableOptions.find(
            (opt: any) =>
              ("id" in data.fruit && opt.id === data.fruit.id) ||
              opt.nome === data.fruit.nome ||
              (opt.foodId === data.fruit.foodId && opt.category === data.fruit.category),
          )

          if (matchingOption) {
            loadedSelections.frutas.push({
              id: matchingOption.id,
              nome: matchingOption.nome,
              emoji: matchingOption.emoji,
              foodId: matchingOption.foodId,
              selected: true,
              descricao: matchingOption.descricao,
            })
          }
        }

        // Processar liquid
        if (data.liquid && isValidFoodItem(data.liquid)) {
          const matchingOption = availableOptions.find(
            (opt: any) =>
              ("id" in data.liquid && opt.id === data.liquid.id) ||
              opt.nome === data.liquid.nome ||
              (opt.foodId === data.liquid.foodId && opt.category === data.liquid.category),
          )

          if (matchingOption) {
            loadedSelections.bebidas.push({
              id: matchingOption.id,
              nome: matchingOption.nome,
              emoji: matchingOption.emoji,
              foodId: matchingOption.foodId,
              selected: true,
              descricao: matchingOption.descricao,
            })
          }
        }
      }
    }

    setSelections(loadedSelections)
  }

  const loadLancheSelections = (savedSelection: any) => {
    const loadedSelections: FoodOption[] = []

    if (savedSelection) {
      // Obter todas as opções disponíveis para fazer o matching correto de IDs
      // Para lanche da tarde, as opções vêm em formato de objeto com categorias
      let availableOptions: any[] = []

      if (mealType === "lancheTarde") {
        // Para lanche da tarde, as opções vêm em formato de objeto com categorias
        availableOptions = [...(options.breakfast || []), ...(options.fruits || []), ...(options.liquids || [])]
      } else {
        // Para lanche da manhã, as opções vêm como array direto
        availableOptions = options || []
      }

      // Novo formato: array com múltiplos itens
      if (Array.isArray(savedSelection.data)) {
        savedSelection.data.forEach((item: any) => {
          if (isValidFoodItem(item)) {
            // Buscar a opção correspondente nas opções disponíveis
            const matchingOption = availableOptions.find((opt: any) => {
              const idMatch = "id" in item && "id" in opt && opt.id === item.id
              const nomeMatch = opt.nome === item.nome
              const foodIdMatch = opt.foodId === item.foodId

              return idMatch || nomeMatch || foodIdMatch
            })

            if (matchingOption) {
              const option: FoodOption = {
                id: matchingOption.id, // ✅ Usar ID da opção disponível
                nome: matchingOption.nome,
                emoji: matchingOption.emoji,
                foodId: matchingOption.foodId,
                selected: true,
                descricao: matchingOption.descricao,
                category: matchingOption.category,
              }
              loadedSelections.push(option)
            }
          }
        })
      }
      // Formato antigo: item único (compatibilidade)
      else if (isValidFoodItem(savedSelection.data)) {
        const item = savedSelection.data as any

        // Buscar a opção correspondente nas opções disponíveis
        const matchingOption = availableOptions.find((opt: any) => {
          const idMatch = opt.id === item.id
          const nomeMatch = opt.nome === item.nome
          const foodIdMatch = opt.foodId === item.foodId

          return idMatch || nomeMatch || foodIdMatch
        })

        if (matchingOption) {
          const option: FoodOption = {
            id: matchingOption.id, // ✅ Usar ID da opção disponível
            nome: matchingOption.nome,
            emoji: matchingOption.emoji,
            foodId: matchingOption.foodId,
            selected: true,
            descricao: matchingOption.descricao,
            category: matchingOption.category,
          }
          loadedSelections.push(option)
        }
      }
    }

    setSelections(loadedSelections)
  }

  const loadRefeicaoSelections = (savedSelection: any) => {
    const loadedSelections: Record<string, FoodOption[]> = {
      carboidratos: [],
      proteinas: [],
      saladas: [],
    }

    if (savedSelection) {
      // Obter todas as opções disponíveis para fazer o matching correto de IDs
      const availableOptions = [
        ...(options.carboidratos || []),
        ...(options.proteinas || []),
        ...(options.legumesESaladas || []),
      ]

      // Novo formato: array único de itens (com categories)
      if (Array.isArray(savedSelection.data)) {
        savedSelection.data.forEach((item: any) => {
          if (isValidFoodItem(item)) {
            // Buscar a opção correspondente nas opções disponíveis
            const matchingOption = availableOptions.find(
              (opt: any) =>
                ("id" in item && opt.id === item.id) ||
                opt.nome === item.nome ||
                (opt.foodId === item.foodId && opt.category === item.category),
            )

            if (matchingOption) {
              const option: FoodOption = {
                id: matchingOption.id,
                nome: matchingOption.nome,
                emoji: matchingOption.emoji,
                foodId: matchingOption.foodId,
                selected: true,
                descricao: matchingOption.descricao,
              }
              // ao invés da categoria do item salvo

              // Verificar primeiro em qual array das options disponíveis está o item
              const isInCarboidratos = (options.carboidratos || []).some((opt: any) => opt.id === matchingOption.id)
              const isInProteinas = (options.proteinas || []).some((opt: any) => opt.id === matchingOption.id)
              const isInSaladas = (options.legumesESaladas || []).some((opt: any) => opt.id === matchingOption.id)

              if (isInCarboidratos) {
                loadedSelections.carboidratos.push(option)
              } else if (isInProteinas) {
                loadedSelections.proteinas.push(option)
              } else if (isInSaladas) {
                loadedSelections.saladas.push(option)
              } else {
                // Fallback: usar categoria da opção disponível
                switch (matchingOption.category) {
                  case "carboidrato":
                  case "carboidratos":
                    loadedSelections.carboidratos.push(option)
                    break
                  case "proteina":
                  case "proteinas":
                    loadedSelections.proteinas.push(option)
                    break
                  case "salada":
                  case "saladas":
                  case "legume":
                  case "legumes":
                    loadedSelections.saladas.push(option)
                    break
                  default:
                    loadedSelections.carboidratos.push(option)
                    break
                }
              }
            }
          }
        })
      }
      // Formato antigo: objeto com categorias separadas (compatibilidade)
      else if (typeof savedSelection.data === "object" && !Array.isArray(savedSelection.data)) {
        const data = savedSelection.data as Record<string, FoodItem[]>
        Object.entries(data).forEach(([category, items]) => {
          if (Array.isArray(items) && loadedSelections[category]) {
            const mappedItems = items
              .map((item) => {
                // Buscar a opção correspondente nas opções disponíveis
                const matchingOption = availableOptions.find(
                  (opt: any) =>
                    ("id" in item && opt.id === item.id) ||
                    opt.nome === item.nome ||
                    (opt.foodId === item.foodId && opt.category === item.category),
                )

                if (matchingOption) {
                  return {
                    id: matchingOption.id,
                    nome: matchingOption.nome,
                    emoji: matchingOption.emoji,
                    foodId: matchingOption.foodId,
                    selected: true,
                    descricao: matchingOption.descricao,
                  }
                }
                return null
              })
              .filter(Boolean) as FoodOption[]

            loadedSelections[category] = mappedItems
          }
        })
      }
    }

    setSelections(loadedSelections)
  }

  // Preparar seções baseado no tipo de refeição
  const getSections = (): CategorySection[] => {
    switch (mealType) {
      case "cafe":
        return getCafeSections()
      case "lancheManha":
        return getLancheManhaSections()
      case "lancheTarde":
        return getLancheTardeSections()
      case "almoco":
      case "janta":
        return getRefeicaoSections()
      default:
        return []
    }
  }

  const getCafeSections = (): CategorySection[] => {
    const cafeOptions = convertToFoodOptions(options.breakfast || [])
    const frutasOptions = convertToFoodOptions(options.fruits || [])
    const bebidasOptions = convertToFoodOptions(options.liquids || [])

    return [
      {
        id: "principais",
        title: "Alimento Principal",
        description: "Escolha seu alimento principal para o café da manhã",
        options: cafeOptions,
        multiSelect: true,
        selectedItems: selections?.principais || [],
      },
      {
        id: "frutas",
        title: "Frutas",
        description: "Adicione frutas ao seu café da manhã",
        options: frutasOptions,
        multiSelect: true,
        selectedItems: selections?.frutas || [],
      },
      {
        id: "bebidas",
        title: "Bebidas",
        description: "Escolha uma bebida para acompanhar",
        options: bebidasOptions,
        multiSelect: true,
        selectedItems: selections?.bebidas || [],
      },
    ]
  }

  const getLancheManhaSections = (): CategorySection[] => {
    const lancheOptions = convertToFoodOptions(options || [])

    const selectedItems = Array.isArray(selections) ? selections : []

    const sections = [
      {
        id: "lanche-manha",
        title: "Lanche da Manhã",
        description: "Escolha lanches saudáveis para o meio da manhã",
        options: lancheOptions,
        multiSelect: true,
        selectedItems: selectedItems,
      },
    ]

    return sections
  }

  const getLancheTardeSections = (): CategorySection[] => {
    const lancheOptions = convertToFoodOptions(options.breakfast || [])
    const frutasOptions = convertToFoodOptions(options.fruits || [])
    const bebidasOptions = convertToFoodOptions(options.liquids || [])

    return [
      {
        id: "principais",
        title: "Alimento Principal",
        description: "Escolha seu alimento principal para o lanche da tarde",
        options: lancheOptions,
        multiSelect: true,
        selectedItems: selections?.principais || [],
      },
      {
        id: "frutas",
        title: "Frutas",
        description: "Adicione frutas ao seu lanche da tarde",
        options: frutasOptions,
        multiSelect: true,
        selectedItems: selections?.frutas || [],
      },
      {
        id: "bebidas",
        title: "Bebidas",
        description: "Escolha uma bebida para acompanhar",
        options: bebidasOptions,
        multiSelect: true,
        selectedItems: selections?.bebidas || [],
      },
    ]
  }

  const getRefeicaoSections = (): CategorySection[] => {
    const carboidratosOptions = convertToFoodOptions(options.carboidratos || [])
    const proteinasOptions = convertToFoodOptions(options.proteinas || [])
    const saladasOptions = convertToFoodOptions(options.legumesESaladas || [])

    return [
      {
        id: "carboidratos",
        title: "Carboidratos",
        description: `Escolha carboidratos para ${mealType === "almoco" ? "seu almoço" : "sua janta"}`,
        options: carboidratosOptions,
        multiSelect: true,
        selectedItems: selections?.carboidratos || [],
      },
      {
        id: "proteinas",
        title: "Proteínas",
        description: `Escolha proteínas para ${mealType === "almoco" ? "seu almoço" : "sua janta"}`,
        options: proteinasOptions,
        multiSelect: true,
        selectedItems: selections?.proteinas || [],
      },
      {
        id: "saladas",
        title: "Saladas e Legumes",
        description: `Escolha saladas e legumes para ${mealType === "almoco" ? "seu almoço" : "sua janta"}`,
        options: saladasOptions,
        multiSelect: true,
        selectedItems: selections?.saladas || [],
      },
    ]
  }

  // Handlers
  const handleSelectItem = (sectionId: string, item: FoodOption) => {
    if (mealType === "cafe" || mealType === "lancheTarde") {
      handleCafeSelect(sectionId, item)
    } else if (mealType === "lancheManha") {
      handleLancheSelect(sectionId, item)
    } else if (mealType === "almoco" || mealType === "janta") {
      handleRefeicaoSelect(sectionId, item)
    }
  }

  const handleCafeSelect = (sectionId: string, item: FoodOption) => {
    setSelections((prev: any) => {
      const currentSection = prev[sectionId] || []
      const isSelected = currentSection.some((selected: FoodOption) => selected.id === item.id)

      let newSectionSelections: FoodOption[]

      if (isSelected) {
        newSectionSelections = currentSection.filter((selected: FoodOption) => selected.id !== item.id)
      } else {
        newSectionSelections = [...currentSection, item]
      }

      const newSelections = { ...prev, [sectionId]: newSectionSelections }

      // Salvar imediatamente sem setTimeout
      saveCafeSelections(newSelections)
      onSelectionChange?.(newSelections)

      return newSelections
    })
  }

  const handleLancheSelect = (sectionId: string, item: FoodOption) => {
    setSelections((prev: FoodOption[]) => {
      const currentSelections = Array.isArray(prev) ? prev : []
      const isSelected = currentSelections.some((selected) => selected.id === item.id)

      let newSelections: FoodOption[]

      if (isSelected) {
        // Remover item se já está selecionado
        newSelections = currentSelections.filter((selected) => selected.id !== item.id)
      } else {
        // Adicionar item (sem limite)
        newSelections = [...currentSelections, item]
      }

      // Salvar imediatamente sem setTimeout
      saveLancheSelections(newSelections)
      onSelectionChange?.(newSelections)

      return newSelections
    })
  }

  const handleRefeicaoSelect = (sectionId: string, item: FoodOption) => {
    setSelections((prev: any) => {
      const currentSection = prev[sectionId] || []
      const isSelected = currentSection.some((selected: FoodOption) => selected.id === item.id)

      let newSectionSelections: FoodOption[]

      if (isSelected) {
        newSectionSelections = currentSection.filter((selected: FoodOption) => selected.id !== item.id)
      } else {
        newSectionSelections = [...currentSection, item]
      }

      const newSelections = { ...prev, [sectionId]: newSectionSelections }

      // Salvar imediatamente sem setTimeout
      saveRefeicaoSelections(newSelections)
      onSelectionChange?.(newSelections)

      return newSelections
    })
  }

  // Funções de salvamento
  const saveCafeSelections = (selections: Record<string, FoodOption[]>) => {
    const hasSelections = Object.values(selections).some((items) => items.length > 0)
    if (!hasSelections) {
      localStorage.removeItem(storageKey)
      return
    }

    // Salvar diretamente no formato de array único com todos os itens
    try {
      const existingData = getStoredSelections(storageKey)

      // Criar array com todos os itens selecionados
      const allItems: any[] = []

      // Adicionar todos os itens principais
      if (selections.principais && selections.principais.length > 0) {
        selections.principais.forEach((item) => {
          allItems.push({
            id: item.id,
            nome: item.nome,
            emoji: item.emoji,
            foodId: item.foodId,
            category: "principal",
            selected: true,
            descricao: item.descricao,
          })
        })
      }

      // Adicionar todas as frutas
      if (selections.frutas && selections.frutas.length > 0) {
        selections.frutas.forEach((item) => {
          allItems.push({
            id: item.id,
            nome: item.nome,
            emoji: item.emoji,
            foodId: item.foodId,
            category: "fruta",
            selected: true,
            descricao: item.descricao,
          })
        })
      }

      // Adicionar todas as bebidas
      if (selections.bebidas && selections.bebidas.length > 0) {
        selections.bebidas.forEach((item) => {
          allItems.push({
            id: item.id,
            nome: item.nome,
            emoji: item.emoji,
            foodId: item.foodId,
            category: "bebida",
            selected: true,
            descricao: item.descricao,
          })
        })
      }

      const newItem = {
        id: `cafe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: "inline" as const,
        data: allItems,
      }

      // Remove seleção inline existente e adiciona nova no início
      const filteredData = existingData.filter((item: any) => !item.id.includes("cafe"))
      const updatedData = [newItem, ...filteredData]

      localStorage.setItem(storageKey, JSON.stringify(updatedData))

      // Disparar evento de atualização para sincronizar o estado
      const event = new CustomEvent("inlineStorageUpdated", {
        detail: {
          key: storageKey,
          timestamp: Date.now(),
          mealType: mealType,
          optionsCount: allItems.length,
        },
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Erro ao salvar seleções do café:", error)
    }
  }

  const saveLancheSelection = (selection: FoodOption | null) => {
    if (!selection) {
      localStorage.removeItem(storageKey)
      return
    }

    const foodItem: FoodItem = {
      id: selection.id,
      nome: selection.nome,
      emoji: selection.emoji,
      foodId: selection.foodId,
      category: selection.category || (mealType === "lancheManha" ? "manha" : "tarde"), // ✅ Usar category do item primeiro
      selected: true,
      descricao: selection.descricao,
    }

    saveSimpleSelection(storageKey, foodItem)
  }

  const saveLancheSelections = (selections: FoodOption[]) => {
    if (!selections || selections.length === 0) {
      localStorage.removeItem(storageKey)
      return
    }

    // Salvar diretamente no formato de array simples
    try {
      const existingData = getStoredSelections(storageKey)

      // Criar array de itens simplificados
      const allItems = selections.map((selection) => ({
        id: selection.id,
        nome: selection.nome,
        emoji: selection.emoji,
        foodId: selection.foodId,
        category: selection.category || (mealType === "lancheManha" ? "manha" : "tarde"),
        selected: true,
        descricao: selection.descricao,
      }))

      const newItem = {
        id: `lanche_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: "inline" as const,
        data: allItems,
      }

      // Remove seleção inline existente e adiciona nova no início
      const filteredData = existingData.filter((item: any) => !item.id.includes("lanche"))
      const updatedData = [newItem, ...filteredData]

      localStorage.setItem(storageKey, JSON.stringify(updatedData))

      // Disparar evento de atualização
      const event = new CustomEvent("inlineStorageUpdated", {
        detail: {
          key: storageKey,
          timestamp: Date.now(),
          mealType: mealType,
          optionsCount: selections.length,
        },
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Erro ao salvar seleções do lanche:", error)
    }
  }

  const saveRefeicaoSelections = (selections: Record<string, FoodOption[]>) => {
    const hasSelections = Object.values(selections).some((items) => items.length > 0)

    if (!hasSelections) {
      // ✅ CORREÇÃO: Remover do localStorage quando não há seleções
      localStorage.removeItem(storageKey)
      return
    }

    // ✅ SOLUÇÃO: Criar array único diretamente, sem categorias separadas
    const allItems: FoodItem[] = []

    Object.entries(selections).forEach(([sectionKey, items]) => {
      items.forEach((item) => {
        let category = "carboidrato" // fallback

        switch (sectionKey) {
          case "carboidratos":
            category = "carboidrato"
            break
          case "proteinas":
            category = "proteina"
            break
          case "saladas":
            category = "salada"
            break
          default:
            category = item.category || "carboidrato"
            break
        }

        const foodItemWithCategory = {
          id: item.id,
          nome: item.nome,
          emoji: item.emoji,
          foodId: item.foodId,
          category: category,
          selected: true,
          descricao: item.descricao,
        }

        allItems.push(foodItemWithCategory)
      })
    })

    // ✅ CORREÇÃO: Passar estrutura correta para saveCategorySelections
    const correctStructure = { categoria_unica: allItems }
    saveCategorySelections(storageKey, correctStructure)
  }

  // Funções utilitárias
  const getSelectionCount = () => {
    if (mealType === "lancheManha") {
      return Array.isArray(selections) ? selections.length : 0
    }
    return Object.values(selections || {}).reduce((total: number, items: any) => {
      return total + (Array.isArray(items) ? items.length : 0)
    }, 0)
  }

  const sections = getSections()

  const content = (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          {/* Green dot indicator */}
          <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
          </div>
          {/* Progress percentage */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-gray-500">Progresso</span>
            <span className="text-sm font-medium text-gray-900">
              {Math.min((getSelectionCount() / 3) * 100, 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Full-width progress bar styled like an input */}
        <div className="w-full h-3 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <div
            className="h-full bg-gray-800 transition-all duration-300"
            style={{
              width: `${Math.min((getSelectionCount() / 3) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Error Display when insufficient foods selected */}
      {showError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-3">
              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-sm text-red-600">
              Selecione pelo menos 3 alimentos para continuar.
              <br />
              Você selecionou {getSelectionCount()}, faltam {3 - getSelectionCount()}.
            </div>
          </div>
        </div>
      )}

      <InlineFoodOptions
        sections={sections}
        onSelectItem={handleSelectItem}
        showHeaders={variant === "medidas-page"}
        gridCols={compact ? 1 : 3}
        compact={compact}
        variant={variant}
      />
    </>
  )

  if (noContainer) {
    return <div className={className || ""}>{content}</div>
  }

  return <div className={`bg-white rounded-2xl border border-gray-200 p-6 ${className || ""}`}>{content}</div>
}
