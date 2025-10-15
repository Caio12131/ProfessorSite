import { getFoodsByCategory } from "@/utils/food-inline-options";

export const inlineLancheTardeOptions = {
  breakfast: getFoodsByCategory("lancheDaTarde", "principal"),
  fruits: getFoodsByCategory("lancheDaTarde", "fruta"),
  liquids: getFoodsByCategory("lancheDaTarde", "bebida"),
};

export type InlineLancheTardeOptions = typeof inlineLancheTardeOptions;
