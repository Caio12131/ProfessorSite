import { ref, update, get } from "firebase/database";
import { database } from "../../app/api/firebase";
import { 
  validateUserId, 
  validateStreak
} from "../../utils/validation";
import { 
  invalidateUserCache
} from "../../utils/cache";
import { logger } from "../../utils/logger";
import { isWithinPaymentPeriod } from "../utils/payment-period-utils";

// Interface para streak (apenas dias consecutivos)
interface StreakData {
  streakAtual: string;
  streakMaximo: string;
  ultimoDiaDeStreak: string; // formato DD-MM-YYYY
}

// Função para obter a data atual no formato DD-MM-YYYY
const getCurrentDateFormatted = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  
  return formattedDate;
};

// Função para obter a data de ontem no formato DD-MM-YYYY
const getYesterdayFormatted = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const day = String(yesterday.getDate()).padStart(2, '0');
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const year = yesterday.getFullYear();
  return `${day}-${month}-${year}`;
};

// Função para converter string de data para Date
const parseDateString = (dateString: string): Date => {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return date;
};

// Função para calcular diferença em dias entre duas datas
const getDaysDifference = (date1: string, date2: string): number => {
  const d1 = parseDateString(date1);
  const d2 = parseDateString(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return daysDiff;
};

// Função para obter o DiaPagamento do usuário
const getUserDiaPagamento = async (userId: string): Promise<string | null> => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const userData = snapshot.val();
    return userData?.DiaPagamento || userData?.diaPagamento || null;
  } catch (error) {
    logger.warn('Erro ao obter DiaPagamento do usuário', {
      userId,
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
};

// Função para obter streak atual do usuário
export const getStreak = async (userId: string | null): Promise<StreakData | null> => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    const snapshot = await get(ref(database, `users/${userId || 'unknown'}/Evolucao/streak`));
    
    if (snapshot.exists()) {
      const streakData = snapshot.val() as StreakData;
      return streakData;
    }
    
    // Se não existir, retornar estrutura padrão
    const defaultStreak: StreakData = {
      streakAtual: "0",
      streakMaximo: "0",
      ultimoDiaDeStreak: getCurrentDateFormatted()
    };
    
    return defaultStreak;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao buscar streak', {
      userId: userId || 'unknown',
      action: 'get_streak_error',
      component: 'streak_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para atualizar streak baseado na lógica de dias consecutivos
export const updateStreak = async (userId: string | null, todasRefeicoesCompletas: boolean): Promise<StreakData> => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    // Verificar se o usuário está dentro do período de assinatura
    const diaPagamento = await getUserDiaPagamento(userId || 'unknown');
    if (diaPagamento) {
      const isWithinPeriod = isWithinPaymentPeriod(diaPagamento);
      if (!isWithinPeriod) {
        logger.info('Usuário fora do período de assinatura, não atualizando streak', {
          userId: userId || 'unknown',
          diaPagamento,
          action: 'streak_outside_subscription_period'
        });
        
        // Retornar streak atual sem alterações
        const currentStreak = await getStreak(userId);
        return currentStreak || {
          streakAtual: "0",
          streakMaximo: "0",
          ultimoDiaDeStreak: getCurrentDateFormatted()
        };
      }
    }

    // Obter streak atual
    const currentStreak = await getStreak(userId);
    if (!currentStreak) {
      throw new Error('Não foi possível obter streak atual');
    }

    const currentDate = getCurrentDateFormatted();
    const yesterday = getYesterdayFormatted();
    
    let newStreakAtual = parseInt(currentStreak.streakAtual);
    let newStreakMaximo = parseInt(currentStreak.streakMaximo);
    let newUltimoDiaDeStreak = currentStreak.ultimoDiaDeStreak;
    
    if (currentStreak.ultimoDiaDeStreak !== currentDate) {
      const daysDifference = getDaysDifference(currentStreak.ultimoDiaDeStreak, currentDate);
      
      if (daysDifference === 1) {
        // Dia consecutivo - verificar se completou todas as refeições do dia anterior
        if (todasRefeicoesCompletas) {
          // Manteve o streak - incrementar
          newStreakAtual += 1;
          newUltimoDiaDeStreak = currentDate;
          
          // Atualizar streak máximo se necessário
          if (newStreakAtual > newStreakMaximo) {
            newStreakMaximo = newStreakAtual;
          }
        } else {
          // Perdeu o streak - zerar
          newStreakAtual = 0;
          newUltimoDiaDeStreak = currentDate;
        }
      } else if (daysDifference > 1) {
        // Pulou dias - zerar streak
        newStreakAtual = 0;
        newUltimoDiaDeStreak = currentDate;
      }
      // daysDifference === 0 (mesmo dia) - não faz nada, mantém valores atuais
    }
    // Se ultimoDiaDeStreak === currentDate, mantém valores atuais sem alteração

    const updatedStreak: StreakData = {
      streakAtual: newStreakAtual.toString(),
      streakMaximo: newStreakMaximo.toString(),
      ultimoDiaDeStreak: newUltimoDiaDeStreak
    };

    // Salvar no Firebase
    await update(ref(database, `users/${userId || 'unknown'}/Evolucao`), {
      streak: updatedStreak
    });
    
    invalidateUserCache(userId || 'unknown');
    
    return updatedStreak;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao atualizar streak', {
      userId: userId || 'unknown',
      action: 'update_streak_error',
      component: 'streak_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para resetar streak (para casos especiais)
export const resetStreak = async (userId: string | null): Promise<StreakData> => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }
    const resetStreak: StreakData = {
      streakAtual: "0",
      streakMaximo: "0",
      ultimoDiaDeStreak: getCurrentDateFormatted()
    };

    await update(ref(database, `users/${userId || 'unknown'}/Evolucao`), {
      streak: resetStreak
    });
    
    invalidateUserCache(userId || 'unknown');
    
    return resetStreak;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao resetar streak', {
      userId: userId || 'unknown',
      action: 'reset_streak_error',
      component: 'streak_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para inicializar streak (para novos usuários)
export const initializeStreak = async (userId: string | null): Promise<StreakData> => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    const initialStreak: StreakData = {
      streakAtual: "0",
      streakMaximo: "0",
      ultimoDiaDeStreak: getCurrentDateFormatted()
    };

    await update(ref(database, `users/${userId || 'unknown'}/Evolucao`), {
      streak: initialStreak
    });
    
    invalidateUserCache(userId || 'unknown');
    
    return initialStreak;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao inicializar streak', {
      userId: userId || 'unknown',
      action: 'initialize_streak_error',
      component: 'streak_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};
