import { NextResponse } from 'next/server';
import axios from 'axios';

async function buscarEndereco(cep:any) {
  
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return res;
    } catch (error) {
      console.warn('Erro na consulta via ViaCEP, tentando API alternativa...');
      try {
        const resAlt = await axios.get(`https://apicepk2025-production.up.railway.app/cep/${cep}`);
        return resAlt;
      } catch (errorAlt) {
        console.error('Falha nas duas APIs:', errorAlt);
        throw new Error('Não foi possível obter o endereço.');
      }
    }
  }
export async function POST(request: Request) {
  try {
    // Obtém os dados enviados pelo corpo da requisição
    const {
       cep
     } = await request.json();
    // Utiliza a variável de ambiente (sem prefixo NEXT_PUBLIC para manter em segredo)
    const response = await buscarEndereco(cep);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro na rota /api/emissao-notas:", error);
    return NextResponse.error();
  }
}