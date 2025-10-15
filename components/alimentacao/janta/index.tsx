"use client";

import { jantaOptions } from "./options";
import MealDescriptionHint from "../meal-description";
import FoodSection from "../core/food-section";

export default function Janta() {
  return (
    <FoodSection
      title="Janta"
      description={<MealDescriptionHint />}
      storageKey="jantaSelecoes"
      options={jantaOptions}
      mealType="janta"
    />
  );
}
