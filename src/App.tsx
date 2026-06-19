import { useMemo, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { ItemForm } from './components/ItemForm'
import { ItemList } from './components/ItemList'
import { useOrderItems } from './hooks/useOrderItems'
import type { OrderItem, OrderItemInput } from './types'
import { needsOrder } from './utils/orderStatus'

function App() {
  const {
    items,
    filter,
    setFilter,
    addItem,
    updateItem,
    deleteItem,
    markOrdered,
    updateStock,
  } = useOrderItems()
  const [editingItem, setEditingItem] = useState<OrderItem | null>(null)

  const needsOrderCount = useMemo(
    () => items.filter((item) => needsOrder(item)).length,
    [items],
  )

  function handleSubmit(input: OrderItemInput) {
    if (editingItem) {
      updateItem(editingItem.id, input)
      setEditingItem(null)
    } else {
      addItem(input)
    }
  }

  return (
    <div className="app">
      <Header
        needsOrderCount={needsOrderCount}
        filter={filter}
        onFilterChange={setFilter}
      />
      <main className="app-main">
        <ItemForm
          key={editingItem?.id ?? 'new'}
          editingItem={editingItem}
          onSubmit={handleSubmit}
          onCancelEdit={() => setEditingItem(null)}
        />
        <ItemList
          items={items}
          filter={filter}
          onEdit={setEditingItem}
          onDelete={deleteItem}
          onMarkOrdered={markOrdered}
          onUpdateStock={updateStock}
        />
      </main>
    </div>
  )
}

export default App
