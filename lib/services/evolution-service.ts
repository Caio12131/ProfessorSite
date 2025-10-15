import { ref, update, get } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../../app/api/firebase";
import {
  ImagensEvolucao,
  MedidasCorporais,
  FotoMensal,
} from "../../types/user-data";
import {
  validateUserId,
  validateMedidasCorporais,
} from "../../utils/validation";
import {
  cacheMeasures,
  getCachedMeasures,
  invalidateUserCache,
} from "../../utils/cache";
import { logger } from "../../utils/logger";
import { determineUsageMonth } from "../../lib/utils/payment-period-utils";
// Sem uso de Evolucao[]

export const updateImagensEvolucao = async (
  userId: string | null,
  imagens: ImagensEvolucao
) => {
  const startTime = Date.now();

  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(", ")}`);
    }

    await update(ref(database, `users/${userId || "unknown"}`), {
      "Evolucao/Imagens": imagens,
    });

    invalidateUserCache(userId || "unknown");


    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      "Erro ao atualizar imagens de evolução",
      {
        userId: userId || "unknown",
        action: "update_imagens_evolucao_error",
        component: "evolution_service",
        duration,
      },
      error instanceof Error ? error : new Error(String(error))
    );
    throw error;
  }
};

export const addMedidaCorporal = async (
  userId: string | null,
  medida: MedidasCorporais
) => {
  const startTime = Date.now();

  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(", ")}`);
    }

    // Validar a medida em si (permitindo zeros para campos não informados)
    const medidasValidation = validateMedidasCorporais(medida);
    if (!medidasValidation.isValid) {
      throw new Error(
        `Validação de medidas falhou: ${medidasValidation.errors.join(", ")}`
      );
    }

    const userRef = ref(database, `users/${userId || "unknown"}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error("Usuário não encontrado");
    }
    const userData = snapshot.val();
    const medidasAtuais: MedidasCorporais[] =
      userData?.Evolucao?.Medidas ||
      userData?.evolucao?.medidas ||
      [];
    const idx = medidasAtuais.findIndex(
      (m: MedidasCorporais) => m.data === medida.data
    );
    let medidasAtualizadas: MedidasCorporais[];
    if (idx >= 0) {
      const existente = medidasAtuais[idx];
      medidasAtualizadas = [...medidasAtuais];
      // CORREÇÃO: Preservar peso existente quando não estamos editando peso
      // Se medida.peso é válido (> 0), usar ele. Senão, SEMPRE preservar o peso existente
      const pesoFinal = medida.peso > 0 ? medida.peso : existente.peso;

      medidasAtualizadas[idx] = {
        data: medida.data,
        peso: pesoFinal,
        cintura: medida.cintura > 0 ? medida.cintura : existente.cintura || 0,
        quadril: medida.quadril > 0 ? medida.quadril : existente.quadril || 0,
        braço: medida.braço > 0 ? medida.braço : existente.braço || 0,
        coxa: medida.coxa > 0 ? medida.coxa : existente.coxa || 0,
        limite: medida.limite || existente.limite || 100,
      };
    } else {
      medidasAtualizadas = [...medidasAtuais, medida];
    }

    await update(ref(database, `users/${userId || "unknown"}`), {
      "Evolucao/Medidas": medidasAtualizadas,
    });

    cacheMeasures(userId || "unknown", medidasAtualizadas);

    return;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      "Erro ao adicionar medida corporal",
      {
        userId: userId || "unknown",
        action: "add_medida_corporal_error",
        component: "evolution_service",
        duration,
      },
      error instanceof Error ? error : new Error(String(error))
    );
    throw error;
  }
};

export const getMedidasCorporais = async (
  userId: string | null
): Promise<MedidasCorporais[]> => {
  const startTime = Date.now();

  try {
    // Validação
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(", ")}`);
    }
    if (!userId) {
      throw new Error("Usuário não encontrado");
    }
    const cachedMeasures = getCachedMeasures(userId);
    if (cachedMeasures) {
      return cachedMeasures;
    }

    const userRef = ref(database, `users/${userId || "unknown"}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return [];
    }

    const userData = snapshot.val();
    const medidas = (userData?.Evolucao?.Medidas ||
      userData?.evolucao?.medidas ||
      []) as MedidasCorporais[];

    // Ordenar por data (ascendente) para garantir que a primeira medida seja a mais antiga
    const medidasOrdenadas = medidas.slice().sort((a, b) => {
      // Converter data do formato DD-MM-YYYY para Date
      const parseData = (dataStr: string) => {
        const [dia, mes, ano] = dataStr.split('-');
        if (dia && mes && ano) {
          return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
        }
        return new Date(0); // Data inválida
      };
      
      const da = parseData(a.data).getTime();
      const db = parseData(b.data).getTime();
      return da - db;
    });

    cacheMeasures(userId || "unknown", medidasOrdenadas);

    return medidasOrdenadas;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      "Erro ao obter medidas corporais",
      {
        userId: userId || "unknown",
        action: "get_medidas_corporais_error",
        component: "evolution_service",
        duration,
      },
      error instanceof Error ? error : new Error(String(error))
    );
    return [];
  }
};

export const uploadFotoMensal = async (
  userId: string,
  file: File,
  meta?: { titulo?: string; descricao?: string }
): Promise<{ mes: string; url: string; titulo?: string; descricao?: string }> => {
  const startTime = Date.now();
  
  try {
    const podeUpload = await podeFazerUploadMes(userId);
    if (!podeUpload) {
      throw new Error("Já existe uma foto para este período de pagamento. Aguarde o próximo período para enviar uma nova foto.");
    }

    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error("Usuário não encontrado");
    }
    
    const userData = snapshot.val();
    const diaPagamento = userData?.DiaPagamento || userData?.diaPagamento;
    
    let mes: string;
    
    if (diaPagamento) {
      try {
        const paymentPeriod = determineUsageMonth(diaPagamento);
        mes = paymentPeriod.usageMonth;
      } catch (error) {
        logger.warn("Erro ao calcular mês de utilização, usando mês atual", {
          userId,
          diaPagamento,
          error: error instanceof Error ? error.message : String(error)
        });
        
        const now = new Date();
        mes = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      }
    } else {
      const now = new Date();
      mes = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }

    const path = `users/${userId}/Evolucao/FotosMensais/${mes}.jpg`;

    const sRef = storageRef(storage, path);
    await uploadBytes(sRef, file, { contentType: file.type || "image/jpeg" });
    const url = await getDownloadURL(sRef);

    const existentes: FotoMensal[] =
      userData?.Evolucao?.FotosMensais ||
      userData?.evolucao?.fotosMensais ||
      [];
    
    const atualizadas: FotoMensal[] = [
      ...existentes,
      { mes, url, titulo: meta?.titulo, descricao: meta?.descricao },
    ];

    await update(ref(database, `users/${userId}`), {
      "Evolucao/FotosMensais": atualizadas,
    });


    return { mes, url, titulo: meta?.titulo, descricao: meta?.descricao };
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      "Erro ao enviar foto mensal",
      {
        userId: userId || "unknown",
        action: "upload_foto_mensal_error",
        component: "evolution_service",
        duration,
        error: error instanceof Error ? error.message : String(error),
      }
    );
    throw error;
  }
};

export const editFotoMensal = async (
  userId: string | null,
  mes: string,
  meta: { titulo?: string; descricao?: string; file?: File }
): Promise<FotoMensal> => {
  const startTime = Date.now();

  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(", ")}`);
    }
    if (!userId) {
      throw new Error("Usuário não encontrado");
    }


    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error("Usuário não encontrado");
    }

    const userData = snapshot.val();
    const fotosExistentes: FotoMensal[] =
      userData?.Evolucao?.FotosMensais ||
      userData?.evolucao?.fotosMensais ||
      [];

    const fotoIndex = fotosExistentes.findIndex(f => f.mes === mes);
    if (fotoIndex === -1) {
      throw new Error("Foto não encontrada para o mês especificado");
    }

    let url = fotosExistentes[fotoIndex].url;

    // Se uma nova imagem foi fornecida, fazer upload
    if (meta.file) {
      const path = `users/${userId}/Evolucao/FotosMensais/${mes}.jpg`;
      const sRef = storageRef(storage, path);
      await uploadBytes(sRef, meta.file, { contentType: meta.file.type || "image/jpeg" });
      url = await getDownloadURL(sRef);
    }

    // Atualizar a foto na array
    const fotosAtualizadas = [...fotosExistentes];
    fotosAtualizadas[fotoIndex] = {
      mes,
      url,
      titulo: meta.titulo !== undefined ? meta.titulo : fotosExistentes[fotoIndex].titulo,
      descricao: meta.descricao !== undefined ? meta.descricao : fotosExistentes[fotoIndex].descricao,
    };

    await update(ref(database, `users/${userId}`), {
      "Evolucao/FotosMensais": fotosAtualizadas,
    });


    return fotosAtualizadas[fotoIndex];
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      "Erro ao editar foto mensal",
      {
        userId: userId || "unknown",
        action: "edit_foto_mensal_error",
        component: "evolution_service",
        duration,
        mes,
      },
      error instanceof Error ? error : new Error(String(error))
    );
    throw error;
  }
};

