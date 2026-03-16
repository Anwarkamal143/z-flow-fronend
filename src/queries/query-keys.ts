/**
 * Query key builder and patterns for consistent cache keys.
 * Use for invalidation, prefetch, and hook queryKey.
 */
import type { QueryKey } from '@tanstack/react-query'
import type { QueryConfig } from './config'

export type QueryKeyPart = string | number | undefined | null | unknown

/** Build a query key from parts; filters out null/undefined for stable keys. */
export function buildQueryKey(...parts: QueryKeyPart[]): QueryKey {
  return parts.filter((a) => a != null) as QueryKey
}

/** Optional prefix from config (e.g. ['api', 'v1']). */
export function withKeyPrefix(
  prefix: (string | number)[] | undefined,
  ...parts: QueryKeyPart[]
): QueryKey {
  if (!prefix?.length) return buildQueryKey(...parts)
  return buildQueryKey(...prefix, ...parts)
}

/** Key patterns for common operations (for predicate-based invalidation). */
export const queryKeyPatterns = {
  list: (entity: string, ...extra: QueryKeyPart[]) =>
    buildQueryKey(entity, 'list', ...extra),
  infiniteList: (entity: string, ...extra: QueryKeyPart[]) =>
    buildQueryKey(entity, 'infinite-list', ...extra),
  get: (entity: string, id: QueryKeyPart, ...extra: QueryKeyPart[]) =>
    buildQueryKey(entity, id, 'get', ...extra),
  allLists: (entity: string) => buildQueryKey(entity, 'list'),
  allGets: (entity: string) => buildQueryKey(entity),
} as const

/** Create a key builder that uses config prefix. */
export function createQueryKeyBuilder(config?: Pick<QueryConfig, 'queryKeyPrefix'>) {
  const prefix = (config?.queryKeyPrefix ?? []) as (string | number)[]
  return {
    key: (...parts: QueryKeyPart[]) => withKeyPrefix(prefix, ...parts),
    list: (entity: string, ...extra: QueryKeyPart[]) =>
      withKeyPrefix(prefix, entity, 'list', ...extra),
    infiniteList: (entity: string, ...extra: QueryKeyPart[]) =>
      withKeyPrefix(prefix, entity, 'infinite-list', ...extra),
    get: (entity: string, id: QueryKeyPart, ...extra: QueryKeyPart[]) =>
      withKeyPrefix(prefix, entity, id, 'get', ...extra),
  }
}
