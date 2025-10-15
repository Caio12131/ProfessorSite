import { ref, update, get, push } from "firebase/database";
import { database } from "../../app/api/firebase";
import { 
  invalidateUserCache
} from "../../utils/cache";
import { logger } from "../../utils/logger";
import { Desafio } from "../../types/user-data";
import { getUsageMonthForDate } from "../utils/payment-period-utils";

// Função para obter a data atual no formato DD-MM-YYYY
const getCurrentDateFormatted = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

// Função para obter o período de assinatura atual baseado no DiaPagamento
const getCurrentSubscriptionPeriod = async (userId: string): Promise<string> => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      throw new Error('Usuário não encontrado');
    }
    
    const userData = snapshot.val();
    const diaPagamento = userData?.DiaPagamento || userData?.diaPagamento;
    
    if (!diaPagamento) {
      // Fallback para mês atual se não tiver DiaPagamento
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${month}-${year}`;
    }
    
    // Usar o sistema de períodos de pagamento
    const usageMonth = getUsageMonthForDate(diaPagamento);
    const [year, month] = usageMonth.split('-');
    return `${month}-${year}`;
  } catch (error) {
    logger.warn('Erro ao obter período de assinatura, usando mês atual', {
      userId,
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Fallback para mês atual
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}-${year}`;
  }
};

