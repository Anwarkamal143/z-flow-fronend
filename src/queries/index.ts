/**
 * Queries – reusable, configurable data layer
 *
 * - config: central query & pagination defaults (mergeQueryConfig)
 * - query-keys: buildQueryKey, queryKeyPatterns, createQueryKeyBuilder
 * - v1: createCrudClient, types (filters, sorts, search, pagination configs)
 * - pagination: schema, config, server params, hooks (useList, usePaginationParams)
 */
export { mergeQueryConfig, QUERY_CONFIG } from './config'
export type { QueryConfig, QueryConfigOverrides } from './config'

export {
  buildQueryKey,
  createQueryKeyBuilder,
  queryKeyPatterns,
  withKeyPrefix,
} from './query-keys'
export type { QueryKeyPart } from './query-keys'

export { createCrudClient, applyOptimisticUpdates } from './v1'
export * from './v1/types'

export {
  getPaginationConfig,
  PAGINATION_DEFAULTS,
} from './pagination/config'
export type {
  PaginationConfigOverrides,
  PaginationDefaults,
} from './pagination/config'
export * from './pagination/schema'
export { parseServerPaginationParams } from './pagination/server/pagination-params'
export * from './pagination/hooks'
