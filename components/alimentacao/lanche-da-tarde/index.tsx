"use client";

import { lancheDaTardeOptions } from "./options";
import MealDescriptionHint from "../meal-description";
import FoodSection from "../core/food-section";

export default function LancheDaTarde() {
  return (
    <FoodSection
      title="Lanche da Tarde"
      description={<MealDescriptionHint />}
      storageKey="lancheDaTardeSelecoes"
      options={lancheDaTardeOptions}
      mealType="lancheDaTarde"
      useCafeDaManhaLogic={true}
    />
  );
}
