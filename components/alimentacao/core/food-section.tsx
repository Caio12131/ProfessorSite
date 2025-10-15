"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { MealHeader } from "./meal-header";
import { MealOptionCard } from "./meal-option-card";
import { MealModal } from "./meal-modal";
import { useMealState, useMealModal, useMealLogic } from "@/hooks";

// Tipos locais
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

interface FoodSectionProps {
  title: string;
  description: React.ReactNode;
  storageKey: string;
  options: FoodSectionOptions | FoodOption[];
  mealType: MealType;
  useCafeDaManhaLogic?: boolean;
}

const getValidationMessage = (
  mealType: MealType,
  optionsCount: number
): string => {
  switch (mealType) {
    case "cafeDaManha":
      return "Monte seu café da manhã";
    case "lancheDaManha":
      return "Monte seu Lanche da Manhã";
    case "almoco":
      return "Monte seu almoço";
    case "lancheDaTarde":
      return "Monte seu lanche da tarde";
    case "janta":
      return "Monte sua jantar";
    default:
      return "Monte sua refeição";
  }
};

export default function FoodSection({
  title,
  description,
  storageKey,
  options,
  mealType,
  useCafeDaManhaLogic,
}: FoodSectionProps) {
  // Estados locais
  const [localShowAlert, setLocalShowAlert] = useState(false);
  const [localAlertMessage, setLocalAlertMessage] = useState("");
  const [localLancheSelecionado, setLocalLancheSelecionado] =
    useState<FoodOption | null>(null);

  // Hooks
  const {
    mealOptions,
    setMealOptions,
    isAddButtonEnabled,
    isPreviousMealCompleted,
    alertMessage: stateAlertMessage,
    showSuccess,
    maxOptionsReached,
  } = useMealState({
    storageKey,
    mealType,
    maxOptions: mealType === "lancheDaManha" ? Infinity : 3,
  });

  const {
    isDialogOpen,
    currentEditingOption,
    editingCategory,
    tempSelections,
    modalPage,
    almocoJantaPage,
    isEditingFullOption,
    setTempSelections,
    setModalPage,
    setAlmocoJantaPage,
    setLancheSelecionado: setModalLancheSelecionado,
    openAddModal,
    openEditCategoryModal,
    closeModal,
    navigateToCategory,
    canNavigateToCategory,
  } = useMealModal();

  // Hook para lógica de refeições
  const {
    selectItem,
    saveSelections,
    skipCategory,
    handleNext,
    handlePrevious,
  } = useMealLogic({
    mealType,
    useCafeDaManhaLogic,
    modalPage,
    almocoJantaPage,
    tempSelections,
    editingCategory,
    currentEditingOption,
    setTempSelections,
    setModalPage,
    setAlmocoJantaPage,
    setMealOptions,
    closeModal,
    showAlert: (message: string) => {
      setLocalAlertMessage(message);
      setLocalShowAlert(true);
    },
  });

  // Efeito para processar seleção de lanche automaticamente
  useEffect(() => {
    if (
      (localLancheSelecionado && mealType === "lancheDaManha") ||
      (mealType === "lancheDaTarde" && !useCafeDaManhaLogic)
    ) {
      if (currentEditingOption) {
        setMealOptions((prev) =>
          prev.map((opt) => {
            if (opt.id === currentEditingOption.id) {
              return { ...opt, alimento: localLancheSelecionado || undefined };
            }
            return opt;
          })
        );
      } else {
        const newOption: MealOption = {
          id: crypto.randomUUID(),
          alimento: localLancheSelecionado || undefined,
        };
        setMealOptions((prev) => [...prev, newOption]);
      }

      setTimeout(() => {
        closeModal();
        setLocalLancheSelecionado(null);
      }, 100);
    }
  }, [
    localLancheSelecionado,
    mealType,
    currentEditingOption,
    useCafeDaManhaLogic,
    setMealOptions,
    closeModal,
  ]);

  // Adicionar nova opção
  const addNewOption = useCallback(() => {
    if (maxOptionsReached) {
      const message =
        mealType === "lancheDaManha"
          ? "Erro interno: limite inesperado atingido."
          : "Você já atingiu o limite de 3 opções para esta refeição.";
      setLocalAlertMessage(message);
      setLocalShowAlert(true);
      return;
    }

    openAddModal();
  }, [maxOptionsReached, openAddModal, mealType]);

  // Editar categoria específica
  const editCategory = useCallback(
    (optionId: string, category: string) => {
      const option = mealOptions.find((opt) => opt.id === optionId);
      if (option) {
        openEditCategoryModal(option, category, mealType);
      }
    },
    [mealOptions, openEditCategoryModal, mealType]
  );

  // Remover opção
  const removeOption = useCallback(
    (optionId: string) => {
      setMealOptions((prev: MealOption[]) => {
        const newOptions = prev.filter((opt) => opt.id !== optionId);
        setTimeout(() => {
          const event = new CustomEvent("mealOptionsUpdated", {
            detail: { mealType, optionsCount: newOptions.length },
          });
          window.dispatchEvent(event);
        }, 0);
        return newOptions;
      });
    },
    [mealType, setMealOptions]
  );

  // Wrapper para selectItem com tratamento especial para lanches
  const handleSelectItem = useCallback(
    (item: FoodOption, category: string) => {
      // Para lanches simples, tratamento especial
      if (
        (mealType === "lancheDaManha" ||
          (mealType === "lancheDaTarde" && !useCafeDaManhaLogic)) &&
        category === "alimento"
      ) {
        setLocalLancheSelecionado(item);
        setModalLancheSelecionado(item);
        if (mealType === "lancheDaManha") {
          closeModal();
        }
        return;
      }

      selectItem(item, category);
    },
    [
      mealType,
      useCafeDaManhaLogic,
      selectItem,
      setModalLancheSelecionado,
      closeModal,
    ]
  );

  // Estados derivados
  const canGoBack = (modalPage > 0 || almocoJantaPage > 0) && !editingCategory;
  const isLastStep =
    mealType === "cafeDaManha" ||
    (mealType === "lancheDaTarde" && useCafeDaManhaLogic)
      ? modalPage === 2
      : almocoJantaPage === 3;

  return (
    <div className="modal-arial rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 transition-all duration-300 ' overflow-hidden">
      <div>
        <MealHeader
          title={title}
          description={description}
          optionsCount={mealOptions.length}
          maxOptions={mealType === "lancheDaManha" ? Infinity : 3}
          isAddButtonEnabled={isAddButtonEnabled}
          isPreviousMealCompleted={isPreviousMealCompleted}
          onAddClick={addNewOption}
        />

        <div className="mt-4">
          {mealOptions.length === 0 ? (
            <div
              className={`py-5 px-4 text-center rounded-xl transition-all duration-300 ${
                isPreviousMealCompleted
                  ? "bg-white cursor-pointer hover:bg-gray-50 border border-gray-200"
                  : "bg-white cursor-pointer hover:bg-gray-50 border border-gray-200"
              }`}
              onClick={addNewOption}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-2xl">
                    {mealType === "cafeDaManha" && "☕"}
                    {mealType === "lancheDaManha" && "🍎"}
                    {mealType === "almoco" && "🍽️"}
                    {mealType === "lancheDaTarde" && "🍪"}
                    {mealType === "janta" && "🌙"}
                  </span>
                </div>
                <div>
                  <p
                    className={`font-medium text-base ${
                      isPreviousMealCompleted
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {getValidationMessage(mealType, 0)}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isPreviousMealCompleted
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    Clique no botão + para criar opções
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mealOptions.map((option, index) => {
                  return (
                    <MealOptionCard
                      key={option.id}
                      option={option}
                      index={index}
                      mealType={mealType}
                      useCafeDaManhaLogic={useCafeDaManhaLogic}
                      onEditCategory={editCategory}
                      onRemove={removeOption}
                    />
                  );
                })}
              </div>

              {/* Mensagens de sucesso e botões adicionais */}
              {showSuccess && mealOptions.length < 3 && (
                <div className="mt-4 space-y-4">
                  <div className="bg-black-50 border border-black-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-black-700" />
                      </div>
                      <p className="text-black-800 text-sm font-medium">
                        {stateAlertMessage}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={addNewOption}
                    disabled={!isAddButtonEnabled}
                    className={`w-full py-3 h-12 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                      (isPreviousMealCompleted || mealOptions.length > 0) &&
                      isAddButtonEnabled
                        ? "bg-black-700 hover:bg-green-800 text-white"
                        : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                    }`}
                  >
                    <Plus className="h-5 w-5" /> Adicionar mais opções
                  </Button>
                </div>
              )}

              {/* Aviso quando atingir limite */}
              {maxOptionsReached && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-amber-600" />
                    </div>
                    <p className="text-amber-700 text-sm font-medium">
                      {stateAlertMessage}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          <MealModal
            isOpen={isDialogOpen}
            mealType={mealType}
            options={options}
            modalPage={modalPage}
            almocoJantaPage={almocoJantaPage}
            tempSelections={tempSelections}
            editingCategory={editingCategory}
            isEditingFullOption={isEditingFullOption}
            useCafeDaManhaLogic={useCafeDaManhaLogic}
            currentEditingOptionIndex={
              currentEditingOption
                ? mealOptions.findIndex((o) => o.id === currentEditingOption.id)
                : mealOptions.length
            }
            onClose={closeModal}
            onSelectItem={handleSelectItem}
            onSkipCategory={skipCategory}
            onNavigateToCategory={(index) =>
              navigateToCategory(index, mealType)
            }
            canNavigateToCategory={(index) =>
              canNavigateToCategory(index, mealType)
            }
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSave={saveSelections}
            canGoBack={canGoBack}
            isLastStep={isLastStep}
          />
        </div>
      </div>
    </div>
  );
}
