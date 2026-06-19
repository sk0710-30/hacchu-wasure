export type OrderItem = {
  id: string
  name: string
  supplier: string
  currentStock: number
  reorderPoint: number
  orderQuantity: number
  lastOrderedAt: string | null
  memo: string
  createdAt: string
}

export type OrderItemInput = Omit<OrderItem, 'id' | 'createdAt' | 'lastOrderedAt'>

export type FilterMode = 'all' | 'needsOrder'
