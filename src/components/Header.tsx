import type { FilterMode } from '../types'

type HeaderProps = {
  needsOrderCount: number
  filter: FilterMode
  onFilterChange: (filter: FilterMode) => void
}

export function Header({ needsOrderCount, filter, onFilterChange }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__title">
        <h1>発注管理アプリ</h1>
        <p>発注忘れを防ぐための品目管理</p>
      </div>
      {needsOrderCount > 0 && (
        <div className="alert-banner" role="status">
          <strong>{needsOrderCount}件</strong>の品目が発注時期です
        </div>
      )}
      <div className="filter-tabs" role="tablist" aria-label="表示フィルター">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={filter === 'all' ? 'active' : ''}
          onClick={() => onFilterChange('all')}
        >
          すべて
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'needsOrder'}
          className={filter === 'needsOrder' ? 'active' : ''}
          onClick={() => onFilterChange('needsOrder')}
        >
          要発注
          {needsOrderCount > 0 && <span className="badge">{needsOrderCount}</span>}
        </button>
      </div>
    </header>
  )
}
