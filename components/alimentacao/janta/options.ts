export type FoodOption = {
  id: string;
  nome: string;
  emoji: string;
  selected: boolean;
  foodId: number | number[];
};

export const jantaOptions = {
  carboidratos: [
    { id: "arroz", nome: "Arroz", emoji: "🍚", selected: false, foodId: 3 },
    {
      id: "feijao_preto",
      nome: "Feijão Preto",
      emoji: "🫘",
      selected: false,
      foodId: 567,
    },
    { id: "cuscuz", nome: "Cuscuz", emoji: "🌽", selected: false, foodId: 533 },
    {
      id: "macarrao",
      nome: "Macarrão",
      emoji: "🍝",
      selected: false,
      foodId: 603,
    },
    {
      id: "batata_doce",
      nome: "Batata Doce",
      emoji: "🍠",
      selected: false,
      foodId: 88,
    },
    {
      id: "mandioca",
      nome: "Mandioca",
      emoji: "🥔",
      selected: false,
      foodId: 129,
    },
    {
      id: "batata_baroa",
      nome: "Batata Baroa",
      emoji: "🥔",
      selected: false,
      foodId: 86,
    },
    { id: "inhame", nome: "Inhame", emoji: "🥔", selected: false, foodId: 604 },
    {
      id: "batata_inglesa",
      nome: "Batata Inglesa",
      emoji: "🥔",
      selected: false,
      foodId: 91,
    },
    {
      id: "abobora",
      nome: "Abóbora",
      emoji: "🎃",
      selected: false,
      foodId: 608,
    },
  ],
  proteinas: [
    {
      id: "frango_grelhado",
      nome: "Frango Grelhado",
      emoji: "🍗",
      selected: false,
      foodId: 410,
    },
    {
      id: "carne_assada",
      nome: "Carne Assada",
      emoji: "🥩",
      selected: false,
      foodId: 347,
    },
    {
      id: "carne_magra",
      nome: "Carne Magra",
      emoji: "🥩",
      selected: false,
      foodId: 377,
    },
    {
      id: "peixe_pintado",
      nome: "Peixe Pintado",
      emoji: "🐟",
      selected: false,
      foodId: 313,
    },
    {
      id: "carne_porco_lombo",
      nome: "Carne de Porco Lombo",
      emoji: "🐖",
      selected: false,
      foodId: 432,
    },
    {
      id: "patinho_moido",
      nome: "Patinho Moído",
      emoji: "🥩",
      selected: false,
      foodId: 606,
    },
    {
      id: "estrogonofe_frango",
      nome: "Estrogonofe de Frango",
      emoji: "🍛",
      selected: false,
      foodId: 538,
    },
    {
      id: "file_mignon",
      nome: "Filé Mignon Bovino",
      emoji: "🥩",
      selected: false,
      foodId: 358,
    },
    {
      id: "peixe_pescada",
      nome: "Pescada",
      emoji: "🐟",
      selected: false,
      foodId: 308,
    },
  ],
  legumesESaladas: [
    {
      id: "salada_tomate",
      nome: "Salada de Tomate",
      emoji: "🍅",
      selected: false,
      foodId: 161,
    },
    {
      id: "salada_alface",
      nome: "Salada de Alface",
      emoji: "🥬",
      selected: false,
      foodId: 77,
    },
    {
      id: "salada_legumes",
      nome: "Salada de Legumes",
      emoji: "🥗",
      selected: false,
      foodId: 546,
    },
  ],
};
