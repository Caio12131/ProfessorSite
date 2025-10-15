"use client"

import { inlineCafeDaManhaOptions } from "./options"
import InlineFoodSection from "../core/inline-food-section"
import { InlineStorageKeys } from "@/utils/inline-storage"

export interface InlineCafeDaManhaProps {
  className?: string
  compact?: boolean
  noContainer?: boolean
  onSelectionChange?: (selections: Record<string, any[]>) => void
  variant?: "medidas-page"
}

export function InlineCafeDaManha({
  className,
  compact = false,
  noContainer,
  onSelectionChange,
  variant,
}: InlineCafeDaManhaProps) {
  return (
    <InlineFoodSection
      title="Café da Manhã"
      emoji="🍎"
      description="Selecione suas opções preferidas para montar seu café da manhã"
      storageKey={InlineStorageKeys.CAFE_DA_MANHA}
      mealType="cafe"
      options={inlineCafeDaManhaOptions}
      className={className}
      compact={compact}
      noContainer={noContainer}
      onSelectionChange={onSelectionChange}
      variant={variant}
    />
  )
}
