"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/api/firebase";
import { getUserProfile } from "@/app/api/database";
import { useRouter } from "next/navigation";
import { User, Pencil } from "lucide-react";

// Função para determinar o nível da conta baseado nos dias do desafio
const getAccountLevel = (diasEfetuados: number) => {
  if (diasEfetuados < 15)
    return {
      level: "Iniciante",
      emoji: "👶",
      color: "bg-yellow-100 text-yellow-700",
      levelNumber: 1,
    };
  if (diasEfetuados < 31)
    return {
      level: "Intermediário",
      emoji: "🚀",
      color: "bg-yellow-100 text-yellow-700",
      levelNumber: 2,
    };
  if (diasEfetuados < 40)
    return {
      level: "Avançado",
      emoji: "🔥",
      color: "bg-orange-100 text-orange-700",
      levelNumber: 3,
    };
  return {
    level: "Expert",
    emoji: "💎",
    color: "bg-purple-100 text-purple-700",
    levelNumber: 4,
  };
};

interface UserProfileCardProps {
  userAvatar: string;
  checkedMeals: string[];
  desafioAtual: any;
  userName: string;
  totalMeals?: number;
  consumedWater?: number;
  treinoDaSemana?: any;
  dailyStreak?: any;
}

export default function UserProfileCard({
  userAvatar,
  checkedMeals,
  desafioAtual,
  userName,
  totalMeals = 0,
  consumedWater = 0,
  treinoDaSemana,
  dailyStreak,
}: UserProfileCardProps) {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const accountLevel = getAccountLevel(desafioAtual?.diasEfetuados || 0);

  const desafioAtivo = useMemo(() => {
    const ciclo = desafioAtual?.ciclo || 1;
    const diasEfetuados = desafioAtual?.diasEfetuados || 0;
    const completouDesafio = !!desafioAtual?.dataCompletouDesafio;

    // Se completou o primeiro desafio (21 dias), mostrar o Desafio 2
    if (
      ciclo === 2 ||
      (ciclo === 1 && completouDesafio) ||
      diasEfetuados >= 21
    ) {
      return {
        totalDays: 25,
        name: "Desafio 2",
        description: "25 dias",
        emoji: "💪",
      };
    }

    // Caso contrário, mostrar o Desafio 1
    return {
      totalDays: 21,
      name: "Desafio 1",
      description: "21 dias",
      emoji: "🚀",
    };
  }, [
    desafioAtual?.ciclo,
    desafioAtual?.diasEfetuados,
    desafioAtual?.dataCompletouDesafio,
  ]);

  const desafioGoal = desafioAtivo.totalDays;

  // Calcular dias do desafio atual
  let diasEfetuados = desafioAtual?.diasEfetuados || 0;
  if (desafioAtivo.name === "Desafio 2") {
    diasEfetuados = Math.max(0, diasEfetuados - 21);
  }

  // Calcular progresso do desafio
  const progressoDesafio = Math.min(100, (diasEfetuados / desafioGoal) * 100);

  // Calcular dados de água
  const getSafeWeight = () => {
    return Number(userProfile?.Peso ?? userProfile?.peso ?? 0);
  };

  const waterGoal =
    getSafeWeight() > 0 ? Math.round(getSafeWeight() * 35) : 2000;
  const waterProgress = Math.min(100, (consumedWater / waterGoal) * 100);

  // Calcular dados de treino
  const completedWorkouts = treinoDaSemana?.dias
    ? Object.values(treinoDaSemana.dias || {}).filter(Boolean).length
    : 0;
  const workoutProgress = Math.min(100, (completedWorkouts / 7) * 100);

  return (
    <a href="/perfil">
      <div className="bg-white rounded-2xl p-3 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          {/* Small profile picture */}
          <div className="relative">
            <div className="w-14 h-14 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Avatar do usuário"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="w-7 h-7 text-gray-400" />
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
              <Pencil className="w-2 h-2 text-white" />
            </div>
          </div>

          {/* User info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                {userName || "NutriLover"}
              </span>
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-medium ${accountLevel.color}`}
              >
                {accountLevel.emoji} {accountLevel.level}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-500">
                Nível {accountLevel.levelNumber}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                Desafio {desafioGoal} Dias
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                Dia {diasEfetuados}/{desafioGoal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
