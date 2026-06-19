import type { OrderItem } from '../types'

const STORAGE_KEY = 'hacchu-kanri-items'

export function loadItems(): OrderItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as OrderItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveItems(items: OrderItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
