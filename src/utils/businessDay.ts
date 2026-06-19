const WEEKDAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'] as const

export function getBusinessDate(now = new Date()): Date {
  const date = new Date(now)
  if (date.getHours() < 2) {
    date.setDate(date.getDate() - 1)
  }
  date.setHours(0, 0, 0, 0)
  return date
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
