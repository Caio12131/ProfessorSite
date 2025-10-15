import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    // Dados recebidos do frontend
    const requestData = await request.json();

    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      console.error("API_URL não está configurada.");
      return NextResponse.json(
        { error: true, message: "Configuração do servidor incompleta." },
        { status: 500 }
      );
    }

    // IP do cliente
    const forwarded = request.headers.get("x-forwarded-for");
    const remoteIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // Novos campos para assinatura
    const paymentType = requestData.paymentType || "payment"; // "payment" ou "subscription"
    const cycle = requestData.cycle; // "MONTHLY", "QUARTERLY", "YEARLY"

    const paymentData = {
      ...requestData,
      remoteIp: remoteIp,
      paymentType: paymentType,
      cycle: cycle,
    };

    // Valor da parcela, se parcelado
    if (paymentData.installments && !paymentData.installmentValue) {
      const valorNumerico = Number.parseFloat(paymentData.valor);
      const installments = Number.parseInt(paymentData.installments);
      paymentData.installmentValue = (valorNumerico / installments).toFixed(2);
    }

    const endpointAsaas = `${apiUrl}/CriarPagamentoAsaas`;

    // Implementar retry logic com timeouts progressivos
    const maxRetries = 3;
    const timeouts = [45000, 60000, 90000]; // 45s, 60s, 90s

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await axios.post(endpointAsaas, paymentData, {
          timeout: timeouts[attempt],
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => {
            return status < 500;
          },
        });
        if (
          response.status === 400 &&
          response.data.message === "Usuário sem Prompt válido"
        ) {
          return NextResponse.json(
            { error: true, message: "Usuário sem Prompt válido" },
            { status: 400 }
          );
        }
        // Check if response has data
        if (response.data === undefined || response.data === null) {
          console.error("Resposta vazia da API externa");
          return NextResponse.json(
            { error: true, message: "Resposta vazia do servidor de pagamento" },
            { status: 502 }
          );
        }

        // Check if response is a string (might be HTML error page)
        if (typeof response.data === "string") {
          console.error(
            "Resposta não é JSON:",
            response.data.substring(0, 200)
          );
          return NextResponse.json(
            {
              error: true,
              message: "Resposta inválida do servidor de pagamento",
            },
            { status: 502 }
          );
        }

        return NextResponse.json(response.data, { status: 200 });
      } catch (axiosError: any) {
        console.error(`Erro na tentativa ${attempt + 1}:`, axiosError.message);

        // Se for o último retry, lance o erro
        if (attempt === maxRetries - 1) {
          if (
            axiosError.code === "ECONNABORTED" &&
            axiosError.message.includes("timeout")
          ) {
            return NextResponse.json(
              {
                error: true,
                message:
                  "O processamento está demorando mais que o esperado. Tente novamente em alguns minutos.",
                code: "TIMEOUT_ERROR",
              },
              { status: 408 }
            );
          }

          if (axiosError.code === "ECONNREFUSED") {
            return NextResponse.json(
              {
                error: true,
                message: "Não foi possível conectar ao servidor de pagamento",
              },
              { status: 503 }
            );
          }

          // Handle empty response specifically
          if (axiosError.response && axiosError.response.data === "") {
            console.error("Resposta vazia do servidor");
            return NextResponse.json(
              {
                error: true,
                message: "Servidor de pagamento retornou resposta vazia",
              },
              { status: 502 }
            );
          }

          throw axiosError;
        }

        // Para timeouts, aguardar antes de tentar novamente
        if (
          axiosError.code === "ECONNABORTED" &&
          axiosError.message.includes("timeout")
        ) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }

        // Para outros erros, não tentar novamente
        throw axiosError;
      }
    }
  } catch (error: any) {
    console.error("Erro ao processar pagamento:", error);

    if (error.response) {
      console.error("Dados da resposta de erro:", error.response.data);
      console.error("Status da resposta de erro:", error.response.status);
      console.error("Headers da resposta de erro:", error.response.headers);
    }

    return NextResponse.json(
      {
        error: true,
        message: error.response?.data?.message || "Erro ao processar pagamento",
        details: error.response?.data || "Sem detalhes adicionais",
        errorCode: error.code || "UNKNOWN_ERROR",
      },
      { status: error.response?.status || 500 }
    );
  }
}
