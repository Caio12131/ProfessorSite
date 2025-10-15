import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, promptData } = body;

    // Log do que será enviado para o backend
    console.log("Enviando para o backend:", { userId, promptData });

    // Validação dos dados de entrada
    if (!userId) {
      return NextResponse.json(
        {
          error: "Dados incompletos",
          message: "userId é obrigatório"
        },
        { status: 400 }
      );
    }

    // Chamar a API externa usando API_URL do ambiente
    const apiUrl = 'http://localhost:3007/novaDieta';
    if (!apiUrl) {
      console.error("API_URL não configurada no ambiente");
      return NextResponse.json(
        {
          error: "Configuração inválida",
          message: "URL da API não configurada"
        },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, promptData })
    });

    const responseData = await response.json();

    // Log da resposta recebida do backend
    console.log("Resposta do backend:", responseData);

    if (!response.ok) {
      console.error("Erro na API externa:", responseData);
      return NextResponse.json(
        responseData,
        { status: response.status }
      );
    }

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error("Erro ao chamar API de nova dieta:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: "Erro ao processar solicitação de nova dieta"
      },
      { status: 500 }
    );
  }
}
