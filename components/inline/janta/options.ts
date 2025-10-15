import { getFoodsByCategory } from "@/utils/food-inline-options";

export const inlineJantaOptions = {
  carboidratos: getFoodsByCategory("AlmocoJanta", "carboidrato"),
  proteinas: getFoodsByCategory("AlmocoJanta", "proteina"),
  legumesESaladas: getFoodsByCategory("AlmocoJanta", "salada"),
};

export type InlineJantaOptions = typeof inlineJantaOptions;
