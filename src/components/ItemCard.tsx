import { useEffect, useState } from 'react'
import type { OrderItem } from '../types'
import { formatDate, needsOrder } from '../utils/orderStatus'

type ItemCardProps = {
  item: OrderItem
  onEdit: (item: OrderItem) => void
  onDelete: (id: string) => void
  onMarkOrdered: (id: string) => void
  onUpdateStock: (id: string, stock: number) => void
}

export function ItemCard({
  item,
  onEdit,
  onDelete,
  onMarkOrdered,
  onUpdateStock,
}: ItemCardProps) {
  const [stockInput, setStockInput] = useState(String(item.currentStock))
  const urgent = needsOrder(item)

  useEffect(() => {
    setStockInput(String(item.currentStock))
  }, [item.currentStock])

  function handleStockUpdate() {
    const value = Number(stockInput)
    if (Number.isNaN(value)) return
    onUpdateStock(item.id, value)
  }

  return (
    <article className={`item-card ${urgent ? 'item-card--urgent' : ''}`}>
      <div className="item-card__header">
        <div>
          <h3>{item.name}</h3>
          {item.supplier && <p className="item-card__supplier">{item.supplier}</p>}
        </div>
        <span className={`status-badge ${urgent ? 'status-badge--urgent' : 'status-badge--ok'}`}>
          {urgent ? '要発注' : '在庫OK'}
        </span>
      </div>

      <dl className="item-card__stats">
        <div>
          <dt>現在庫</dt>
          <dd>{item.currentStock}</dd>
        </div>
        <div>
          <dt>発注点</dt>
          <dd>{item.reorderPoint}</dd>
        </div>
        <div>
          <dt>発注数量</dt>
          <dd>{item.orderQuantity}</dd>
        </div>
        <div>
          <dt>最終発注</dt>
          <dd>{formatDate(item.lastOrderedAt)}</dd>
        </div>
      </dl>

      {item.memo && <p className="item-card__memo">{item.memo}</p>}

      <div className="stock-update">
        <label>
          在庫を更新
          <input
            type="number"
            min={0}
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
          />
        </label>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleStockUpdate}>
          反映
        </button>
      </div>

      <div className="item-card__actions">
        {urgent && (
          <button type="button" className="btn btn-primary" onClick={() => onMarkOrdered(item.id)}>
            発注済みにする
          </button>
        )}
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onEdit(item)}>
          編集
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm(`「${item.name}」を削除しますか？`)) {
              onDelete(item.id)
            }
          }}
        >
          削除
        </button>
      </div>
    </article>
  )
}
