"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Video, CreditCard, Shield } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import Link from "next/link"

export default function ComprarPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"basico" | "pro" | "empresarial">("pro")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/comprar")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
        <LoadingSpinner size="medium" text="Carregando..." />
      </main>
    )
  }

  if (!user) {
    return null
  }

  const plans = {
    basico: {
      name: "Básico",
      price: "R$ 49",
      period: "/mês",
      features: ["Acesso a 100+ cursos", "Certificados de conclusão", "Suporte por email", "Acesso em 2 dispositivos"],
    },
    pro: {
      name: "Pro",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Acesso ilimitado a todos os cursos",
        "Certificados premium",
        "Suporte prioritário 24/7",
        "Acesso ilimitado em todos dispositivos",
        "Comunidade exclusiva",
        "2 mentorias ao vivo por mês",
      ],
    },
    empresarial: {
      name: "Empresarial",
      price: "Custom",
      period: "",
      features: [
        "Tudo do plano Pro",
        "Cursos personalizados",
        "Gerenciamento de equipe",
        "Relatórios e analytics",
        "Gerente de conta dedicado",
      ],
    },
  }

  const currentPlan = plans[selectedPlan]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">EduVideo</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Finalizar Compra</h1>
            <p className="text-lg text-muted-foreground">Escolha seu plano e comece a transformar sua carreira hoje</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Selecione seu Plano</h2>

              <div className="space-y-4">
                {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey) => {
                  const plan = plans[planKey]
                  return (
                    <Card
                      key={planKey}
                      className={`p-6 cursor-pointer transition-all ${
                        selectedPlan === planKey ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPlan(planKey)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.period}</span>
                          </div>
                        </div>
                        {selectedPlan === planKey && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Resumo do Pedido</h2>

              <Card className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="text-muted-foreground">Plano Selecionado</span>
                    <span className="font-semibold text-foreground">{currentPlan.name}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="text-muted-foreground">Valor</span>
                    <span className="text-2xl font-bold text-foreground">
                      {currentPlan.price}
                      <span className="text-sm font-normal text-muted-foreground">{currentPlan.period}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {currentPlan.price}
                      <span className="text-sm font-normal text-muted-foreground">{currentPlan.period}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <Button className="w-full h-12" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Finalizar Compra
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>
              </Card>

              <Card className="p-6 bg-muted/30 border-border">
                <h3 className="font-semibold text-foreground mb-3">Garantia de 7 dias</h3>
                <p className="text-sm text-muted-foreground">
                  Se você não ficar satisfeito com o curso, devolvemos 100% do seu investimento em até 7 dias, sem
                  perguntas.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
