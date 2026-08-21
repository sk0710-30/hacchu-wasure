const WEEKDAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'] as const
const BUSINESS_DAY_START_HOUR = 2

export function getBusinessDate(now = new Date()): Date {
  const date = new Date(now)
  if (date.getHours() < BUSINESS_DAY_START_HOUR) {
    date.setDate(date.getDate() - 1)
  }
  date.setHours(0, 0, 0, 0)
  return date
}

export function getChangedBusinessDate(
  currentBusinessDate: Date,
  now = new Date(),
): Date | null {
  const nextBusinessDate = getBusinessDate(now)
  return getBusinessDateKey(nextBusinessDate) === getBusinessDateKey(currentBusinessDate)
    ? null
    : nextBusinessDate
}

export function getMillisecondsUntilNextBusinessDay(now = new Date()): number {
  const nextBusinessDay = new Date(now)
  nextBusinessDay.setHours(BUSINESS_DAY_START_HOUR, 0, 0, 0)
  if (nextBusinessDay <= now) {
    nextBusinessDay.setDate(nextBusinessDay.getDate() + 1)
  }
  return nextBusinessDay.getTime() - now.getTime()
}

export function getBusinessDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatBusinessDate(date: Date): string {
  const weekday = WEEKDAY_LABELS[date.getDay()]
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}年${m}月${d}日（${weekday}）`
}

export function formatWeekday(date: Date): string {
  return `${WEEKDAY_LABELS[date.getDay()]}曜日`
}
