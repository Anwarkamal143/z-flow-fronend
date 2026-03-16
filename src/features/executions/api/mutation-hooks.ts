import { formatZodError } from '@/lib'
import { ErrorCode } from '@/lib/error-code.enum'
import { executionClient } from '@/models/v1'
import { ExecutionUpdateSchema, IExecutionUpdate } from '../schema/executions'

export function useCreateExecution() {
  return executionClient.usePost({
    invalidateQueries: [
      {
        queryKey: ['list'],
        exact: false,
      },
    ],
  })
}
export function useDeleteExecution() {
  return executionClient.useDelete({
    invalidateQueries: [
      {
        queryKey: ['list'],
        exact: false,
      },
    ],
  })
}

export function useUpdateExecution() {
  const { handleUpdate, ...rest } = executionClient.useUpdate<
    null,
    IExecutionUpdate
  >({
    optimisticUpdate: [
      {
        queryKey(vars) {
          return [vars?.id, 'get']
        },
        updateFn(oldData, newData) {
          if (!newData.data) {
            return oldData
          }
          const data = { ...(oldData.data || {}), ...(newData.data || {}) }
          oldData.data = data
          return oldData
        },
      },
    ],
    invalidateQueries: [
      {
        queryKey: ['list'],
        exact: false,
      },
    ],
  })

  const updateExecution = async (Execution: IExecutionUpdate) => {
    const result = ExecutionUpdateSchema.safeParse(Execution)
    if (!result.success) {
      return {
        data: null,
        success: false,
        message: 'Invalid input',
        errorCode: ErrorCode.VALIDATION_ERROR,
        metadata: {
          validationErrors: formatZodError(result.error),
        },
        statusText: 'Unprocessable Entity',
      }
    }

    return await handleUpdate({
      id: Execution.id,
      data: result.data,
    })
  }

  return { updateExecution, ...rest }
}
