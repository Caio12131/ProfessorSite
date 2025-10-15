// app/api/generatePrompt/route.ts
import { NextResponse } from "next/server";
import {
  calculateIMC,
  classifyIMC,
  calculateTMB,
  adjustTMBByActivityLevel,
  getCalorieRecommendation,
} from "@/lib/health-calculations";

interface UserData {
  Peso: string | number;
  Altura: string | number;
  Idade: string | number;
  Genero: string;
  Objetivo: string;
  Calorias: string | number;
  nivelAtividade?: string;
  treino?: string;
  Horarios?: string;
  cafeDaManha?: string;
  lancheDaManha?: string;
  lancheDaTarde?: string;
  almoco?: string;
  janta?: string;
}

export async function POST(request: Request) {
  const userData: UserData = await request.json();

  // Converter valores para número quando necessário
  const peso =
    typeof userData.Peso === "string"
      ? parseFloat(userData.Peso)
      : userData.Peso;
  const altura =
    typeof userData.Altura === "string"
      ? parseFloat(userData.Altura)
      : userData.Altura;
  const idade =
    typeof userData.Idade === "string"
      ? parseFloat(userData.Idade)
      : userData.Idade;

  // Calcular IMC e classificação (caso precise usar a classificação)
  const imc = calculateIMC(peso, altura);
  const _classificacaoIMC = classifyIMC(imc);

  // Calcular TMB
  const tmb = calculateTMB(peso, altura, idade, userData.Genero);

  // Obter dados adicionais enviados pel cliente
  const nivelAtividade = userData.nivelAtividade || "sedentario";
  const treino = userData.treino || "Não";

  // Ajustar TMB e calcular calorias recomendadas
  const tmbAjustada = adjustTMBByActivityLevel(tmb, nivelAtividade);
  const caloriasRecomendadas = getCalorieRecommendation(
    tmbAjustada,
    userData.Objetivo
  );
  const calorias =
    userData.Calorias === "Não"
      ? getCalorieRecommendation(tmbAjustada, userData.Objetivo)
      : userData.Calorias;
  // Preferências alimentares
  const cafeDaManha = userData.cafeDaManha || "Sem preferências";
  const lancheDaManha = userData.lancheDaManha || "Sem preferências";
  const almoco = userData.almoco || "Sem preferências";
  const lancheDaTarde = userData.lancheDaTarde || "Sem preferências";
  const janta = userData.janta || "Sem preferências";

  // Construir o prompt utilizando template literals

  const prompt = `
Crie um plano de dieta exclusivo para atingir o objetivo de ${userData.Objetivo.replace(
    "_",
    " "
  ).replace(/\b\w/g, (l: string) =>
    l.toUpperCase()
  )} calorias para uma pessoa de ${peso}kg e ${altura}cm, seguindo estas diretrizes:
1. Apresente o total de calorias ao final de cada opção e não coloque as calorias de cada alimento.
2. Utilize apenas os alimentos listados:
   - Café da manhã: Meta 20% de ${calorias} kcal: ${cafeDaManha}
   - Lanche da Manhã: Meta 15% de ${calorias} kcal: ${lancheDaManha}
   - Almoço: Meta 25% de ${calorias} kcal: ${almoco}
   - Lanche da Tarde: Meta 15% de ${calorias} kcal: ${lancheDaTarde}
   - Jantar: Meta 25% de ${calorias} kcal: ${janta}
3. Certifique-se de que o conjunto de refeições (Café da Manhã, Lanche da Manhã, Almoço, Lanche da Tarde e Jantar) totalize ${calorias} kcal.
Para o almoço e jantar, sempre inclua caso tenha alimentos da categoria listados acima:
2 fontes de carboidratos (complexo e complementar caso tenha).
Nunca use arroz como única fonte de carboidrato. Nunca combine arroz com macarrão na mesma refeição.
1 fonte de proteína magra ou moderada.
1 porção de legumes (brocolis, cenoura, couve) com quantidades específicas em gramas, ou alface à vontade com ou sem tomate.
5. Para o almoço e jantar, inclua combinações de 45% de carboidrato, 45% de proteína, 10% de legume ou salada.
6. Ajuste as quantidades dos alimentos em gramas para garantir que cada refeição atinja o valor calórico ideal.
7. Apresente as opções de forma clara, com cada alimento em uma linha separada para facilitar a visualização.
  Ajuste as quantidades dos alimentos em gramas para garantir que cada refeição corresponda ao valor calórico ideal, modificando as quantidades de gramas conforme necessário. 
  Finalize o plano sem adicionar mensagens ou observações adicionais após a última opção de jantar.
   
  `.trim();

  const result = {
    Prompt: {
      prompt: prompt,
      treino: treino,
      genero: userData.Genero,
    },
    Peso: peso,
    Altura: altura,
    Idade: idade,
    IMC: imc,
    TMB: tmb,
    Horarios: userData.Horarios,
    calorias: calorias || caloriasRecomendadas,
  };

  return NextResponse.json(result);
}
