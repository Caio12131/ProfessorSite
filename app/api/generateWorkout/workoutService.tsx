const API_URL = "" // ajuste se necessário

export interface WorkoutDay {
  day: string
  exercises: string[]
}

export interface Workout {
  treinosGerados: WorkoutDay[]
}

export const getWorkout = async (userId: string): Promise<Workout | null> => {
  try {
    const res = await fetch("/api/getWorkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
            }),
          });
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Erro ao buscar treino:", error)
    return null
  }
}
