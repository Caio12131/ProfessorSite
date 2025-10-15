import { getFoodsByCategory } from "@/utils/food-inline-options"

export const inlineAlmocoOptions = {
  carboidratos: getFoodsByCategory("AlmocoJanta", "carboidrato"),
  proteinas: getFoodsByCategory("AlmocoJanta", "proteina"),
  legumesESaladas: getFoodsByCategory("AlmocoJanta", "salada"),
}

export type InlineAlmocoOptions = typeof inlineAlmocoOptions
