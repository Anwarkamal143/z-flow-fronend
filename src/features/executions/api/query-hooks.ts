'use client'
import {
  executionClient,
  ExecutionClientEntity,
  ExecutionClientListOptions,
} from '@/models'
import { useSuspnseOffsetPagination } from '@/queries/pagination/hooks'
import { SingleQueryOptions } from '@/queries/v1/types'
import {
  getExecutionListQueryOptions,
  getExecutionsQueryOptions,
} from './query-options'

export const useGetSuspenseExecution = (
  opts: SingleQueryOptions<ExecutionClientEntity, true> = {},
) =>
  executionClient.useSuspenseGet({
    ...opts,
    queryKey: getExecutionsQueryOptions({ ...opts }).queryKey,
  })

export const useSuspenseOffsetExecutions = <
  T extends ExecutionClientListOptions<'offset', true> =
    ExecutionClientListOptions<'offset', true>,
>(
  props?: T,
) => {
  const mode = 'offset'
  return useSuspnseOffsetPagination(executionClient, {
    ...getExecutionListQueryOptions<'offset', true>({
      ...props,
      mode,

      params: {
        includeTotal: true,
        ...(props?.params || {}),
        mode,
      },
    }),
  })
}
