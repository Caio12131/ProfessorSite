"use client"

export type UserRole = "admin" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@eduvideo.com",
    role: "admin",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@example.com",
    role: "student",
    avatar: "/placeholder-user.jpg",
  },
]

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("currentUser")
  return stored ? JSON.parse(stored) : null
}

export function setStoredUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}

export function login(email: string, password: string): User | null {
  // Simple mock authentication
  const user = MOCK_USERS.find((u) => u.email === email)
  if (user) {
    setStoredUser(user)
    return user
  }
  return null
}

export function logout() {
  setStoredUser(null)
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

export function isStudent(user: User | null): boolean {
  return user?.role === "student"
}
