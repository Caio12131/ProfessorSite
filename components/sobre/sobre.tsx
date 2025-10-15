"use client"

import { Video, Target, Heart, Users, Award, TrendingUp, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SobrePage() {
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
            <a href="/precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <a href="/sobre" className="text-sm text-foreground font-medium transition-colors">
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
              <Heart className="w-4 h-4" />
              Nossa História
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Democratizando o acesso à educação de qualidade
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Acreditamos que todo mundo merece acesso a educação de qualidade. Nossa missão é conectar pessoas a
              conhecimento que transforma vidas e carreiras.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Nossa Missão</h3>
              <p className="text-muted-foreground">
                Tornar a educação de qualidade acessível a todos, independente de localização ou condição financeira,
                através de videoaulas profissionais e instrutores especializados.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Nossos Valores</h3>
              <p className="text-muted-foreground">
                Excelência no ensino, inclusão, inovação constante e compromisso com o sucesso de cada aluno.
                Valorizamos a diversidade e o aprendizado contínuo.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Nossa Visão</h3>
              <p className="text-muted-foreground">
                Ser a principal plataforma de educação online da América Latina, reconhecida pela qualidade do conteúdo
                e pelo impacto positivo na vida de milhões de pessoas.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Como Tudo Começou</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                A história por trás da EduVideo e nosso compromisso com a educação
              </p>
            </div>

            <div className="space-y-8">
              <Card className="p-8 border-border">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">2020</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">O Início</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Fundada em 2020, a EduVideo nasceu da percepção de que muitas pessoas talentosas não tinham acesso a
                    cursos de qualidade devido a barreiras geográficas e financeiras. Começamos com apenas 50 cursos e
                    um sonho: democratizar a educação.
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-border">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">2022</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Crescimento Exponencial</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Alcançamos a marca de 10.000 alunos e expandimos nosso catálogo para mais de 1.000 cursos. Formamos
                    parcerias com instrutores renomados e empresas líderes de mercado, consolidando nossa posição como
                    referência em educação online.
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-border">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">2025</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Presente e Futuro</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Hoje, somos mais de 50.000 alunos ativos, 5.000+ cursos e 200+ instrutores especialistas.
                    Continuamos inovando com tecnologia de ponta, inteligência artificial para personalização do
                    aprendizado e expandindo para novos mercados internacionais.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Nosso Impacto</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Números que refletem nosso compromisso com a transformação através da educação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">50k+</div>
                <div className="text-sm text-muted-foreground">Alunos Transformados</div>
              </div>
            </Card>

            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">35k+</div>
                <div className="text-sm text-muted-foreground">Certificados Emitidos</div>
              </div>
            </Card>

            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Países Alcançados</div>
              </div>
            </Card>

            <Card className="p-8 space-y-4 border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Nossos Diferenciais</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              O que nos torna únicos no mercado de educação online
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 space-y-4 border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Qualidade Premium</h3>
              <p className="text-muted-foreground">
                Todos os nossos cursos passam por rigoroso processo de curadoria. Apenas instrutores com comprovada
                experiência de mercado podem ensinar em nossa plataforma.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Comunidade Engajada</h3>
              <p className="text-muted-foreground">
                Mais do que uma plataforma, somos uma comunidade. Conecte-se com outros alunos, participe de discussões
                e construa sua rede profissional.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Aprendizado Personalizado</h3>
              <p className="text-muted-foreground">
                Nossa plataforma usa inteligência artificial para recomendar cursos e criar trilhas de aprendizado
                personalizadas baseadas em seus objetivos e progresso.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Garantia de Satisfação</h3>
              <p className="text-muted-foreground">
                Oferecemos 7 dias de garantia incondicional. Se não ficar satisfeito com qualquer curso, devolvemos 100%
                do seu investimento, sem perguntas.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">Faça parte da nossa história</h2>
            <p className="text-lg text-primary-foreground/80 text-pretty">
              Junte-se a milhares de alunos que já estão transformando suas carreiras e vidas através da educação de
              qualidade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base h-12 px-8">
                Começar Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Conhecer Cursos
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
