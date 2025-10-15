"use client";
import { X, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { clearMealData } from "@/utils/storage";

interface DietModalProps {
  dietData: any;
  setModalOpen: any;
}
export default function DietModal({ dietData, setModalOpen }: DietModalProps) {
  const router = useRouter();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleNewDiet = () => {
    try {
      clearMealData();
      setModalOpen(false);
    } catch (error) {}
  };

  const handleVerDieta = () => {
    router.push("/dietas");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <Card className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 overflow-hidden animate-in fade-in duration-300">
        <CardHeader className="relative border-b border-zinc-700 p-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-zinc-800 p-2 rounded-lg">
                  <Utensils className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Plano de Dieta
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Você tem um plano alimentar disponível
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
              <h3 className="font-medium text-white mb-2">
                Deseja visualizar sua Dieta?
              </h3>
              <p className="text-sm text-zinc-300">
                Você já possui um plano de dieta personalizado
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                onClick={handleVerDieta}
                className="w-full bg-white hover:bg-zinc-200 text-black font-semibold"
              >
                Ver Dieta
              </Button>
              <Button
                variant="outline"
                onClick={handleNewDiet}
                className="w-full border border-white text-black hover:bg-gray hover:text-gray-900 transition"
              >
                Montar Nova Dieta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
