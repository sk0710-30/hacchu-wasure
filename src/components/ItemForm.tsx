import { useState, type FormEvent } from 'react'
import type { OrderItem, OrderItemInput } from '../types'

type ItemFormProps = {
  editingItem: OrderItem | null
  onSubmit: (input: OrderItemInput) => void
  onCancelEdit: () => void
}

const emptyForm: OrderItemInput = {
  name: '',
  supplier: '',
  currentStock: 0,
  reorderPoint: 0,
  orderQuantity: 1,
  memo: '',
}

export function ItemForm({ editingItem, onSubmit, onCancelEdit }: ItemFormProps) {
  const [form, setForm] = useState<OrderItemInput>(() =>
    editingItem
      ? {
          name: editingItem.name,
          supplier: editingItem.supplier,
          currentStock: editingItem.currentStock,
          reorderPoint: editingItem.reorderPoint,
          orderQuantity: editingItem.orderQuantity,
          memo: editingItem.memo,
        }
      : emptyForm,
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit({
      ...form,
      name: form.name.trim(),
      supplier: form.supplier.trim(),
      memo: form.memo.trim(),
    })
    if (!editingItem) {
      setForm(emptyForm)
    }
  }

  function setField<K extends keyof OrderItemInput>(key: K, value: OrderItemInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section className="card item-form">
      <h2>{editingItem ? '品目を編集' : '品目を登録'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            品名 <span className="required">*</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="例: コピー用紙 A4"
              required
            />
          </label>
          <label>
            取引先
            <input
              type="text"
              value={form.supplier}
              onChange={(e) => setField('supplier', e.target.value)}
              placeholder="例: 〇〇商事"
            />
          </label>
          <label>
            現在庫
            <input
              type="number"
              min={0}
              value={form.currentStock}
              onChange={(e) => setField('currentStock', Number(e.target.value))}
            />
          </label>
          <label>
            発注点
            <input
              type="number"
              min={0}
              value={form.reorderPoint}
              onChange={(e) => setField('reorderPoint', Number(e.target.value))}
            />
          </label>
          <label>
            発注数量
            <input
              type="number"
              min={1}
              value={form.orderQuantity}
              onChange={(e) => setField('orderQuantity', Number(e.target.value))}
            />
          </label>
          <label className="full-width">
            メモ
            <input
              type="text"
              value={form.memo}
              onChange={(e) => setField('memo', e.target.value)}
              placeholder="補足情報"
            />
          </label>
        </div>
        <div className="form-actions">
          {editingItem && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              キャンセル
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingItem ? '更新する' : '登録する'}
          </button>
        </div>
      </form>
    </section>
  )
}
