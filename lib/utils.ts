import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function phoneMask(value: string): string {
  if (!value) return ""

  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "")

  // Apply Brazilian phone mask: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  if (numbers.length <= 10) {
    // Format: (XX) XXXX-XXXX
    return numbers.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
  } else {
    // Format: (XX) XXXXX-XXXX
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15) // Limit to (XX) XXXXX-XXXX format
  }
}
