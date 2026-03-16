export type SortDirection = 'asc' | 'desc'

export interface SortCondition<T, K extends keyof T = keyof T> {
  column: K
  direction: SortDirection
}

function columnSort<T, K extends keyof T>(column: K) {
  return {
    asc: { column, direction: 'asc' } as SortCondition<T, K>,
    desc: { column, direction: 'desc' } as SortCondition<T, K>,
  }
}

export function createSorts<T>() {
  return new Proxy(
    {} as {
      [K in keyof T]: { asc: SortCondition<T, K>; desc: SortCondition<T, K> }
    },
    {
      get: (_, prop: string) => {
        return columnSort<T, keyof T>(prop as keyof T)
      },
    },
  )
}
