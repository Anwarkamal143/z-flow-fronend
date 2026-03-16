'use client'

import { CheckCircle2Icon, Loader2Icon, XCircleIcon } from '@/assets/icons'
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPaination,
  ErrorView,
  LoadingView,
} from '@/components/entity-components'
import { formatDateDistanceToNow } from '@/lib/date-time'
import { useOffsetPaginationParams } from '@/queries/pagination/hooks/use-pagination-params'
import { toast } from 'sonner'

import { ExecutionStatusType, IExecutionStatusType } from '@/config/enums'
import { IExecution } from '@/types/Iexecution'
import { ClockIcon } from 'lucide-react'
import { useDeleteExecution } from '../api/mutation-hooks'
import { useSuspenseOffsetExecutions } from '../api/query-hooks'
import { IExecutionInsert } from '../schema/executions'

const ExecutionsList = () => {
  const { data } = useSuspenseOffsetExecutions()

  return (
    <div className='relative h-full'>
      <EntityList
        className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-auto'
        items={data?.items}
        emptyView={<ExecutionsEmpty />}
        getKey={(item) => item.id}
        renderItem={(item) => {
          return <ExecutionsItem data={item} />
        }}
      />
    </div>
  )
}

export default ExecutionsList

export const ExecutionsHeader = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <EntityHeader
        title='Executions'
        description='View your workflow execution history'
      />
    </>
  )
}

export const ExecutionsPagination = () => {
  const { pagination_meta } = useSuspenseOffsetExecutions()
  const { page, setPage } = useOffsetPaginationParams<IExecutionInsert>()
  return (
    <EntityPaination
      page={page}
      onPageChange={setPage}
      totalPages={pagination_meta?.totalPages}
      isNext={!!pagination_meta?.next}
    />
  )
}
export const ExecutionsContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <EntityContainer
        header={<ExecutionsHeader />}
        pagination={<ExecutionsPagination />}
        className='execution_entity_container'
      >
        {children}
      </EntityContainer>
    </>
  )
}
type LoaingErrorProps = {
  message?: string
}
export const ExecutionsLoading = ({ message }: LoaingErrorProps) => {
  return <LoadingView message={message || 'Loading executions...'} />
}
export const ExecutionsError = ({ message }: LoaingErrorProps) => {
  return <ErrorView message={message || 'Error while loading executions.'} />
}
export const ExecutionsEmpty = () => {
  return (
    <>
      <EmptyView
        message={`You haven't created any executions yet. Get started by running your first workflow`}
      />
    </>
  )
}
export const getStatusIcon = (status?: IExecutionStatusType) => {
  switch (status) {
    case ExecutionStatusType.SUCCESS:
      return <CheckCircle2Icon className='size-5 text-green-600' />
    case ExecutionStatusType.FAILED:
      return <XCircleIcon className='size-5 text-red-600' />
    case ExecutionStatusType.RUNNING:
      return <Loader2Icon className='size-5 animate-spin text-blue-600' />
    default:
      return <ClockIcon className='text-muted-foreground size-5' />
  }
}

export const formatStatus = (status?: IExecutionStatusType) => {
  return status
    ? status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase()
    : ''
}

export const ExecutionsItem = ({ data }: { data: IExecution }) => {
  const { id, completed_at, started_at, status, workflow } = data
  const { handleDelete, isPending } = useDeleteExecution()
  const duration = completed_at
    ? Math.round(
        (new Date(completed_at).getTime() - new Date(started_at).getTime()) /
          1000,
      )
    : null
  const subtitle = (
    <>
      {workflow?.name} &bull; Started {formatDateDistanceToNow(started_at)}
      {duration !== null && <> &bull; Took {duration}s</>}
    </>
  )
  return (
    <EntityItem
      href={`/executions/${id}`}
      title={formatStatus(status)}
      onRemove={() => {
        handleDelete({
          payload: { id },
          options: {
            onSuccess(data, variables, onMutateResult, context) {
              toast.success(`Execution ${data.data?.name} removed`)
            },
          },
        })
      }}
      subtitle={subtitle}
      isRemoving={isPending}
      image={
        <div className='flex size-8 items-center justify-center'>
          {getStatusIcon(status)}
        </div>
      }
    />
  )
}
