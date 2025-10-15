"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Definir tipos localmente
type MealType =
  | "cafeDaManha"
  | "lancheDaManha"
  | "almoco"
  | "lancheDaTarde"
  | "janta";

interface MealHeaderProps {
  title: string;
  description: React.ReactNode;
  optionsCount: number;
  maxOptions: number;
  isAddButtonEnabled: boolean;
  isPreviousMealCompleted: boolean;
  onAddClick: () => void;
}

export function MealHeader({
  title,
  description,
  optionsCount,
  maxOptions,
  isAddButtonEnabled,
  isPreviousMealCompleted,
  onAddClick,
}: MealHeaderProps) {
  // Renderizar barra de progresso
  const renderProgressBar = () => {
    const progress = (optionsCount / maxOptions) * 100;

    return (
      <div className="w-16 sm:w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-700 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="modal-arial flex flex-col">
      {/* Versão para desktop */}
      <div className="hidden sm:flex items-start justify-between">
        {/* Emoji + título + descrição */}
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-full bg-gray-100 t-green-700 flex items-center justify-center mt-0.5">
            <span className="text-xl">🍽️</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {title}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Progresso + botão */}
        <div className="flex items-center gap-3 ml-4">
          {renderProgressBar()}
          <Button
            variant="ghost"
            size="icon"
            className={`no-modal-outline rounded-full h-10 w-10 transition-all duration-200 flex-shrink-0 ${
              (isPreviousMealCompleted || optionsCount > 0) &&
              isAddButtonEnabled
                ? "bg-green-700 text-white hover:bg-green-800"
                : "bg-gray-200 text-gray-400 hover:bg-gray-300"
            }`}
            onClick={onAddClick}
            disabled={!isAddButtonEnabled}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Versão para mobile */}
      <div className="sm:hidden">
        {/* Linha superior: emoji + título + progresso + botão */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-1.5 rounded-full bg-gray-50 text-green-700 flex items-center justify-center">
              <span className="text-lg">🍽️</span>
            </div>
            <h2 className="text-base font-semibold text-gray-900 truncate">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 ml-2">
            {renderProgressBar()}
            <Button
              variant="ghost"
              size="icon"
              className={`no-modal-outline rounded-full h-8 w-8 transition-all duration-200 flex-shrink-0 ${
                (isPreviousMealCompleted || optionsCount > 0) &&
                isAddButtonEnabled
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-200 text-gray-400 hover:bg-gray-300"
              }`}
              onClick={onAddClick}
              disabled={!isAddButtonEnabled}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Linha inferior: descrição */}
        <p className="text-gray-500 text-xs">{description}</p>
      </div>

      {/* Linha separadora */}
      <div className="border-t border-gray-200 mt-3 sm:mt-4 -mx-4" />
    </div>
  );
}
