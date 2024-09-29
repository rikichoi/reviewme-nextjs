import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateRatingString(rating: number) {
  if (rating === 0 && rating <= 1.5) return "Bad"
  if (rating > 1.5 && rating <= 2.5) return "Poor"
  if (rating > 2.5 && rating <= 3.5) return "Average"
  if (rating > 3.5 && rating <= 4) return "Great"
  if (rating > 4 && rating <= 5) return "Excellent"
}

export function formatDate(date: Date) {
  return format(date, "PPP");
}

export function formatConciseDate(date: Date) {
  return format(date, "MM/dd/yyyy");
}