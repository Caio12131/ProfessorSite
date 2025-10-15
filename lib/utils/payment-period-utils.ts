/**
 * Utilitários para calcular períodos de pagamento e determinar o mês de utilização
 */

export interface PaymentPeriod {
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageMonth: string;
}

/**
 * Determina o mês onde o usuário mais utilizou o sistema baseado no DiaPagamento
 * 
 * Regra: O dia do pagamento é sempre o dia atual + 1 no próximo mês
 * 
 * Exemplos:
 * - Pagamento em 16 de setembro: período principal é setembro (YYYY-09)
 * - Pagamento em 5 de agosto: período principal é agosto (YYYY-08)  
 * - Pagamento em 21 de janeiro: período principal é janeiro (YYYY-01)
 * 
 * @param diaPagamento Data de pagamento no formato "DD-MM-YYYY"
 * @param currentDate Data atual (opcional, usa new Date() se não informada)
 * @returns Objeto com informações do período de pagamento
 */
export function determineUsageMonth(
  diaPagamento: string,
  currentDate: Date = new Date()
): PaymentPeriod {
  if (!diaPagamento) {
    throw new Error("DiaPagamento é obrigatório");
  }

  const [dia, mesPagamento, ano] = diaPagamento.split('-').map(Number);
  
  if (!dia || !mesPagamento || !ano) {
    throw new Error("Formato de DiaPagamento inválido. Use DD-MM-YYYY");
  }

  const dataPagamento = new Date(ano, mesPagamento - 1, dia);
  const dataLimite = new Date(dataPagamento);
  dataLimite.setMonth(dataLimite.getMonth() + 1);
  dataLimite.setDate(dataLimite.getDate() + 1);

  const isActive = currentDate < dataLimite;
  
  // Determinar o mês de utilização baseado em qual mês tem mais dias
  // Se pagou até dia 15: período principal é o mês do pagamento
  // Se pagou após dia 15: período principal é o mês seguinte
  let usageMonth: string;
  
  if (dia <= 15) {
    // Pagou no início do mês: período principal é o mês do pagamento
    // Ex: pagamento em 14-07 → período principal é julho (07)
    usageMonth = `${ano}-${String(mesPagamento).padStart(2, '0')}`;
  } else {
    // Pagou no final do mês: período principal é o mês seguinte
    // Ex: pagamento em 31-08 → período principal é setembro (09)
    const mesSeguinte = new Date(ano, mesPagamento, 1);
    usageMonth = `${mesSeguinte.getFullYear()}-${String(mesSeguinte.getMonth() + 1).padStart(2, '0')}`;
  }

  return {
    startDate: dataPagamento,
    endDate: dataLimite,
    isActive,
    usageMonth
  };
}

/**
 * Verifica se uma data específica está dentro do período de pagamento
 * 
 * @param diaPagamento Data de pagamento no formato "DD-MM-YYYY"
 * @param checkDate Data a ser verificada
 * @returns true se a data está dentro do período ativo
 */
export function isWithinPaymentPeriod(
  diaPagamento: string,
  checkDate: Date = new Date()
): boolean {
  try {
    const period = determineUsageMonth(diaPagamento, checkDate);
    return period.isActive;
  } catch {
    return false;
  }
}

/**
 * Obtém o mês de utilização para uma data específica
 * 
 * @param diaPagamento Data de pagamento no formato "DD-MM-YYYY"
 * @param checkDate Data para calcular o mês de utilização
 * @returns String no formato "YYYY-MM" representando o mês de utilização
 */
export function getUsageMonthForDate(
  diaPagamento: string,
  checkDate: Date = new Date()
): string {
  const period = determineUsageMonth(diaPagamento, checkDate);
  return period.usageMonth;
}

/**
 * Calcula o período de pagamento completo
 * 
 * @param diaPagamento Data de pagamento no formato "DD-MM-YYYY"
 * @returns Objeto com data de início e fim do período
 */
export function calculatePaymentPeriod(diaPagamento: string): { start: Date; end: Date } {
  const [dia, mesPagamento, ano] = diaPagamento.split('-').map(Number);
  
  if (!dia || !mesPagamento || !ano) {
    throw new Error("Formato de DiaPagamento inválido. Use DD-MM-YYYY");
  }

  const start = new Date(ano, mesPagamento - 1, dia);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setDate(end.getDate() + 1);

  return { start, end };
}
