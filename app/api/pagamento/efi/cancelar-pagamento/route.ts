import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const { PaymentID } = await request.json()
    const apiUrl = process.env.API_URL
    const response = await axios.post(`${apiUrl}/CancelarPagamento`, { PaymentID })
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error("Erro no endpoint /api/pagamento/efi/cancelar:", error)
    return NextResponse.error()
  }
}
