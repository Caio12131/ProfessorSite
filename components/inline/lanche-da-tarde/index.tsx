"use client"

import { inlineLancheTardeOptions } from "./options"
import InlineFoodSection from "../core/inline-food-section"
import { InlineStorageKeys } from "@/utils/inline-storage"

export interface InlineLancheTardeProps {
  className?: string
  compact?: boolean
  noContainer?: boolean
  onSelectionChange?: (selection: any) => void
  variant?: "medidas-page"
}

export function InlineLancheTarde({
  className,
  compact = false,
  noContainer,
  onSelectionChange,
  variant,
}: InlineLancheTardeProps) {
  return (
    <InlineFoodSection
      title="Lanche da Tarde"
      emoji="🥪"
      description="Selecione suas opções preferidas para montar seu lanche da tarde"
      storageKey={InlineStorageKeys.LANCHE_DA_TARDE}
      mealType="lancheTarde"
      options={inlineLancheTardeOptions}
      className={className}
      compact={compact}
      noContainer={noContainer}
      onSelectionChange={onSelectionChange}
      variant={variant}
    />
  )
}
