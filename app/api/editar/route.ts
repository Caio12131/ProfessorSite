import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, promptB, edicao } = body;
    const apiUrl = process.env.API_URL;

    const response = await axios.post(
      `${apiUrl}/editarDieta`,
      {
        userId,
        promptB,
        edicao,
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Erro na API editar:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}