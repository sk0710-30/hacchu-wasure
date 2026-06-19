import type { StoreId } from '../data/suppliers'

const STORE_KEY = 'hacchu-wasure-store'
const CHECKS_KEY = 'hacchu-wasure-checks'
const DAY_KEY = 'hacchu-wasure-day'

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
  return value === 'grande' ? 'grande' : 'mundo'
}

export function saveStore(store: StoreId): void {
  localStorage.setItem(STORE_KEY, store)
}

export function loadDayOfWeek(): number | null {
  const raw = localStorage.getItem(DAY_KEY)
  const parsed = Number(raw)
  if (raw === null || Number.isNaN(parsed) || parsed < 0 || parsed > 6) return null
  return parsed
}

export function saveDayOfWeek(day: number): void {
  localStorage.setItem(DAY_KEY, String(day))
}

export function loadCheckedIds(store: StoreId, dateKey: string): string[] {
  const checks = readChecks()
  return checks[`${store}:${dateKey}`] ?? []
}

export function saveCheckedIds(store: StoreId, dateKey: string, ids: string[]): void {
  const checks = readChecks()
  checks[`${store}:${dateKey}`] = ids
  writeChecks(checks)
}
