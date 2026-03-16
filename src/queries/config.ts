/**
 * Central query & pagination configuration.
 * Override these when creating CRUD clients or when using pagination hooks
 * to keep behavior consistent and configurable.
 */
import { PAGINATION } from '@/config/constants'

export const QUERY_CONFIG = {
  /** Default pagination (used when not overridden by hook/client) */
  pagination: {
    defaultPage: PAGINATION.DEFAULT_PAGE,
    defaultLimit: PAGINATION.DEFAULT_PAGE_SIZE,
    minPage: PAGINATION.MIN_PAGE,
    maxPageSize: PAGINATION.MAX_PAGE_SIZE,
    minPageSize: PAGINATION.MIN_PAGE_SIZE,
  },
  /** Query key prefix for cache (e.g. ['api', 'v1']) */
  queryKeyPrefix: [] as (string | number)[],
  /** Default stale time in ms (undefined = use React Query default) */
  staleTime: undefined as number | undefined,
  /** Default gc time (cache time) in ms */
  gcTime: undefined as number | undefined,
} as const

export type QueryConfig = typeof QUERY_CONFIG

export type QueryConfigOverrides = {
  pagination?: Partial<QueryConfig['pagination']>
  queryKeyPrefix?: (string | number)[]
  staleTime?: number
  gcTime?: number
}

/** Merge custom config with defaults. Use in createCrudClient or hooks. */
export function mergeQueryConfig(
  overrides: QueryConfigOverrides = {},
): QueryConfig {
  return {
    ...QUERY_CONFIG,
    ...(overrides.pagination && {
      pagination: { ...QUERY_CONFIG.pagination, ...overrides.pagination },
    }),
    ...(overrides.queryKeyPrefix != null && {
      queryKeyPrefix: overrides.queryKeyPrefix,
    }),
    ...(overrides.staleTime !== undefined && { staleTime: overrides.staleTime }),
    ...(overrides.gcTime !== undefined && { gcTime: overrides.gcTime }),
  }
}
