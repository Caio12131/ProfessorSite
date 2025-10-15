import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request, context: { params: Promise<{ paymentId: string }> }) {
    try {
      const { paymentId } = await context.params;
      const apiUrl = process.env.API_URL;
      const response = await axios.get(`${apiUrl}/get-payment-status/${paymentId}`);
      return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
      console.error("Erro na rota /api/pagamento/asaas/get-payment-status:", error);
      return NextResponse.error();
    }
  }
  

