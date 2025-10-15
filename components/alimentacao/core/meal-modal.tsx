"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodOptionsGrid } from "./food-options-grid";
import { MEAL_TITLES } from "@/constants/meal";

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

interface FoodSectionOptions {
  breakfast?: FoodOption[];
  fruits?: FoodOption[];
  liquids?: FoodOption[];
  carboidratos?: FoodOption[];
  proteinas?: FoodOption[];
  legumesESaladas?: FoodOption[];
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

interface MealModalProps {
  isOpen: boolean;
  mealType: MealType;
  options: FoodSectionOptions | FoodOption[];
  modalPage: number;
  almocoJantaPage: number;
  tempSelections: TempSelections;
  editingCategory: string | null;
  isEditingFullOption: boolean;
  useCafeDaManhaLogic?: boolean;
  currentEditingOptionIndex: number;
  onClose: () => void;
  onSelectItem: (item: FoodOption, category: string) => void;
  onSkipCategory: (category: string) => void;
  onNavigateToCategory: (categoryIndex: number) => void;
  canNavigateToCategory: (categoryIndex: number) => boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
}

export function MealModal({
  isOpen,
  mealType,
  options,
  modalPage,
  almocoJantaPage,
  tempSelections,
  editingCategory,
  isEditingFullOption,
  useCafeDaManhaLogic,
  currentEditingOptionIndex,
  onClose,
  onSelectItem,
  onSkipCategory,
  onNavigateToCategory,
  canNavigateToCategory,
  onPrevious,
  onNext,
  onSave,
  canGoBack,
  isLastStep,
}: MealModalProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll para o topo quando mudar de página
  useEffect(() => {
    const scrollToTop = () => {
      if (scrollAreaRef.current) {
        // Tentar múltiplos seletores para encontrar o viewport
        const viewport =
          scrollAreaRef.current.querySelector(
            "[data-radix-scroll-area-viewport]"
          ) ||
          scrollAreaRef.current.querySelector(".scrollarea-viewport") ||
          scrollAreaRef.current.querySelector("[data-viewport]") ||
          scrollAreaRef.current.firstElementChild;

        if (viewport) {
          // Método 1: scrollTop direto
          viewport.scrollTop = 0;

          // Método 2: scrollTo
          try {
            (viewport as HTMLElement).scrollTo({ top: 0, behavior: "auto" });
          } catch (e) {}

          // Debug: verificar se funcionou
        }

        // Fallback: tentar com o próprio container
        try {
          scrollAreaRef.current.scrollTop = 0;
        } catch (e) {}
      }
    };

    // Executar imediatamente
    scrollToTop();

    // E também com delay para garantir
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 150);
  }, [modalPage, almocoJantaPage]);

  // Scroll para o topo ao escolher um carboidrato
  useEffect(() => {
    // Verificar se um carboidrato foi selecionado
    if (
      getCategoriaAtiva() === "carboidratos" &&
      tempSelections.carboidratos &&
      tempSelections.carboidratos.length > 0
    ) {
      const scrollToTop = () => {
        if (scrollAreaRef.current) {
          // Tentar múltiplos seletores para encontrar o viewport
          const viewport =
            scrollAreaRef.current.querySelector(
              "[data-radix-scroll-area-viewport]"
            ) ||
            scrollAreaRef.current.querySelector(".scrollarea-viewport") ||
            scrollAreaRef.current.querySelector("[data-viewport]") ||
            scrollAreaRef.current.firstElementChild;

          if (viewport) {
            // Definir CSS para scroll suave mais longo
            (viewport as HTMLElement).style.scrollBehavior = "smooth";
            (viewport as HTMLElement).style.scrollSnapType = "none";

            // Método scrollTo com animação suave
            try {
              (viewport as HTMLElement).scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } catch (e) {
              // Fallback com animação CSS
              viewport.scrollTop = 0;
            }

            // Restaurar behavior após a animação
            setTimeout(() => {
              (viewport as HTMLElement).style.scrollBehavior = "auto";
            }, 800);
          }

          // Fallback: tentar com o próprio container
          try {
            scrollAreaRef.current.scrollTop = 0;
          } catch (e) {}
        }
      };

      // Executar com um pequeno delay para garantir que a seleção foi processada
      setTimeout(scrollToTop, 100);
    }
  }, [tempSelections.carboidratos]);

