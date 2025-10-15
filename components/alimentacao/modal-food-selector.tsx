"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ReusableModal,
  ModalConfig,
  ModalTab,
} from "@/components/ui/reusable-modal";
import {
  InlineFoodOptions,
  CategorySection,
  FoodOption,
} from "@/components/inline";

// Dados de exemplo para diferentes refeições
const foodData = {
  breakfast: [
    {
      id: "tapioca",
      nome: "Tapioca + Frango",
      emoji: "🌮",
      foodId: [1, 2],
      descricao: "Tapioca com frango desfiado",
    },
    {
      id: "crepioca",
      nome: "Crepioca + Queijo",
      emoji: "🧄",
      foodId: [3, 4],
      descricao: "Crepioca com queijo",
    },
    {
      id: "pao-ovo",
      nome: "Pão + Ovo",
      emoji: "🍞",
      foodId: [7, 8],
      descricao: "Pão integral com ovos",
    },
  ] as FoodOption[],

  fruits: [
    {
      id: "maca",
      nome: "Maçã",
      emoji: "🍎",
      foodId: 18,
      descricao: "Maçã fresca",
    },
    {
      id: "banana",
      nome: "Banana",
      emoji: "🍌",
      foodId: 19,
      descricao: "Banana madura",
    },
    {
      id: "laranja",
      nome: "Laranja",
      emoji: "🍊",
      foodId: 20,
      descricao: "Laranja doce",
    },
  ] as FoodOption[],

  liquids: [
    {
      id: "cafe",
      nome: "Café + Leite",
      emoji: "☕",
      foodId: [9, 10],
      descricao: "Café com leite",
    },
    {
      id: "iogurte",
      nome: "Iogurte",
      emoji: "🥛",
      foodId: 6,
      descricao: "Iogurte natural",
    },
    {
      id: "suco",
      nome: "Suco",
      emoji: "🧃",
      foodId: 24,
      descricao: "Suco natural",
    },
  ] as FoodOption[],
};

export interface ModalFoodSelectorProps {
  className?: string;
}

export function ModalFoodSelector({ className }: ModalFoodSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("breakfast");
  const [selections, setSelections] = useState<Record<string, FoodOption[]>>({
    breakfast: [],
    fruits: [],
    liquids: [],
  });

  const tabs: ModalTab[] = [
    { value: "breakfast", label: "Principal" },
    { value: "fruits", label: "Fruta" },
    { value: "liquids", label: "Bebida" },
  ];

  const modalConfig: ModalConfig = {
    title: "Monte seu Café da Manhã",
    headerIcon: "🍽️",
    headerBadgeText: "Escolha suas opções",
    showTabs: true,
    activeTab,
    tabs,
  };

  const getCurrentSection = (): CategorySection => {
    const sectionMap = {
      breakfast: {
        id: "breakfast",
        title: "Alimentos Principais",
        description: "Selecione o item principal para seu café da manhã",
        options: foodData.breakfast,
        selectedItems: selections.breakfast,
      },
      fruits: {
        id: "fruits",
        title: "Frutas",
        description: "Escolha uma fruta para complementar",
        options: foodData.fruits,
        selectedItems: selections.fruits,
        allowSkip: true,
        skipText: "Não quero fruta",
      },
      liquids: {
        id: "liquids",
        title: "Bebidas",
        description: "Selecione uma bebida",
        options: foodData.liquids,
        selectedItems: selections.liquids,
      },
    };

    return sectionMap[activeTab as keyof typeof sectionMap];
  };

  const handleSelectItem = (sectionId: string, item: FoodOption) => {
    setSelections((prev) => ({
      ...prev,
      [sectionId]: [item], // Single select
    }));
  };

  const handleSkipSection = (sectionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [sectionId]: [],
    }));
  };

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const getTotalSelections = () => {
    return Object.values(selections).reduce(
      (total, items) => total + items.length,
      0
    );
  };

  const getSelectionSummary = () => {
    const summary: string[] = [];
    if (selections.breakfast.length > 0) {
      summary.push(
        `${selections.breakfast[0].emoji} ${selections.breakfast[0].nome}`
      );
    }
    if (selections.fruits.length > 0) {
      summary.push(
        `${selections.fruits[0].emoji} ${selections.fruits[0].nome}`
      );
    }
    if (selections.liquids.length > 0) {
      summary.push(
        `${selections.liquids[0].emoji} ${selections.liquids[0].nome}`
      );
    }
    return summary.join(" + ");
  };

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Botão para abrir modal */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Seleção com Modal
        </h3>
        <p className="text-zinc-500 mb-4">
          Use este botão para abrir um modal e selecionar suas opções de café da
          manhã
        </p>

        <Button onClick={() => setIsModalOpen(true)} className="mb-4">
          Abrir Seletor de Alimentos
        </Button>

        {/* Mostrar seleções atuais */}
        {getTotalSelections() > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="text-sm font-medium text-green-900 mb-2">
              Sua seleção atual:
            </h4>
            <p className="text-green-800">{getSelectionSummary()}</p>
          </div>
        )}
      </div>

      {/* Modal reutilizável */}
      <ReusableModal
        isOpen={isModalOpen}
        config={modalConfig}
        onClose={() => setIsModalOpen(false)}
        onTabChange={handleTabChange}
      >
        <div className="mb-3 sm:mb-4 pb-3 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-600 rounded-full"></span>
            {getCurrentSection().title}
          </h3>
          <p className="text-sm sm:text-base text-slate-500">
            {getCurrentSection().description}
          </p>
        </div>

        <InlineFoodOptions
          sections={[getCurrentSection()]}
          onSelectItem={handleSelectItem}
          onSkipSection={handleSkipSection}
          showHeaders={false}
          gridCols={1}
          compact={false}
        />

        {/* Botões de ação no modal */}
        <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
            disabled={
              selections[activeTab].length === 0 &&
              !getCurrentSection().allowSkip
            }
          >
            Confirmar
          </Button>
        </div>
      </ReusableModal>
    </div>
  );
}
