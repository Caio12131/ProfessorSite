// Define the types for our data structures
interface FoodCategories {
  proteínas: string[];
  carboidratos: string[];
  açúcares: string[];
  frutas: string[];
}

interface FoodLists {
  proteínas: Set<string>;
  carboidratos: Set<string>;
  açúcares: Set<string>;
  frutas: Set<string>;
}

interface ExtractedFoodItems {
  proteínas: string[];
  carboidratos: string[];
  açúcares: string[];
  frutas: string[];
}

// Define the categories with proper typing
const categories: FoodCategories = {
  proteínas: [
    "frango",
    "queijo",
    "alcatra",
    "ovo",
    "ovos",
    "peixe - Pintado ou Tilápia",
    "requeijão",
    "atum",
    "peru",
    "queijo cottage",
    "carne bovina",
    "presunto",
    "salmão",
    "camarão",
    "tofu",
    "soja",
    "seitan",
    "lombo",
    "cordeiro",
    "frutos do mar",
    "merluza",
    "tilápia",
    "carne - Patinho ou Alcatra",
    "carne moida",
    "carne de porco",
    "presunto",
    "salmão",
    "whey protein",
  ],
  carboidratos: [
    "arroz",
    "macarrão",
    "pão",
    "batata doce",
    "tapioca",
    "aveia",
    "biscoito",
    "mandioca",
    "cuscuz",
    "rap10",
    "quinoa",
    "milho",
    "centeio",
    "trigo",
    "farinha",
    "feijão",
    "lentilhas",
    "grão de bico",
    "cereal",
    "inhame",
    "batata inglesa",
    "salada - Alface",
    "tomate",
    "legumes"
  ],
  açúcares: ["iogurte", "chocolate", "café", "leite", "suco", "suco natural"],
  frutas: [
    "maçã",
    "banana",
    "pêra",
    "abacaxi",
    "laranja",
    "tomate",
    "manga",
    "uva",
    "melancia",
    "figo",
    "morango",
    "kiwi",
  ],
};

// Add type for the normalizeFood function
const normalizeFood = (food: string): string => {
  food = food
    .toLowerCase()
    .replace(/s\b|,|\./g, "")
    .trim();
  if (food.includes("carne") && !food.includes("porco")) {
    return "carne - Patinho ou Alcatra";
  }else if (food.toLowerCase().includes("batata doce")) {
      return "batata doce";
  } else if (food.toLowerCase().includes("batata inglesa")) {
    return "batata inglesa";
} else if (food.includes("arroz integral")) {
    return "arroz";
  }  else if (food.toLocaleLowerCase().includes("salada")) {
    return "salada - Alface";
  } else if (food.toLocaleLowerCase().includes("tomate")) {
    return "tomate";
  } else if (food.toLocaleLowerCase().includes("legumes")) {
    return "legumes";
  }else if (food.includes("sanduiche de peru")) {
    return "peito de peru";
  } else if (food.includes("sanduiche de frango") || food.includes("Frango Desfiado")) {
    return "frango desfiado";
  } else if (food.includes("Rap10 com recheio de Frango")) {
    return "frango desfiado";
  } else if (food.toLowerCase().includes("peixe")) {
    return "peixe - Pintado ou Tilápia";
  } else if (food.includes("iogurte")) {
    return "iogurte";
  } else if (food.includes("cereal integral")) {
    return "cereal";
  } else if (food.includes("porco")) {
    return "carne de porco";
  } else if (food.includes("peito de frango")) {
    return "frango";
  } else if (food.includes("whey protein")) {
    return "whey protein";
  } else if (food.includes("ovos") || food.includes("ovo")) {
    return "ovo";
  } else if (food.includes("requeijao")) {
    return "requeijão";
  }
  return food;
};

// Add types for the extractFoodItems function
export const extractFoodItems = (text: string): ExtractedFoodItems => {
  const foodLists: FoodLists = {
    proteínas: new Set<string>(),
    carboidratos: new Set<string>(),
    açúcares: new Set<string>(),
    frutas: new Set<string>(),
  };
 
  // Remove os números, asteriscos e espaços no final do texto
  text = text.replace(/[\d:]+[*]*\**$/, "").trim();

  // Expressão regular para capturar os itens de alimentos
  const matches = text.matchAll(/([^(\n]+)\s*($$\d+g|\d+ml|\d+\s*cal$$)?/g);

  for (const match of Array.from(matches)) {
    if (match[1] && !match[1].toLowerCase().includes("total:")) {
      // Separa os itens por '+'.
      let items = match[1].split("+").map((item) => item.trim());
      items.forEach((item) => {
        let foodComponent = item.split("(")[0].trim();
        foodComponent = normalizeFood(foodComponent);
        (Object.keys(categories) as Array<keyof FoodCategories>).forEach(
          (category) => {
            categories[category].forEach((food) => {
              if (
                foodComponent.includes(food) &&
                !foodLists[category].has(food)
              ) {
                foodLists[category].add(food);
              }
            });
          }
        );
      });
    }
  }

  return {
    proteínas: Array.from(foodLists.proteínas),
    carboidratos: Array.from(foodLists.carboidratos),
    açúcares: Array.from(foodLists.açúcares),
    frutas: Array.from(foodLists.frutas),
  };
};
