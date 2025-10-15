"use client"

import { Video, Linkedin, Twitter, Instagram, Globe, Award, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function InstrutoresPage() {
  const instructors = [
    {
      name: "João Silva",
      title: "Especialista em Desenvolvimento Web",
      bio: "Com mais de 10 anos de experiência em desenvolvimento full-stack, João já trabalhou em empresas como Google e Microsoft. Apaixonado por ensinar, já formou mais de 50 mil alunos em tecnologias web modernas.",
      image: "professional developer portrait",
      stats: {
        students: "52.3k",
        courses: 24,
        rating: 4.9,
      },
      social: {
        linkedin: "https://linkedin.com/in/joaosilva",
        twitter: "https://twitter.com/joaosilva",
        website: "https://joaosilva.dev",
      },
      expertise: ["React", "Node.js", "TypeScript", "Next.js"],
    },
    {
      name: "Maria Santos",
      title: "Estrategista de Marketing Digital",
      bio: "Maria é referência em marketing digital no Brasil, com certificações do Google e Meta. Fundou sua própria agência e ajudou centenas de empresas a crescerem online. Seus cursos são conhecidos por resultados práticos e mensuráveis.",
      image: "professional marketing expert portrait",
      stats: {
        students: "38.7k",
        courses: 18,
        rating: 4.8,
      },
      social: {
        linkedin: "https://linkedin.com/in/mariasantos",
        instagram: "https://instagram.com/mariasantos",
        website: "https://mariasantos.com.br",
      },
      expertise: ["SEO", "Google Ads", "Social Media", "Analytics"],
    },
    {
      name: "Pedro Costa",
      title: "Designer UI/UX Sênior",
      bio: "Pedro é designer premiado internacionalmente, com trabalhos para startups do Vale do Silício e grandes corporações. Especialista em criar experiências digitais que encantam usuários e geram resultados de negócio.",
      image: "professional designer portrait",
      stats: {
        students: "45.1k",
        courses: 21,
        rating: 4.9,
      },
      social: {
        linkedin: "https://linkedin.com/in/pedrocosta",
        twitter: "https://twitter.com/pedrocosta",
        instagram: "https://instagram.com/pedrocosta",
      },
      expertise: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    },
    {
      name: "Ana Oliveira",
      title: "Cientista de Dados e IA",
      bio: "Doutora em Ciência da Computação pela USP, Ana é especialista em Machine Learning e Inteligência Artificial. Trabalhou em projetos de IA para empresas Fortune 500 e agora dedica-se a democratizar o conhecimento em dados.",
      image: "professional data scientist portrait",
      stats: {
        students: "29.5k",
        courses: 15,
        rating: 4.9,
      },
      social: {
        linkedin: "https://linkedin.com/in/anaoliveira",
        twitter: "https://twitter.com/anaoliveira",
        website: "https://anaoliveira.ai",
      },
      expertise: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">EduVideo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#cursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cursos
            </a>
            <a href="/instrutores" className="text-sm text-foreground font-medium">
              Instrutores
            </a>
            <a href="/#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <a href="/#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Award className="w-4 h-4" />
              Instrutores Certificados e Premiados
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Aprenda com os melhores profissionais do mercado
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Nossos instrutores são especialistas reconhecidos, com anos de experiência prática e paixão por ensinar.
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {instructors.map((instructor, index) => (
              <Card key={index} className="overflow-hidden border-border hover:shadow-xl transition-shadow">
                <div className="p-8 space-y-6">
                  {/* Profile Header */}
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={`/.jpg?height=200&width=200&query=${instructor.image}`}
                        alt={instructor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{instructor.name}</h3>
                      <p className="text-primary font-medium">{instructor.title}</p>
                      {/* Social Links */}
                      <div className="flex items-center gap-3 pt-2">
                        {instructor.social.linkedin && (
                          <a
                            href={instructor.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {instructor.social.twitter && (
                          <a
                            href={instructor.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {instructor.social.instagram && (
                          <a
                            href={instructor.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Instagram className="w-5 h-5" />
                          </a>
                        )}
                        {instructor.social.website && (
                          <a
                            href={instructor.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Globe className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed">{instructor.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{instructor.stats.students}</div>
                      <div className="text-xs text-muted-foreground">Alunos</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{instructor.stats.courses}</div>
                      <div className="text-xs text-muted-foreground">Cursos</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{instructor.stats.rating}</div>
                      <div className="text-xs text-muted-foreground">Avaliação</div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {instructor.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full">Ver Cursos do Instrutor</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Quer se tornar um instrutor?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Compartilhe seu conhecimento com milhares de alunos e faça parte do nosso time de especialistas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                Candidate-se Agora
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 bg-transparent">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
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
                  <a href="/#precos" className="hover:text-foreground transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Empresas
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
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
                    Carreiras
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
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookies
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
