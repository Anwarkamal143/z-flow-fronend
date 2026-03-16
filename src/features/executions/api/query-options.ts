import { ExecutionClientEntity, ExecutionClientPartialEntity } from '@/models'
import {
  IListCallOptions,
  IPaginationModes,
  SingleQueryOptions,
} from '@/queries/v1/types'
export const getExecutionListQueryOptions = <
  Mode extends IPaginationModes | undefined = undefined,
  IS_SUSPENSE extends boolean = true,
>(
  props: IListCallOptions<ExecutionClientPartialEntity, IS_SUSPENSE, Mode> = {},
): IListCallOptions<ExecutionClientPartialEntity, IS_SUSPENSE, Mode> => ({
  ...props,
  queryKey: ['execution_list', ...(props.queryKey || [])],
})
export const getExecutionsQueryOptions = <IS_SUSPENSE extends boolean = false>(
  props: SingleQueryOptions<ExecutionClientEntity, IS_SUSPENSE> = {},
): SingleQueryOptions<ExecutionClientEntity, IS_SUSPENSE> => ({
  ...props,
  queryKey: [...(props.queryKey || [])],
})
