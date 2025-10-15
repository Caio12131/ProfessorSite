"use client"

import { inlineAlmocoOptions } from "./options"
import InlineFoodSection from "../core/inline-food-section"
import { InlineStorageKeys } from "@/utils/inline-storage"

export interface InlineAlmocoProps {
  className?: string
  compact?: boolean
  noContainer?: boolean
  onSelectionChange?: (selections: Record<string, any[]>) => void
  variant?: "medidas-page"
}

export function InlineAlmoco({
  className,
  compact = false,
  noContainer,
  onSelectionChange,
  variant,
}: InlineAlmocoProps) {
  return (
    <InlineFoodSection
      title="Almoço"
      emoji="🫘"
      description="Selecione suas opções preferidas para montar seu almoço"
      storageKey={InlineStorageKeys.ALMOCO}
      mealType="almoco"
      options={inlineAlmocoOptions}
      className={className}
      compact={compact}
      noContainer={noContainer}
      onSelectionChange={onSelectionChange}
      variant={variant}
    />
  )
}
