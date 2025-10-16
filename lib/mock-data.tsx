export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail: string
  category: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  duration: string
  lessons: number
  students: number
  rating: number
  price: number
}

export interface Video {
  id: string
  courseId: string
  title: string
  description: string
  duration: string
  order: number
  videoUrl: string
  thumbnail: string
}

export interface Comment {
  id: string
  videoId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  likes: number
}

export interface Progress {
  userId: string
  courseId: string
  videoId: string
  completed: boolean
  watchedSeconds: number
  totalSeconds: number
  lastWatched: string
}

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "React Completo - Do Zero ao Avançado",
    description: "Aprenda React do básico ao avançado com projetos práticos",
    instructor: "Maria Santos",
    thumbnail: "/react-course.png",
    category: "Desenvolvimento Web",
    level: "Intermediário",
    duration: "40h",
    lessons: 120,
    students: 1250,
    rating: 4.8,
    price: 199.9,
  },
  {
    id: "2",
    title: "Python para Data Science",
    description: "Domine Python e análise de dados com projetos reais",
    instructor: "Carlos Oliveira",
    thumbnail: "/python-data-science.png",
    category: "Data Science",
    level: "Iniciante",
    duration: "35h",
    lessons: 95,
    students: 890,
    rating: 4.9,
    price: 179.9,
  },
  {
    id: "3",
    title: "UI/UX Design Profissional",
    description: "Crie interfaces incríveis com Figma e princípios de design",
    instructor: "Ana Costa",
    thumbnail: "/ui-ux-design-concept.png",
    category: "Design",
    level: "Iniciante",
    duration: "25h",
    lessons: 70,
    students: 650,
    rating: 4.7,
    price: 149.9,
  },
]

export const MOCK_VIDEOS: Video[] = [
  {
    id: "1-1",
    courseId: "1",
    title: "Introdução ao React",
    description: "Entenda o que é React e por que usar",
    duration: "15:30",
    order: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/react-intro.jpg",
  },
  {
    id: "1-2",
    courseId: "1",
    title: "Configurando o Ambiente",
    description: "Instalação e configuração do ambiente de desenvolvimento",
    duration: "20:15",
    order: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "/setup-environment.jpg",
  },
  {
    id: "1-3",
    courseId: "1",
    title: "Componentes e Props",
    description: "Aprenda a criar e usar componentes React",
    duration: "25:45",
    order: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/react-components.png",
  },
  {
    id: "1-4",
    courseId: "1",
    title: "State e Hooks",
    description: "Gerenciamento de estado com useState e useEffect",
    duration: "30:20",
    order: 4,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/react-hooks-concept.png",
  },
]

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    videoId: "1-1",
    userId: "2",
    userName: "João Silva",
    userAvatar: "/placeholder-user.jpg",
    content: "Excelente introdução! Muito clara e objetiva.",
    createdAt: "2025-01-10T10:30:00",
    likes: 12,
  },
  {
    id: "c2",
    videoId: "1-1",
    userId: "3",
    userName: "Maria Souza",
    userAvatar: "/placeholder-user.jpg",
    content: "Estava procurando um curso assim há muito tempo. Obrigada!",
    createdAt: "2025-01-11T14:20:00",
    likes: 8,
  },
]

export function getCourseById(id: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.id === id)
}

export function getVideosByCourseId(courseId: string): Video[] {
  return MOCK_VIDEOS.filter((v) => v.courseId === courseId)
}

export function getVideoById(id: string): Video | undefined {
  return MOCK_VIDEOS.find((v) => v.id === id)
}

export function getCommentsByVideoId(videoId: string): Comment[] {
  return MOCK_COMMENTS.filter((c) => c.videoId === videoId)
}

// Progress tracking functions
export function getProgress(userId: string, courseId: string): Progress[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(`progress_${userId}_${courseId}`)
  return stored ? JSON.parse(stored) : []
}

export function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return
  const key = `progress_${progress.userId}_${progress.courseId}`
  const existing = getProgress(progress.userId, progress.courseId)
  const filtered = existing.filter((p) => p.videoId !== progress.videoId)
  const updated = [...filtered, progress]
  localStorage.setItem(key, JSON.stringify(updated))
}

export function getCourseProgress(userId: string, courseId: string): number {
  const progress = getProgress(userId, courseId)
  const videos = getVideosByCourseId(courseId)
  if (videos.length === 0) return 0
  const completed = progress.filter((p) => p.completed).length
  return Math.round((completed / videos.length) * 100)
}
