"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth"
import { auth, database } from "@/app/api/firebase"
import { ref, get, update } from "firebase/database"

interface User {
  id: string
  name: string
  email: string
  role: "instructor" | "student"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser)

        try {
          const userRef = ref(database, `users/${firebaseUser.uid}`)
          const snapshot = await get(userRef)

          const isFirstInstructor = firebaseUser.email === "caio.caca100@gmail.com"

          console.log("[v0] User logged in:", firebaseUser.email)
          console.log("[v0] Is first instructor:", isFirstInstructor)

          if (snapshot.exists()) {
            const userData = snapshot.val()
            console.log("[v0] Current user role in database:", userData.role)

            if (isFirstInstructor && userData.role !== "instructor") {
              console.log("[v0] Updating role to instructor in database")
              await update(userRef, { role: "instructor" })
            }

            const userRole = isFirstInstructor ? "instructor" : userData.role || "student"

            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Usuário",
              email: firebaseUser.email || "",
              role: userRole,
              avatar: firebaseUser.photoURL || undefined,
            })

            console.log("[v0] User role set to:", userRole)
          } else {
            console.log("[v0] User profile not found in database")

            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Usuário",
              email: firebaseUser.email || "",
              role: isFirstInstructor ? "instructor" : "student",
              avatar: firebaseUser.photoURL || undefined,
            })
          }
        } catch (error) {
          console.error("[v0] Error fetching user profile:", error)
          const isFirstInstructor = firebaseUser.email === "caio.caca100@gmail.com"

          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Usuário",
            email: firebaseUser.email || "",
            role: isFirstInstructor ? "instructor" : "student",
            avatar: firebaseUser.photoURL || undefined,
          })
        }
      } else {
        setUser(null)
        setFirebaseUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setFirebaseUser(null)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, firebaseUser, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
