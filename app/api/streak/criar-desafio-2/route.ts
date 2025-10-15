import { NextRequest, NextResponse } from 'next/server'
import { ref, get } from 'firebase/database'
import { database } from '../../firebase'
import { criarDesafio2NoMesmoPeriodo, getDesafios } from '@/lib/services/desafio-service'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se o usuário já completou o desafio 1
    const desafios = await getDesafios(userId)
    const desafio1Completo = desafios.find(d => d.ciclo === 1 && d.dataCompletouDesafio)
    
    if (!desafio1Completo) {
      return NextResponse.json(
        { error: 'Usuário precisa completar o Desafio 1 primeiro' },
        { status: 400 }
      )
    }

    // Verificar se já existe desafio 2
    const desafio2Existente = desafios.find(d => d.ciclo === 2)
    if (desafio2Existente) {
      return NextResponse.json(
        { message: 'Desafio 2 já existe para este usuário' },
        { status: 200 }
      )
    }

    // Criar desafio 2 no mesmo período
    const novoDesafio2 = await criarDesafio2NoMesmoPeriodo(userId)

    return NextResponse.json({
      success: true,
      message: 'Desafio 2 criado com sucesso no mesmo mês!',
      data: {
        novoDesafio: novoDesafio2
      }
    })

  } catch (error) {
    console.error('Erro ao criar desafio 2:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
