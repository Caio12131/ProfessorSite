import { getFoodsByCategory } from "@/utils/food-inline-options";

export const inlineCafeDaManhaOptions = {
  breakfast: getFoodsByCategory("cafe", "principal"),
  fruits: getFoodsByCategory("cafe", "fruta"),
  liquids: getFoodsByCategory("cafe", "bebida"),
};

export type InlineCafeDaManhaOptions = typeof inlineCafeDaManhaOptions;
