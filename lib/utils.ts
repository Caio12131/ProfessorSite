import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function phoneMask(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "")

  // Apply the Brazilian phone mask (XX) XXXXX-XXXX
  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : ""
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  } else if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  } else {
    // Limit to 11 digits (2 for area code + 9 for the number)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }
}

