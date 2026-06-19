export type StoreId = 'mundo' | 'grande'

export type Supplier = {
  id: string
  name: string
  detail: string
  stores: StoreId[]
  days: number[]
  twoDayDays: number[]
  importantFor: StoreId[]
}

export const STORES: { id: StoreId; label: string }[] = [
  { id: 'mundo', label: 'むんど' },
  { id: 'grande', label: 'grande' },
]

export const SUPPLIERS: Supplier[] = [
  {
    id: 'maruto',
    name: 'マルト',
    detail: '食品',
    stores: ['mundo', 'grande'],
    days: [0, 1, 2, 3, 4, 5, 6],
    twoDayDays: [],
    importantFor: [],
  },
  {
    id: 'sukehiroya',
    name: 'すけひろや',
    detail: '食品',
    stores: ['mundo', 'grande'],
    days: [0, 1, 2, 3, 4, 5, 6],
    twoDayDays: [],
    importantFor: [],
  },
  {
    id: 'nishihara',
    name: '西原',
    detail: '食品',
    stores: ['mundo', 'grande'],
    days: [0, 1, 2, 3, 4, 5],
    twoDayDays: [5],
    importantFor: [],
  },
  {
    id: 'tomita',
    name: '富田豆腐',
    detail: '豆腐',
    stores: ['mundo', 'grande'],
    days: [0, 4],
    twoDayDays: [],
    importantFor: ['mundo', 'grande'],
  },
  {
    id: 'ota',
    name: '太田商店',
    detail: '卵',
    stores: ['mundo', 'grande'],
    days: [2, 4, 0],
    twoDayDays: [],
    importantFor: ['mundo'],
  },
  {
    id: 'minoya',
    name: '美濃屋',
    detail: '備品',
    stores: ['mundo', 'grande'],
    days: [0, 3],
    twoDayDays: [],
    importantFor: [],
  },
  {
    id: 'kooriya',
    name: '氷屋',
    detail: '氷・電話',
    stores: ['mundo'],
    days: [2, 4, 0],
    twoDayDays: [],
    importantFor: ['mundo'],
  },
  {
    id: 'izufuji',
    name: 'いづ藤',
    detail: '漬け物',
    stores: ['mundo', 'grande'],
    days: [0, 1, 3, 4],
    twoDayDays: [],
    importantFor: ['mundo'],
  },
  {
    id: 'marusho',
    name: 'まる商会',
    detail: '肉',
    stores: ['mundo', 'grande'],
    days: [0, 1, 3, 4, 5],
    twoDayDays: [1, 5],
    importantFor: [],
  },
  {
    id: 'toriju',
    name: '鳥重',
    detail: '肉',
    stores: ['mundo'],
    days: [0, 1, 3, 4, 5],
    twoDayDays: [1, 5],
    importantFor: [],
  },
]

export function getSuppliersForDay(store: StoreId, dayOfWeek: number): Supplier[] {
  return SUPPLIERS.filter(
    (supplier) => supplier.stores.includes(store) && supplier.days.includes(dayOfWeek),
  )
}

export function isTwoDayOrder(supplier: Supplier, dayOfWeek: number): boolean {
  return supplier.twoDayDays.includes(dayOfWeek)
}
