import { useEffect, useState } from 'react'
import type { FilterMode, OrderItem, OrderItemInput } from '../types'
import { createId } from '../utils/orderStatus'
import { loadItems, saveItems } from '../utils/storage'

export function useOrderItems() {
  const [items, setItems] = useState<OrderItem[]>(() => loadItems())
  const [filter, setFilter] = useState<FilterMode>('all')

  useEffect(() => {
    saveItems(items)
  }, [items])

  function addItem(input: OrderItemInput) {
    const item: OrderItem = {
      ...input,
      id: createId(),
      lastOrderedAt: null,
      createdAt: new Date().toISOString(),
    }
    setItems((prev) => [item, ...prev])
  }

  function updateItem(id: string, input: OrderItemInput) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...input } : item)),
    )
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function markOrdered(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              currentStock: item.currentStock + item.orderQuantity,
              lastOrderedAt: new Date().toISOString(),
            }
          : item,
      ),
    )
  }

  function updateStock(id: string, currentStock: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, currentStock: Math.max(0, currentStock) } : item,
      ),
    )
  }

  return {
    items,
    filter,
    setFilter,
    addItem,
    updateItem,
    deleteItem,
    markOrdered,
    updateStock,
  }
}
