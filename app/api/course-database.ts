import { ref, set, update, get, push } from "firebase/database"
import { database } from "./firebase"

// Interface para progresso do curso
interface CourseProgress {
  courseId: string
  videoProgress: {
    [videoId: string]: {
      completed: boolean
      watchedSeconds: number
      totalSeconds: number
      lastWatched: string
    }
  }
  enrolledAt: string
  lastAccessed: string
}

// Interface para comentários
interface Comment {
  id: string
  userId: string
  userName: string
  userEmail: string
  videoId: string
  courseId: string
  text: string
  createdAt: string
}

// Interface para curso
export interface CourseData {
  id?: string
  title: string
  description: string
  instructorId: string
  instructorName: string
  instructorEmail: string
  thumbnail?: string
  category: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  duration: string
  price: number
  students: number
  rating: number
  createdAt: string
  updatedAt: string
  published: boolean
}

// Matricular usuário em um curso
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  try {
    const enrollmentRef = ref(database, `courseEnrollments/${userId}/${courseId}`)
    await set(enrollmentRef, {
      enrolledAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      progress: 0,
    })
    return true
  } catch (error) {
    console.error("Error enrolling user in course:", error)
    throw error
  }
}

// Obter progresso do usuário em um curso
export const getUserCourseProgress = async (userId: string, courseId: string) => {
  try {
    const progressRef = ref(database, `courseProgress/${userId}/${courseId}`)
    const snapshot = await get(progressRef)

    if (snapshot.exists()) {
      return snapshot.val()
    }
    return null
  } catch (error) {
    console.error("Error getting course progress:", error)
    throw error
  }
}

// Atualizar progresso de um vídeo
export const updateVideoProgress = async (
  userId: string,
  courseId: string,
  videoId: string,
  watchedSeconds: number,
  totalSeconds: number,
  completed: boolean,
) => {
  try {
    const videoProgressRef = ref(database, `courseProgress/${userId}/${courseId}/videos/${videoId}`)

    await update(videoProgressRef, {
      watchedSeconds,
      totalSeconds,
      completed,
      lastWatched: new Date().toISOString(),
    })

    // Atualizar último acesso ao curso
    const courseRef = ref(database, `courseProgress/${userId}/${courseId}`)
    await update(courseRef, {
      lastAccessed: new Date().toISOString(),
    })

    return true
  } catch (error) {
    console.error("Error updating video progress:", error)
    throw error
  }
}

// Adicionar comentário
export const addComment = async (
  userId: string,
  userName: string,
  userEmail: string,
  courseId: string,
  videoId: string,
  text: string,
) => {
  try {
    const commentsRef = ref(database, `comments/${courseId}/${videoId}`)
    const newCommentRef = push(commentsRef)

    await set(newCommentRef, {
      userId,
      userName,
      userEmail,
      text,
      createdAt: new Date().toISOString(),
    })

    return newCommentRef.key
  } catch (error) {
    console.error("Error adding comment:", error)
    throw error
  }
}

// Obter comentários de um vídeo
export const getVideoComments = async (courseId: string, videoId: string) => {
  try {
    const commentsRef = ref(database, `comments/${courseId}/${videoId}`)
    const snapshot = await get(commentsRef)

    if (snapshot.exists()) {
      const comments = snapshot.val()
      return Object.keys(comments).map((key) => ({
        id: key,
        ...comments[key],
      }))
    }
    return []
  } catch (error) {
    console.error("Error getting comments:", error)
    throw error
  }
}

// Obter todos os cursos matriculados do usuário
export const getUserEnrolledCourses = async (userId: string) => {
  try {
    const enrollmentsRef = ref(database, `courseEnrollments/${userId}`)
    const snapshot = await get(enrollmentsRef)

    if (snapshot.exists()) {
      return snapshot.val()
    }
    return {}
  } catch (error) {
    console.error("Error getting enrolled courses:", error)
    throw error
  }
}

// Verificar se usuário está matriculado em um curso
export const isUserEnrolledInCourse = async (userId: string, courseId: string) => {
  try {
    const enrollmentRef = ref(database, `courseEnrollments/${userId}/${courseId}`)
    const snapshot = await get(enrollmentRef)
    return snapshot.exists()
  } catch (error) {
    console.error("Error checking enrollment:", error)
    return false
  }
}

// Criar um novo curso
export const createCourse = async (courseData: Omit<CourseData, "id" | "createdAt" | "updatedAt">) => {
  try {
    const coursesRef = ref(database, "courses")
    const newCourseRef = push(coursesRef)

    const course: CourseData = {
      ...courseData,
      id: newCourseRef.key!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      students: 0,
      rating: 0,
      published: true,
    }

    await set(newCourseRef, course)
    return { success: true, courseId: newCourseRef.key }
  } catch (error) {
    console.error("Error creating course:", error)
    throw error
  }
}

// Obter todos os cursos
export const getAllCourses = async () => {
  try {
    const coursesRef = ref(database, "courses")
    const snapshot = await get(coursesRef)

    if (snapshot.exists()) {
      const coursesData = snapshot.val()
      return Object.keys(coursesData).map((key) => ({
        id: key,
        ...coursesData[key],
      }))
    }
    return []
  } catch (error) {
    console.error("Error getting courses:", error)
    throw error
  }
}

// Obter curso por ID
export const getCourseById = async (courseId: string) => {
  try {
    const courseRef = ref(database, `courses/${courseId}`)
    const snapshot = await get(courseRef)

    if (snapshot.exists()) {
      return { id: courseId, ...snapshot.val() }
    }
    return null
  } catch (error) {
    console.error("Error getting course:", error)
    throw error
  }
}

// Atualizar curso
export const updateCourse = async (courseId: string, updates: Partial<CourseData>) => {
  try {
    const courseRef = ref(database, `courses/${courseId}`)
    await update(courseRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    })
    return true
  } catch (error) {
    console.error("Error updating course:", error)
    throw error
  }
}

// Deletar curso
export const deleteCourse = async (courseId: string) => {
  try {
    const courseRef = ref(database, `courses/${courseId}`)
    await set(courseRef, null)
    return true
  } catch (error) {
    console.error("Error deleting course:", error)
    throw error
  }
}
