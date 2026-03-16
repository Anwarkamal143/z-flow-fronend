/**
 * Pagination defaults used by schema, server parser, and URL params hooks.
 * Single source of truth so validation and UI stay in sync.
 */
import { PAGINATION } from '@/config/constants'

export const PAGINATION_DEFAULTS = {
  page: PAGINATION.DEFAULT_PAGE,
  limit: PAGINATION.DEFAULT_PAGE_SIZE,
  minPage: PAGINATION.MIN_PAGE,
  minPageSize: PAGINATION.MIN_PAGE_SIZE,
  maxPageSize: PAGINATION.MAX_PAGE_SIZE,
  /** Default mode when not specified in URL */
  mode: 'offset' as const,
  includeTotal: false,
  cursorDirection: 'forward' as const,
} as const

export type PaginationDefaults = typeof PAGINATION_DEFAULTS

export type PaginationConfigOverrides = Partial<PaginationDefaults>

/** Merge overrides for entity-specific or feature-specific pagination. */
export function getPaginationConfig(
  overrides: PaginationConfigOverrides = {},
): PaginationDefaults {
  return { ...PAGINATION_DEFAULTS, ...overrides }
}
