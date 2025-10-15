"use client"

import { CheckCircle, X, Video, Sparkles, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PrecosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">EduVideo</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#cursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cursos
            </a>
            <a href="/instrutores" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instrutores
            </a>
            <a href="/precos" className="text-sm text-foreground font-medium transition-colors">
              Preços
            </a>
            <a href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm">Começar Agora</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Planos flexíveis para todos
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Invista no seu futuro com o plano ideal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Escolha o plano que melhor se adapta aos seus objetivos de aprendizado. Todos incluem acesso a videoaulas
              de alta qualidade e certificados reconhecidos.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Básico */}
            <Card className="p-8 space-y-8 border-border hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Users className="w-6 h-6 text-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Básico</h3>
                  <p className="text-muted-foreground">Perfeito para quem está começando sua jornada de aprendizado</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">R$ 49</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground">ou R$ 490/ano (economize 17%)</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Acesso a 100+ cursos selecionados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Videoaulas em Full HD</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Certificados de conclusão</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Material complementar em PDF</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Suporte por email em até 48h</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Acesso em até 2 dispositivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Acesso à comunidade exclusiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Mentorias ao vivo</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Começar Agora
              </Button>
            </Card>

            {/* Pro - Destaque */}
            <Card className="p-8 space-y-8 border-primary shadow-xl relative scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-lg">
                Mais Popular
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Pro</h3>
                  <p className="text-muted-foreground">Para profissionais que querem acelerar sua carreira</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">R$ 99</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground">ou R$ 990/ano (economize 17%)</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">Acesso ilimitado a todos os 5.000+ cursos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Videoaulas em 4K com legendas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Certificados premium personalizados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Material complementar completo</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Suporte prioritário 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Acesso ilimitado em todos dispositivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Acesso à comunidade exclusiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">2 mentorias ao vivo por mês</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Download de aulas para assistir offline</span>
                </li>
              </ul>

              <Button className="w-full" size="lg">
                Começar Agora
              </Button>
            </Card>

            {/* Empresarial */}
            <Card className="p-8 space-y-8 border-border hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Empresarial</h3>
                  <p className="text-muted-foreground">Solução completa para capacitação de equipes</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">Custom</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Plano personalizado sob consulta</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">Tudo do plano Pro incluído</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Cursos personalizados para sua empresa</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Gerenciamento centralizado de equipe</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Relatórios detalhados e analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Gerente de conta dedicado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Integração com sistemas corporativos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Mentorias ilimitadas para equipe</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">SLA garantido e suporte premium</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Falar com Vendas
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Perguntas Frequentes</h2>
            <div className="space-y-6">
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-muted-foreground">
                  Sim! Todos os nossos planos são sem compromisso. Você pode cancelar a qualquer momento e continuar
                  tendo acesso até o final do período pago.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Os certificados são reconhecidos pelo mercado?
                </h3>
                <p className="text-muted-foreground">
                  Sim! Nossos certificados são reconhecidos e validados digitalmente. Você pode compartilhá-los no
                  LinkedIn e incluir em seu currículo.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Existe período de teste gratuito?</h3>
                <p className="text-muted-foreground">
                  Oferecemos 7 dias de garantia. Se não ficar satisfeito, devolvemos 100% do seu investimento, sem
                  perguntas.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Posso fazer upgrade ou downgrade do meu plano?
                </h3>
                <p className="text-muted-foreground">
                  Sim! Você pode alterar seu plano a qualquer momento. O valor será ajustado proporcionalmente no
                  próximo ciclo de cobrança.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Ainda tem dúvidas sobre qual plano escolher?
            </h2>
            <p className="text-lg text-primary-foreground/80 text-pretty">
              Nossa equipe está pronta para ajudar você a encontrar o plano ideal para seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base h-12 px-8">
                Falar com Especialista
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-foreground">EduVideo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A melhor plataforma de videoaulas para transformar sua carreira.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/#cursos" className="hover:text-foreground transition-colors">
                    Cursos
                  </a>
                </li>
                <li>
                  <a href="/instrutores" className="hover:text-foreground transition-colors">
                    Instrutores
                  </a>
                </li>
                <li>
                  <a href="/precos" className="hover:text-foreground transition-colors">
                    Preços
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/sobre" className="hover:text-foreground transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 EduVideo. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
