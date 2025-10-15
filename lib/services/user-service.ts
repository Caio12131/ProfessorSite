import { ref, update, get, set } from "firebase/database";
import { database } from "../../app/api/firebase";
import { 
  UserData, 
  UserStats, 
} from "../../types/user-data";
import { 
  validateUserId, 
} from "../../utils/validation";
import { 
  cacheUserData, 
  getCachedUserData, 
  cacheUserStats, 
  getCachedUserStats,
} from "../../utils/cache";
import { logger } from "../../utils/logger";

export const updateUserData = async (userId: string | null, userData: UserData) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    logger.info('Atualizando dados do usuário', {
      userId: userId || 'unknown',
      action: 'update_user_data',
      component: 'user_service'
    });

    await update(ref(database, `users/${userId || 'unknown'}`), userData);
    
    cacheUserData(userId || 'unknown', userData);
    
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao atualizar dados do usuário', {
      userId: userId || 'unknown',
      action: 'update_user_data_error',
      component: 'user_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

export const getUserData = async (userId: string | null): Promise<UserData | null> => {
  const startTime = Date.now();
  
  try {
    // Validação
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    if(!userId){
      throw new Error('Usuário não encontrado');
    }
    const cachedData = getCachedUserData(userId);
    if (cachedData) {
      return cachedData;
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val() as UserData;
      
      cacheUserData(userId || 'unknown', userData);
      
      return userData;
    }
    return null;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao obter dados do usuário', {
      userId: userId || 'unknown',
      action: 'get_user_data_error',
      component: 'user_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para inicializar dados do usuário
export const initializeUserData = async (userId: string | null) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }


    const userData: UserData = {
      userID: userId || 'unknown',
      refeicoes: {
        comentario: [],
        caloriasDiarias: []
      },
      hidratacao: [],
      treinoDaSemana: {
        dias: {
          domingo: false,
          segunda: false,
          terca: false,
          quarta: false,
          quinta: false,
          sexta: false,
          sabado: false
        },
        atividades: []
      },
      evolucao: {
        imagens: {
          urlFrontal: "",
          urlLateral: ""
        },
        medidas: []
      },
    };
    
    if(!userId){
      throw new Error('Usuário não encontrado');
    }
    await set(ref(database, `users/${userId }`), userData);
    
    cacheUserData(userId || 'unknown', userData);
    
    
    return userData;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao inicializar dados do usuário', {
      userId: userId || 'unknown',
      action: 'initialize_user_data_error',
      component: 'user_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

// Função para obter estatísticas resumidas
export const getUserStats = async (userId: string | null): Promise<UserStats | null> => {
  const startTime = Date.now();
  
  try {
    // Validação
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    if(!userId){
      throw new Error('Usuário não encontrado');
    }
    const cachedStats = getCachedUserStats(userId);
    if (cachedStats) {
      return cachedStats;
    }

    const userData = await getUserData(userId);
    if (!userData) return null;
    
    const hoje = new Date().toISOString().split('T')[0];
    
    const caloriasHoje = userData.refeicoes.caloriasDiarias.find(
      item => item.data === hoje
    );
    
    const hidratacaoHoje = userData.hidratacao.filter(
      item => item.horario.startsWith(hoje)
    ).reduce((total, item) => total + item.quantidade, 0);
    
    const treinosEstaSemana = Object.values(userData.treinoDaSemana.dias).filter(Boolean).length;
    
    const stats: UserStats = {
      caloriasHoje: caloriasHoje || {
        cafe: "0",
        lancheDaManha: "0",
        almoco: "0",
        lancheDaTarde: "0",
        janta: "0",
        data: hoje
      },
      hidratacaoHoje,
      treinosEstaSemana,
      streak: userData.evolucao.streak || {
        streakAtual: "0",
        streakMaximo: "0",
        ultimoDiaDeStreak: hoje,
        completouDesafio: false
      }
    };
    
    cacheUserStats(userId || 'unknown', stats);
    
    return stats;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao obter estatísticas do usuário', {
      userId: userId || 'unknown',
      action: 'get_user_stats_error',
      component: 'user_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    return null;
  }
};