// Função obter desafios do usuário
export const getDesafios = async (userId: string | null): Promise<Desafio[]> => {
  const startTime = Date.now();
  
  try {
    if (!userId) {
      throw new Error('UserId é obrigatório');
    }

    const snapshot = await get(ref(database, `users/${userId}/Evolucao/desafios`));
    
    if (snapshot.exists()) {
      const desafios = snapshot.val();
      const duration = Date.now() - startTime;
      
      // Se for um objeto (estrutura correta), converter para array
      if (desafios && typeof desafios === 'object' && !Array.isArray(desafios)) {
        const desafiosArray = Object.entries(desafios).map(([key, value]) => ({
          ...(value as any),
          diaDoPagamento: key // Usar a chave como diaDoPagamento
        })) as Desafio[];
        return desafiosArray;
      }
      
      // Se for array (estrutura antiga), retornar como está
      if (Array.isArray(desafios)) {
        return desafios;
      }
      
      return [];
    }
    
    // Se não existir, retornar array vazio
    const duration = Date.now() - startTime;
    return [];
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao buscar desafios', {
      userId: userId || 'unknown',
      action: 'get_desafios_error',
      component: 'desafio_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para obter ou criar desafio do período de assinatura atual
export const getOrCreateDesafioAtual = async (userId: string | null): Promise<Desafio> => {
  try {
    if (!userId) {
      throw new Error('UserId é obrigatório');
    }

    const desafios = await getDesafios(userId);
    const periodoAtual = await getCurrentSubscriptionPeriod(userId);
    
    // Buscar desafio do período atual
    let desafioAtual = desafios.find(d => d.diaDoPagamento === periodoAtual);
    
    if (!desafioAtual) {
      // Determinar o número do ciclo baseado nos desafios já completos
      const desafiosCompletos = desafios.filter(d => d.dataCompletouDesafio).length;
      const proximoCiclo = desafiosCompletos + 1;
      
      // Criar novo desafio para o período atual
      desafioAtual = {
        diasEfetuados: 0,
        dataCompletouDesafio: "",
        diaDoPagamento: periodoAtual,
        ultimoDiaRegistrado: "",
        dataInicio: getCurrentDateFormatted(),
        ciclo: proximoCiclo
      };
      
      // Salvar com a chave sendo o período (estrutura correta)
      await update(ref(database, `users/${userId}/Evolucao/desafios`), {
        [periodoAtual]: desafioAtual
      });
    }
    
    return desafioAtual;
  } catch (error) {
    logger.error('Erro ao obter/criar desafio atual', {
      userId: userId || 'unknown',
      action: 'get_or_create_desafio_error',
      component: 'desafio_service'
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para atualizar desafio baseado no registro de refeições
export const updateDesafio = async (userId: string | null, todasRefeicoesCompletas: boolean): Promise<Desafio> => {
  const startTime = Date.now();
  
  try {
    if (!userId) {
      throw new Error('UserId é obrigatório');
    }

    logger.info('Atualizando desafio do usuário', {
      userId,
      action: 'update_desafio',
      component: 'desafio_service',
      todasRefeicoesCompletas
    });

    const desafios = await getDesafios(userId);
    const periodoAtual = await getCurrentSubscriptionPeriod(userId);
    const dataAtual = getCurrentDateFormatted();
    
    // Buscar desafio do período atual
    let desafioAtual = desafios.find(d => d.diaDoPagamento === periodoAtual);
    
    if (!desafioAtual) {
      // Determinar o número do ciclo baseado nos desafios já completos
      const desafiosCompletos = desafios.filter(d => d.dataCompletouDesafio).length;
      const proximoCiclo = desafiosCompletos + 1;
      
      // Criar novo desafio para o período atual
      desafioAtual = {
        diasEfetuados: 0,
        dataCompletouDesafio: "",
        diaDoPagamento: periodoAtual,
        ultimoDiaRegistrado: "",
        dataInicio: dataAtual,
        ciclo: proximoCiclo
      };
    }
    
    // Verificar se já completou o desafio hoje
    if (todasRefeicoesCompletas && desafioAtual.ultimoDiaRegistrado !== dataAtual) {
      // Incrementar dias efetuados
      desafioAtual.diasEfetuados += 1;
      // Atualizar último dia registrado
      desafioAtual.ultimoDiaRegistrado = dataAtual;
      
      // Verificar se atingiu o objetivo baseado no ciclo
      const objetivoDias = desafioAtual.ciclo === 2 ? 25 : 21;
      if (desafioAtual.diasEfetuados >= objetivoDias && !desafioAtual.dataCompletouDesafio) {
        desafioAtual.dataCompletouDesafio = dataAtual;
        
      }
      
      // Salvar no Firebase com a chave sendo o período
      await update(ref(database, `users/${userId}/Evolucao/desafios`), {
        [periodoAtual]: desafioAtual
      });
      
      invalidateUserCache(userId);
      
    }
    
    return desafioAtual;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao atualizar desafio', {
      userId: userId || 'unknown',
      action: 'update_desafio_error',
      component: 'desafio_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para resetar desafio (para casos especiais)
export const resetDesafio = async (userId: string | null): Promise<Desafio> => {
  try {
    if (!userId) {
      throw new Error('UserId é obrigatório');
    }

    const desafios = await getDesafios(userId);
    const periodoAtual = await getCurrentSubscriptionPeriod(userId);
    
    // Buscar desafio do período atual
    let desafioAtual = desafios.find(d => d.diaDoPagamento === periodoAtual);
    
    if (!desafioAtual) {
      // Determinar o número do ciclo baseado nos desafios já completos
      const desafiosCompletos = desafios.filter(d => d.dataCompletouDesafio).length;
      const proximoCiclo = desafiosCompletos + 1;
      const dataAtual = getCurrentDateFormatted();
      
      // Criar novo desafio resetado
      desafioAtual = {
        diasEfetuados: 0,
        dataCompletouDesafio: "",
        diaDoPagamento: periodoAtual,
        ultimoDiaRegistrado: "",
        dataInicio: dataAtual,
        ciclo: proximoCiclo
      };
    } else {
      // Resetar desafio existente
      desafioAtual = {
        ...desafioAtual,
        diasEfetuados: 0,
        dataCompletouDesafio: ""
      };
    }
    
    // Salvar no Firebase com a chave sendo o período
    await update(ref(database, `users/${userId}/Evolucao/desafios`), {
      [periodoAtual]: desafioAtual
    });
    
    invalidateUserCache(userId);
    
    return desafioAtual;
  } catch (error) {
    logger.error('Erro ao resetar desafio', {
      userId: userId || 'unknown',
      action: 'reset_desafio_error',
      component: 'desafio_service'
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para criar um novo desafio automaticamente
export const criarNovoDesafio = async (userId: string | null): Promise<Desafio> => {
  const startTime = Date.now();
  
  try {
    if (!userId) {
      throw new Error('UserId é obrigatório');
    }

    const periodoAtual = await getCurrentSubscriptionPeriod(userId);
    const dataAtual = getCurrentDateFormatted();
    
    // Obter desafios existentes para determinar o número do ciclo
    const desafios = await getDesafios(userId);
    const desafiosCompletos = desafios.filter(d => d.dataCompletouDesafio).length;
    const proximoCiclo = desafiosCompletos + 1;
    
    const novoDesafio: Desafio = {
      diasEfetuados: 0,
      dataCompletouDesafio: "",
      diaDoPagamento: periodoAtual,
      ultimoDiaRegistrado: "",
      dataInicio: dataAtual,
      ciclo: proximoCiclo
    };

    // Salvar o novo desafio no Firebase
    await update(ref(database, `users/${userId}/Evolucao/desafios`), {
      [periodoAtual]: novoDesafio
    });

    invalidateUserCache(userId);
    

    return novoDesafio;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao criar novo desafio', {
      userId: userId || 'unknown',
      action: 'criar_novo_desafio_error',
      component: 'desafio_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para criar desafio 2 no mesmo período quando desafio 1 for completado
export const criarDesafio2NoMesmoPeriodo = async (userId: string | null): Promise<Desafio> => {
  try {
    if (!userId) {
      throw new Error('UserId é obrigatório');
    }

    const periodoAtual = await getCurrentSubscriptionPeriod(userId);
    const dataAtual = getCurrentDateFormatted();
    
    // Criar desafio 2 com ciclo 2
    const desafio2: Desafio = {
      diasEfetuados: 0,
      dataCompletouDesafio: "",
      diaDoPagamento: periodoAtual,
      ultimoDiaRegistrado: "",
      dataInicio: dataAtual,
      ciclo: 2
    };

    // Salvar o desafio 2 no Firebase
    await update(ref(database, `users/${userId}/Evolucao/desafios`), {
      [periodoAtual]: desafio2
    });

    invalidateUserCache(userId);
    return desafio2;
  } catch (error) {
    logger.error('Erro ao criar desafio 2 no mesmo período', {
      userId: userId || 'unknown',
      action: 'criar_desafio_2_mesmo_periodo_error',
      component: 'desafio_service'
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};
