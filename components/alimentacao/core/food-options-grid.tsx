"use client";

import type React from "react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Definir tipos localmente
type MealType =
  | "cafeDaManha"
  | "lancheDaManha"
  | "almoco"
  | "lancheDaTarde"
  | "janta";

interface FoodOption {
  id: string;
  nome: string;
  emoji: string;
  foodId: number | number[];
  selected?: boolean;
  descricao?: string;
  originalId?: string;
}

interface TempSelections {
  breakfast?: FoodOption;
  fruit?: FoodOption;
  liquid?: FoodOption;
  alimento?: FoodOption;
  carboidratos?: FoodOption[];
  proteinas?: FoodOption;
  legumesESaladas?: FoodOption;
  [key: string]: any;
}

interface FoodOptionsGridProps {
  category: string;
  options: FoodOption[];
  tempSelections: TempSelections;
  mealType: MealType;
  onSelectItem: (item: FoodOption, category: string) => void;
  onSkipCategory?: (category: string) => void;
  showSkipButton?: boolean;
}

export function FoodOptionsGrid({
  category,
  options,
  tempSelections,
  mealType,
  onSelectItem,
  onSkipCategory,
  showSkipButton = true,
}: FoodOptionsGridProps) {
  // Estado para bloquear múltiplos cliques rápidos
  const [isProcessing, setIsProcessing] = useState(false);
  const prevCategoryRef = useRef<string>(category);

  // Resetar bloqueio ao mudar de categoria (ou reabrir modal)
  useEffect(() => {
    if (prevCategoryRef.current !== category || !options.length) {
      setIsProcessing(false);
      prevCategoryRef.current = category;
    }
  }, [category, options.length]);

  // Verificar se um item está selecionado
  const isItemSelected = (item: FoodOption): boolean => {
    if (!tempSelections || typeof tempSelections !== "object") {
      return false;
    }

    if (mealType === "almoco" || mealType === "janta") {
      if (category === "carboidratos") {
        const carboidratos = tempSelections.carboidratos;
        if (!Array.isArray(carboidratos)) {
          return false;
        }
        return carboidratos.some(
          (i: FoodOption) => i && typeof i === "object" && i.id === item.id
        );
      } else {
        const selectedItem = tempSelections[category];
        return !!(
          selectedItem &&
          typeof selectedItem === "object" &&
          selectedItem.id === item.id
        );
      }
    } else if (
      mealType === "cafeDaManha" ||
      (mealType === "lancheDaTarde" &&
        (category === "breakfast" ||
          category === "fruit" ||
          category === "liquid"))
    ) {
      const selectedItem = tempSelections[category];
      return !!(
        selectedItem &&
        typeof selectedItem === "object" &&
        selectedItem.id === item.id
      );
    } else {
      const selectedItem = tempSelections.alimento;
      return !!(
        selectedItem &&
        typeof selectedItem === "object" &&
        selectedItem.id === item.id
      );
    }
  };

  // Handler para clique
  const handleItemClick = (
    item: FoodOption,
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    // Bloquear múltiplos cliques rápidos apenas para lanche da manhã
    if (mealType === "lancheDaManha") {
      if (isProcessing) return;
      setIsProcessing(true);
    }
    event.preventDefault();
    event.stopPropagation();
    onSelectItem(item, category);
    // Permitir novo clique após um pequeno delay apenas para lanche da manhã
    if (mealType === "lancheDaManha") {
      setTimeout(() => setIsProcessing(false), 200);
    }
  };

  // Verificar se a categoria pode ser pulada
  const canSkip =
    showSkipButton &&
    mealType !== "lancheDaManha" &&
    category !== "breakfast" &&
    category !== "proteinas" &&
    (category !== "carboidratos" ||
      (tempSelections.carboidratos && tempSelections.carboidratos.length > 0));

  const getSkipButtonText = () => {
    switch (category) {
      case "fruit":
        return "Não quero fruta";

      case "legumesESaladas":
        return "Não quero legumes";
      case "carboidratos":
        return "Não quero mais um carboidrato";
      default:
        return "Não quero";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 pb-4 sm:pb-6 w-full max-w-full">
      {/* Lista de opções de comida */}
      <div className="px-1">
        {/* Para carboidratos, mostrar o botão "não quero" primeiro */}
        {category === "carboidratos" && canSkip && onSkipCategory && (
          <>
            <div
              onClick={() => onSkipCategory(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSkipCategory(category);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={false}
              aria-label={getSkipButtonText()}
              className="flex items-center gap-3 sm:gap-3 p-3 sm:p-3.5 rounded-lg cursor-pointer transition-all duration-100 touch-manipulation focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[55px] sm:min-h-[58px] bg-red-50 border border-red-200 hover:bg-red-100 mb-2"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 aspect-square rounded-full bg-white shadow-sm border border-red-200 flex-shrink-0">
                <span className="text-lg sm:text-xl">🚫</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base break-words leading-snug">
                  {getSkipButtonText()}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 break-words mt-0.5 leading-tight">
                  Ir para próxima categoria
                </p>
              </div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 aspect-square rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-100 border-2 border-red-300"></div>
            </div>
            {/* Separador para carboidratos */}
            <div className="border-t border-gray-200 my-2"></div>
          </>
        )}

        {/* Lista de opções */}
        {options.map((option) => {
          const isSelected = isItemSelected(option);

          return (
            <div
              key={option.id}
              onClick={(e) => handleItemClick(option, e)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick(option, e);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`${isSelected ? "Selecionado" : "Selecionar"} ${
                option.nome
              }${option.descricao ? ": " + option.descricao : ""}`}
              className={`flex items-center gap-3 sm:gap-3 p-3 sm:p-3.5 rounded-lg cursor-pointer transition-all duration-100 touch-manipulation focus:outline-none min-h-[55px] sm:min-h-[58px] w-full max-w-full mb-2 ${
                isSelected
                  ? "bg-green-700 border-2 border-green-700"
                  : "bg-white border border-slate-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 aspect-square rounded-full bg-white shadow-sm border border-slate-100 flex-shrink-0">
                <span className="text-lg sm:text-xl">{option.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 max-w-[calc(100%-70px)] overflow-hidden">
                <h3 className={`font-semibold text-sm sm:text-base break-words leading-snug ${
                  isSelected ? "text-white" : "text-slate-900"
                }`}>
                  {option.nome}
                </h3>
                {option.descricao && (
                  <p className={`text-xs sm:text-sm break-words mt-0.5 leading-tight ${
                    isSelected ? "text-green-100" : "text-slate-500"
                  }`}>
                    {option.descricao}
                  </p>
                )}
              </div>
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 aspect-square rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-100 border-2 ${
                  isSelected
                    ? "bg-green-700 border-green-700 shadow-sm shadow-green-200"
                    : "border-slate-200"
                }`}
              >
                {isSelected && (
                  <Check
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    strokeWidth={3}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Para outras categorias (não carboidratos), mostrar o botão "não quero" por último */}
        {category !== "carboidratos" && canSkip && onSkipCategory && (
          <>
            {/* Separador antes do botão para outras categorias */}
            <div className="border-t border-gray-200 my-2"></div>
            <div
              onClick={() => onSkipCategory(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSkipCategory(category);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={false}
              aria-label={getSkipButtonText()}
              className="flex items-center gap-3 sm:gap-3 p-3 sm:p-3.5 rounded-lg cursor-pointer transition-all duration-100 touch-manipulation focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[55px] sm:min-h-[58px] bg-red-50 border border-red-200 hover:bg-red-100 mb-2"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 aspect-square rounded-full bg-white shadow-sm border border-red-200 flex-shrink-0">
                <span className="text-lg sm:text-xl">🚫</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base break-words leading-snug">
                  {getSkipButtonText()}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 break-words mt-0.5 leading-tight">
                  Pular esta categoria
                </p>
              </div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 aspect-square rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-100 border-2 border-red-300"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