  // Efeito para salvar automaticamente quando selecionar a bebida
  useEffect(() => {
    // Verificar se todas as categorias obrigatórias foram selecionadas
    const checkAutoSave = () => {
      if (
        mealType === "cafeDaManha" ||
        (mealType === "lancheDaTarde" && useCafeDaManhaLogic)
      ) {
        const hasBreakfast = tempSelections.breakfast;
        const hasLiquid = tempSelections.liquid;

        // Se acabou de selecionar a bebida e já tem o principal, salvar automaticamente
        if (hasBreakfast && hasLiquid && categoriaAtiva === "liquid") {
          setTimeout(() => {
            onSave();
          }, 300);
        }
      }
    };

    checkAutoSave();
  }, [tempSelections, mealType, useCafeDaManhaLogic, onSave]);

  // Obter título do modal
  const getModalTitle = () => {
    if (editingCategory) {
      const categoryNames = {
        carboidratos: "Trocar Carboidrato",
        proteinas: "Trocar Proteína",
        legumesESaladas: "Trocar Legumes e Saladas",
        liquid: "Trocar Bebida",
        breakfast: "Trocar Principal",
        fruit: "Trocar Fruta",
        alimento: "Trocar Lanche",
      };
      return (
        categoryNames[editingCategory as keyof typeof categoryNames] ||
        "Trocar item"
      );
    }
    return MEAL_TITLES[mealType] || "Monte sua Refeição";
  };

  // Verificar se categoria está selecionada
  const verificarCategoriaSelecionada = (categoria: string) => {
    return tempSelections[categoria as keyof TempSelections] !== undefined;
  };

  // Obter categoria ativa atual
  const getCategoriaAtiva = () => {
    if (editingCategory) return editingCategory;

    if (
      mealType === "cafeDaManha" ||
      (mealType === "lancheDaTarde" && useCafeDaManhaLogic)
    ) {
      const categories = ["breakfast", "fruit", "liquid"];
      return categories[modalPage] || "breakfast";
    }

    if (mealType === "almoco" || mealType === "janta") {
      const categories = ["carboidratos", "proteinas", "legumesESaladas"];
      return categories[almocoJantaPage] || "carboidratos";
    }

    return "alimento";
  };

  // Obter tabs para o tipo de refeição
  const getTabs = () => {
    if (
      mealType === "cafeDaManha" ||
      (mealType === "lancheDaTarde" && useCafeDaManhaLogic)
    ) {
      return [
        { value: "breakfast", label: "Principal" },
        { value: "fruit", label: "Fruta" },
        { value: "liquid", label: "Bebida" },
      ];
    }

    if (mealType === "almoco" || mealType === "janta") {
      return [
        { value: "carboidratos", label: "Carboidrato" },
        { value: "proteinas", label: "Proteína" },
        { value: "legumesESaladas", label: "Verduras" },
      ];
    }

    return [{ value: "alimento", label: "Lanche" }];
  };

  // Obter cabeçalho da categoria
  const getCategoryHeader = (categoria: string) => {
    const headers = {
      breakfast: {
        title: "Alimentos Principais",
        description: "Selecione o item principal para seu café da manhã",
      },
      fruit: {
        title: "Frutas",
        description: "Escolha uma fruta para complementar seu café da manhã",
      },
      liquid: {
        title: "Bebidas",
        description: "Selecione uma bebida para acompanhar sua refeição",
      },
      carboidratos: {
        title: "Carboidratos",
        description: "Selecione o carboidrato para sua refeição",
      },
      proteinas: {
        title: "Proteínas",
        description: "Escolha uma proteína para sua refeição",
      },
      legumesESaladas: {
        title: "Verduras",
        description: "Escolha uma verdura para sua refeição",
      },
      alimento: { title: "Lanches", description: "Escolha seu lanche" },
    };
    return (
      headers[categoria as keyof typeof headers] || {
        title: "Opções",
        description: "Faça sua seleção",
      }
    );
  };

