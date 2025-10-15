"use client";

import { updateUserMeasurementsAndPrompt } from "@/app/api/database";
import { montarDietaCompleta } from "@/utils/dietaCompleta";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { auth } from "@/app/api/firebase";

export function useMontarDieta(options?: { createNewDiet?: boolean }) {
  const { toast } = useToast();
  const router = useRouter();

  // Verifica se os dados de medidas e ao menos uma refeição estão preenchidos
  const verificarDadosCompletos = (): boolean => {
    const data = JSON.parse(
      localStorage.getItem("medidasFormData") || "{}"
    ) as {
      peso?: string;
      altura?: string;
      idade?: string;
      sexo?: string;
      objetivo?: string;
      treino?: string;
      nivelAtividade?: string;
    };

    // Campos obrigatórios
    if (
      !data.peso ||
      !data.altura ||
      !data.idade ||
      !data.sexo ||
      !data.objetivo
    ) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha suas medidas corporais",
        variant: "destructive",
      });
      return false;
    }

    // Verifica ao menos uma refeição

    const checkInlineKey = (inlineKey: string, fallbackKey: string) => {
      // Tentar ler do formato inline primeiro
      const inlineData = localStorage.getItem(inlineKey);
      if (inlineData) {
        try {
          const parsed = JSON.parse(inlineData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const latest = parsed[0];

            const data = latest.data;

            // Agora todos os dados são arrays únicos
            if (Array.isArray(data)) {
              return data.length > 0;
            }
          }
        } catch (e) {
          // Erro ao ler dados inline
        }
      }

      // Fallback para formato antigo
      const oldData = localStorage.getItem(fallbackKey);
      if (oldData) {
        try {
          const data = JSON.parse(oldData);

          // Primeiro verificar se é o novo formato (array único)
          if (Array.isArray(data)) {
            return data.length > 0;
          }

          // Formato antigo - verificar diferentes estruturas para compatibilidade
          if (data && typeof data === "object") {
            // Verificar se é café da manhã antigo (principal, fruta, bebida)
            if (data.principal || data.fruta || data.bebida) {
              const hasItems = Object.values(data).some(
                (item) => item !== null && item !== undefined
              );
              return hasItems;
            }

            // Formato antigo de almoço/janta com categorias separadas
            const hasItems = Object.values(data).some(
              (items) => Array.isArray(items) && items.length > 0
            );
            return hasItems;
          }

          // Para lanches antigos que salvam um item único
          if (data !== null) {
            return true;
          }
        } catch (e) {
          // Erro ao ler dados inline
        }
      }

      return false;
    };

    const hasCafe = checkInlineKey(
      "cafeDaManhaSelecoes_inline",
      "itensCafeDaManha"
    );
    const hasLancheManha = checkInlineKey(
      "lancheDaManhaSelecoes_inline",
      "itensLancheDaManha"
    );
    const hasAlmoco = checkInlineKey("almocoSelecoes_inline", "itensDoAlmoco");
    const hasLancheTarde = checkInlineKey(
      "lancheDaTardeSelecoes_inline",
      "itensDoLancheDaTarde"
    );
    const hasJanta = checkInlineKey("jantaSelecoes_inline", "itensDoJantar");

    if (
      !hasCafe &&
      !hasLancheManha &&
      !hasAlmoco &&
      !hasLancheTarde &&
      !hasJanta
    ) {
      toast({
        title: "Refeições vazias",
        description: "Selecione pelo menos uma refeição",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleMontarDieta = async (
    setLoading?: (loading: boolean) => void,
    options?: { createNewDiet?: boolean }
  ) => {
    if (!verificarDadosCompletos()) {
      setLoading?.(false);
      return;
    }

    try {
      setLoading?.(true);

      // Gera o objeto completo da dieta
      const dietaCompleta = montarDietaCompleta();

      if (!dietaCompleta) {
        throw new Error("Erro ao montar dieta - dietaCompleta é null");
      }

      // Pega o userId
      const userId = localStorage.getItem("userId") || auth.currentUser?.uid;

      if (!userId) {
        throw new Error("Usuário não identificado");
      }

      // Recarrega as medidas + treino do mesmo localStorage
      const data = JSON.parse(
        localStorage.getItem("medidasFormData") || "{}"
      ) as {
        peso: string;
        altura: string;
        sexo: string;
        treino?: string;
        nivelAtividade?: string;
        objetivo?: string;
        horarios?: string;
      };

      const dataTreino = JSON.parse(
        localStorage.getItem("treinosAtividadesData") || "{}"
      ) as {
        frequencia?: string;
        desejaTreino?: string;
      };

      // Calcula IMC
      const pesoNum = dietaCompleta.dadosPessoais.peso;
      const alturaNum = dietaCompleta.dadosPessoais.altura / 100;
      const imc = Number((pesoNum / (alturaNum * alturaNum)).toFixed(2));

      // Monta o prompt para o Firestore
      const promptObj = {
        genero: data.sexo,
        treino: dataTreino.desejaTreino,
        prompt: JSON.stringify(dietaCompleta),
      };

      // Extrai horários e objetivo do formulário de medidas armazenado no localStorage
      const horarios = data.horarios || "";
      const objetivo = data.objetivo || "";

      // Atualiza no Firestore com os parâmetros na ordem correta:
      // userId, Peso, Altura, IMC, Horarios, Prompt, Idade
      const result = await updateUserMeasurementsAndPrompt(
        userId,
        pesoNum,
        dietaCompleta.dadosPessoais.altura.toString(),
        imc,
        horarios,
        promptObj,
        dietaCompleta.dadosPessoais.idade
      );

      // Criar nova dieta usando a API (apenas se configurado)
      if (options?.createNewDiet) {
        const novaDietaResponse = await fetch('/api/novaDieta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            promptData: promptObj   // agora envia os dados do usuário também
          })
        });


        if (!novaDietaResponse.ok) {
          const errorData = await novaDietaResponse.json();
          throw new Error(errorData.message || 'Erro ao criar nova dieta');
        }
      }


      // Para o componente nova-dieta, não redirecionamos automaticamente
      // O loading visual deve completar antes do redirecionamento
      if (!options?.createNewDiet) {
        router.push("/planos");
      }

      setLoading?.(false);
    } catch (error) {
      toast({
        title: "Erro ao montar dieta",
        description: "Por favor, tente novamente mais tarde",
        variant: "destructive",
      });
      setLoading?.(false);
    }
  };

  return { handleMontarDieta };
}
