import { ref, update, get } from "firebase/database";
import { database } from "../../app/api/firebase";
import { 
  ComentarioRefeicao, 
  CaloriasDiariasComData, 
  Hidratacao
} from "../../types/user-data";
// Reorganizado para gravar em evolucao/* sem Evolucao[]
import { 
  validateUserId, 
  validateHidratacao, 
  validateCaloriasDiarias,
  validateComentarioRefeicao
} from "../../utils/validation";
import { 
  cacheCalories,
  getCachedCalories,
  cacheHydration,
  getCachedHydration,
  invalidateUserCache
} from "../../utils/cache";
import { logger } from "../../utils/logger";

export const addComentarioRefeicao = async (userId: string | null, comentario: ComentarioRefeicao) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    // Validar o comentário antes de salvar
    const comentarioValidation = validateComentarioRefeicao(comentario);
    if (!comentarioValidation.isValid) {
      throw new Error(`Validação do comentário falhou: ${comentarioValidation.errors.join(', ')}`);
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) throw new Error('Usuário não encontrado');
    const userData = snapshot.val();
    const atuaisUpper = userData?.Evolucao?.Refeicoes?.Comentario || [];
    const atuaisLower = userData?.evolucao?.refeicoes?.comentario || [];
    const atuais = Array.isArray(atuaisUpper) ? atuaisUpper : atuaisLower;
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Refeicoes/Comentario": [...atuais, comentario],
    });
    
    invalidateUserCache(userId || 'unknown');
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao adicionar comentário de refeição', {
      userId: userId || 'unknown',
      action: 'add_comentario_refeicao_error',
      component: 'nutrition_service',
      dailyNote: comentario.nota,
      emojis: comentario.emojis,
      userId: userId || 'unknown',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};
export const getComentarioRefeicao = async (userId: string | null) => {
  const userRef = ref(database, `users/${userId || 'unknown'}`);
  const snapshot = await get(userRef);
  const val = snapshot.val();
  return val?.Evolucao?.Refeicoes?.Comentario || val?.refeicoes?.comentario || val?.evolucao?.refeicoes?.comentario || [];
};
export const updateCaloriasDiarias = async (userId: string | null, caloriasDiarias: CaloriasDiariasComData) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    const caloriasValidation = validateCaloriasDiarias(caloriasDiarias);
    if (!caloriasValidation.isValid) {
      throw new Error(`Validação de calorias falhou: ${caloriasValidation.errors.join(', ')}`);
    }


    // CORRIGIDO: Salvar como objeto único para o dia atual, não como array
    // O banco limpa às 00:00hrs, então não precisamos manter histórico
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Refeicoes/CaloriasDiarias": caloriasDiarias,
    });
    
    // Invalidar o cache para forçar leitura do Firebase na próxima consulta
    invalidateUserCache(userId || 'unknown');
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao atualizar calorias diárias', {
      userId: userId || 'unknown',
      action: 'update_calorias_diarias_error',
      component: 'nutrition_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

export const getCaloriasDiarias = async (userId: string | null, data: string): Promise<CaloriasDiariasComData | null> => {
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
    const cachedCalories = getCachedCalories(userId, data);
    if (cachedCalories) {
      return cachedCalories;
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const userData = snapshot.val();
    
    // CORRIGIDO: Buscar objeto único de calorias diárias, não array
    const caloriasDiarias = userData?.Evolucao?.Refeicoes?.CaloriasDiarias || 
                            userData?.refeicoes?.caloriasDiarias || 
                            userData?.evolucao?.refeicoes?.caloriasDiarias;
    
    // Verificar se as calorias são para a data atual
    if (caloriasDiarias && caloriasDiarias.data === data) {
      cacheCalories(userId || 'unknown', data, caloriasDiarias);
      return caloriasDiarias;
    }
    return null;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao obter calorias diárias', {
      userId: userId || 'unknown',
      action: 'get_calorias_diarias_error',
      component: 'nutrition_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    return null;
  }
};

