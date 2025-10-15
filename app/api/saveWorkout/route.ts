// app/api/saveWorkout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Repassa para o backend Express
    const response = await fetch("https://internacionalnutriback-production.up.railway.app/api/save-workout-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Erro ao conectar com o backend." }, { status: 500 });
  }
}
