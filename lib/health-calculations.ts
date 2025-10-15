// Função para calcular o IMC (Índice de Massa Corporal)
export function calculateIMC(weight: number, heightCm: number): number {
  // Converter altura de cm para metros
  const heightM = heightCm / 100
  // Fórmula do IMC: peso / (altura * altura)
  const imc = weight / (heightM * heightM)
  // Retornar com 2 casas decimais
  return Number.parseFloat(imc.toFixed(2))
}

// Função para classificar o IMC
export function classifyIMC(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso"
  if (imc < 25) return "Peso normal"
  if (imc < 30) return "Sobrepeso"
  if (imc < 35) return "Obesidade grau 1"
  if (imc < 40) return "Obesidade grau 2"
  return "Obesidade grau 3"
}

// Função para calcular a TMB (Taxa Metabólica Basal) usando a fórmula de Harris-Benedict
export function calculateTMB(weight: number, heightCm: number, age: number, gender: string): number {
  if (gender === "Masculino") {
    // Fórmula para homens: TMB = 88.362 + (13.397 × peso em kg) + (4.799 × altura em cm) - (5.677 × idade em anos)
    const tmb = 88.362 + 13.397 * weight + 4.799 * heightCm - 5.677 * age
    return Math.round(tmb)
  } else {
    // Fórmula para mulheres: TMB = 447.593 + (9.247 × peso em kg) + (3.098 × altura em cm) - (4.330 × idade em anos)
    const tmb = 447.593 + 9.247 * weight + 3.098 * heightCm - 4.33 * age
    return Math.round(tmb)
  }
}

// Função para ajustar a TMB com base no nível de atividade física
export function adjustTMBByActivityLevel(tmb: number, activityLevel: string): number {
  switch (activityLevel) {
    case "sedentario":
      return Math.round(tmb * 1.2) // Sedentário (pouco ou nenhum exercício)
    case "leve":
      return Math.round(tmb * 1.375) // Levemente ativo (exercício leve 1-3 dias/semana)
    case "moderado":
      return Math.round(tmb * 1.45) // Moderadamente ativo (exercício moderado 3-5 dias/semana)
    case "intenso":
      return Math.round(tmb * 1.525) // Muito ativo (exercício intenso 6-7 dias/semana)
    case "muito_intenso":
      return Math.round(tmb * 1.6) // Extremamente ativo (exercício muito intenso, trabalho físico)
    default:
      return Math.round(tmb * 1.2) // Padrão: sedentário
  }
}

// Função para gerar recomendação calórica com base no objetivo
export function getCalorieRecommendation(adjustedTMB: number, goal: string): number {
  switch (goal) {
    case "perder_peso":
      return Math.round(adjustedTMB * 0.7) // Déficit calórico de 30%
    case "manter_peso":
      return Math.round(adjustedTMB * 0.9)// Manter calorias
    case "Emagrecer + Massa":
      return adjustedTMB
    case "ganhar_peso":
      return Math.round(adjustedTMB * 1.1) // Superávit calórico de 10%
    case "ganhar_massa":
      return Math.round(adjustedTMB * 1.15) // Superávit calórico de 15%
    default:
      return adjustedTMB // Padrão: manter
  }
}

