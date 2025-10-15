"use client";
import { Check, X, RefreshCw } from "lucide-react";

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
}

interface MealOption {
  id: string;
  breakfast?: FoodOption;
  fruit?: FoodOption;
  liquid?: FoodOption;
  alimento?: FoodOption;
  carboidratos?: FoodOption[];
  proteinas?: FoodOption;
  legumesESaladas?: FoodOption;
  [key: string]: any;
}

interface MealOptionCardProps {
  option: MealOption;
  index: number;
  mealType: MealType;
  useCafeDaManhaLogic?: boolean;
  onEditCategory: (optionId: string, category: string) => void;
  onRemove: (optionId: string) => void;
}

export function MealOptionCard({
  option,
  index,
  mealType,
  useCafeDaManhaLogic,
  onEditCategory,
  onRemove,
}: MealOptionCardProps) {
  // Renderizar card para café da manhã
  if (
    mealType === "cafeDaManha" ||
    (mealType === "lancheDaTarde" && useCafeDaManhaLogic)
  ) {
    return (
      <div className="modal-arial overflow-hidden border border-gray-200 bg-white rounded-lg shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 bg-gray-50 -mx-4 -mt-4 px-4 py-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black-600 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Opção {index + 1}</h3>
            </div>
            <button
              onClick={() => onRemove(option.id)}
              className="text-gray-400 hover:text-zinc-500"
              aria-label="Remover opção"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {option.breakfast && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">{option.breakfast.emoji}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      PRINCIPAL
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.breakfast.nome}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => onEditCategory(option.id, "breakfast")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div>
              </div>
            )}

            {option.fruit && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">{option.fruit.emoji}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      FRUTA
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.fruit.nome}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => onEditCategory(option.id, "fruit")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div>
              </div>
            )}

            {option.liquid && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">{option.liquid.emoji}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      BEBIDA
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.liquid.nome}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => onEditCategory(option.id, "liquid")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar card para lanche
  if (
    mealType === "lancheDaManha" ||
    (mealType === "lancheDaTarde" && !useCafeDaManhaLogic)
  ) {
    return (
      <div className="modal-arial overflow-hidden border border-gray-200 bg-white rounded-lg shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 bg-gray-50 -mx-4 -mt-4 px-4 py-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Opção {index + 1}</h3>
            </div>
            <button
              onClick={() => onRemove(option.id)}
              className="text-gray-400 hover:text-zinc-500"
              aria-label="Remover opção"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            {option.alimento && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">{option.alimento.emoji}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      LANCHE
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.alimento.nome}
                    </p>
                  </div>
                </div>
                {/* <div
                  onClick={() => onEditCategory(option.id, "alimento")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar card para almoço/janta
  if (mealType === "almoco" || mealType === "janta") {
    return (
      <div className="modal-arial overflow-hidden border border-gray-200 bg-white rounded-lg shadow-sm min-w-[260px]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 bg-gray-50 -mx-4 -mt-4 px-4 py-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Opção {index + 1}</h3>
            </div>
            <button
              onClick={() => onRemove(option.id)}
              className="text-gray-400 hover:text-zinc-500"
              aria-label="Remover opção"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {option.carboidratos && option.carboidratos.length > 0 && (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">
                      {option.carboidratos[0].emoji}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      CARBOIDRATO
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.carboidratos.map((c) => c.nome).join(", ")}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => onEditCategory(option.id, "carboidratos")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0 self-start"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div>
              </div>
            )}

            {option.proteinas && (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">{option.proteinas.emoji}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      PROTEÍNA
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.proteinas.nome}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => onEditCategory(option.id, "proteinas")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0 self-start"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div>
              </div>
            )}

            {option.legumesESaladas && (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xl">
                      {option.legumesESaladas.emoji}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">
                      VERDURA
                    </p>
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {option.legumesESaladas.nome}
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => onEditCategory(option.id, "legumesESaladas")}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200 flex-shrink-0 self-start"
                >
                  <RefreshCw className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-zinc-500 font-medium">
                    Trocar
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
