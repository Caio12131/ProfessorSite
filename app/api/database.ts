import { ref, set, update, get } from "firebase/database"
import { database, auth } from "../api/firebase"
import axios from "axios"
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth"

// Atualizar a interface UserProfile para incluir ticketusados
interface UserProfile {
  email: string
  phone: string
  ticket: number
  ticketusados: number // Novo atributo para controle de tickets usados
  lastLogin: string
  dieta?: string
  prompt?: string
  medidas?: {
    peso: number
    altura: number
    idade: number
    genero: string
    objetivo: string
    imc: number
    tmb: number
    calorias: number
  }
  role?: "instructor" | "student" // Novo atributo para controle de papéis
  nutricionistaPersonalizado?: number // Novo atributo para controle de nutricionistas personalizados
  Bloqueado?: boolean // Novo atributo para controle de bloqueio
  name?: string // Novo atributo para nome do usuário
}

export const deleteUsuario = async (user: any) => {
  if (!user || !user.email) {
    console.error("Nenhum usuário autenticado.")
    return
  }

  try {
    await deleteUser(user)

    window.location.pathname = "/home"
  } catch (error: any) {
    if (error.code === "auth/requires-recent-login") {
      // Reautenticação obrigatória
      const senha = prompt("Confirme sua senha para excluir sua conta:")
      if (!senha) return

      const credential = EmailAuthProvider.credential(user.email, senha)

      try {
        await reauthenticateWithCredential(user, credential)
        await deleteUser(user)

        window.location.pathname = "/home"
      } catch (reauthError) {
        console.error("Erro ao reautenticar ou excluir:", reauthError)
      }
    } else {
      console.error("Erro ao excluir usuário:", error)
    }
  }
}

export const createUserProfile = async (userId: string, email: string, phone: string) => {
  try {
    const isFirstInstructor = email === "caio.caca100@gmail.com"

    await set(ref(database, `users/${userId}`), {
      Tickets: 0,
      Dieta: "", // Dieta começa vazia
      Prompt: "", // Prompt começa vazio
      TicketsUsados: 0, // Inicializa ticketusados como 0
      Numero: phone,
      email: email,
      lastLogin: new Date().toISOString(),
      role: isFirstInstructor ? "instructor" : "student", // Define como instrutor se for o email especificado
      nutricionistaPersonalizado: 0, // Inicializa nutricionistas personalizados como 0
      Bloqueado: false, // Inicializa bloqueio como falso
    })
    return true
  } catch (error) {
    console.error("Error creating user profile:", error)
    throw error
  }
}

export const updateUserLastLogin = async (userId: string) => {
  try {
    await update(ref(database, `users/${userId}`), {
      lastLogin: new Date().toISOString(),
    })
    return true
  } catch (error) {
    console.error("Error updating last login:", error)
    throw error
  }
}

export const getUserProfile = async (userId: string) => {
  try {
    const userRef = ref(database, `users/${userId}`)
    const snapshot = await get(userRef)

    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

export const editDiet = async (userId: string, promptB: any, edicao?: any) => {
  try {
    const response = await axios.post("/api/editar", {
      userId: userId,
      promptB: promptB,
      edicao: edicao,
    })
    if (response.status === 200) {
      return response.status
    }
  } catch (error) {
    throw error
  }
}

// Função para atualizar as medidas e o prompt do usuário
export async function updateUserMeasurementsAndPrompt(
  userId: string,
  peso: number,
  altura: string,
  imc: number,
  horarios: string,
  promptObj: any,
  idade: number,
) {
  try {
    // Usa o database que você já importou
    const dbRef = database

    // Função para limpar campos undefined
    function cleanObject(obj: any) {
      return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined))
    }

    const safePrompt = cleanObject(promptObj)

    const updates: any = {
      [`users/${userId}/Peso`]: peso,
      [`users/${userId}/Altura`]: altura,
      [`users/${userId}/IMC`]: imc,
      [`users/${userId}/Horarios`]: horarios,
      [`users/${userId}/Idade`]: idade,
      [`users/${userId}/Prompt`]: safePrompt,
    }

    await update(ref(dbRef), cleanObject(updates))

    console.log("✅ User measurements and prompt updated successfully")
    return true
  } catch (error) {
    console.error("❌ Error updating user measurements and prompt:", error)
    throw error
  }
}

// Mantive a função updateUserDiet, mas ela não será usada pelo usuário
// Ela pode ser útil para administradores ou para atualizações do sistema
export const updateUserDiet = async (userId: string, dieta: string) => {
  try {
    await update(ref(database, `users/${userId}`), {
      Dieta: dieta,
    })
    return true
  } catch (error) {
    console.error("Error updating diet:", error)
    throw error
  }
}

export const updateUserTicket = async (userId: string | null) => {
  try {
    await update(ref(database, `users/${userId}`), {
      Tickets: 0,
    })
    return
  } catch (error) {
    console.error("Error updating diet:", error)
    throw error
  }
}

