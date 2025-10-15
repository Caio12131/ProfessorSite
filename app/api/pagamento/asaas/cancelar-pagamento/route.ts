import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { idPagamento } = await request.json();
    const apiUrl = process.env.API_URL;
    const response = await axios.post(`${apiUrl}/CancelarPagamentoAsaas`, { idPagamento });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro na rota /api/cancelar-pagamento-asaas:", error);
    return NextResponse.error();
  }
}
