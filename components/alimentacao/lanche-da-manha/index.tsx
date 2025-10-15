"use client";

import { lancheDaManhaOptions } from "./options";
import MealDescriptionHint from "../meal-description";
import FoodSection from "../core/food-section";

export default function LancheDaManha() {
  return (
    <FoodSection
      title="Lanche da Manhã"
      description={<MealDescriptionHint />}
      storageKey="lancheDaManhaSelecoes"
      options={lancheDaManhaOptions}
      mealType="lancheDaManha"
    />
  );
}
