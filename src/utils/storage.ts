import type { StoreId } from '../data/suppliers'

const STORE_KEY = 'hacchu-wasure-store'
const CHECKS_KEY = 'hacchu-wasure-checks'

type CheckState = Record<string, string[]>

function readChecks(): CheckState {
  try {
    const raw = localStorage.getItem(CHECKS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as CheckState
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeChecks(checks: CheckState): void {
  localStorage.setItem(CHECKS_KEY, JSON.stringify(checks))
}

export function loadStore(): StoreId {
  const value = localStorage.getItem(STORE_KEY)
  return value === 'grande' || value === 'hoshigaoka' ? value : 'mundo'
}

export function saveStore(store: StoreId): void {
  localStorage.setItem(STORE_KEY, store)
}

export function loadCheckedIds(store: StoreId, dateKey: string, dayOfWeek: number): string[] {
  const checks = readChecks()
  return checks[`${store}:${dateKey}:${dayOfWeek}`] ?? []
}

export function saveCheckedIds(store: StoreId, dateKey: string, dayOfWeek: number, ids: string[]): void {
  const checks = readChecks()
  checks[`${store}:${dateKey}:${dayOfWeek}`] = ids
  writeChecks(checks)
}
