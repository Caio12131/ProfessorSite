"use client"

import { PlayCircle, Users, Award, TrendingUp, Star, CheckCircle, BookOpen, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  const handleBuyClick = () => {
    if (user) {
      router.push("/comprar")
    } else {
      router.push("/login?redirect=/comprar")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">EduVideo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#cursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cursos
            </a>
            <Link href="/instrutores" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Instrutores
            </Link>
            <Link href="/precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </Link>
            <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Button size="sm" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                  Entrar
                </Button>
                <Button size="sm" onClick={() => router.push("/signup")}>
                  Começar Agora
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Mais de 50.000 alunos aprendendo
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              Aprenda com os melhores através de videoaulas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Acesse milhares de cursos em vídeo de alta qualidade. Aprenda no seu ritmo, onde e quando quiser.
              Transforme sua carreira hoje.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base h-12 px-8"
                onClick={() => router.push(user ? "/dashboard" : "/signup")}
              >
                Explorar Cursos
                <PlayCircle className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base h-12 px-8 bg-transparent"
                onClick={() => router.push("#cursos")}
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">5.000+</div>
              <div className="text-sm text-muted-foreground">Cursos Disponíveis</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">50k+</div>
              <div className="text-sm text-muted-foreground">Alunos Ativos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-foreground">200+</div>
              <div className="text-sm text-muted-foreground">Instrutores Especialistas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Por que escolher nossa plataforma?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Oferecemos a melhor experiência de aprendizado online com recursos pensados para o seu sucesso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Videoaulas em HD</h3>
              <p className="text-muted-foreground">
                Conteúdo de alta qualidade com vídeos em Full HD e áudio cristalino para a melhor experiência de
                aprendizado.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Aprenda no Seu Ritmo</h3>
              <p className="text-muted-foreground">
                Acesso vitalício aos cursos. Assista quando e onde quiser, no computador, tablet ou celular.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Certificado Reconhecido</h3>
              <p className="text-muted-foreground">
                Receba certificados de conclusão reconhecidos pelo mercado ao finalizar seus cursos.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Comunidade Ativa</h3>
              <p className="text-muted-foreground">
                Conecte-se com milhares de alunos, tire dúvidas e compartilhe conhecimento em nossa comunidade.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Material Complementar</h3>
              <p className="text-muted-foreground">
                PDFs, exercícios práticos e recursos extras para complementar seu aprendizado.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Atualizações Constantes</h3>
              <p className="text-muted-foreground">
                Cursos sempre atualizados com as últimas tendências e tecnologias do mercado.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section id="cursos" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Cursos mais populares</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Descubra os cursos que estão transformando carreiras ao redor do mundo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Desenvolvimento Web Completo",
                instructor: "João Silva",
                rating: 4.9,
                students: "12.5k",
                price: "R$ 197",
                image: "abstract digital code pattern",
              },
              {
                title: "Marketing Digital Avançado",
                instructor: "Maria Santos",
                rating: 4.8,
                students: "8.3k",
                price: "R$ 147",
                image: "modern marketing dashboard",
              },
              {
                title: "Design UI/UX Profissional",
                instructor: "Pedro Costa",
                rating: 4.9,
                students: "15.2k",
                price: "R$ 167",
                image: "creative design workspace",
              },
            ].map((course, index) => (
              <Card key={index} className="overflow-hidden border-border hover:shadow-xl transition-shadow group">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={`/.jpg?height=400&width=600&query=${course.image}`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course.students} alunos</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-foreground">{course.price}</span>
                    <Button size="sm" onClick={handleBuyClick}>
                      Ver Curso
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Planos para todos os objetivos
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Escolha o plano ideal para acelerar seu aprendizado e alcançar seus objetivos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 space-y-6 border-border">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Básico</h3>
                <p className="text-muted-foreground">Para quem está começando</p>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-foreground">R$ 49</div>
                <div className="text-sm text-muted-foreground">/mês</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Acesso a 100+ cursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Certificados de conclusão</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Suporte por email</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleBuyClick}>
                Começar Agora
              </Button>
            </Card>

            <Card className="p-8 space-y-6 border-primary shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                Mais Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Pro</h3>
                <p className="text-muted-foreground">Para profissionais dedicados</p>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-foreground">R$ 99</div>
                <div className="text-sm text-muted-foreground">/mês</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Acesso ilimitado a todos os cursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Certificados premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Suporte prioritário 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Acesso a comunidade exclusiva</span>
                </li>
              </ul>
              <Button className="w-full" onClick={handleBuyClick}>
                Começar Agora
              </Button>
            </Card>

            <Card className="p-8 space-y-6 border-border">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Empresarial</h3>
                <p className="text-muted-foreground">Para equipes e empresas</p>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-foreground">Custom</div>
                <div className="text-sm text-muted-foreground">Sob consulta</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Tudo do plano Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Cursos personalizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Gerenciamento de equipe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Relatórios e analytics</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/login")}>
                Falar com Vendas
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">Pronto para transformar sua carreira?</h2>
            <p className="text-lg text-primary-foreground/80 text-pretty">
              Junte-se a milhares de alunos que já estão aprendendo e crescendo com nossa plataforma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base h-12 px-8"
                onClick={() => router.push("/signup")}
              >
                Começar Gratuitamente
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                onClick={() => router.push("/login")}
              >
                Falar com Especialista
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
                  <a href="#cursos" className="hover:text-foreground transition-colors">
                    Cursos
                  </a>
                </li>
                <li>
                  <Link href="/instrutores" className="hover:text-foreground transition-colors">
                    Instrutores
                  </Link>
                </li>
                <li>
                  <Link href="/precos" className="hover:text-foreground transition-colors">
                    Preços
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/sobre" className="hover:text-foreground transition-colors">
                    Sobre
                  </Link>
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
