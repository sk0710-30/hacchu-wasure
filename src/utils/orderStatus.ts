import type { OrderItem } from '../types'

export function needsOrder(item: OrderItem): boolean {
  return item.currentStock <= item.reorderPoint
}

export function formatDate(iso: string | null): string {
  if (!iso) return '未発注'
  return new Date(iso).toLocaleDateString('ja-JP')
}

export function createId(): string {
  return crypto.randomUUID()
}
