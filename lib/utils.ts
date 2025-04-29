import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentSeason(): string {
  const now = new Date()
  const month = now.getMonth()

  // Déterminer la saison en fonction du mois
  if (month >= 2 && month <= 4) {
    return "spring" // Printemps (mars, avril, mai)
  } else if (month >= 5 && month <= 7) {
    return "summer" // Été (juin, juillet, août)
  } else if (month >= 8 && month <= 10) {
    return "autumn" // Automne (septembre, octobre, novembre)
  } else {
    return "winter" // Hiver (décembre, janvier, février)
  }
}