export const updateUserPreco = async (userId: string | null, valor: string | number) => {
  try {
    await update(ref(database, `users/${userId}`), {
      Codigo: valor,
    })
    return
  } catch (error) {
    console.error("Error updating preco:", error)
    throw error
  }
}

export const updateUserBloqueio = async (userId: string | null, bloqueio: boolean) => {
  try {
    await get(ref(database, `users/${userId}`)).then(async (snapshot) => {
      if (snapshot.val().Bloqueado === false) {
        await update(ref(database, `users/${userId}`), {
          Bloqueado: bloqueio,
        })
      } else {
        await update(ref(database, `users/${userId}`), {
          Bloqueado: false,
        })
      }
    })
    return
  } catch (error) {
    console.error("Error updating diet:", error)
    throw error
  }
}

export const sendNote = async (
  cpf: string,
  cep: string,
  cidade: string,
  bairro: string,
  logradouro: string,
  estado: string,
  ibge: string,
  codigo: string,
  uid: any,
  nome: string,
) => {
  try {
    const response = await axios.post(`/api/emissao`, {
      cpf,
      cep,
      cidade,
      bairro,
      logradouro,
      estado,
      ibge,
      codigo,
      uid,
      nome,
    })
    if (response.status === 200) {
      return response.status
    }
  } catch (error) {
    throw error
  }
}

export const updateUserNutricionista = async (userId: string | null) => {
  try {
    let nutricionistapersonalizado = 0
    await get(ref(database, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        nutricionistapersonalizado = data.nutricionistaPersonalizado
      }
    })
    if (nutricionistapersonalizado > 0) {
      await update(ref(database, `users/${userId}`), {
        nutricionistaPersonalizado: nutricionistapersonalizado - 1,
      })
    }

    return
  } catch (error) {
    console.error("Error updating diet:", error)
    throw error
  } finally {
    window.location.pathname = "/dietas"
  }
}

export const sendRequestTreinoF = async (data: string, treino: string, uid: string | null) => {
  try {
    await axios.post(`https://backend-production-22a2.up.railway.app/GerarDietaTreinoF`, {
      data: data,
      treino: treino,
      uid: uid,
    })
    return
  } catch (error) {
    console.error("Erro ao enviar a requisição:", error)
  }
}

export const sendRequestTreinoM = async (data: string, treino: string, uid: string | null) => {
  try {
    await axios.post(`https://backend-production-22a2.up.railway.app/GerarDietaTreinoM`, {
      data: data,
      treino: treino,
      uid: uid,
    })
    return
  } catch (error) {
    console.error("Erro ao enviar a requisição:", error)
  }
}

export const sendRequest = async (data: string, uid: string | null) => {
  try {
    await axios.post(`https://backend-production-22a2.up.railway.app/GerarDieta`, { data: data, uid: uid })
    return
  } catch (error) {}
}

export const updateUserRole = async (userId: string, role: "instructor" | "student") => {
  try {
    await update(ref(database, `users/${userId}`), {
      role: role,
    })
    return true
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    console.log("[v0] Attempting to fetch all users from database")

    const usersRef = ref(database, "users")
    const snapshot = await get(usersRef)

    if (snapshot.exists()) {
      const usersData = snapshot.val()
      const usersList = Object.keys(usersData).map((userId) => ({
        id: userId,
        ...usersData[userId],
      }))

      console.log("[v0] Successfully retrieved users:", usersList.length)
      return usersList
    } else {
      console.log("[v0] No users found in database")
      return []
    }
  } catch (error) {
    console.error("[v0] Error getting all users:", error)
    throw error
  }
}

export const createInstructorAccount = async (
  email: string,
  password: string,
  name: string,
  phone: string,
  currentUserEmail: string,
  currentUserPassword: string,
) => {
  try {
    console.log("[v0] Creating new instructor account:", email)

    // Create the new instructor account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const newUserId = userCredential.user.uid

    console.log("[v0] New instructor account created with ID:", newUserId)

    // Create the instructor profile in the database
    await set(ref(database, `users/${newUserId}`), {
      Tickets: 0,
      Dieta: "",
      Prompt: "",
      TicketsUsados: 0,
      Numero: phone,
      email: email,
      lastLogin: new Date().toISOString(),
      role: "instructor",
      nutricionistaPersonalizado: 0,
      Bloqueado: false,
      name: name,
    })

    console.log("[v0] Instructor profile created in database")

    // Sign out the newly created instructor
    await signOut(auth)

    console.log("[v0] Signed out new instructor, re-authenticating current instructor")

    // Re-authenticate the current instructor
    await signInWithEmailAndPassword(auth, currentUserEmail, currentUserPassword)

    console.log("[v0] Current instructor re-authenticated successfully")

    return { success: true, userId: newUserId }
  } catch (error: any) {
    console.error("[v0] Error creating instructor account:", error)

    // Try to re-authenticate the current instructor even if there was an error
    try {
      await signInWithEmailAndPassword(auth, currentUserEmail, currentUserPassword)
    } catch (reAuthError) {
      console.error("[v0] Failed to re-authenticate current instructor:", reAuthError)
    }

    throw error
  }
}
