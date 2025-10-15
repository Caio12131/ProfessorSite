"use client";

import { cafeDaManhaOptions } from "./options";
import MealDescriptionHint from "../meal-description";
import FoodSection from "../core/food-section";

export default function CafeDaManha() {
  return (
    <FoodSection
      title="Café da Manhã"
      description={<MealDescriptionHint />}
      storageKey="cafeDaManhaSelecoes"
      options={cafeDaManhaOptions}
      mealType="cafeDaManha"
    />
  );
}
