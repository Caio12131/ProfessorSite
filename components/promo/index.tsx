"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/api/firebase";
import {
  updateUserMeasurementsAndPrompt,
  getUserProfile,
} from "@/app/api/database";
import {
  ArrowRight,
  Sparkles,
  Check,
  AlertCircle,
  FileText,
  Lock,
} from "lucide-react";

interface UserProfile {
  Tickets?: number | string;
  TicketUsados?: number;
  Dieta?: string;
  [key: string]: any;
}

export default function PromoSection() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [allFormsComplete, setAllFormsComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [hasDieta, setHasDieta] = useState<boolean>(false);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedClick = localStorage.getItem("promoDietaClicked");
    if (savedClick === "true") {
      setClicked(true);
    }

    checkAllForms();

    const interval = setInterval(() => {
      checkAllForms();
    }, 1000);

    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
          setUserUid(currentUser.uid);
          const hasTicketUsed = profile && profile.TicketUsados > 0;
          const userHasDieta =
            profile && profile.Dieta && profile.Dieta.trim() !== "";
          setShowErrorMessage(hasTicketUsed && !userHasDieta);
          setHasDieta(userHasDieta);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
      }
    };

    fetchUserProfile();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkAllForms = () => {
    const medidasCompletas =
      localStorage.getItem("medidasFormCompleto") === "true";
    const treinosCompletos =
      localStorage.getItem("treinosAtividadesCompleto") === "true";
    setAllFormsComplete(medidasCompletas && treinosCompletos);
  };

  const validateMealSelections = () => {
    const errors: string[] = [];

    const getSelectionCount = (storageKey: string): number => {
      // Tentar primeiro o novo formato (MealOption[])
      const optionsKey = `${storageKey}_options`;
      const savedOptions = localStorage.getItem(optionsKey);

      if (savedOptions) {
        try {
          const parsedOptions = JSON.parse(savedOptions);
          if (Array.isArray(parsedOptions)) {
            // Retornar quantidade de cards/opções criadas
            return parsedOptions.length;
          }
        } catch (error) {
          console.error(`Erro ao processar opções para ${storageKey}:`, error);
        }
      }

      // Fallback para o formato antigo
      const savedData = localStorage.getItem(storageKey);
      if (!savedData) return 0;

      try {
        const parsedArray = JSON.parse(savedData);
        if (!Array.isArray(parsedArray)) return 0;
        return parsedArray.filter((item) => item.selected).length;
      } catch (error) {
        console.error(
          `Erro ao processar dados do localStorage para ${storageKey}:`,
          error
        );
        return 0;
      }
    };

    const mealTimes = [
      { key: "cafeDaManhaSelecoes", name: "Café da manhã" },
      { key: "lancheDaManhaSelecoes", name: "Lanche da Manhã" },
      { key: "almocoSelecoes", name: "Almoço" },
              { key: "lancheDaTardeSelecoes", name: "Lanche da Tarde" },
      { key: "jantaSelecoes", name: "Jantar" },
    ];

    mealTimes.forEach((meal) => {
      const count = getSelectionCount(meal.key);

      // Para todas as refeições, exigir pelo menos 1 card/opçã
      const minRequired = 1;

      if (count < minRequired) {
        errors.push(`${meal.name}: crie pelo menos 1 opção (atual: ${count})`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const getSelections = (storageKey: string): string => {
    // Tentar primeiro o novo formato (MealOption[])
    const optionsKey = `${storageKey}_options`;
    const savedOptions = localStorage.getItem(optionsKey);

    if (savedOptions) {
      try {
        const parsedOptions = JSON.parse(savedOptions);
        if (Array.isArray(parsedOptions)) {
          const allItems: string[] = [];

          parsedOptions.forEach((option: any) => {
            // Café da manhã
            if (option.breakfast) allItems.push(option.breakfast.nome);
            if (option.fruit) allItems.push(option.fruit.nome);
            if (option.liquid) allItems.push(option.liquid.nome);
            // Lanche
            if (option.alimento) allItems.push(option.alimento.nome);
            // Almoço/Janta
            if (option.carboidratos && Array.isArray(option.carboidratos)) {
              option.carboidratos.forEach((item: any) =>
                allItems.push(item.nome)
              );
            }
            if (option.proteinas) allItems.push(option.proteinas.nome);
            if (option.legumesESaladas)
              allItems.push(option.legumesESaladas.nome);
          });

          return allItems.length > 0 ? allItems.join(", ") : "Sem preferências";
        }
      } catch (error) {
        console.error(`Erro ao processar opções para ${storageKey}:`, error);
      }
    }

    // Fallback para o formato antigo
    const savedData = localStorage.getItem(storageKey);
    if (!savedData) return "Sem preferências";

    try {
      const parsedArray = JSON.parse(savedData);

      if (!Array.isArray(parsedArray)) return "Sem preferências";

      const selectedItems = parsedArray
        .filter((item) => item.selected)
        .map((item) =>
          item.prompt === undefined ? `${item.nome}` : `${item.prompt}`
        );

      return selectedItems.length > 0
        ? selectedItems.join(", ")
        : "Sem preferências";
    } catch (error) {
      console.error(
        `Erro ao processar dados do localStorage para ${storageKey}:`,
        error
      );
      return "Sem preferências";
    }
  };

  const handleClick = async () => {
    // Limpar erros anteriores
    setValidationErrors([]);

    // Verifica se todos os formulários foram preenchidos
    const medidasCompletas =
      localStorage.getItem("medidasFormCompleto") === "true";
    const treinosCompletos =
      localStorage.getItem("treinosAtividadesCompleto") === "true";

    if (!medidasCompletas || !treinosCompletos) {
      localStorage.setItem("highlightMissingFields", "true");
      window.dispatchEvent(new Event("validateMedidas"));
      window.dispatchEvent(new Event("validateTreinos"));

      if (!medidasCompletas) {
        const element = document.getElementById("medidas");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (!treinosCompletos) {
        const element = document.getElementById("treinos");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      return;
    }

    // Validar seleções de refeições
    if (!validateMealSelections()) {
      return;
    }

    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("Usuário não autenticado");
      }

      // Obtém os dados do formulário de medidas armazenados no localStorage
      const medidasData = localStorage.getItem("medidasFormData");
      if (!medidasData) {
        throw new Error("Dados de medidas não encontrados");
      }
      const userData = JSON.parse(medidasData);

      // Coleta dados adicionais dos formulários armazenados
      const treinosData = localStorage.getItem("treinosAtividadesData");
      if (treinosData) {
        const parsedTreinos = JSON.parse(treinosData);
        userData.nivelAtividade = parsedTreinos.nivelAtividade || "sedentario";
        userData.treino = parsedTreinos.desejaTreino || "Não";
      } else {
        userData.nivelAtividade = "sedentario";
        userData.treino = "Não";
      }

      // Get all selections for each meal time
      userData.cafeDaManha = getSelections("cafeDaManhaSelecoes");
      userData.lancheDaManha = getSelections("lancheDaManhaSelecoes");
      userData.almoco = getSelections("almocoSelecoes");
      userData.lancheDaTarde = getSelections("lancheDaTardeSelecoes");
      userData.janta = getSelections("jantaSelecoes");

      const response = await fetch("/api/generatePrompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();

      // Salva os dados gerados no banco de dados
      await updateUserMeasurementsAndPrompt(
        currentUser.uid,
        result.Peso,
        result.Altura,
        Math.floor(result.IMC),
        result.Horarios,
        result.Prompt,
        result.Idade
      );

      setClicked(true);
      localStorage.setItem("promoDietaClicked", "true");

      // Processa a requisição conforme o tipo de ticket do usuário

      router.push("/planos");
    } catch (error) {
      console.error("Erro ao processar dados:", error);
      alert(
        "Ocorreu um erro ao processar seus dados. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewDieta = () => {
    router.push("/dietas");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50 text-green-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Dieta Personalizada
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Nutrição acessível para você
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="mb-8">
            <p className="text-zinc-500 leading-relaxed mb-6 text-center">
              Dieta personalizada por menos de{" "}
              <span className="font-semibold text-green-500">R$ 10,00</span>
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="bg-green-100 text-green-900 text-xs p-1.5 rounded-full mb-2 inline-block">
                Por um preço acessível
              </p>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Você receberá:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-700" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Plano alimentar completo
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-700" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Baseado nas suas preferências
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                    <Check className="h-4 w-4 text-green-700" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Quantidades de alimentos corretas
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-5">
            {showErrorMessage ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-red-600 font-medium mb-2">
                  Parece que houve um erro ao gerar sua dieta
                </p>
                <p className="text-sm text-red-500">
                  Entre em contato com nosso suporte para assistência.
                </p>
                <a
                  href="mailto:suporte@nutriinteligente.com"
                  className="inline-block mt-3 text-sm text-red-600 hover:underline"
                >
                  suporte@nutriinteligente.com
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {validationErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg mx-8 p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="font-medium text-red-600">
                        Atenção! Selecione mais alimentos:
                      </p>
                    </div>
                    <ul className="text-sm text-red-600 space-y-1 pl-4">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="list-disc ml-2">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={handleClick}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg transition-all duration-300 text-white font-medium ${
                    clicked
                      ? "bg-green-800 hover:bg-green-900"
                      : "bg-green-700 hover:bg-green-800 shadow-md hover:shadow-lg"
                  } ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  } relative overflow-hidden group`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                      <span>Processando...</span>
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">Montar minha dieta</span>
                      <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                      <div className="absolute inset-0 w-full h-full bg-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </>
                  )}
                </button>
                {hasDieta && (
                  <button
                    onClick={handleViewDieta}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Ver dieta gerada</span>
                  </button>
                )}
              </div>
            )}
            <div className="flex items-center justify-center gap-1">
              <p className="text-xs text-center text-gray-500">
                Pagamento único e seguro
              </p>
              <Lock className="h-3 w-3 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
