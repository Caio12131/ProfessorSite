import { NextRequest, NextResponse } from 'next/server'
import { ref, update, get } from 'firebase/database'
import { database } from '../../firebase'
import { criarNovoDesafio, criarDesafio2NoMesmoPeriodo, getDesafios } from '@/lib/services/desafio-service'

export async function POST(request: NextRequest) {
  try {
    const { userId, dataCompletou } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 }
      )
    }

    // Obter o streak atual do usuário
    const streakRef = ref(database, `users/${userId}/Evolucao/streak`)
    const snapshot = await get(streakRef)
    
    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: 'Streak não encontrado' },
        { status: 404 }
      )
    }

    const currentStreak = snapshot.val()
    const streakAtual = parseInt(currentStreak.streakAtual) || 0

    // Obter desafios para determinar o ciclo atual
    const desafios = await getDesafios(userId)
    const desafioAtual = desafios.find(d => !d.dataCompletouDesafio) || desafios[desafios.length - 1]
    const cicloAtual = desafioAtual?.ciclo || 1
    
    // Verificar se realmente completou o objetivo correto baseado no ciclo
    const objetivoDias = cicloAtual === 2 ? 25 : 21
    if (streakAtual < objetivoDias) {
      return NextResponse.json(
        { error: `Usuário não completou ${objetivoDias} dias ainda` },
        { status: 400 }
      )
    }

    // Verificar se já não foi marcado como completado
    if (currentStreak.completouDesafio) {
      return NextResponse.json(
        { message: 'Desafio já foi marcado como completado' },
        { status: 200 }
      )
    }

    // Atualizar o streak com a informação de que completou o desafio
    const updatedStreak = {
      ...currentStreak,
      completouDesafio: true,
      dataCompletouDesafio: dataCompletou,
      desafiosCompletos: (currentStreak.desafiosCompletos || 0) + 1
    }

    await update(ref(database, `users/${userId}/Evolucao`), {
      streak: updatedStreak
    })

    // INICIAR NOVO DESAFIO AUTOMATICAMENTE
    let novoDesafio;
    
          // Se completou o desafio 1 (21 dias), criar desafio 2 no mesmo período
    if (cicloAtual === 1) {
              novoDesafio = await criarDesafio2NoMesmoPeriodo(userId);
    } else {
      // Para outros ciclos, usar a função padrão
      novoDesafio = await criarNovoDesafio(userId);
    }

    return NextResponse.json({
      success: true,
      message: `Desafio de ${objetivoDias} dias marcado como completado e novo desafio iniciado automaticamente!`,
      data: {
        streak: updatedStreak,
        novoDesafio: novoDesafio
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 