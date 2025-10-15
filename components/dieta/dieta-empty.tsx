"use client";

import { useRouter } from "next/navigation";
import { FileText, ArrowRight, AlertCircle } from "lucide-react";

interface DietaEmptyProps {
  hasTicketUsed?: boolean;
}

export default function DietaEmpty({ hasTicketUsed = false }: DietaEmptyProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Minha Dieta</h1>
        <p className="text-sm text-gray-500 mt-1">
          Plano alimentar personalizado
        </p>
      </div>

      <div className="p-8 flex flex-col items-center justify-center text-center">
        {hasTicketUsed ? (
          // Mensagem de erro quando houve tentativa de gerar dieta mas falhou
          <>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Erro ao gerar sua dieta
            </h2>

            <p className="text-zinc-500 mb-6 max-w-md">
              Parece que houve um problema ao gerar sua dieta personalizada.
              Nossa equipe já foi notificada e estamos trabalhando para resolver
              o problema.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-6 max-w-md">
              <p className="text-red-600 font-medium mb-2">
                Entre em contato com nosso suporte para assistência
              </p>
              <a
                href="mailto:suporte@nutriinteligente.com"
                className="inline-block text-sm text-red-600 hover:underline"
              >
                suporte@nutriinteligente.com
              </a>
            </div>
          </>
        ) : (
          // Mensagem padrão quando o usuário ainda não gerou uma dieta
          <>
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Nenhuma dieta encontrada
            </h2>

            <p className="text-zinc-500 mb-6 max-w-md">
              Você ainda não possui uma dieta personalizada. Complete o
              formulário na página inicial para montar sua dieta com base nas
              suas preferências e objetivos.
            </p>

            <button
              onClick={() => router.push("/home")}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
            >
              <span>Montar minha dieta</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