export const editPrimeiraFoto = async (
  userId: string | null,
  meta: { titulo?: string; descricao?: string; file?: File }
): Promise<FotoMensal | null> => {
  const startTime = Date.now();

  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(", ")}`);
    }
    if (!userId) {
      throw new Error("Usuário não encontrado");
    }

    const fotos = await getFotosMensais(userId);
    if (fotos.length === 0) {
      throw new Error("Nenhuma foto encontrada para editar");
    }

    // A primeira foto é sempre o primeiro elemento do array ordenado por mês
    const primeiraFoto = fotos[0];
    
    // Usar a função editFotoMensal existente
    const fotoEditada = await editFotoMensal(userId, primeiraFoto.mes, meta);

    return fotoEditada;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      "Erro ao editar primeira foto",
      {
        userId: userId || "unknown",
        action: "edit_primeira_foto_error",
        component: "evolution_service",
        duration,
      },
      error instanceof Error ? error : new Error(String(error))
    );
    throw error;
  }
};

export const getFotosMensais = async (
  userId: string | null
): Promise<FotoMensal[]> => {
  try {
    const validation = validateUserId(userId);
    if (!validation.isValid) {
      throw new Error(`Validação falhou: ${validation.errors.join(", ")}`);
    }
    if (!userId) throw new Error("Usuário não encontrado");
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return [];
    const userData = snapshot.val();

    // Buscar em ambas as estruturas (maiúscula e minúscula)
    const fotos: FotoMensal[] =
      userData?.Evolucao?.FotosMensais ||
      userData?.evolucao?.fotosMensais ||
      [];

    // Ordenar por mês (ascendente) para garantir ordem cronológica
    return fotos.slice().sort((a, b) => a.mes.localeCompare(b.mes));
  } catch (error) {
    logger.error(
      "Erro ao obter fotos mensais",
      { userId: userId || "unknown" },
      error as any
    );
    return [];
  }
};

// Função para obter a foto "antes" (primeira foto mensal)
export const getFotoAntes = async (
  userId: string | null
): Promise<FotoMensal | null> => {
  try {
    const fotos = await getFotosMensais(userId);
    // Retorna a primeira foto (mais antiga) como foto "antes"
    return fotos.length > 0 ? fotos[0] : null;
  } catch (error) {
    logger.error(
      "Erro ao obter foto ANTES",
      { userId: userId || "unknown" },
      error as any
    );
    return null;
  }
};

// Função para obter a foto mais recente (última foto mensal)
export const getFotoMaisRecente = async (
  userId: string | null
): Promise<FotoMensal | null> => {
  try {
    const fotos = await getFotosMensais(userId);
    // Retorna a última foto (mais recente)
    return fotos.length > 0 ? fotos[fotos.length - 1] : null;
  } catch (error) {
    logger.error(
      "Erro ao obter foto mais recente",
      { userId: userId || "unknown" },
      error as any
    );
    return null;
  }
};

// Função para verificar se pode fazer upload baseado no DiaPagamento
export const podeFazerUploadMes = async (userId: string | null): Promise<boolean> => {
  try {
    if (!userId) return false;
    
    const fotos = await getFotosMensais(userId);
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return false;
    
    const userData = snapshot.val();
    const diaPagamento = userData?.DiaPagamento || userData?.diaPagamento;
    
    if (!diaPagamento) {
      const mesAtual = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
      const fotoMesAtual = fotos.find(f => f.mes === mesAtual);
      return !fotoMesAtual;
    }

    try {
      const paymentPeriod = determineUsageMonth(diaPagamento);
      
      if (paymentPeriod.isActive) {
        const fotoPeriodo = fotos.find(f => f.mes === paymentPeriod.usageMonth);
        return !fotoPeriodo;
      }
      
      return true;
    } catch (error) {
      logger.warn("Erro ao calcular período de pagamento, usando lógica de mês simples", {
        userId,
        diaPagamento,
        error: error instanceof Error ? error.message : String(error)
      });
      
      const mesAtual = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
      const fotoMesAtual = fotos.find(f => f.mes === mesAtual);
      return !fotoMesAtual;
    }
  } catch (error) {
    logger.error(
      "Erro ao verificar se pode fazer upload",
      { userId: userId || "unknown" },
      error as any
    );
    return false;
  }
};

// Função para obter o período de pagamento atual
export const getPeriodoPagamentoAtual = async (
  userId: string | null
): Promise<{ inicio: Date; fim: Date; podeFazerUpload: boolean } | null> => {
  try {
    if (!userId) return null;
    
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) return null;
    
    const userData = snapshot.val();
    const diaPagamento = userData?.DiaPagamento || userData?.diaPagamento;
    
    if (!diaPagamento) return null;

    try {
      const paymentPeriod = determineUsageMonth(diaPagamento);
      const fotos = await getFotosMensais(userId);
      const fotoPeriodo = fotos.find(f => f.mes === paymentPeriod.usageMonth);
      const podeFazerUpload = !fotoPeriodo;

      return {
        inicio: paymentPeriod.startDate,
        fim: paymentPeriod.endDate,
        podeFazerUpload
      };
    } catch (error) {
      logger.warn("Erro ao calcular período de pagamento", {
        userId,
        diaPagamento,
        error: error instanceof Error ? error.message : String(error)
      });
      return null;
    }
  } catch (error) {
    logger.error(
      "Erro ao obter período de pagamento",
      { userId: userId || "unknown" },
      error as any
    );
    return null;
  }
};
