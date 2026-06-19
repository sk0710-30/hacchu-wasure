import type { OrderItem } from '../types'
import { needsOrder } from '../utils/orderStatus'
import { ItemCard } from './ItemCard'

type ItemListProps = {
  items: OrderItem[]
  filter: 'all' | 'needsOrder'
  onEdit: (item: OrderItem) => void
  onDelete: (id: string) => void
  onMarkOrdered: (id: string) => void
  onUpdateStock: (id: string, stock: number) => void
}

export function ItemList({
  items,
  filter,
  onEdit,
  onDelete,
  onMarkOrdered,
  onUpdateStock,
}: ItemListProps) {
  const filtered =
    filter === 'needsOrder' ? items.filter((item) => needsOrder(item)) : items

  if (items.length === 0) {
    return (
      <section className="card empty-state">
        <p>品目が登録されていません。</p>
        <p className="empty-state__hint">左のフォームから品目を登録してください。</p>
      </section>
    )
  }

  if (filtered.length === 0) {
    return (
      <section className="card empty-state">
        <p>要発注の品目はありません。</p>
      </section>
    )
  }

  return (
    <section className="item-list">
      <h2 className="item-list__title">
        {filter === 'needsOrder' ? '要発注一覧' : '品目一覧'}
        <span className="item-list__count">{filtered.length}件</span>
      </h2>
      <div className="item-list__grid">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onMarkOrdered={onMarkOrdered}
            onUpdateStock={onUpdateStock}
          />
        ))}
      </div>
    </section>
  )
}