export const updateComentarioRefeicao = async (userId: string | null, comentario: ComentarioRefeicao) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    // Validar o comentário antes de salvar
    const comentarioValidation = validateComentarioRefeicao(comentario);
    if (!comentarioValidation.isValid) {
      throw new Error(`Validação do comentário falhou: ${comentarioValidation.errors.join(', ')}`);
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) throw new Error('Usuário não encontrado');
    const userData = snapshot.val();
    const atuaisUpper = userData?.Evolucao?.Refeicoes?.Comentario || [];
    const atuaisLower = userData?.evolucao?.refeicoes?.comentario || [];
    const atuais = Array.isArray(atuaisUpper) ? atuaisUpper : atuaisLower;
    
    // Verificar se já existe um comentário para hoje
    const todayISO = new Date().toISOString().split("T")[0];
    const existingIndex = atuais.findIndex((c: any) => c.data === todayISO);
    
    let novosComentarios;
    if (existingIndex >= 0) {
      // Atualizar comentário existente
      novosComentarios = [...atuais];
      novosComentarios[existingIndex] = comentario;
    } else {
      // Adicionar novo comentário
      novosComentarios = [...atuais, comentario];
    }
    
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Refeicoes/Comentario": novosComentarios,
    });
    
    invalidateUserCache(userId || 'unknown');
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao atualizar comentário de refeição', {
      userId: userId || 'unknown',
      action: 'update_comentario_refeicao_error',
      component: 'nutrition_service',
      dailyNote: comentario.nota,
      emojis: comentario.emojis,
      userId: userId || 'unknown',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

export const addHidratacao = async (userId: string | null, hidratacao: Hidratacao) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }

    const hidratacaoValidation = validateHidratacao(hidratacao);
    if (!hidratacaoValidation.isValid) {
      throw new Error(`Validação de hidratação falhou: ${hidratacaoValidation.errors.join(', ')}`);
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) throw new Error('Usuário não encontrado');
    const userData = snapshot.val();
    const atuaisUpper = userData?.Evolucao?.Hidratacao || [];
    const atuaisLower = userData?.evolucao?.hidratacao || userData?.hidratacao || [];
    const atuais = Array.isArray(atuaisUpper) ? atuaisUpper : atuaisLower;
    const atualizada = [...atuais, hidratacao];
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Hidratacao": atualizada,
    });
    
    const data = hidratacao.horario.split('T')[0];
    cacheHydration(userId || 'unknown', data, atualizada);
    
    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    if(!userId){
      throw new Error('Usuário não encontrado');
    }
    logger.error('Erro ao adicionar hidratação', {
      userId,
      action: 'add_hidratacao_error',
      component: 'nutrition_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

export const getHidratacaoDiaria = async (userId: string | null, data: string): Promise<number> => {
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
    const cachedHydration = getCachedHydration(userId, data);
    if (cachedHydration) {
      
      const total = cachedHydration.reduce((sum: number, item: any) => sum + item.quantidade, 0);
      return total;
    }

    // Ler de evolucao/hidratacao com fallback legado
    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return 0;
    const userData = snapshot.val();
    const hidratacaoUpper = userData?.Evolucao?.Hidratacao || [];
    const hidratacaoLower = userData?.evolucao?.hidratacao || userData?.hidratacao || [];
    const hidratacao = Array.isArray(hidratacaoUpper) ? hidratacaoUpper : hidratacaoLower;
    const hidratacaoDoDia = (hidratacao as any[]).filter(item => item.horario?.startsWith(data));
    
    const total = hidratacaoDoDia.reduce((total, item) => total + item.quantidade, 0);
    
    cacheHydration(userId || 'unknown', data, hidratacaoDoDia);
    
    const duration = Date.now() - startTime;
    
    return total;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao obter hidratação diária', {
      userId: userId || 'unknown',
      action: 'get_hidratacao_diaria_error',
      component: 'nutrition_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    return 0;
  }
};

// Remove um registro específico de hidratação pelo timestamp exato
export const removeHidratacaoByTimestamp = async (userId: string | null, timestampIso: string) => {
  const startTime = Date.now();
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }
    if (!userId) throw new Error('Usuário não encontrado');

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return;
    const userData = snapshot.val();
    const listaUpper: any[] = userData?.Evolucao?.Hidratacao || [];
    const listaLower: any[] = userData?.evolucao?.hidratacao || userData?.hidratacao || [];
    const lista: any[] = Array.isArray(listaUpper) ? listaUpper : listaLower;

    const idx = lista.findIndex((i: any) => i?.horario === timestampIso);
    if (idx === -1) return;

    const novaLista = [...lista.slice(0, idx), ...lista.slice(idx + 1)];
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Hidratacao": novaLista,
    });

    const data = (timestampIso || '').split('T')[0];
    const doDia = novaLista.filter((i: any) => i?.horario?.startsWith(data));
    cacheHydration(userId || 'unknown', data, doDia);

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao remover hidratação por timestamp', {
      userId: userId || 'unknown',
      action: 'remove_hidratacao_by_timestamp_error',
      component: 'nutrition_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}

