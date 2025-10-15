import { type NextRequest, NextResponse } from "next/server"

export interface WorkoutDay {
  day: string
  exercises: string[]
}

export interface Workout {
  treinosGerados: WorkoutDay[]
}

const saveWorkout = async (userId: string, workoutDays: WorkoutDay[]): Promise<boolean> => {
  try {
    const res = await fetch(`https://internacionalnutriback-production.up.railway.app/api/workout/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, workoutDays }),
    })

    return res.ok
  } catch (error) {
    console.error("Erro ao salvar treino:", error)
    return false
  }
}
export async function POST(req: NextRequest) {
  try {
    const { userId, workoutData } = await req.json()

    if (!userId || !workoutData) {
      return NextResponse.json({ error: "userId e workoutData são obrigatórios" }, { status: 400 })
    }


    // Salvar o treino atualizado
    await saveWorkout(userId, workoutData)

    return NextResponse.json({
      success: true,
      message: "Treino atualizado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao atualizar treino:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        detail: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
