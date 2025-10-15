"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface DietSimpleViewProps {
  dietaText: string
}

interface MealItem {
  name: string
  calories: number
}

interface MealOption {
  title: string
  items: MealItem[]
}

interface Meal {
  title: string
  options: MealOption[]
}

const VALID_MEALS = ["Café da Manhã", "Lanche da Manhã", "Almoço", "Lanche da Tarde", "Jantar"]

function parseDiet(dietaText: string): Meal[] {
  const sections = dietaText.split("#### ").slice(1)
  const meals: Meal[] = []

  sections.forEach((section) => {
    const [titleLine, ...rest] = section.split("\n").map((l) => l.trim())
    if (!titleLine) return

    const mealName = titleLine.replace(/$$.*?$$/g, "").trim()
    if (!VALID_MEALS.includes(mealName)) return

    const meal: Meal = { title: mealName, options: [] }
    const currentOption: MealOption = { title: "Opção Única", items: [] }

    rest.forEach((line) => {
      if (!line || line.toLowerCase() === "opção única") return

      const match = line.match(/^- (.+) - (\d+)\s*kcal$/i)
      if (match) {
        currentOption.items.push({
          name: match[1].trim(),
          calories: Number(match[2]),
        })
      }
    })

    if (currentOption.items.length) meal.options.push(currentOption)
    meals.push(meal)
  })

  return meals
}

export default function DietSimpleView({ dietaText }: DietSimpleViewProps) {
  if (!dietaText || dietaText.trim() === "") {
    return <div className="text-center text-gray-400">Nenhuma dieta disponível no momento.</div>
  }

  const meals = parseDiet(dietaText)

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {meals.map((meal, idx) => {
        const totalCalories = meal.options.reduce(
          (sum, opt) => sum + opt.items.reduce((s, item) => s + item.calories, 0),
          0,
        )

        return (
          <Card key={idx} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <CardHeader className="bg-black text-white px-6 py-4 border-b">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                {meal.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {meal.options.map((opt, i) => (
                  <div key={i} className="flex gap-4 flex-shrink-0">
                    {opt.items.map((item, j) => (
                      <div
                        key={j}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-black hover:shadow-md transition-all duration-200 cursor-pointer group min-w-[140px]"
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="text-2xl">{getItemEmoji(item.name)}</div>
                          <div className="font-medium text-black text-sm leading-tight">{item.name}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 group-hover:text-black transition-colors">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {item.calories} kcal
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold flex items-center gap-1">
                    {totalCalories} kcal
                    <Flame className="w-4 h-4 text-orange-400" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function getItemEmoji(itemName: string): string {
  const name = itemName.toLowerCase()

  if (name.includes("frango") || name.includes("chicken")) return "🍗"
  if (name.includes("pão") || name.includes("bread")) return "🍞"
  if (name.includes("ovo") || name.includes("egg")) return "🥚"
  if (name.includes("leite") || name.includes("milk")) return "🥛"
  if (name.includes("café") || name.includes("coffee")) return "☕"
  if (name.includes("fruta") || name.includes("fruit")) return "🍎"
  if (name.includes("queijo") || name.includes("cheese")) return "🧀"
  if (name.includes("iogurte") || name.includes("yogurt")) return "🥛"
  if (name.includes("cenoura") || name.includes("carrot")) return "🥕"
  if (name.includes("tapioca")) return "🥞"
  if (name.includes("presunto") || name.includes("ham")) return "🥓"
  if (name.includes("cuscuz")) return "🌾"
  if (name.includes("banana")) return "🍌"

  return "🥘"
}
