import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const { amount, addordebump, email, uid } = await request.json()
    // Recupera a URL externa da variável de ambiente (não exposta no cliente)
    const apiUrl = process.env.API_URL
    // Repassa a requisição para o endpoint externo
    const response = await axios.post(`${apiUrl}/processarPagamento`, { amount, addordebump, email, uid })
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error("Erro no endpoint /api/pagamento/efi/criar:", error)
    return NextResponse.error()
  }
}