// Remove o último registro de hidratação do dia, preferindo o que bate com a quantidade informada
export const removeLastHidratacaoDoDia = async (userId: string | null, data: string, amount?: number) => {
  const startTime = Date.now();
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }
    if(!userId){
      throw new Error('Usuário não encontrado');
    }

    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return;
    const userData = snapshot.val();
    const listaUpper: any[] = userData?.Evolucao?.Hidratacao || [];
    const listaLower: any[] = userData?.evolucao?.hidratacao || userData?.hidratacao || [];
    const lista: any[] = Array.isArray(listaUpper) ? listaUpper : listaLower;

    // Encontrar do fim para o começo
    let idx = -1;
    if (typeof amount === 'number') {
      for (let i = lista.length - 1; i >= 0; i--) {
        const it = lista[i];
        if (it?.horario?.startsWith(data) && Number(it?.quantidade) === amount) { idx = i; break; }
      }
    }
    if (idx === -1) {
      for (let i = lista.length - 1; i >= 0; i--) {
        const it = lista[i];
        if (it?.horario?.startsWith(data)) { idx = i; break; }
      }
    }
    if (idx === -1) return;

    const novaLista = [...lista.slice(0, idx), ...lista.slice(idx + 1)];
    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Hidratacao": novaLista,
    });

    // Atualizar cache apenas do dia
    // Invalida o cache do dia para forçar leitura consistente
    cacheHydration(userId || 'unknown', data, novaLista.filter((i: any) => i?.horario?.startsWith(data)));

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao remover hidratação', {
      userId: userId || 'unknown',
      action: 'remove_last_hidratacao_error',
      component: 'nutrition_service',
      duration
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}

// Remove calorias de uma refeição específica do dia
export const removeCaloriasDiarias = async (userId: string | null, data: string, mealKey: string) => {
  const startTime = Date.now();
  
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(', ')}`);
    }
    if (!userId) throw new Error('Usuário não encontrado');


    const userRef = ref(database, `users/${userId || 'unknown'}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return;
    
    const userData = snapshot.val();
    
    // CORRIGIDO: Buscar objeto único de calorias diárias, não array
    const caloriasDiarias = userData?.Evolucao?.Refeicoes?.CaloriasDiarias || 
                            userData?.refeicoes?.caloriasDiarias || 
                            userData?.evolucao?.refeicoes?.caloriasDiarias;
    
    // Se não há calorias para a data atual, não há o que remover
    if (!caloriasDiarias || caloriasDiarias.data !== data) {
      return null;
    }

    // Criar nova estrutura com a refeição removida
    const novasCalorias = {
      ...caloriasDiarias,
      [mealKey]: "0" // Zerar as calorias da refeição específica
    };

    await update(ref(database, `users/${userId || 'unknown'}`), {
      "Evolucao/Refeicoes/CaloriasDiarias": novasCalorias,
    });
    
    // Invalidar o cache para forçar leitura do Firebase na próxima consulta
    invalidateUserCache(userId || 'unknown');
    
    
    return novasCalorias;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Erro ao remover calorias de refeição', {
      userId: userId || 'unknown',
      action: 'remove_calorias_diarias_error',
      component: 'nutrition_service',
      duration,
      mealKey,
      data
    }, error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};