  const categoriaAtiva = getCategoriaAtiva();
  const tabs = getTabs();
  const optionsAsObj = options as FoodSectionOptions;
  const optionsAsArray = options as FoodOption[];

  // Obter opções para a categoria atual
  const getCurrentOptions = () => {
    if (
      mealType === "lancheDaManha" ||
      (mealType === "lancheDaTarde" && !useCafeDaManhaLogic)
    ) {
      return optionsAsArray;
    }

    switch (categoriaAtiva) {
      case "breakfast":
        return optionsAsObj.breakfast || [];
      case "fruit":
        return optionsAsObj.fruits || [];
      case "liquid":
        return optionsAsObj.liquids || [];
      case "carboidratos":
        return optionsAsObj.carboidratos || [];
      case "proteinas":
        return optionsAsObj.proteinas || [];
      case "legumesESaladas":
        return optionsAsObj.legumesESaladas || [];
      default:
        return [];
    }
  };

  const currentOptions = getCurrentOptions();
  const categoryHeader = getCategoryHeader(categoriaAtiva);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-arial w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[520px] md:max-w-[600px] p-0 overflow-visible rounded-lg sm:rounded-xl border-0 shadow-xl max-h-[80vh] sm:max-h-[75vh] flex flex-col my-auto">
        <DialogHeader className="px-3 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 rounded-t-lg sm:rounded-t-xl">
          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2 text-center">
            {getModalTitle()}
          </DialogTitle>
          <div className="text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-gray-200 shadow-sm">
                <span className="text-xl sm:text-2xl">🍽️</span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="px-3 py-1 bg-green-100 border border-green-200 rounded-full">
                <p className="text-sm sm:text-base font-semibold text-green-800">
                  {editingCategory
                    ? `Escolha um novo item para substituir`
                    : currentEditingOptionIndex >= 0
                    ? `Opção ${currentEditingOptionIndex + 1}`
                    : `Opção ${currentEditingOptionIndex + 2}`}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue={categoriaAtiva}
          value={categoriaAtiva}
          onValueChange={(value) => {
            const tabIndex = tabs.findIndex((tab) => tab.value === value);
            if (tabIndex !== -1) {
              onNavigateToCategory(tabIndex);
            }
          }}
          className="w-full flex-1 flex flex-col overflow-hidden"
        >
          {!editingCategory && tabs.length > 1 && (
            <div className="px-1 sm:px-4 pt-2 pb-2 sm:pb-2 border-b">
              <ScrollArea className="w-full overflow-visible">
                <TabsList
                  className="grid h-10 sm:h-12 gap-0.5 sm:gap-1 w-full overflow-visible"
                  style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
                  role="tablist"
                >
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      role="tab"
                      aria-selected={categoriaAtiva === tab.value}
                      className="text-xs sm:text-base py-2 sm:py-3 px-1 sm:px-3 font-medium transition-all duration-100 touch-manipulation relative text-center"
                    >
                      {tab.label}
                      {verificarCategoriaSelecionada(tab.value) && (
                        <div className="absolute -top-1 -right-1 sm:top-1 sm:-right-1 w-4 h-4 sm:w-4 sm:h-4 bg-green-600 rounded-full flex items-center justify-center shadow-sm z-10">
                          <svg
                            className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </div>
          )}

          <ScrollArea
            ref={scrollAreaRef}
            className="flex-1 px-3 sm:px-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[75vh]"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
          >
            <TabsContent
              value={categoriaAtiva}
              className="mt-3 sm:mt-4 w-full max-w-full overflow-visible"
              role="tabpanel"
            >
              <div className="mb-3 sm:mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  {categoryHeader.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-500">
                  {categoryHeader.description}
                </p>
              </div>

              {/* Mostrar alimentos escolhidos anteriormente */}
              {(() => {
                const getAllPreviousSelections = () => {
                  const selections: Array<{ item: any; type: string }> = [];

                  if (
                    mealType === "cafeDaManha" ||
                    (mealType === "lancheDaTarde" && useCafeDaManhaLogic)
                  ) {
                    if (tempSelections.breakfast) {
                      selections.push({
                        item: tempSelections.breakfast,
                        type: "Principal",
                      });
                    }
                    if (tempSelections.fruit) {
                      selections.push({
                        item: tempSelections.fruit,
                        type: "Fruta",
                      });
                    }
                    if (tempSelections.liquid) {
                      selections.push({
                        item: tempSelections.liquid,
                        type: "Bebida",
                      });
                    }
                  }

                  if (mealType === "almoco" || mealType === "janta") {
                    if (
                      tempSelections.carboidratos &&
                      tempSelections.carboidratos.length > 0
                    ) {
                      tempSelections.carboidratos.forEach((carb, index) => {
                        selections.push({
                          item: carb,
                          type:
                            tempSelections.carboidratos &&
                            tempSelections.carboidratos.length > 1
                              ? `Carboidrato ${index + 1}`
                              : "Carboidrato",
                        });
                      });
                    }
                    if (tempSelections.proteinas) {
                      selections.push({
                        item: tempSelections.proteinas,
                        type: "Proteína",
                      });
                    }
                    if (tempSelections.legumesESaladas) {
                      selections.push({
                        item: tempSelections.legumesESaladas,
                        type: "Verdura",
                      });
                    }
                  }

                  if (
                    mealType === "lancheDaManha" ||
                    (mealType === "lancheDaTarde" && !useCafeDaManhaLogic)
                  ) {
                    if (tempSelections.alimento) {
                      selections.push({
                        item: tempSelections.alimento,
                        type: "Lanche",
                      });
                    }
                  }

                  return selections;
                };

                const getNextQuestion = () => {
                  const questions = {
                    fruit: "fruta?",
                    liquid: "bebida?",
                    proteinas: "proteína?",
                    legumesESaladas: "verdura?",
                    breakfast: "principal?",
                    carboidratos: "carboidrato?",
                    alimento: "lanche?",
                  };
                  return (
                    questions[categoriaAtiva as keyof typeof questions] ||
                    "próximo?"
                  );
                };

                const previousSelections = getAllPreviousSelections();
                const nextQuestion = getNextQuestion();

                // Não mostrar seleções anteriores quando estiver editando categoria específica
                if (previousSelections.length > 0 && !editingCategory) {
                  return (
                    <div className="mb-4">
                      <div className="bg-gray-100 px-3 py-2 rounded-lg">
                        <div className="flex flex-wrap items-center gap-1">
                          {previousSelections.map((selection, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-base">
                                {selection.item.emoji}
                              </span>
                              <span className="text-sm font-medium text-gray-700 ml-1">
                                {selection.item.nome}
                              </span>
                              {index < previousSelections.length - 1 && (
                                <span className="mx-1 text-gray-500 text-sm">
                                  +
                                </span>
                              )}
                            </div>
                          ))}
                          <span className="mx-1 text-gray-500 text-sm">+</span>
                          <span className="text-sm text-zinc-500 font-medium">
                            {nextQuestion}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })()}

              <FoodOptionsGrid
                category={categoriaAtiva}
                options={currentOptions}
                tempSelections={tempSelections}
                mealType={mealType}
                onSelectItem={onSelectItem}
                onSkipCategory={onSkipCategory}
                showSkipButton={
                  categoriaAtiva !== "breakfast" &&
                  categoriaAtiva !== "proteinas" &&
                  categoriaAtiva !== "alimento"
                }
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
