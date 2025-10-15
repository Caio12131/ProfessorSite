import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    // Obtém os dados enviados pelo corpo da requisição
    const {
        cpf,
        cep,
        cidade,
        bairro, 
        logradouro,
        estado,
        ibge,
        codigo,
        uid,
        nome
     } = await request.json();
    // Utiliza uma variável de ambiente (sem prefixo NEXT_PUBLIC para manter em segredo)
    const apiUrl = process.env.API_URL;
    const response = await axios.post(`${apiUrl}/cadastrarVenda`, {
        cpf,
        cep,
        cidade,
        bairro, 
        logradouro,
        estado,
        ibge,
        codigo,
        uid,
        nome
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro na rota /api/emissao-notas:", error);
    return NextResponse.error();
  }
}
