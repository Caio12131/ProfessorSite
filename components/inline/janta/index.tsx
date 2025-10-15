"use client"

import { inlineJantaOptions } from "./options"
import InlineFoodSection from "../core/inline-food-section"
import { InlineStorageKeys } from "@/utils/inline-storage"

export interface InlineJantaProps {
  className?: string
  compact?: boolean
  noContainer?: boolean
  onSelectionChange?: (selections: Record<string, any[]>) => void
  variant?: "medidas-page"
}

export function InlineJanta({ className, compact = false, noContainer, onSelectionChange, variant }: InlineJantaProps) {
  return (
    <InlineFoodSection
      title="Janta"
      emoji="🌕"
      description="Selecione suas opções preferidas para montar sua janta"
      storageKey={InlineStorageKeys.JANTA}
      mealType="janta"
      options={inlineJantaOptions}
      className={className}
      compact={compact}
      noContainer={noContainer}
      onSelectionChange={onSelectionChange}
      variant={variant}
    />
  )
}
