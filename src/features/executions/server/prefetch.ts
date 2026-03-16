'use server'
import { optionsWithCookies } from '@/lib'
import { getCookieAsString } from '@/lib/auth/server-utils'
import {
  executionClient,
  ExecutionClientListOptions,
} from '@/models/v1/Execution.model'
import {
  getExecutionListQueryOptions,
  getExecutionsQueryOptions,
} from '../api/query-options'

export const prefetchServerExecutions = async (
  props: ExecutionClientListOptions<'offset', false> = {},
  cookies: string | undefined = undefined,
) => {
  const cokies = cookies || (await getCookieAsString())
  const queryOptions = {
    ...getExecutionListQueryOptions<'offset', false>(),
    ...props,
  }
  executionClient.prefetchList({
    ...queryOptions,
    options: optionsWithCookies(queryOptions.options, cokies),
  })
}
export const prefetchServerExecution = async (
  id: string,
  cookies: string | undefined = undefined,
) => {
  const cokies = cookies || (await getCookieAsString())

  const queryOptions = { ...getExecutionsQueryOptions() }

  executionClient.prefetchGet({
    ...queryOptions,
    id,
    options: optionsWithCookies(queryOptions.options, cokies),
  })
}
