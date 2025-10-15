import { NextRequest, NextResponse } from "next/server"
import { getWorkout } from "@/app/api/generateWorkout/workoutService" 

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const uid = searchParams.get("uid")

  if (!uid) {
    return NextResponse.json({ error: "UID não fornecido" }, { status: 400 })
  }

  try {
    const workoutData = await getWorkout(uid)

    if (!workoutData) {
      return NextResponse.json({ error: "Nenhum treino encontrado" }, { status: 404 })
    }

    const exercisesSet = new Set()
    const uniqueExercises: any[] = []

    const allDays = workoutData.treinosGerados || workoutData

    const extractExercises = (daysObj: any) => {
      const days = Array.isArray(daysObj)
        ? daysObj
        : Object.keys(daysObj).map((day) => ({ day, exercises: daysObj[day] }))

      days.forEach((day: any) => {
        day.exercises?.forEach((exercise: any) => {
          const name =
            exercise?.exercise?.exercicio ||
            exercise?.exercise?.name ||
            exercise?.exercicio ||
            exercise?.name

          if (name && !exercisesSet.has(name)) {
            exercisesSet.add(name)
            uniqueExercises.push({
              name,
              group: exercise?.group || "N/A",
              sets: exercise?.sets || 3,
              reps: exercise?.reps || 10,
              gif: exercise?.gif || exercise?.exercise?.gif || "",
              description: exercise?.description || exercise?.exercise?.description || "",
              isExtra: exercise?.isExtra || false,
            })
          }
        })
      })
    }

    extractExercises(allDays)

    return NextResponse.json(uniqueExercises)
  } catch (err) {
    console.error("Erro ao buscar exercícios:", err)
    return NextResponse.json({ error: "Erro ao processar os exercícios" }, { status: 500 })
  }
}
