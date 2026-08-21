import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { getSuppliersForDay, isTwoDayOrder, STORES, type StoreId } from './data/suppliers'
import { getBusinessDate, getBusinessDateKey } from './utils/businessDay'
import {
  loadCheckedIds,
  loadStore,
  saveCheckedIds,
  saveStore,
} from './utils/storage'

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'] as const
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const

function App() {
  const businessDate = useMemo(() => getBusinessDate(), [])
  const dateKey = useMemo(() => getBusinessDateKey(businessDate), [businessDate])

  const [dayOfWeek, setDayOfWeek] = useState<number>(() => businessDate.getDay())
  const [store, setStore] = useState<StoreId>(() => loadStore())
  const [checkedIds, setCheckedIds] = useState<string[]>(() =>
    loadCheckedIds(store, dateKey, businessDate.getDay()),
  )

  const todaySuppliers = useMemo(
    () => getSuppliersForDay(store, dayOfWeek),
    [store, dayOfWeek],
  )

  useEffect(() => {
    saveStore(store)
  }, [store])

  useEffect(() => {
    setCheckedIds(loadCheckedIds(store, dateKey, dayOfWeek))
  }, [store, dateKey, dayOfWeek])

  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds])

  const unchecked = todaySuppliers.filter((s) => !checkedSet.has(s.id))
  const checked = todaySuppliers.filter((s) => checkedSet.has(s.id))
  const allDone = todaySuppliers.length > 0 && unchecked.length === 0

  function toggleCheck(supplierId: string, isChecked: boolean) {
    const next = isChecked
      ? checkedIds.filter((id) => id !== supplierId)
      : [...checkedIds, supplierId]
    setCheckedIds(next)
    saveCheckedIds(store, dateKey, dayOfWeek, next)
  }

  function handleStoreChange(nextStore: StoreId) {
    if (nextStore === store) return
    saveCheckedIds(store, dateKey, dayOfWeek, checkedIds)
    setStore(nextStore)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>発注忘れ防止</h1>
      </header>

      <section className="selector-group">
        <p className="selector-label">営業日</p>
        <div className="day-switch" role="group" aria-label="曜日選択">
          {DAY_ORDER.map((day) => (
            <button
              key={day}
              type="button"
              className={dayOfWeek === day ? 'active' : ''}
              onClick={() => setDayOfWeek(day)}
            >
              {DAY_LABELS[day]}
            </button>
          ))}
        </div>
      </section>

      <section className="selector-group">
        <p className="selector-label">店舗</p>
        <div className="store-switch" aria-label="店舗選択">
          {STORES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={store === item.id ? 'active' : ''}
              onClick={() => handleStoreChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="summary">
        {allDone ? (
          <p className="complete-message">本日の発注確認完了</p>
        ) : (
          <div className="unchecked-count">
            <span className="unchecked-number">{unchecked.length}</span>
            <span className="unchecked-label">件 未確認</span>
          </div>
        )}
      </section>

      <main className="lists">
        <section className="list-section">
          <h2>未確認</h2>
          {unchecked.length === 0 ? (
            <p className="empty">未確認の発注先はありません</p>
          ) : (
            <ul>
              {unchecked.map((supplier) => (
                <li key={supplier.id}>
                  <button
                    type="button"
                    className="supplier-item"
                    onClick={() => toggleCheck(supplier.id, false)}
                  >
                    <span className="supplier-name">
                      {supplier.storeNames?.[store] ?? supplier.name}
                      {supplier.importantFor.includes(store) && (
                        <span className="tag tag-important">重要</span>
                      )}
                    </span>
                    <span className="supplier-detail">{supplier.detail}</span>
                    {isTwoDayOrder(supplier, dayOfWeek) && (
                      <span className="tag tag-two-day">2日分</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="list-section">
          <h2>完了済み</h2>
          {checked.length === 0 ? (
            <p className="empty">完了済みの発注先はありません</p>
          ) : (
            <ul>
              {checked.map((supplier) => (
                <li key={supplier.id}>
                  <button
                    type="button"
                    className="supplier-item supplier-item--done"
                    onClick={() => toggleCheck(supplier.id, true)}
                  >
                    <span className="supplier-name">
                      {supplier.storeNames?.[store] ?? supplier.name}
                      {supplier.importantFor.includes(store) && (
                        <span className="tag tag-important">重要</span>
                      )}
                    </span>
                    <span className="supplier-detail">{supplier.detail}</span>
                    {isTwoDayOrder(supplier, dayOfWeek) && (
                      <span className="tag tag-two-day">2日分</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
