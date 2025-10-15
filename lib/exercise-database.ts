// Tipos para os exercícios
export interface ExerciseData {
    id: number
    exercicio: string
    gif: string
    series: string
    repetições: string
  }
  
  export interface ProcessedExercise {
    name: string
    exercicio: string
    group: string
    sets: number
    reps: number
    gif: string
    description: string
    isExtra: boolean
    id: string
  }
  
  // Tipo para a base de dados de exercícios
  export type ExerciseDatabase = {
    [key: string]: ExerciseData[]
  }
  
  // Base de dados de exercícios - Academia
  export const Exercicios: ExerciseDatabase = {
    Biceps: [
      {
        id: 1,
        exercicio: "Barra Fixa",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FBarra%20Fixa.gif?alt=media&token=e1436378-2a57-4a35-b3ff-0abae4e5b42c",
        series: "4",
        repetições: "12",
      },
      {
        id: 2,
        exercicio: "Biceps Halter Unilateral",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FBiceps%20Unilateral.gif?alt=media&token=e27d60ac-9278-4373-80db-8d726cd6a6f9",
        series: "4",
        repetições: "12",
      },
      {
        id: 3,
        exercicio: "Rosca Concentrada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2Frosca-concentrada-unilateral-com-halter.gif?alt=media&token=2dae7ca5-ccd7-44d3-80c9-89ec93b830f6",
        series: "4",
        repetições: "12",
      },
      {
        id: 5,
        exercicio: "Rosca Inclinada com Halter",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca%20Inclinada%20com%20Halter.gif?alt=media&token=f9ccdcea-2cca-4037-8b0c-3dc2e47c3f1e",
        series: "4",
        repetições: "12",
      },
      {
        id: 6,
        exercicio: "Rosca Inversa",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca%20Inversa%20Barra.gif?alt=media&token=4e29cebe-d47d-4f58-8cd6-af00b30513d1",
        series: "4",
        repetições: "12",
      },
      {
        id: 7,
        exercicio: "Rosca Martelo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca-Martelo.gif?alt=media&token=1851a43d-4337-4326-a589-ea5c76a762c5",
        series: "4",
        repetições: "12",
      },
      {
        id: 8,
        exercicio: "Rosca Martelo na Corda",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca%20Martelo%20na%20Corda.gif?alt=media&token=2c995df1-ba8a-46a7-ad2f-98726da55341",
        series: "4",
        repetições: "12",
      },
      {
        id: 9,
        exercicio: "Rosca Simultânea",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca%20Simultanea.gif?alt=media&token=444cef5b-1fcb-48b4-9ee7-a625ca85b398",
        series: "4",
        repetições: "12",
      },
      {
        id: 10,
        exercicio: "Rosca no Banco Scott",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca%20no%20Banco%20Scott.gif?alt=media&token=337319c2-a0ae-4206-9851-54f895dc953e",
        series: "4",
        repetições: "12",
      },
      {
        id: 11,
        exercicio: "Rosca Direta com Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca%20Direta%20com%20Barra.gif?alt=media&token=3f89d8c7-b664-48e6-ad27-232a3ca7f4ca",
        series: "4",
        repetições: "12",
      },
      {
        id: 12,
        exercicio: "Rosca Alternada com Halteres",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/biceps%2FRosca-Alternada-com-Halteres.gif?alt=media&token=bc9939ea-ac05-485e-9936-8fbc7bfa4ed9",
        series: "4",
        repetições: "12",
      },
    ],
    Triceps: [
      {
        id: 15,
        exercicio: "Extensão de Tríceps com Cabos Cruzados",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FExtens%C3%A3o%20de%20Triceps%20com%20Cabos%20Cruzados.gif?alt=media&token=eeed28b8-321f-495d-a907-54d1f8cf3618",
        series: "4",
        repetições: "12",
      },
      {
        id: 16,
        exercicio: "Extensão de Tríceps no Banco",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FExtens%C3%A3o%20de%20Tr%C3%ADceps%20no%20Banco.gif?alt=media&token=629c4f75-4648-498a-b7dd-46c61baedfab",
        series: "4",
        repetições: "12",
      },
      {
        id: 17,
        exercicio: "Mergulho Tríceps",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FMergulho%20Triceps.gif?alt=media&token=1b19ef1a-c9e3-4a93-9368-c43eb7d0da7f",
        series: "4",
        repetições: "12",
      },
      {
        id: 18,
        exercicio: "Remada Curvada Fechada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FRemada%20Curvada%20Fechada.gif?alt=media&token=4749498d-7911-4a5d-be29-8e4ea508193e",
        series: "4",
        repetições: "12",
      },
      {
        id: 19,
        exercicio: "Tríceps Corda",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FTriceps%20Corda.gif?alt=media&token=962f00b3-0088-48b8-a472-f2af01b643b3",
        series: "4",
        repetições: "12",
      },
      {
        id: 20,
        exercicio: "Tríceps Francês",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FTriceps%20Frances.gif?alt=media&token=675c8f75-81f1-4b46-8bb5-644f8f94dae1",
        series: "4",
        repetições: "12",
      },
      {
        id: 21,
        exercicio: "Tríceps Testa",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FTriceps%20Testa.gif?alt=media&token=aa329d05-47cf-4307-a753-54d8426281fa",
        series: "4",
        repetições: "12",
      },
      {
        id: 22,
        exercicio: "Tríceps na Polia com Barra V",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FTriceps%20na%20Polia%20Barra%20V.gif?alt=media&token=1e3fb742-ce23-46ca-b256-c01b6633460f",
        series: "4",
        repetições: "12",
      },
    ],
    Costas: [
      {
        id: 24,
        exercicio: "Crucifixo Invertido",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FCrucifixo%20Invertido.gif?alt=media&token=64dd7771-ed4d-41f4-a1a7-ed7c57074655",
        series: "4",
        repetições: "12",
      },
      {
        id: 25,
        exercicio: "Pulldown",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FPulldown.gif?alt=media&token=354d8f8c-1dd1-4648-9751-096c2f074e93",
        series: "4",
        repetições: "12",
      },
      {
        id: 26,
        exercicio: "Puxada Unilateral Crossover",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FPuxada%20Unilateral%20Crossover.gif?alt=media&token=98babb8f-d661-46d1-9860-358dea778bf1",
        series: "4",
        repetições: "12",
      },
      {
        id: 27,
        exercicio: "Remada Curvada com Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FRemada%20Curvada%20com%20Barra.gif?alt=media&token=131ad4d9-3eda-4e8e-a060-8c45a1fd0519",
        series: "4",
        repetições: "12",
      },
      {
        id: 28,
        exercicio: "Remada Alta com Halter",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FRemada%20Alta%20com%20Halter.gif?alt=media&token=579a9643-4442-4381-b983-13b0f2c788b5",
        series: "4",
        repetições: "12",
      },
      {
        id: 29,
        exercicio: "Remada Baixa",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FRemada%20Baixa.gif?alt=media&token=46b3ec65-afc4-4f25-afa2-85f83b05a2f1",
        series: "4",
        repetições: "12",
      },
      {
        id: 30,
        exercicio: "Remada Cavalinho",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FRemada%20Cavalinho.gif?alt=media&token=762a9c85-210c-4a1c-8f40-0c8fe1b3ba7b",
        series: "4",
        repetições: "12",
      },
      {
        id: 31,
        exercicio: "Remada Inclinada Reversa",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FRemada%20Inclinada%20Reversa.gif?alt=media&token=f2652307-d86f-4013-b018-a114c4693c36",
        series: "4",
        repetições: "12",
      },
      {
        id: 32,
        exercicio: "Remada Sentada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FRemada%20Sentada.gif?alt=media&token=ce6a7dad-cb12-4197-94b1-2acc5fc723fa",
        series: "4",
        repetições: "12",
      },
      {
        id: 33,
        exercicio: "Remada Unilateral",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FRemada%20Unilateral.gif?alt=media&token=8519222a-4b1c-4093-9e60-ea09f53eeb8c",
        series: "4",
        repetições: "12",
      },
      {
        id: 34,
        exercicio: "Remada no Cabo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FRemada%20no%20Cabo.gif?alt=media&token=8abf53a6-69d0-42ef-8a4d-b363108578bc",
        series: "4",
        repetições: "12",
      },
      {
        id: 35,
        exercicio: "Pulldown na Polia Alta",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/costas%2FPulldown%20na%20Polia%20Alta.gif?alt=media&token=d293da7f-8fea-4d9b-897a-1eb0107c9431",
        series: "4",
        repetições: "12",
      },
    ],
    Ombro: [
      {
        id: 36,
        exercicio: "Desenvolvimento Arnold",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FDesenvolvimento%20Arnold.gif?alt=media&token=912638aa-1e6d-40fe-9c6e-8c634150555f",
        series: "4",
        repetições: "12",
      },
      {
        id: 37,
        exercicio: "Desenvolvimento Arnold Unilateral",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FDesenvolvimento%20Arnold%20Unilateral.gif?alt=media&token=70b196a7-a687-4da8-bff1-2744d87fe803",
        series: "4",
        repetições: "12",
      },
      {
        id: 38,
        exercicio: "Desenvolvimento Maquina",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FDesenvolvimento%20Maquina.gif?alt=media&token=2c19370d-6f87-429f-842f-3c322171d297",
        series: "4",
        repetições: "12",
      },
      {
        id: 39,
        exercicio: "Desenvolvimento com Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FDesenvolvimento%20com%20Barra.gif?alt=media&token=186d4251-8ca4-41e7-89cb-485674fd26ef",
        series: "4",
        repetições: "12",
      },
      {
        id: 40,
        exercicio: "Elevação Frontal",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FEleva%C3%A7%C3%A3o%20Frontal.gif?alt=media&token=359f12d3-bbfe-4840-a40c-f3fe3b53ba95",
        series: "4",
        repetições: "12",
      },
      {
        id: 41,
        exercicio: "Elevação Lateral com Halteres",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FEleva%C3%A7%C3%A3o%20Lateral.gif?alt=media&token=26570844-42e3-4829-8a19-fe97d4c40000",
        series: "4",
        repetições: "20",
      },
      {
        id: 42,
        exercicio: "Elevação Lateral Inclinado",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FEleva%C3%A7%C3%A3o%20Lateral%20Inclinada.gif?alt=media&token=aa5c19b3-de8e-40cf-9af9-0b22c633b655",
        series: "4",
        repetições: "12",
      },
      {
        id: 43,
        exercicio: "Elevação Lateral na Polia Baixa",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FEleva%C3%A7%C3%A3o%20Lateral%20na%20Polia%20Baixa.gif?alt=media&token=87ecb150-89e0-4450-9941-21c2cf9a8cef",
        series: "4",
        repetições: "12",
      },
      {
        id: 44,
        exercicio: "Encolhimento de Ombros com Halteres",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/ombro%2FEncolhimento%20de%20Ombros%20com%20Halter.gif?alt=media&token=940e2d85-0f88-41d1-b29a-cbb6eb9a3ac4",
        series: "4",
        repetições: "12",
      },
      {
        id: 45,
        exercicio: "Mergulho",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/triceps%2FMergulho%20Triceps.gif?alt=media&token=1b19ef1a-c9e3-4a93-9368-c43eb7d0da7f",
        series: "4",
        repetições: "12",
      },
    ],
    Perna: [
      {
        id: 46,
        exercicio: "Afundo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2Fafundo-exercicio.gif?alt=media&token=6f64b34c-2b7c-49a9-aa30-4f6bb9f1efc5",
        series: "4",
        repetições: "12",
      },
      {
        id: 47,
        exercicio: "Agachamento Sumô com Halter",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2Fagachamento%20sumo%20com%20halter.gif?alt=media&token=bc004d10-7a8c-407a-ad84-532fd9597d04",
        series: "4",
        repetições: "12",
      },
      {
        id: 48,
        exercicio: "Agachamento no Smith",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2Fagachamento%20no%20smith.gif?alt=media&token=09076ca0-4b66-4c1a-9732-660f6033aeb1",
        series: "4",
        repetições: "12",
      },
      {
        id: 49,
        exercicio: "Cadeira Adutora",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2Fcadeira%20abdutora.gif?alt=media&token=69ad6525-050d-4cb1-89c7-2f585599e4f9",
        series: "4",
        repetições: "12",
      },
      {
        id: 50,
        exercicio: "Cadeira Extensora",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2FCadeira%20Extensora.gif?alt=media&token=e3daba6e-b2ef-4f3e-9a34-06002705d721",
        series: "4",
        repetições: "12",
      },
      {
        id: 51,
        exercicio: "Cadeira Flexora",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2Fcadeira%20flexora.gif?alt=media&token=6204dc7c-a63d-400d-9eba-ff767c8204ba",
        series: "4",
        repetições: "12",
      },
      {
        id: 52,
        exercicio: "Elevação Pélvica",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2FElevacao%20Pelvica.gif?alt=media&token=acbd7f98-25e3-4765-8f5d-d2c3dfb3ca84",
        series: "4",
        repetições: "12",
      },
      {
        id: 53,
        exercicio: "Hack Machine",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2FHack%20Machine.gif?alt=media&token=bd74ca73-e96f-4af2-8259-796ea45bb45c",
        series: "4",
        repetições: "12",
      },
      {
        id: 54,
        exercicio: "Leg Press 45°",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2FLeg%20Press.gif?alt=media&token=a5e99776-be44-41e4-ba1d-ae1f0b6bca2a",
        series: "4",
        repetições: "12",
      },
      {
        id: 55,
        exercicio: "Levantamento Terra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2FLevantamento%20Terra.gif?alt=media&token=c304574c-aa51-489e-9ca1-009a36f38583",
        series: "4",
        repetições: "12",
      },
      {
        id: 58,
        exercicio: "Stiff",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/perna%2Fstiff.gif?alt=media&token=6cd0010d-0fa4-4b6f-8f3a-432ad50316fc",
        series: "4",
        repetições: "12",
      },
    ],
    Peito: [
      {
        id: 60,
        exercicio: "Mergulho em Paralelas",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2Fbarras%20paralelas.gif?alt=media&token=017dc141-a013-4199-a857-3ac88acd4f8e",
        series: "4",
        repetições: "12",
      },
      {
        id: 61,
        exercicio: "Crossover na Polia Alta",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FCrossober%20na%20Polia%20Alta.gif?alt=media&token=3e07ff30-ca86-448a-96c7-e4af93b3924f",
        series: "4",
        repetições: "12",
      },
      {
        id: 63,
        exercicio: "Crucifixo Cross",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FCrucifixo%20Cross.gif?alt=media&token=f31c90e7-46f7-4c75-9ce2-14c4a957db48",
        series: "4",
        repetições: "12",
      },
      {
        id: 32,
        exercicio: "Crossover no Cabo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FCrossover%20no%20Cabo.gif?alt=media&token=425c4cd5-810b-45dd-a6cd-a62c80eaed39",
        series: "4",
        repetições: "12",
      },
      {
        id: 63,
        exercicio: "Crucifixo Máquina",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FCrucifixo%20Maquina.gif?alt=media&token=ba286d22-de12-4836-b3f8-c34c3fd75b10",
        series: "4",
        repetições: "12",
      },
      {
        id: 64,
        exercicio: "Flexão de Joelho",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FFlex%C3%A3o%20com%20joelho.gif?alt=media&token=c076e29d-77cf-4b1d-9343-8875d58c1996",
        series: "4",
        repetições: "12",
      },
      {
        id: 65,
        exercicio: "Flexão no Banco",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FFlex%C3%A3o%20no%20Banco.gif?alt=media&token=5c9b8fe4-204c-4e5e-8dc7-f39faf0c01a9",
        series: "4",
        repetições: "12",
      },
      {
        id: 66,
        exercicio: "Flexão no Banco Inclinado",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FFlex%C3%A3o%20no%20Banco%20Inclinado.gif?alt=media&token=4fec08e3-8859-48e6-af48-b27a55cc222b",
        series: "4",
        repetições: "12",
      },
      {
        id: 67,
        exercicio: "Supino Reto",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2FSupino%20com%20Halter.gif?alt=media&token=2a850656-8e89-4cae-bd63-5d64c130042f",
        series: "4",
        repetições: "12",
      },
      {
        id: 68,
        exercicio: "Voador",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2Fvoador.gif?alt=media&token=428a2565-cde7-4974-8c51-1aba3ec468f5",
        series: "4",
        repetições: "12",
      },
      {
        id: 69,
        exercicio: "Supino Declinado",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/peito%2Fsupino%20declinado.gif?alt=media&token=19f9fcaf-49d5-4ba1-a7bf-b7035f329430",
        series: "4",
        repetições: "12",
      },
    ],
    Gluteos: [
      {
        id: 70,
        exercicio: "Elevação Pélvica",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2Feleva%C3%A7%C3%A3o%20P%C3%A9lvica.gif?alt=media&token=969f9d91-dfe3-4c90-9867-acec07239f9b",
        series: "4",
        repetições: "15",
      },
      {
        id: 71,
        exercicio: "Stiff com Halteres",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2FStiff%20com%20Halteres.gif?alt=media&token=ee681fc0-9f67-4ff9-b4bd-ec284d0cef05",
        series: "4",
        repetições: "12",
      },
      {
        id: 72,
        exercicio: "Passada com Halteres",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2FPassada%20com%20Halteres.gif?alt=media&token=e2c942df-449d-42b5-b6b1-db4a5962790c",
        series: "4",
        repetições: "12",
      },
      {
        id: 73,
        exercicio: "Levantamento com Barra Deadlift",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2FLevantamento%20de%20Barra%20Deadlift.gif?alt=media&token=eb1bd9d0-6350-4a1e-a1c9-e28d0f5b701b",
        series: "4",
        repetições: "10",
      },
      {
        id: 74,
        exercicio: "Coice no Cabo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2FCoice%20no%20Cabo.gif?alt=media&token=8a5a04cb-6693-4ed7-a995-eefa05e8e713",
        series: "4",
        repetições: "15",
      },
      {
        id: 75,
        exercicio: "Agachamento com Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2FAgachamento%20com%20Barragif.gif?alt=media&token=f4a6ab20-9712-4413-b72e-a0e9ca9dd870",
        series: "4",
        repetições: "12",
      },
      {
        id: 76,
        exercicio: "Agachamento Sumô",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/gluteos%2FAgachamento%20Sum%C3%B4.gif?alt=media&token=d03f4332-d5b0-4892-8278-00746d94375b",
        series: "4",
        repetições: "15",
      },
    ],
    Antebraco: [
      {
        id: 78,
        exercicio: "Suspensão na Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/antebra%C3%A7o%2FSuspens%C3%A3o%20na%20Barra.gif?alt=media&token=0822b9f7-4d8c-4167-95a8-5b143a44dbc1",
        series: "3",
        repetições: "30 segundos",
      },
      {
        id: 79,
        exercicio: "Rosca de Punho Martelo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/antebra%C3%A7o%2FRosca%20de%20Punho%20Martelo.gif?alt=media&token=3263ff27-1cef-489a-84eb-6f25620a0ae7",
        series: "3",
        repetições: "15",
      },
      {
        id: 80,
        exercicio: "Rosca de Punho Invertido Sentado",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/antebra%C3%A7o%2FRosca%20de%20Punho%20Invertida%20Sentado.gif?alt=media&token=fce4f19d-21e8-472c-929c-02db821f87f6",
        series: "3",
        repetições: "15",
      },
      {
        id: 81,
        exercicio: "Rolo de Pulso",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/antebra%C3%A7o%2FRolo%20de%20Pulso.gif?alt=media&token=f49ef4f6-52bd-482e-8204-6e6b9021cfd4",
        series: "3",
        repetições: "10",
      },
      {
        id: 82,
        exercicio: "Extensão de Punho",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/antebra%C3%A7o%2FExtens%C3%A3o%20de%20Punho.gif?alt=media&token=ca80ee99-7fd0-4248-9ae0-9a5739c5e080",
        series: "3",
        repetições: "15",
      },
    ],
    Abdomen: [
      {
        id: 83,
        exercicio: "Abdominal Cruzado",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Cruzado.gif?alt=media&token=85d8fc41-5044-4294-ab67-69bf68a305ae",
        series: "3",
        repetições: "20",
      },
      {
        id: 84,
        exercicio: "Abdominal Declinado",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Declinado.gif?alt=media&token=b40ff887-9bef-4fef-9221-2e757086e1ff",
        series: "3",
        repetições: "15",
      },
      {
        id: 85,
        exercicio: "Abdominal Invertido",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Invertido.gif?alt=media&token=4091f4f7-81d5-460f-b8af-4cb964655e48",
        series: "3",
        repetições: "15",
      },
      {
        id: 86,
        exercicio: "Abdominal Lateral",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Lateral.gif?alt=media&token=69783c28-f425-45b6-8f68-3f3c5a45944a",
        series: "3",
        repetições: "15",
      },
      {
        id: 87,
        exercicio: "Abdominal Paralelas",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Paralelas.gif?alt=media&token=5114a909-141a-4ace-afdc-c02893acfb54",
        series: "3",
        repetições: "12",
      },
      {
        id: 88,
        exercicio: "Abdominal Remador",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Remador.gif?alt=media&token=9d25d4ac-9451-4f80-9d51-ae68fae75f12",
        series: "3",
        repetições: "15",
      },
      {
        id: 89,
        exercicio: "Abdominal Tesoura",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20Tesoura.gif?alt=media&token=036ab239-9e92-4930-bda1-3422ef887a13",
        series: "3",
        repetições: "20",
      },
      {
        id: 90,
        exercicio: "Abdominal na Máquina",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20na%20M%C3%A1quina.gif?alt=media&token=ae72c697-1ca3-4ca5-b549-f471be4b6199",
        series: "3",
        repetições: "15",
      },
      {
        id: 91,
        exercicio: "Abdominal na Polia",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbdominal%20na%20Polia.gif?alt=media&token=827760b1-0c45-4975-a4a7-9de6f30ace49",
        series: "3",
        repetições: "15",
      },
      {
        id: 92,
        exercicio: "Abdominal Reto",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FAbodminal%20Reto.gif?alt=media&token=5d19fcf3-b016-4c32-850a-493433f7411f",
        series: "3",
        repetições: "20",
      },
      {
        id: 93,
        exercicio: "Roda Abdominal",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/abdominal%2FRoda%20Abdominal.gif?alt=media&token=593871e1-5f8c-407e-9c60-861746a550bb",
        series: "3",
        repetições: "10",
      },
    ],
    Trapezio: [
      {
        id: 94,
        exercicio: "Crucifixo Invertido na Polia",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FCrucifixo%20Invertido%20na%20Polia.gif?alt=media&token=a47ecf9a-7753-4b41-b7d7-16e9e46b5804",
        series: "4",
        repetições: "12",
      },
      {
        id: 95,
        exercicio: "Crucifixo Invertido na Máquina",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FCrucifixo%20Invertido%20na%20Maquina.gif?alt=media&token=d72c9977-69fe-419e-9622-0750f12d332a",
        series: "4",
        repetições: "12",
      },
      {
        id: 96,
        exercicio: "Elevação em Y",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FEleva%C3%A7%C3%A3o%20em%20Y.gif?alt=media&token=0efa75b9-910c-40b9-972c-efd5c05d4576",
        series: "3",
        repetições: "15",
      },
      {
        id: 97,
        exercicio: "Encolhimento de Ombros com Halteres",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FEncolhimento%20de%20Ombros%20Halter.gif?alt=media&token=d8e44112-1d10-466e-bedb-9f2e227e5342",
        series: "4",
        repetições: "15",
      },
      {
        id: 98,
        exercicio: "Encolhimento por Trás do Corpo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FEncolhimento%20por%20Tr%C3%A1s%20do%20Corpo.gif?alt=media&token=8bc7f797-9d8a-4ad8-a678-c64456882848",
        series: "4",
        repetições: "15",
      },
      {
        id: 101,
        exercicio: "Face Pull",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FFace%20Pull.gif?alt=media&token=035b643c-d3dc-44a4-933d-36821cad806c",
        series: "4",
        repetições: "15",
      },
      {
        id: 102,
        exercicio: "Encolhimento de Ombros com Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FEoncolhimento%20de%20Ombro%20Barra.gif?alt=media&token=361d0245-f9b1-4c8c-aec1-2c50a5ce93bc",
        series: "4",
        repetições: "15",
      },
      {
        id: 103,
        exercicio: "Remada Alta",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/trapezio%2FRemada%20Alta.gif?alt=media&token=0ac334e7-239a-40b4-af9b-7b0e44568b8b",
        series: "4",
        repetições: "12",
      },
    ],
    Cardio: [
      {
        id: 105,
        exercicio: "Cotovelo no Joelho",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fcotovelo%20pra%20joelho.gif?alt=media&token=0a40d46a-3882-451a-b196-27f7b008e33c",
        series: "3",
        repetições: "1 minuto",
      },
      {
        id: 106,
        exercicio: "Balançar Corda",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fcords.gif?alt=media&token=acf9faaa-1874-43c6-9c7a-84e85d8c4c08",
        series: "3",
        repetições: "1 minuto",
      },
      {
        id: 107,
        exercicio: "Bicicleta",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fbicicleta.gif?alt=media&token=6490befc-47d5-4cde-abe2-64b0e60bcef4",
        series: "1",
        repetições: "15 minutos",
      },
      {
        id: 108,
        exercicio: "Agachamento com Salto",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fagachamento%20com%20salto.gif?alt=media&token=8aad41b3-6c97-4e06-bc16-f3a5080290b3",
        series: "3",
        repetições: "1 minuto",
      },
      {
        id: 109,
        exercicio: "Mountain Climb",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2FMountain-climber.gif?alt=media&token=34ac1536-cdb3-489a-bafc-f2f27127f08d",
        series: "3",
        repetições: "1 minuto",
      },
      {
        id: 110,
        exercicio: "Subir Escada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fsubir%20escada.gif?alt=media&token=0b45f827-2436-4e5a-8739-16f10edef237",
        series: "1",
        repetições: "10 minutos",
      },
      {
        id: 111,
        exercicio: "Pular Corda",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fpular%20corda.gif?alt=media&token=39dbce89-5c47-4459-a42c-021a2939996d",
        series: "3",
        repetições: "1 minuto",
      },
      {
        id: 112,
        exercicio: "Polichinelo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Fpolichinelos.gif?alt=media&token=0a7ce33b-57fa-4af9-bba5-dcb920a5ead0",
        series: "3",
        repetições: "1 minuto",
      },
      {
        id: 113,
        exercicio: "Esteira",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/cardio%2Festeiraa.gif?alt=media&token=2dc2e0e8-22a8-49a0-976a-28627dc0da2f",
        series: "1",
        repetições: "15 minutos",
      },
    ],
    Panturrilha: [
      {
        id: 114,
        exercicio: "Panturrilha com Halter",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20com%20halter.gif?alt=media&token=5cd3b9ce-54b6-4c8f-a767-cb0d013c5af4",
        series: "4",
        repetições: "20",
      },
      {
        id: 115,
        exercicio: "Panturrilha em Pé na Máquina",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20em%20pe%20na%20maquina.gif?alt=media&token=f6624596-d9c3-4847-9934-640e8a8385c7",
        series: "4",
        repetições: "20",
      },
      {
        id: 116,
        exercicio: "Panturrilha em Pé",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20em%20pe.gif?alt=media&token=a4411a3d-3447-4dce-9f2c-c6738be1b8ce",
        series: "4",
        repetições: "20",
      },
      {
        id: 117,
        exercicio: "Panturrilha no Leg Press 90º",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20leg%20press%2090.gif?alt=media&token=d0c9e38b-79e3-49ff-9f70-044c331e7f4d",
        series: "4",
        repetições: "20",
      },
      {
        id: 118,
        exercicio: "Panturrilha no Cross",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20no%20cross.gif?alt=media&token=8ffd3532-463f-4b59-b43e-579d6c9ff871",
        series: "4",
        repetições: "20",
      },
      {
        id: 119,
        exercicio: "Panturrilha no Hack",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20no%20hack.gif?alt=media&token=03cd4f3b-f16f-4b0a-b394-6325899e5b3b",
        series: "4",
        repetições: "20",
      },
      {
        id: 120,
        exercicio: "Panturrilha no Leg Press 45º",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20no%20leg%20press%2045.gif?alt=media&token=a98be0de-43d8-4cfa-8680-2c68db500c01",
        series: "4",
        repetições: "20",
      },
      {
        id: 121,
        exercicio: "Panturrilha Sentada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20sentada.gif?alt=media&token=702c3257-12f1-4eea-8196-218c9df2ad54",
        series: "4",
        repetições: "20",
      },
      {
        id: 122,
        exercicio: "Panturrilha Unilateral no Leg Press 45º",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20unilateral%20no%20leg%20press%2045.gif?alt=media&token=22687ea6-14ac-4e21-84ea-0849a2c8ca0a",
        series: "4",
        repetições: "20",
      },
      {
        id: 123,
        exercicio: "Panturrilha em Pé Unilateral",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/panturrilha%2Fpanturrilha%20unilateral.gif?alt=media&token=bdf98062-524c-40bc-8861-172c720f2a7f",
        series: "4",
        repetições: "20",
      },
    ],
  }
  
  // Base de dados de exercícios para casa
  export const ExerciciosEmCasa: ExerciseDatabase = {
    BicepsCasa: [
      {
        id: 124,
        exercicio: "Rosca Martelo com Garrafa de Água",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FRosca%20Martelo%20com%20Garrafa%20da%20Agua.gif?alt=media&token=ac98bab8-f0d3-4271-ba84-fab2088c9639",
        series: "4",
        repetições: "15",
      },
      {
        id: 125,
        exercicio: "Rosca Martelo com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FRosca%20Martelo%20com%20El%C3%A1stico.gif?alt=media&token=3592b8d8-ab7f-41e9-bf19-b033a91761a7",
        series: "4",
        repetições: "15",
      },
      {
        id: 126,
        exercicio: "Flexão de Bíceps Sentado com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o%20de%20Biceps%20Sentado%20com%20El%C3%A1stico.gif?alt=media&token=a72cdbcd-b5c7-4626-9347-a93ee842465d",
        series: "4",
        repetições: "15",
      },
      {
        id: 127,
        exercicio: "Flexão de Cotovelo",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFelx%C3%A3o%20de%20Cotovelo.gif?alt=media&token=f24d01c5-98bd-4721-b6c2-d547c1761faf",
        series: "4",
        repetições: "15",
      },
      {
        id: 128,
        exercicio: "Flexão de Biceps com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFelx%C3%A3o%20de%20Biceps%20com%20El%C3%A1stico.gif?alt=media&token=3e1ad26a-5df2-45fe-b350-8ce4e8b3c1df",
        series: "4",
        repetições: "15",
      },
      {
        id: 129,
        exercicio: "Biceps Concentrado Flexão de Perna",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FBiceps%20Concentrado%20Flex%C3%A3o%20de%20Perna.gif?alt=media&token=144ae5ed-3e1c-455a-9d80-8d208d71e52b",
        series: "4",
        repetições: "15",
      },
      {
        id: 130,
        exercicio: "Rosca Alternada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FRosca%20Alternada%20com%20El%C3%A1stico.gif?alt=media&token=a9829fff-ab52-4b07-a8b0-b735fd1d5e73",
        series: "4",
        repetições: "15",
      },
      {
        id: 131,
        exercicio: "Rosca Concentrada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FRosca%20Concentrada%20com%20El%C3%A1stico.gif?alt=media&token=4d58d5f9-42e9-44a8-bbac-f5858ee5db6a",
        series: "4",
        repetições: "15",
      },
      {
        id: 132,
        exercicio: "Flexão Unilateral com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o%20Unilateral%20com%20El%C3%A1stico.gif?alt=media&token=c87ebd3f-6a4c-4f79-b420-774c0430d29c",
        series: "4",
        repetições: "15",
      },
      {
        id: 133,
        exercicio: "Rosca Biceps Alternado com Barra",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FRosca%20Biceps%20Alternado%20com%20Barra.gif?alt=media&token=9a0f1342-6cfd-41c5-bc23-d652d0b3e748",
        series: "4",
        repetições: "15",
      },
    ],
    TricepsCasa: [
      {
        id: 134,
        exercicio: "Mergulho de Triceps",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FMergulho%20de%20Triceps.gif?alt=media&token=2b667259-c382-4af5-a493-c5bc404a5dcf",
        series: "4",
        repetições: "12",
      },
      {
        id: 135,
        exercicio: "Extensão de Tríceps",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FExtens%C3%A3o%20de%20Triceps.gif?alt=media&token=b0567e8c-6eb7-4ab9-bbc0-78e73950300b",
        series: "4",
        repetições: "12",
      },
      {
        id: 136,
        exercicio: "Puxada Unilateral Triceps",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FPuxada%20Unilateral.gif?alt=media&token=c880be32-aa6f-46b5-9413-63fa1eeaf7b7",
        series: "4",
        repetições: "12",
      },
      {
        id: 137,
        exercicio: "Crucifixo Inverso com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FCrucifixo%20Inverso%20com%20El%C3%A1stico.gif?alt=media&token=026d2200-96d0-427b-9d6c-3e71565b5d22",
        series: "4",
        repetições: "12",
      },
      {
        id: 138,
        exercicio: "Puxada Lateral",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FPuxada%20Lateral%20Triceps.gif?alt=media&token=a31ffc8a-1fc6-422e-b0b4-e7034c368e5f",
        series: "4",
        repetições: "12",
      },
      {
        id: 139,
        exercicio: "Puxada Concentrada Triceps",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FPuxada%20Concentrada%20Triceps.gif?alt=media&token=9c43272c-970e-4829-acbf-c28887f19960",
        series: "4",
        repetições: "12",
      },
      {
        id: 140,
        exercicio: "Mergulho Triceps no Chão",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FMergulho%20Triceps%20no%20Ch%C3%A3o.gif?alt=media&token=a4233a29-7b12-4d3d-a74c-4584257f54f4",
        series: "4",
        repetições: "12",
      },
      {
        id: 141,
        exercicio: "Tríceps Francês com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2Ftriceps-frances-com-elastico%20(1).gif?alt=media&token=4b044bce-01fc-4a37-ac35-66e1258d5c1a",
        series: "4",
        repetições: "12",
      },
      {
        id: 142,
        exercicio: "Supino com Barra Unilatreal no Chão",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FSupino%20com%20Barra%20Unilateral%20no%20Ch%C3%A3o.gif?alt=media&token=ed02dc48-6904-44b4-bea0-760fd8ea7f62",
        series: "4",
        repetições: "12",
      },
      {
        id: 143,
        exercicio: "Extensão de Tricpes com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FExtens%C3%A3o%20de%20Tricpes%20com%20El%C3%A1stico.gif?alt=media&token=2b868a5f-205d-4328-9e80-a2762502d644",
        series: "4",
        repetições: "12",
      },
    ],
    PeitoCasa: [
      {
        id: 174,
        exercicio: "Mergulho em Cadeiras",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FMergulho%20em%20Cadeiras(peito%20e%20triceps).gif?alt=media&token=17f653a5-bdfa-4490-a8c5-0b1c1050d130",
        series: "4",
        repetições: "12",
      },
      {
        id: 175,
        exercicio: "Tesoura",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FTesoura(Peito%20e%20Ombro).gif?alt=media&token=b62850af-c747-4e74-aba5-92cbe6320749",
        series: "4",
        repetições: "15",
      },
      {
        id: 176,
        exercicio: "Flexão",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o(peito).gif?alt=media&token=82a8f68e-d7fa-4fe1-a76f-6086feb2b78c",
        series: "4",
        repetições: "12",
      },
      {
        id: 177,
        exercicio: "Flexão na Parede",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o%20na%20Parede(peito%20e%20triceps).gif?alt=media&token=eb6d30ac-eb00-4290-9db2-4ef5791869ac",
        series: "4",
        repetições: "15",
      },
      {
        id: 178,
        exercicio: "Flexão com Palmas",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o%20com%20Palmas.gif?alt=media&token=2cd106a5-0ed2-4cdb-aa10-0a5f7ab440df",
        series: "4",
        repetições: "10",
      },
      {
        id: 179,
        exercicio: "Flexão Inclinada",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o%20Inclinada(peito).gif?alt=media&token=f5274bf1-3982-42d3-95f1-84222142d82e",
        series: "4",
        repetições: "12",
      },
      {
        id: 180,
        exercicio: "Supino Reto com Elástico",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FSupino%20Reto%20com%20El%C3%A1stico.gif?alt=media&token=aecfbcea-d4ce-4c85-87ee-eb7ae42d0f50",
        series: "4",
        repetições: "12",
      },
      {
        id: 181,
        exercicio: "Press com Anilha",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FPress%20com%20Anilha.gif?alt=media&token=e16b6699-7394-4597-90f4-f22d786c4d51",
        series: "4",
        repetições: "12",
      },
      {
        id: 182,
        exercicio: "Passada de Bola em Pé",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FPassada%20de%20Bola%20em%20P%C3%A9.gif?alt=media&token=4528b398-3dc5-45be-860b-e7a2cd9d7a3c",
        series: "4",
        repetições: "15",
      },
      {
        id: 183,
        exercicio: "Flexão Unilateral com Bola",
        gif: "https://firebasestorage.googleapis.com/v0/b/admin-template-k.firebasestorage.app/o/casa%2FFlex%C3%A3o%20Unilateral%20com%20Bola.gif?alt=media&token=39f0c228-4289-4c8e-bcf8-dbe1ccfeb7b5",
        series: "4",
        repetições: "10",
      },
    ],
    // Adicione outros grupos de exercícios para casa conforme necessário
  }
  
  // Função para obter exercícios disponíveis
  export function getAvailableExercises(
    group: string,
    excludeNames: string[],
    location = "academia",
  ): ProcessedExercise[] {
    const isHome = location === "casa" || location === "em casa"
  
    // Determinar a chave do grupo baseado na localização
    let groupKey = group
    if (isHome) {
      groupKey = `${group}Casa`
    }
  
    // Buscar na base de dados apropriada
    const database = isHome ? ExerciciosEmCasa : Exercicios
    const exercises = database[groupKey] || []
  
    // Se não encontrar exercícios para casa, tentar buscar na base normal
    if (exercises.length === 0 && isHome) {
      const normalExercises = Exercicios[group] || []
      return normalExercises
        .filter((exercise) => !excludeNames.includes(exercise.exercicio))
        .map((exercise) => ({
          name: exercise.exercicio,
          exercicio: exercise.exercicio,
          group: group,
          sets: Number.parseInt(exercise.series) || 3,
          reps:
            exercise.repetições.includes("minutos") || exercise.repetições.includes("segundos")
              ? 1
              : Number.parseInt(exercise.repetições) || 10,
          gif: exercise.gif || "",
          description: `Exercício do grupo ${group}`,
          isExtra: false,
          id: exercise.id.toString(),
        }))
    }
  
    // Filtrar exercícios excluindo os que já estão no treino
    return exercises
      .filter((exercise) => !excludeNames.includes(exercise.exercicio))
      .map((exercise) => ({
        name: exercise.exercicio,
        exercicio: exercise.exercicio,
        group: group,
        sets: Number.parseInt(exercise.series) || 3,
        reps:
          exercise.repetições.includes("minutos") || exercise.repetições.includes("segundos")
            ? 1
            : Number.parseInt(exercise.repetições) || 10,
        gif: exercise.gif || "",
        description: `Exercício do grupo ${group}`,
        isExtra: false,
        id: exercise.id.toString(),
      }))
  }
  
  // Função para obter todos os grupos musculares disponíveis
  export function getAvailableGroups(location = "academia"): string[] {
    const isHome = location === "casa" || location === "em casa"
    const database = isHome ? ExerciciosEmCasa : Exercicios
  
    return Object.keys(database).map((key) => (isHome ? key.replace("Casa", "") : key))
  }
  
  // Função para obter exercício por ID
  export function getExerciseById(id: number, location = "academia"): ExerciseData | null {
    const isHome = location === "casa" || location === "em casa"
    const database = isHome ? ExerciciosEmCasa : Exercicios
  
    for (const group of Object.values(database)) {
      const exercise = group.find((ex) => ex.id === id)
      if (exercise) return exercise
    }
  
    return null
  }
  