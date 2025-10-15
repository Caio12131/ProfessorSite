import { ref, update, get } from "firebase/database";
import { database } from "../../app/api/firebase";
import { 
  AtividadeTreino, 
  TreinoDaSemana
} from "../../types/user-data";
import { 
  validateUserId, 
  validateAtividadeTreino
} from "../../utils/validation";
import { 
  invalidateUserCache
} from "../../utils/cache";
import { logger } from "../../utils/logger";
// Sem Evolucao[] helpers

export const updateTreinoDaSemana = async (userId: string | null, treinoDaSemana: TreinoDaSemana) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }


    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/TreinoDaSemana": treinoDaSemana,
    });
    
    invalidateUserCache(userId || 'unknown');
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao atualizar treino da semana', {
      userId: userId || 'unknown',
      action: 'update_treino_da_semana_error',
      component: 'workout_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

export const addAtividadeTreino = async (userId: string | null, atividade: AtividadeTreino) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    const atividadeValidation = validateAtividadeTreino(atividade);
    if (!atividadeValidation.isValid) {
      throw new Error(`Validação de atividade falhou: ${atividadeValidation.errors.join(', ')}`);
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) throw new Error('Usuário não encontrado');
    const userData = snapshot.val();
    const atuaisUpper = userData?.Evolucao?.TreinoDaSemana?.atividades || [];
    const atuaisLower = userData?.evolucao?.treinoDaSemana?.atividades || [];
    const atuais = Array.isArray(atuaisUpper) ? atuaisUpper : atuaisLower;
    const dias = userData?.Evolucao?.TreinoDaSemana?.dias || userData?.evolucao?.treinoDaSemana?.dias || {
      domingo: false, segunda: false, terca: false, quarta: false, quinta: false, sexta: false, sabado: false
    };
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/TreinoDaSemana": {
        dias,
        atividades: [...atuais, atividade],
      }
    });
    
    invalidateUserCache(userId || 'unknown');
    
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao adicionar atividade de treino', {
      userId: userId || 'unknown',
      action: 'add_atividade_treino_error',
      component: 'workout_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

export const getTreinosDaSemana = async (userId: string | null, dataInicio: string, dataFim: string): Promise<AtividadeTreino[]> => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return [];
    const userData = snapshot.val();
    const atividades = userData?.Evolucao?.TreinoDaSemana?.atividades || userData?.evolucao?.treinoDaSemana?.atividades || userData?.treinoDaSemana?.atividades || [];
    
    const treinosFiltrados = atividades.filter((atividade: AtividadeTreino) => 
      atividade.data >= dataInicio && atividade.data <= dataFim
    );
    
    return treinosFiltrados;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao obter treinos da semana', {
      userId: userId || 'unknown',
      action: 'get_treinos_da_semana_error',
      component: 'workout_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    return [];
  }
};
