"use client";

import { almocoOptions } from "./options";
import MealDescriptionHint from "../meal-description";
import FoodSection from "../core/food-section";

export default function Almoco() {
  return (
    <FoodSection
      title="Almoço"
      description={<MealDescriptionHint />}
      storageKey="almocoSelecoes"
      options={almocoOptions}
      mealType="almoco"
    />
  );
}
